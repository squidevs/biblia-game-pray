// Telas adicionais (Sobre, Termos, Política, Ações, Ofensiva)

function sobreScreen() {
  return {
    about: null,
    loading: true,
    
    async init() {
      try {
        const data = await DataManager.loadJSON('about');
        this.about = data?.about || null;
      } catch (error) {
        console.error('Erro ao carregar sobre:', error);
      } finally {
        this.loading = false;
      }
    }
  };
}

function termosScreen() {
  return {
    // Tela de termos - conteúdo estático
  };
}

function politicaScreen() {
  return {
    // Tela de política - conteúdo estático
  };
}

function acoesScreen() {
  return {
    acoes: [],
    filter: 'todas',
    loading: false,
    
    get filteredAcoes() {
      if (this.filter === 'todas') return this.acoes;
      return this.acoes.filter(a => a.categoria === this.filter);
    },
    
    async init() {
      this.loading = true;
      try {
        const data = await DataManager.loadJSON('acoes');
        this.acoes = data?.acoes || [];
      } catch (error) {
        console.error('Erro ao carregar ações:', error);
        this.acoes = [];
      } finally {
        this.loading = false;
      }
    },
    
    podeExecutar(acao) {
      const user = Alpine.store('app').currentUser;
      if (!user) return false;
      
      // Verificar cooldown
      const ultimaExecucao = localStorage.getItem(`acao_${acao.id}_${user.id}`);
      if (ultimaExecucao) {
        const tempoRecarga = acao.configuracoes?.tempoRecargaMinutos || 60;
        const agora = new Date();
        const ultima = new Date(ultimaExecucao);
        const minutosPassados = (agora - ultima) / 60000;
        
        if (minutosPassados < tempoRecarga) {
          return false;
        }
      }
      
      // Verificar bloqueio por status
      const status = Alpine.store('app').statusData;
      if (status) {
        const bloqueio = GameSystems.verificarBloqueio(status, 'acao', acao.id);
        return !bloqueio.bloqueado;
      }
      
      return true;
    },
    
    async executarAcao(acao) {
      const user = Alpine.store('app').currentUser;
      if (!user) {
        Utils.showToast('Faça login para executar ações', 'warning');
        return;
      }
      
      if (!this.podeExecutar(acao)) {
        Utils.showToast('Ação em cooldown ou bloqueada', 'warning');
        return;
      }
      
      // Registrar execução
      localStorage.setItem(`acao_${acao.id}_${user.id}`, new Date().toISOString());
      
      // Aplicar efeitos
      if (acao.efeitos) {
        await GameSystems.aplicarEfeitos(user.id, acao.efeitos);
      }
      
      // Aplicar recompensas
      if (acao.recompensas) {
        if (acao.recompensas.xp) {
          await GameSystems.adicionarXP(user.id, acao.recompensas.xp);
        }
        if (acao.recompensas.moeda) {
          const status = await DataManager.getUserStatus(user.id);
          if (status.hudStatus) {
            status.hudStatus.moeda = (status.hudStatus.moeda || 0) + acao.recompensas.moeda;
          }
          await DataManager.updateUserStatus(user.id, status);
        }
      }
      
      // Atualizar status
      const status = await DataManager.getUserStatus(user.id);
      Alpine.store('app').statusData = status;
      
      Utils.showToast('Ação executada com sucesso!', 'success');
      Utils.playSound('success');
    }
  };
}

function ofensivaScreen() {
  return {
    diasConsecutivos: 0,
    mensagemMotivacional: 'Sua ofensiva começou! Pratique todos os dias para ela crescer.',
    diasSemana: [],
    recompensasDiarias: [],
    
    async init() {
      const user = Alpine.store('app').currentUser;
      if (user) {
        const status = await DataManager.getUserStatus(user.id);
        this.diasConsecutivos = status?.estatisticas?.diasConsecutivos || 0;
        
        // Carregar dias da semana
        this.carregarDiasSemana();
        
        // Carregar recompensas
        this.carregarRecompensas();
      }
    },
    
    carregarDiasSemana() {
      const hoje = new Date();
      const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const diaAtual = hoje.getDay();
      
      this.diasSemana = dias.map((nome, index) => ({
        nome,
        ativo: index === diaAtual,
        futuro: index > diaAtual
      }));
    },
    
    carregarRecompensas() {
      // Recompensas padrão para 7 dias
      this.recompensasDiarias = [
        { dia: 1, nome: 'Cristal', icone: 'bi bi-gem', disponivel: true, coletada: false },
        { dia: 2, nome: 'Baú', icone: 'bi bi-box', disponivel: false, coletada: false },
        { dia: 3, nome: 'Cesta de Cristais', icone: 'bi bi-basket', disponivel: false, coletada: false },
        { dia: 4, nome: 'Poção de Fé', icone: 'bi bi-heart', disponivel: false, coletada: false },
        { dia: 5, nome: 'Baú Dourado', icone: 'bi bi-box-seam', disponivel: false, coletada: false },
        { dia: 6, nome: 'Cristal Especial', icone: 'bi bi-star', disponivel: false, coletada: false },
        { dia: 7, nome: 'Baú Épico', icone: 'bi bi-trophy', disponivel: false, coletada: false }
      ];
      
      // Marcar recompensas disponíveis baseado em dias consecutivos
      this.recompensasDiarias.forEach((r, index) => {
        r.disponivel = index < this.diasConsecutivos;
        r.coletada = index < this.diasConsecutivos - 1;
      });
    },
    
    async coletarRecompensa(recompensa) {
      if (!recompensa.disponivel || recompensa.coletada) return;
      
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      // Dar recompensas
      const status = await DataManager.getUserStatus(user.id);
      if (status.hudStatus) {
        status.hudStatus.moeda = (status.hudStatus.moeda || 0) + 50;
      }
      await DataManager.updateUserStatus(user.id, status);
      
      recompensa.coletada = true;
      Utils.showToast(`Recompensa coletada: ${recompensa.nome}!`, 'success');
      Utils.playSound('reward');
    },
    
    definirLembrete() {
      if ('Notification' in window && Notification.permission === 'granted') {
        Utils.showToast('Lembrete configurado!', 'success');
      } else {
        Integrations.requestNotificationPermission().then(granted => {
          if (granted) {
            Utils.showToast('Lembrete configurado!', 'success');
          } else {
            Utils.showToast('Permissão de notificação negada', 'warning');
          }
        });
      }
    }
  };
}

