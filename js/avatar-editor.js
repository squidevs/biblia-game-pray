// Editor de Avatar
function modalAvatarEditor() {
  return {
    mostrar: false,
    avatarUrlAtual: '',
    presetSelecionado: null,
    novoSeed: null,
    presets: [],
    
    init() {
      // Escutar evento para abrir modal
      window.addEventListener('abrir-editor-avatar', () => {
        this.mostrar = true;
        this.carregarPresets();
        this.carregarAvatarAtual();
      });
    },
    
    async carregarPresets() {
      try {
        const data = await DataManager.loadJSON('avatar-configs');
        this.presets = data?.avatarConfigs?.presets || [];
      } catch (error) {
        console.error('Erro ao carregar presets:', error);
        this.presets = [];
      }
    },
    
    carregarAvatarAtual() {
      const user = Alpine.store('app').currentUser;
      if (user?.sid) {
        this.avatarUrlAtual = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.sid}`;
      } else {
        this.avatarUrlAtual = 'assets/logotipos/notext-perfil-logo/perfil-colorido.png';
      }
    },
    
    gerarNovoAvatar() {
      // Gerar seed aleatório
      this.novoSeed = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      this.avatarUrlAtual = `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.novoSeed}`;
      this.presetSelecionado = null;
    },
    
    aplicarPreset(preset) {
      this.presetSelecionado = preset;
      if (preset.seed) {
        this.novoSeed = preset.seed;
        this.avatarUrlAtual = `https://api.dicebear.com/7.x/avataaars/svg?seed=${preset.seed}`;
      } else {
        this.gerarNovoAvatar();
      }
    },
    
    getPresetUrl(preset) {
      if (preset.seed) {
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${preset.seed}`;
      }
      return 'assets/logotipos/notext-perfil-logo/perfil-colorido.png';
    },
    
    async salvarAvatar() {
      const user = Alpine.store('app').currentUser;
      if (!user) {
        Utils.showToast('Usuário não encontrado', 'error');
        return;
      }
      
      // Determinar seed a usar
      const seedFinal = this.novoSeed || user.sid || `user-${Date.now()}`;
      
      // Atualizar usuário
      const usuarios = await DataManager.getUsuarios();
      const usuarioIndex = usuarios.findIndex(u => u.id === user.id);
      
      if (usuarioIndex >= 0) {
        usuarios[usuarioIndex].sid = seedFinal;
        
        // Salvar
        const data = await DataManager.loadJSON('usuarios');
        if (data) {
          data.usuarios = usuarios;
          DataManager.saveJSON('usuarios', data);
        }
        
        // Atualizar store
        Alpine.store('app').currentUser = usuarios[usuarioIndex];
        
        Utils.showToast('Avatar atualizado!', 'success');
        Utils.playSound('confirm');
        
        this.fechar();
      }
    },
    
    fechar() {
      this.mostrar = false;
      this.presetSelecionado = null;
      this.novoSeed = null;
    }
  };
}

