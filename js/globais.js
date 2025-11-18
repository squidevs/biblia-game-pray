// Store global do Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    currentScreen: 'splash',
    currentUser: null,
    userData: null,
    statusData: null,
    
    setScreen(screen) {
      this.currentScreen = screen;
    },
    
    async loadUserData(user) {
      this.currentUser = user;
      // Carregar dados do usuário
      this.userData = await DataManager.loadUserData(user.id);
      this.statusData = await DataManager.getUserStatus(user.id);
    },
    
    logout() {
      this.currentUser = null;
      this.userData = null;
      this.statusData = null;
      DataManager.logout();
      this.currentScreen = 'splash';
    }
  });
});

// Utilitários globais
const Utils = {
  // Formatar data
  formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  },
  
  // Formatar moeda
  formatCurrency(amount) {
    return amount.toLocaleString('pt-BR');
  },
  
  // Mostrar toast
  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  },
  
  // Tocar som com fallback e verificação de preferências
  async playSound(soundName) {
    try {
      // Verificar preferências de som
      const config = await DataManager.getConfig();
      const somAtivo = config?.config_global?.preferencias?.som !== false;
      
      if (!somAtivo) {
        return; // Som desativado
      }
      
      // Tentar carregar som
      const audio = new Audio(`assets/sounds/${soundName}.wav`);
      audio.volume = 0.5;
      
      // Verificar se arquivo existe
      audio.addEventListener('error', (e) => {
        console.warn(`Áudio não encontrado: ${soundName}.wav`);
        // Tentar fallback genérico
        if (soundName !== 'confirm') {
          this.playSound('confirm').catch(() => {});
        }
      });
      
      await audio.play();
    } catch (error) {
      console.log('Erro ao tocar som:', error);
      // Silenciosamente falhar se não conseguir tocar
    }
  },
  
  // Debounce
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Event listeners globais
document.addEventListener('show-login', () => {
  Alpine.store('app').currentScreen = 'login';
});

document.addEventListener('show-register', () => {
  Alpine.store('app').currentScreen = 'register';
});

document.addEventListener('show-demo', () => {
  // Criar usuário demo
  const demoUser = {
    id: 'demo-001',
    nome: 'Usuário Demo',
    email: 'demo@gamepray.com',
    sid: 'demo-seed'
  };
  
  DataManager.setCurrentUser(demoUser);
  DataManager.initializeDemoUser(demoUser.id);
  Alpine.store('app').loadUserData(demoUser);
  Alpine.store('app').currentScreen = 'home';
});

