// Sistema completo de conquistas

const ConquistasSystem = {
  // Verificar e desbloquear conquistas
  async verificarConquistas(userId) {
    const todasConquistas = await DataManager.getConquistas();
    const usuario = await DataManager.getUsuario(userId);
    const status = await DataManager.getUserStatus(userId);
    const conquistasDesbloqueadas = usuario?.conquistas || [];
    const novasConquistas = [];
    
    for (const conquista of todasConquistas) {
      // Se já desbloqueada, pular
      if (conquistasDesbloqueadas.includes(conquista.id) || 
          conquistasDesbloqueadas.includes(parseInt(conquista.id))) {
        continue;
      }
      
      // Verificar critérios
      if (this.verificarCriterio(conquista, status, usuario)) {
        // Desbloquear conquista
        if (!usuario.conquistas) {
          usuario.conquistas = [];
        }
        usuario.conquistas.push(conquista.id);
        
        // Aplicar recompensas
        if (conquista.recompensa) {
          if (conquista.recompensa.xp) {
            await GameSystems.adicionarXP(userId, conquista.recompensa.xp);
          }
          
          if (conquista.recompensa.itens) {
            if (!usuario.inventario) {
              usuario.inventario = [];
            }
            conquista.recompensa.itens.forEach(itemId => {
              const itemInventario = usuario.inventario.find(i => i.itemId === itemId);
              if (itemInventario) {
                itemInventario.quantidade = (itemInventario.quantidade || 0) + 1;
              } else {
                usuario.inventario.push({ itemId, quantidade: 1 });
              }
            });
          }
        }
        
        // Atualizar estatísticas
        if (status.estatisticas) {
          status.estatisticas.conquistasDesbloqueadas = (status.estatisticas.conquistasDesbloqueadas || 0) + 1;
        }
        await DataManager.updateUserStatus(userId, status);
        
        novasConquistas.push(conquista);
        
        // Mostrar notificação
        Utils.showToast(`Conquista desbloqueada: ${conquista.titulo}!`, 'success');
        Utils.playSound('conquest');
      }
    }
    
    // Salvar usuário atualizado
    if (novasConquistas.length > 0) {
      const usuarios = await DataManager.getUsuarios();
      const index = usuarios.findIndex(u => u.id === usuario.id);
      if (index >= 0) {
        usuarios[index] = usuario;
        const data = await DataManager.loadJSON('usuarios');
        if (data) {
          data.usuarios = usuarios;
          DataManager.saveJSON('usuarios', data);
        }
      }
    }
    
    return novasConquistas;
  },
  
  // Verificar critério de conquista
  verificarCriterio(conquista, status, usuario) {
    const requisito = conquista.requisito || conquista.requisitos;
    if (!requisito) return false;
    
    // Verificar por tipo
    if (requisito.lerLivro) {
      const progresso = JSON.parse(localStorage.getItem(`progresso_estudos_${usuario.id}`) || '{}');
      const livroProgresso = progresso[requisito.lerLivro] || {};
      const capitulosConcluidos = Object.values(livroProgresso).filter(c => c.concluido).length;
      return capitulosConcluidos > 0;
    }
    
    if (requisito.missoesCompletas) {
      return (status.estatisticas?.missoesCompletas || 0) >= requisito.missoesCompletas;
    }
    
    if (requisito.diasConsecutivos) {
      return (status.estatisticas?.diasConsecutivos || 0) >= requisito.diasConsecutivos;
    }
    
    if (requisito.nivel) {
      return (status.atributos?.nivel || 1) >= requisito.nivel;
    }
    
    if (requisito.xp) {
      return (status.atributos?.xp || 0) >= requisito.xp;
    }
    
    // Verificar atributos
    if (requisito.atributoPositivo) {
      const atributo = status.atributos?.frutosEspirito?.[requisito.atributoPositivo.nome];
      return atributo >= requisito.atributoPositivo.valor;
    }
    
    if (requisito.atributoNegativo) {
      const atributo = status.atributos?.obrasCarneAgrupadas?.[requisito.atributoNegativo.nome];
      return atributo <= requisito.atributoNegativo.valor;
    }
    
    return false;
  }
};

window.ConquistasSystem = ConquistasSystem;

