// Sistema completo de missões

const MissoesSystem = {
  // Iniciar missão
  async iniciarMissao(userId, missaoId) {
    const usuario = await DataManager.getUsuario(userId);
    if (!usuario) return false;
    // Verificar se já está ativa
    if (usuario.missoesAtivas?.find(m => m.missaoId === missaoId)) {
      Utils.showToast('Missão já está ativa!', 'info');
      return false;
    }
    // Adicionar às ativas
    if (!usuario.missoesAtivas) usuario.missoesAtivas = [];
    usuario.missoesAtivas.push({
      missaoId,
      status: 'em_andamento',
      progresso: 0,
      inicio: new Date().toISOString(),
      ultimaAtualizacao: new Date().toISOString(),
      evidencias: [],
      checkboxes: {},
      quizProgress: 0,
      verificado: false
    });
    // Salvar
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
    Utils.showToast('Missão iniciada!', 'success');
    Utils.playSound('confirm');
    return true;
  },
  
  // Registrar evidência
  async registrarEvidencia(userId, missaoId, evidencia) {
    const usuario = await DataManager.getUsuario(userId);
    if (!usuario) return false;
    const missaoAtiva = usuario.missoesAtivas?.find(m => m.missaoId === missaoId);
    if (!missaoAtiva) {
      Utils.showToast('Missão não encontrada!', 'error');
      return false;
    }
    // Adicionar evidência
    if (!missaoAtiva.evidencias) missaoAtiva.evidencias = [];
    const evid = {
      tipo: evidencia.tipo || 'texto',
      conteudo: evidencia.conteudo || '',
      timestamp: new Date().toISOString(),
      verificado: false
    };
    // Verificação automática simples
    evid.verificado = MissoesSystem.verificarEvidenciaAuto(evid, missaoId);
    missaoAtiva.evidencias.push(evid);
    missaoAtiva.status = evid.verificado ? 'verificada' : 'aguardando_verificacao';
    missaoAtiva.ultimaAtualizacao = new Date().toISOString();
    // Salvar
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
    // Enfileirar para sincronização offline
    if (window.SyncQueue) {
      window.SyncQueue.enqueue({
        type: 'evidencia',
        payload: {
          userId,
          missaoId,
          evidencia: evid
        }
      });
    }
    Utils.showToast('Evidência registrada!', 'success');
    return true;
  },

  // Verificação automática simples de evidência
  verificarEvidenciaAuto(evidencia, missaoId) {
    // Exemplo: texto não vazio, imagem base64 válida, áudio com duração mínima
    if (evidencia.tipo === 'texto') {
      return evidencia.conteudo && evidencia.conteudo.length > 5;
    }
    if (evidencia.tipo === 'imagem') {
      return /^data:image\/(png|jpg|jpeg);base64,/.test(evidencia.conteudo);
    }
    if (evidencia.tipo === 'audio') {
      return evidencia.conteudo && evidencia.conteudo.length > 10000; // base64 mínimo
    }
    return false;
  },
    
    Utils.showToast('Evidência registrada! Aguardando verificação...', 'success');
      // Enfileirar sincronização da evidência (quando houver conexão/handler)
      try {
        if (window.SyncQueue && typeof window.SyncQueue.enqueue === 'function') {
          window.SyncQueue.enqueue({ type: 'evidencia', payload: { userId, missaoId, evidencia: { tipo: evidencia.tipo || 'texto', conteudo: evidencia.conteudo || '', timestamp: new Date().toISOString() } } });
        }
      } catch (e) {
        console.warn('Não foi possível enfileirar evidência para sincronização', e);
      }

      return true;
  },
  
  // Concluir missão
  async concluirMissao(userId, missaoId, aprovada = true) {
    const usuario = await DataManager.getUsuario(userId);
    const todasMissoes = await DataManager.getMissoes();
    const missao = todasMissoes.find(m => m.id === missaoId);
    
    if (!usuario || !missao) return false;
    
    const missaoAtiva = usuario.missoesAtivas?.find(m => m.missaoId === missaoId);
    if (!missaoAtiva) return false;
    
    if (aprovada) {
      // Aplicar recompensas
      const recompensas = missao.recompensas || {};
      
      // XP
      if (recompensas.xp) {
        await GameSystems.adicionarXP(userId, recompensas.xp);
      }
      
      // Moedas
      if (recompensas.moeda) {
        const status = await DataManager.getUserStatus(userId);
        if (status.hudStatus) {
          status.hudStatus.moeda = (status.hudStatus.moeda || 0) + recompensas.moeda;
        } else {
          status.hudStatus = { moeda: recompensas.moeda };
        }
        await DataManager.updateUserStatus(userId, status);
      }
      
      // Itens
      if (recompensas.itens && recompensas.itens.length > 0) {
        if (!usuario.inventario) {
          usuario.inventario = [];
        }
        recompensas.itens.forEach(itemId => {
          const itemInventario = usuario.inventario.find(i => i.itemId === itemId);
          if (itemInventario) {
            itemInventario.quantidade = (itemInventario.quantidade || 0) + 1;
          } else {
            usuario.inventario.push({ itemId, quantidade: 1 });
          }
        });
      }
      
      // Atributos
      if (recompensas.atributos) {
        await GameSystems.aplicarEfeitos(userId, { atributosPositivos: recompensas.atributos });
      }
      
      // Atualizar missão
      missaoAtiva.status = 'concluida';
      missaoAtiva.ultimaAtualizacao = new Date().toISOString();
      
      // Atualizar estatísticas
      const status = await DataManager.getUserStatus(userId);
      if (status.estatisticas) {
        status.estatisticas.missoesCompletas = (status.estatisticas.missoesCompletas || 0) + 1;
      }
      await DataManager.updateUserStatus(userId, status);
      
      // Verificar conquistas
      await ConquistasSystem.verificarConquistas(userId);
      
      Utils.showToast('Missão concluída! Recompensas recebidas!', 'success');
      Utils.playSound('mission_done');
    } else {
      missaoAtiva.status = 'falhada';
      missaoAtiva.ultimaAtualizacao = new Date().toISOString();
      
      const status = await DataManager.getUserStatus(userId);
      if (status.estatisticas) {
        status.estatisticas.missoesFalhas = (status.estatisticas.missoesFalhas || 0) + 1;
      }
      await DataManager.updateUserStatus(userId, status);
      
      Utils.showToast('Missão falhada.', 'error');
      Utils.playSound('fail');
    }
    
    // Salvar
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
    
    return true;
  },
  
  // Verificar e resetar missões diárias
  async resetarMissoesDiarias() {
    const agora = new Date();
    const horaReset = 4; // 04:00
    
    // Verificar se já resetou hoje
    const ultimoReset = localStorage.getItem('ultimo_reset_missoes');
    if (ultimoReset) {
      const dataReset = new Date(ultimoReset);
      const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
      const dataResetDia = new Date(dataReset.getFullYear(), dataReset.getMonth(), dataReset.getDate());
      
      if (dataResetDia.getTime() === hoje.getTime()) {
        return; // Já resetou hoje
      }
    }
    
    // Resetar missões diárias de todos usuários
    const usuarios = await DataManager.getUsuarios();
    usuarios.forEach(usuario => {
      if (usuario.missoesAtivas) {
        usuario.missoesAtivas = usuario.missoesAtivas.filter(m => {
          // Manter apenas missões não diárias ou que não expiraram
          return true; // Simplificado - em produção verificar tipo e expiração
        });
      }
    });
    
    localStorage.setItem('ultimo_reset_missoes', agora.toISOString());
  }
};

window.MissoesSystem = MissoesSystem;

