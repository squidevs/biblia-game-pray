// Sync Queue simples: IndexedDB com fallback para localStorage
(function(window){
  const DB_NAME = 'gamepray_sync_db';
  const STORE_NAME = 'queue';
  const DB_VERSION = 1;

  function openDB(){
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return resolve(null);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
  }

  async function enqueueIndexed(action){
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.add({ action, timestamp: new Date().toISOString() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  }

  function enqueueLocalStorage(action){
    try {
      const key = 'gamepray_sync_queue';
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push({ id: Date.now(), action, timestamp: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(arr));
      return true;
    } catch (e) {
      console.error('Erro ao enfileirar no localStorage', e);
      return false;
    }
  }

  async function enqueue(action){
    // action: { type: 'evidencia'|'sync', payload: {...} }
    if (!action || !action.type) return false;
    const ok = await enqueueIndexed(action);
    if (ok) return true;
    const res = enqueueLocalStorage(action);
    // Tentar registrar Background Sync se suportado
    try {
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        const reg = await navigator.serviceWorker.ready;
        try {
          await reg.sync.register('syncQueue');
          console.log('Background sync registrado: syncQueue');
        } catch (e) {
          // Falha ao registrar sync - ignorar
          console.warn('Não foi possível registrar background sync', e);
        }
      }
    } catch (e) {
      // ignorar erros de registro
    }
    return res;
  }

  // Ler fila IndexedDB
  async function readAllIndexed(){
    const db = await openDB();
    if (!db) return [];
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  function readAllLocalStorage(){
    try {
      const raw = localStorage.getItem('gamepray_sync_queue');
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  async function getAll(){
    const indexed = await readAllIndexed();
    const local = readAllLocalStorage();
    // Normalize entries to {id, action, timestamp, source}
    const normIndexed = indexed.map(i => ({ id: i.id, action: i.action, timestamp: i.timestamp, source: 'indexed' }));
    const normLocal = local.map(i => ({ id: i.id, action: i.action, timestamp: i.timestamp, source: 'local' }));
    return [...normIndexed, ...normLocal];
  }

  async function removeIndexed(id){
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  }

  function removeLocal(id){
    try {
      const key = 'gamepray_sync_queue';
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      const filtered = arr.filter(i => i.id !== id);
      localStorage.setItem(key, JSON.stringify(filtered));
      return true;
    } catch (e) { return false; }
  }

  async function remove(entry){
    if (!entry) return false;
    if (entry.source === 'indexed') return removeIndexed(entry.id);
    return removeLocal(entry.id);
  }

  // Processar fila: tenta enviar ações. A função de envio deve ser registrada em window.SyncQueueHandler
  async function processQueue(){
    const items = await getAll();
    if (!items.length) return 0;
    let processed = 0;
    for (const item of items) {
      try {
        // Handler padrão: chama window.SyncQueueHandler.send(action) se existir
        if (window.SyncQueueHandler && typeof window.SyncQueueHandler.send === 'function') {
          const ok = await window.SyncQueueHandler.send(item.action);
          if (ok) {
            await remove(item);
            processed++;
          }
        } else {
          // Sem handler: apenas loggar e manter na fila
          console.log('SyncQueue: sem handler, pulando item', item);
        }
      } catch (e) {
        console.error('Erro ao processar item de fila', e, item);
      }
    }
    return processed;
  }

  // Expor API global
  window.SyncQueue = {
    enqueue,
    getAll,
    processQueue
  };

  // Tentar processar ao reconectar
  window.addEventListener('online', () => {
    setTimeout(() => { if (window.SyncQueue) window.SyncQueue.processQueue(); }, 2000);
  });

})(window);
