// SyncQueueHandler stub: simula envio para servidor e registra log local
(function(window){
  async function send(action){
    try {
      // Simular tentativa de POST para endpoint /api/sync (não existe)
      // Tentaremos um fetch rápido; se falhar, simulamos sucesso localmente.
      if (navigator.onLine) {
        try {
          // Operação segura: não bloquear se endpoint não existir
          const resp = await fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action),
            keepalive: true
          });
          if (resp && (resp.status === 200 || resp.status === 201)) {
            storeSent(action);
            return true;
          }
        } catch (e) {
          // Endpoint não disponível — cair para simulação
          console.warn('Sync handler: falha ao postar para /api/sync, simulando envio', e);
        }
      }

      // Simular sucesso local: armazenar no localStorage como log
      storeSent(action);
      return true;
    } catch (e) {
      console.error('Sync handler error', e);
      return false;
    }
  }

  function storeSent(action){
    try {
      const key = 'gamepray_sync_sent';
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push({ id: Date.now(), action, sentAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) {
      console.warn('Não foi possível gravar log de sync localmente', e);
    }
  }

  window.SyncQueueHandler = {
    send
  };

})(window);
