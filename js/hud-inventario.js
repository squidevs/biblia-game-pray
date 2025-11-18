// HUD de Inventário e Armadura
(function(window){
  window.HUDInventario = {
    async render(userId) {
      const container = document.getElementById('hud-inventario');
      if (!container) return;
      container.innerHTML = '<em>Carregando inventário...</em>';
      const usuario = await DataManager.getUsuario(userId);
      if (!usuario) {
        container.innerHTML = '<span style="color:red">Usuário não encontrado</span>';
        return;
      }
      // Armaduras equipadas
      const armaduras = usuario.status_snapshot?.armaduraEquipada || [];
      // Itens do inventário
      const inventario = usuario.inventario || [];
      // Consumíveis
      const consumiveis = await DataManager.getConsumiveis(userId);
      // Renderização
      let html = '<div class="hud-armadura"><strong>Armadura Equipada:</strong><ul>';
      if (armaduras.length === 0) {
        html += '<li><em>Nenhuma armadura equipada</em></li>';
      } else {
        armaduras.forEach(a => {
          html += `<li>${a}</li>`;
        });
      }
      html += '</ul></div>';
      html += '<div class="hud-inventario"><strong>Inventário:</strong><ul>';
      if (inventario.length === 0) {
        html += '<li><em>Inventário vazio</em></li>';
      } else {
        inventario.forEach(i => {
          html += `<li>Item #${i.itemId} x${i.quantidade}</li>`;
        });
      }
      html += '</ul></div>';
      html += '<div class="hud-consumiveis"><strong>Consumíveis:</strong><ul>';
      if (Object.keys(consumiveis).length === 0) {
        html += '<li><em>Nenhum consumível</em></li>';
      } else {
        Object.entries(consumiveis).forEach(([id, qtd]) => {
          html += `<li>Item #${id} x${qtd}</li>`;
        });
      }
      html += '</ul></div>';
      container.innerHTML = html;
    }
  };
  // Render automático ao carregar
  document.addEventListener('DOMContentLoaded', () => {
    const user = Alpine?.store('app')?.currentUser;
    if (user) window.HUDInventario.render(user.id);
  });
})(window);
