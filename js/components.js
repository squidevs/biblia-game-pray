// Componentes Alpine.js

function hudComponent() {
  return {
    expanded: false,
    itens: [],
    buffsAtivos: [],
    debuffsAtivos: [],
    
    get user() {
      return Alpine.store('app').currentUser;
    },
    
    get status() {
      return Alpine.store('app').statusData;
    },
    
    async init() {
      // Carregar itens
      this.itens = await DataManager.getItens();
      
      // Carregar buffs/debuffs ativos
      await this.atualizarEfeitos();
      
      // Atualizar regeneração
      if (this.user) {
        await GameSystems.regenerarCoracoes(this.user.id);
        await GameSystems.atualizarEspiritoSanto(this.user.id);
      }
      
      // Atualizar efeitos a cada minuto
      setInterval(() => {
        this.atualizarEfeitos();
      }, 60000);
    },
    
    getAvatarUrl() {
      if (!this.user?.sid) return 'assets/logotipos/notext-perfil-logo/perfil-colorido.png';
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.user.sid}`;
    },
    
    async atualizarEfeitos() {
      // Buscar efeitos ativos do localStorage
      const efeitos = JSON.parse(localStorage.getItem(`efeitos_${this.user?.id}`) || '[]');
      const agora = new Date();
      
      this.buffsAtivos = [];
      this.debuffsAtivos = [];
      
      efeitos.forEach(efeito => {
        const expiraEm = new Date(efeito.expiraEm);
        const tempoRestante = Math.max(0, expiraEm - agora);
        
        if (tempoRestante > 0) {
          const efeitoData = {
            ...efeito,
            tempoRestante: tempoRestante / 1000 // segundos
          };
          
          if (efeito.tipo === 'buff') {
            this.buffsAtivos.push(efeitoData);
          } else {
            this.debuffsAtivos.push(efeitoData);
          }
        }
      });
      
      // Remover expirados
      const efeitosAtivos = [...this.buffsAtivos, ...this.debuffsAtivos];
      localStorage.setItem(`efeitos_${this.user?.id}`, JSON.stringify(efeitosAtivos.map(e => ({
        id: e.id,
        nome: e.nome,
        tipo: e.tipo,
        expiraEm: new Date(Date.now() + e.tempoRestante * 1000).toISOString()
      }))));
    },
    
    formatTimer(segundos) {
      const minutos = Math.floor(segundos / 60);
      const segs = Math.floor(segundos % 60);
      return `${minutos}:${segs.toString().padStart(2, '0')}`;
    },
    
    getSlotItem(tipo, index) {
      // Buscar item equipado no slot
      const slots = JSON.parse(localStorage.getItem(`slots_${this.user?.id}`) || '{}');
      return slots[`${tipo}_${index}`] || null;
    },
    
    getSlotItemImage(tipo, index) {
      const item = this.getSlotItem(tipo, index);
      if (!item) return '';
      const itemData = this.itens.find(i => i.id === item.itemId);
      return itemData?.imagem || 'assets/logotipos/notext-perfil-logo/perfil-colorido.png';
    },
    
    abrirMenuArmadura(peca) {
      Utils.showToast(`Menu de ${peca} em desenvolvimento`, 'info');
    },
    
    abrirMenuSlot(tipo, index) {
      Utils.showToast(`Menu de slot ${tipo} ${index} em desenvolvimento`, 'info');
    },
    
    formatarNomeAtributo(key) {
      const nomes = {
        amor: 'Amor',
        alegria: 'Alegria',
        paz: 'Paz',
        paciencia: 'Paciência',
        bondade: 'Bondade',
        benignidade: 'Benignidade',
        fidelidade: 'Fidelidade',
        mansidao: 'Mansidão',
        dominioProprio: 'Domínio Próprio',
        imoralidadeImpureza: 'Imoralidade/Impureza',
        idolatriaFeiticaria: 'Idolatria/Feitiçaria',
        inimizadeOdio: 'Inimizade/Ódio',
        ciumesInveja: 'Ciúmes/Inveja',
        ira: 'Ira',
        dissensaoFaccao: 'Dissensão/Facção',
        orgiasBebedices: 'Orgias/Bebedices',
        ambicaoEgoista: 'Ambição/Egoísta',
        orgulhoEgoismo: 'Orgulho/Egoísmo'
      };
      return nomes[key] || key;
    },
    
    getFaixaStatus(valor) {
      return GameSystems.getFaixaStatus(valor);
    },
    
    getTooltipFruto(key) {
      const tooltips = {
        amor: '+Bônus em recompensas de grupo, reduz penalidades por inimizade.',
        alegria: '+Aumenta XP ganho em missões, reduz efeitos de tristeza/debuff.',
        paz: '+Reduz chance de debuffs de conflito, aumenta regeneração de corações.',
        paciencia: '+Permite mais tentativas em quizzes, reduz penalidade por erros.',
        bondade: '+Desbloqueia recompensas extras em missões colaborativas.',
        benignidade: '+Aumenta chance de buffs ao ajudar outros jogadores.',
        fidelidade: '+Bônus de streak diário, reduz perda de XP por falha.',
        mansidao: '+Reduz impacto de debuffs de ira, facilita reconciliação em missões.',
        dominioProprio: '+Reduz consumo de corações por erro, aumenta resistência a debuffs.'
      };
      return tooltips[key] || '';
    },
    
    getTooltipPecado(key) {
      const tooltips = {
        imoralidadeImpureza: '-Aumenta chance de penalidade em quizzes, bloqueia buffs de pureza.',
        idolatriaFeiticaria: '-Reduz XP ganho, aumenta chance de debuffs aleatórios.',
        inimizadeOdio: '-Bloqueia recompensas de grupo, aumenta penalidade por conflitos.',
        ciumesInveja: '-Reduz ganhos em missões colaborativas, aumenta chance de perder itens.',
        ira: '-Aumenta consumo de corações por erro, ativa debuff de vulnerabilidade.',
        dissensaoFaccao: '-Reduz streak, aumenta penalidade por missões não concluídas.',
        orgiasBebedices: '-Reduz regeneração de corações, aumenta chance de debuffs de lentidão.',
        ambicaoEgoista: '-Bloqueia buffs de grupo, reduz recompensas coletivas.',
        orgulhoEgoismo: '-Reduz chance de buffs, aumenta penalidade por falha em missões.'
      };
      return tooltips[key] || '';
    }
  };
}

function perfilScreen() {
  return {
    get user() {
      return Alpine.store('app').currentUser;
    },
    
    get status() {
      return Alpine.store('app').statusData;
    },
    
    getAvatarUrl() {
      if (!this.user?.sid) return 'assets/logotipos/notext-perfil-logo/perfil-colorido.png';
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.user.sid}`;
    },
    
    async handleLogout() {
      if (confirm('Deseja realmente sair?')) {
        Alpine.store('app').logout();
        Utils.showToast('Logout realizado', 'info');
      }
    }
  };
}

