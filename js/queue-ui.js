// UI mínima para visualizar/limpar a fila de sincronização (útil para debug)
(function(window){
  function createModal(){
    const modal = document.createElement('div');
    modal.id = 'sync-queue-modal';
    modal.style.position = 'fixed';
    modal.style.right = '16px';
    modal.style.bottom = '16px';
    modal.style.zIndex = 9999;

    const btn = document.createElement('button');
    btn.textContent = 'Fila (sync)';
    btn.className = 'btn btn-secondary';
    btn.style.padding = '8px 12px';
    btn.style.borderRadius = '8px';

    const panel = document.createElement('div');
    panel.style.display = 'none';
    panel.style.width = '360px';
    panel.style.maxHeight = '60vh';
    panel.style.overflow = 'auto';
    panel.style.background = '#fff';
    panel.style.border = '1px solid rgba(0,0,0,0.08)';
    panel.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
    panel.style.padding = '12px';
    panel.style.marginTop = '8px';
    panel.style.borderRadius = '8px';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    const title = document.createElement('strong');
    title.textContent = 'Sync Queue';
    const actions = document.createElement('div');
    const btnRefresh = document.createElement('button'); btnRefresh.textContent = 'Atualizar'; btnRefresh.className='btn btn-sm';
    const btnClear = document.createElement('button'); btnClear.textContent = 'Limpar log (sent)'; btnClear.className='btn btn-sm btn-danger';
    actions.appendChild(btnRefresh); actions.appendChild(btnClear);
    header.appendChild(title); header.appendChild(actions);

    const list = document.createElement('div');
    list.id = 'sync-queue-list';
    list.style.marginTop = '8px';
    list.style.fontSize = '13px';

    panel.appendChild(header);
    panel.appendChild(list);

    btn.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      if (panel.style.display === 'block') loadQueue();
    });

    btnRefresh.addEventListener('click', loadQueue);
    btnClear.addEventListener('click', () => {
      localStorage.removeItem('gamepray_sync_sent');
      loadQueue();
    });

    modal.appendChild(btn);
    modal.appendChild(panel);
    document.body.appendChild(modal);

    async function loadQueue(){
      const listEl = document.getElementById('sync-queue-list');
      listEl.innerHTML = '<em>Carregando...</em>';
      let items = [];
      if (window.SyncQueue && typeof window.SyncQueue.getAll === 'function') {
        try { items = await window.SyncQueue.getAll(); } catch(e){ items = []; }
      }
      const sentRaw = localStorage.getItem('gamepray_sync_sent');
      const sent = sentRaw ? JSON.parse(sentRaw) : [];

      listEl.innerHTML = '';
      const h1 = document.createElement('div'); h1.innerHTML = `<div><strong>Enfileirados:</strong> ${items.length}</div>`; listEl.appendChild(h1);
      items.forEach(it => {
        const el = document.createElement('div');
        el.style.borderTop = '1px solid #eee';
        el.style.padding = '6px 0';
        el.innerHTML = `<div style="font-weight:600">${it.action.type}</div><div style="font-size:12px;color:#444">${JSON.stringify(it.action.payload).slice(0,200)}</div><div style="font-size:11px;color:#888">${it.timestamp}</div>`;
        listEl.appendChild(el);
      });

      const h2 = document.createElement('div'); h2.innerHTML = `<div style="margin-top:8px"><strong>Enviados (simulados):</strong> ${sent.length}</div>`; listEl.appendChild(h2);
      sent.slice().reverse().forEach(s => {
        const el = document.createElement('div');
        el.style.borderTop = '1px dashed #f0f0f0';
        el.style.padding = '6px 0';
        el.innerHTML = `<div style="font-weight:600">${s.action.type}</div><div style="font-size:12px;color:#444">${JSON.stringify(s.action.payload).slice(0,200)}</div><div style="font-size:11px;color:#888">${s.sentAt}</div>`;
        listEl.appendChild(el);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    try { createModal(); } catch (e) { console.error('Não foi possível criar UI da fila', e); }
  });

})(window);
