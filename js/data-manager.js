// Gerenciador de dados (JSONs locais)
const DataManager = {
    // Inventário do jogador
    async getInventario(userId) {
      const usuario = await this.getUsuario(userId);
      return usuario?.inventario || [];
    },

    async addItemInventario(userId, itemId, quantidade = 1) {
      const usuario = await this.getUsuario(userId);
      if (!usuario) return false;
      if (!usuario.inventario) usuario.inventario = [];
      const item = usuario.inventario.find(i => i.itemId === itemId);
      if (item) {
        item.quantidade = (item.quantidade || 0) + quantidade;
      } else {
        usuario.inventario.push({ itemId, quantidade });
      }
      // Salvar
      const usuarios = await this.getUsuarios();
      const index = usuarios.findIndex(u => u.id === usuario.id);
      if (index >= 0) {
        usuarios[index] = usuario;
        const data = await this.loadJSON('usuarios');
        if (data) {
          data.usuarios = usuarios;
          this.saveJSON('usuarios', data);
        }
      }
      return true;
    },

    async equiparArmadura(userId, nomeArmadura) {
      const usuario = await this.getUsuario(userId);
      if (!usuario) return false;
      if (!usuario.status_snapshot.armaduraEquipada) usuario.status_snapshot.armaduraEquipada = [];
      if (!usuario.status_snapshot.armaduraEquipada.includes(nomeArmadura)) {
        usuario.status_snapshot.armaduraEquipada.push(nomeArmadura);
      }
      // Salvar
      const usuarios = await this.getUsuarios();
      const index = usuarios.findIndex(u => u.id === usuario.id);
      if (index >= 0) {
        usuarios[index] = usuario;
        const data = await this.loadJSON('usuarios');
        if (data) {
          data.usuarios = usuarios;
          this.saveJSON('usuarios', data);
        }
      }
      return true;
    },

    async desequiparArmadura(userId, nomeArmadura) {
      const usuario = await this.getUsuario(userId);
      if (!usuario) return false;
      if (!usuario.status_snapshot.armaduraEquipada) usuario.status_snapshot.armaduraEquipada = [];
      usuario.status_snapshot.armaduraEquipada = usuario.status_snapshot.armaduraEquipada.filter(a => a !== nomeArmadura);
      // Salvar
      const usuarios = await this.getUsuarios();
      const index = usuarios.findIndex(u => u.id === usuario.id);
      if (index >= 0) {
        usuarios[index] = usuario;
        const data = await this.loadJSON('usuarios');
        if (data) {
          data.usuarios = usuarios;
          this.saveJSON('usuarios', data);
        }
      }
      return true;
    },

    async getConsumiveis(userId) {
      const usuario = await this.getUsuario(userId);
      if (!usuario) return {};
      // Exemplo: buscar consumíveis por itemId
      const consumiveis = {};
      (usuario.inventario || []).forEach(i => {
        if ([100, 106, 117].includes(i.itemId)) {
          consumiveis[i.itemId] = i.quantidade;
        }
      });
      return consumiveis;
    },
  // Cache de dados
  cache: {
    usuarios: null,
    status: null,
    missoes: null,
    acoes: null,
    itens: null,
    conquistas: null,
    estudos: null,
    loja: null,
    config: null
  },
  
  // Carregar JSON
  async loadJSON(file) {
    if (this.cache[file]) {
      return this.cache[file];
    }
    
    try {
      const response = await fetch(`/dados/${file}.json`);
      const data = await response.json();
      // Validação leve dos dados carregados
      if (!this.validateData(file, data)) {
        console.error(`Validação falhou para /dados/${file}.json`);
        // tentar carregar do storage como fallback
        const fallback = this.loadFromStorage(file);
        if (fallback) {
          this.cache[file] = fallback;
          return fallback;
        }
        return null;
      }
      this.cache[file] = data;
      return data;
    } catch (error) {
      console.error(`Erro ao carregar ${file}:`, error);
      return null;
    }
  },

  // Validação leve de JSONs para evitar crashes por arquivos malformados
  validateData(file, data) {
    if (!data) return false;
    try {
      switch (file) {
        case 'usuarios':
          return Array.isArray(data.usuarios);
        case 'missoes':
          return Array.isArray(data.missoes);
        case 'itens':
          return Array.isArray(data.itens);
        case 'status_player_base':
          return typeof data === 'object';
        case 'config_global':
          return typeof data === 'object';
        default:
          return true; // considerar válido por padrão
      }
    } catch (e) {
      console.error('Erro na validação de dados', e);
      return false;
    }
  },
  
  // Salvar JSON (localStorage como fallback)
  saveJSON(file, data) {
    this.cache[file] = data;
    // Salvar no localStorage como backup
    try {
      localStorage.setItem(`gamepray_${file}`, JSON.stringify(data));
    } catch (error) {
      console.error(`Erro ao salvar ${file}:`, error);
    }
  },
  
  // Carregar do localStorage
  loadFromStorage(file) {
    try {
      const stored = localStorage.getItem(`gamepray_${file}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error(`Erro ao carregar ${file} do storage:`, error);
    }
    return null;
  },
  
  // Usuários
  async getUsuarios() {
    const data = await this.loadJSON('usuarios');
    return data?.usuarios || [];
  },
  
  async getUsuario(id) {
    const usuarios = await this.getUsuarios();
    return usuarios.find(u => u.id === id || u.uid === id);
  },
  
  async createUsuario(usuarioData) {
    const usuarios = await this.getUsuarios();
    const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    
    const novoUsuario = {
      id: newId,
      uid: `u_${usuarioData.nome.toLowerCase().replace(/\s/g, '_')}_${newId}`,
      nome: usuarioData.nome,
      email: usuarioData.email,
      authProvider: 'local',
      sid: `seed-${Date.now()}`,
      status_snapshot: {
        nivel: 1,
        xp: 0,
        sequenciaAtual: 0,
        fe: 0,
        sabedoria: 0,
        espiritoSanto: 100,
        pecado: 1,
        armaduraEquipada: [],
        ultimaAtualizacao: new Date().toISOString()
      },
      inventario: [],
      conquistas: [],
      missoesAtivas: [],
      preferencias: {
        acessibilidade: {
          tts: true,
          libras: false,
          altoContraste: false,
          tamanhoFonte: 'medio',
          modoTextoGrande: false
        },
        notificacoes: { push: true, email: true }
      },
      perfilPublico: true,
      reputacao: 0,
      criadoEm: new Date().toISOString(),
      ultimoLogin: new Date().toISOString()
    };
    
    usuarios.push(novoUsuario);
    
    // Salvar senha hash (simulado - em produção usar bcrypt)
    const senhaHash = btoa(usuarioData.senha); // Base64 simples - apenas para demo
    localStorage.setItem(`user_${novoUsuario.id}_password`, senhaHash);
    
    // Salvar usuários
    const data = await this.loadJSON('usuarios');
    if (data) {
      data.usuarios = usuarios;
      this.saveJSON('usuarios', data);
    }
    
    // Criar status inicial
    await this.initializeUserStatus(novoUsuario.id);
    
    return novoUsuario;
  },
  
  // Autenticação
  async authenticate(username, password) {
    const usuarios = await this.getUsuarios();
    
    // Verificar usuário admin padrão
    if (username === 'admin' && password === 'admin') {
      // Criar ou retornar usuário admin
      let admin = usuarios.find(u => u.email === 'admin@gamepray.com' || u.uid === 'admin');
      if (!admin) {
        admin = await this.createUsuario({
          nome: 'Admin',
          email: 'admin@gamepray.com',
          senha: 'admin'
        });
        admin.uid = 'admin';
      }
      return admin;
    }
    
    // Buscar por email ou nome
    const usuario = usuarios.find(u => 
      u.email === username || 
      u.nome.toLowerCase() === username.toLowerCase() ||
      u.uid === username
    );
    
    if (!usuario) {
      return null;
    }
    
    // Verificar senha
    const storedHash = localStorage.getItem(`user_${usuario.id}_password`);
    if (storedHash) {
      const inputHash = btoa(password);
      if (storedHash === inputHash) {
        return usuario;
      }
    }
    
    return null;
  },
  
  // Status do jogador
  async getUserStatus(userId) {
    // Buscar status do usuário no localStorage primeiro
    const storedStatus = localStorage.getItem(`gamepray_status_${userId}`);
    if (storedStatus) {
      try {
        return JSON.parse(storedStatus);
      } catch (e) {
        console.error('Erro ao parsear status:', e);
      }
    }
    
    // Se não existe, criar novo baseado no template
    return await this.initializeUserStatus(userId);
  },
  
  async initializeUserStatus(userId) {
    const template = await this.loadJSON('status_player_base');
    if (!template) {
      // Criar status padrão se não houver template
      return {
        userID: userId,
        atributos: {
          nivel: 1,
          xp: 0,
          xpProximoNivel: 100,
          atributosPrincipais: {
            fe: 0,
            sabedoria: 0,
            espiritoSanto: 100
          },
          frutosEspirito: {
            amor: 0,
            alegria: 0,
            paz: 0,
            paciencia: 0,
            bondade: 0,
            benignidade: 0,
            fidelidade: 0,
            mansidao: 0,
            dominioProprio: 0
          },
          obrasCarneAgrupadas: {
            imoralidadeImpureza: 0,
            idolatriaFeiticaria: 0,
            inimizadeOdio: 0,
            ciumesInveja: 0,
            ira: 0,
            dissensaoFaccao: 0,
            orgiasBebedices: 0,
            ambicaoEgoista: 0,
            orgulhoEgoismo: 0
          }
        },
        sistemaProgresso: {
          tentativasEstudo: {
            atual: 5,
            maximo: 5,
            proximaRecarga: null,
            ultimoUso: null
          },
          sequenciaAtual: 0,
          melhorSequencia: 0
        },
        hudStatus: {
          moeda: 100,
          salvo: false,
          emPecado: false,
          emEspirito: false
        },
        estatisticas: {
          missoesCompletas: 0,
          missoesFalhas: 0,
          quizAcertos: 0,
          quizErros: 0,
          diasConsecutivos: 0,
          conquistasDesbloqueadas: 0
        }
      };
    }
    
    const status = JSON.parse(JSON.stringify(template));
    status.userID = userId;
    
    // Garantir que hudStatus tenha moeda inicial
    if (!status.hudStatus) {
      status.hudStatus = { moeda: 100 };
    } else if (status.hudStatus.moeda === undefined) {
      status.hudStatus.moeda = 100;
    }
    
    // Salvar no localStorage
    localStorage.setItem(`gamepray_status_${userId}`, JSON.stringify(status));
    
    return status;
  },
  
  async updateUserStatus(userId, updates) {
    const status = await this.getUserStatus(userId);
    if (!status) return null;
    
    // Merge updates
    Object.assign(status, updates);
    status.updated_at = new Date().toISOString();
    
    // Salvar
    this.saveJSON(`status_${userId}`, status);
    localStorage.setItem(`gamepray_status_${userId}`, JSON.stringify(status));
    
    return status;
  },
  
  // Dados do usuário
  getUserData(userId) {
    return this.loadFromStorage(`user_${userId}`) || null;
  },
  
  // Missões
  async getMissoes() {
    const data = await this.loadJSON('missoes');
    return data?.missoes || [];
  },
  
  async getMissoesAtivas(userId) {
    const usuario = await this.getUsuario(userId);
    if (!usuario) return [];
    
    // Retornar as missões ativas do usuário diretamente
    return usuario.missoesAtivas || [];
  },
  
  // Itens
  async getItens() {
    const data = await this.loadJSON('itens');
    return data?.itens || [];
  },
  
  async getItem(itemId) {
    const itens = await this.getItens();
    return itens.find(i => i.id === itemId);
  },
  
  // Conquistas
  async getConquistas() {
    const data = await this.loadJSON('conquistas');
    if (!data) return [];
    // Filtrar apenas conquistas válidas (com id)
    const conquistas = data.conquistas || [];
    return conquistas.filter(c => c && c.id);
  },
  
  // Estudos
  async getEstudos() {
    const data = await this.loadJSON('estudos');
    if (!data) return [];
    // Retornar apenas estudos, não módulos
    return data.estudos || [];
  },
  
  // Loja
  async getLojaItems() {
    const data = await this.loadJSON('loja');
    return data?.loja || [];
  },
  
  // Config global
  async getConfig() {
    return await this.loadJSON('config_global');
  },
  
  // Current user
  getCurrentUser() {
    const stored = localStorage.getItem('gamepray_current_user');
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  },
  
  setCurrentUser(user) {
    localStorage.setItem('gamepray_current_user', JSON.stringify(user));
  },
  
  logout() {
    localStorage.removeItem('gamepray_current_user');
  },
  
  // Inicializar usuário demo
  async initializeDemoUser(userId) {
    await this.initializeUserStatus(userId);
  }
};

