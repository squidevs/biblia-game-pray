// Componente Splash Screen
function splashScreen() {
  return {
    show: true,
    logoLoaded: false,
    showSkip: false,
    audioPlayed: false,
    
    async init() {
      // Verificar se já passou pelo splash antes
      const jaViuSplash = localStorage.getItem('gamepray_splash_visto');
      if (jaViuSplash) {
        // Pular splash se já viu antes
        setTimeout(() => {
          this.irParaLogin();
        }, 500);
        return;
      }
      
      // Mostrar botão pular após 1 segundo
      setTimeout(() => {
        this.showSkip = true;
      }, 1000);
      
      // Tocar som de intro
      this.tocarIntro();
      
      // Auto-redirecionar após 3-4 segundos
      setTimeout(() => {
        if (this.show) {
          this.irParaLogin();
        }
      }, 3500);
    },
    
    async tocarIntro() {
      if (this.audioPlayed) return;
      
      try {
        // Verificar preferências de som
        const config = await DataManager.getConfig();
        const somAtivo = config?.config_global?.preferencias?.som !== false;
        
        if (somAtivo) {
          const audio = new Audio('assets/sounds/intro.wav');
          audio.volume = 0.6;
          
          // Aguardar interação do usuário antes de tocar (requisito do navegador)
          audio.addEventListener('canplaythrough', () => {
            audio.play().catch(err => {
              // Se falhar, tentar após interação
              document.addEventListener('click', () => {
                audio.play().catch(() => {});
              }, { once: true });
            });
          });
          
          audio.addEventListener('error', (e) => {
            console.warn('Erro ao carregar intro.wav:', e);
            // Tentar fallback
            const fallback = new Audio('assets/sounds/confirm.wav');
            fallback.volume = 0.4;
            fallback.play().catch(() => {});
          });
          
          this.audioPlayed = true;
        }
      } catch (error) {
        console.log('Erro ao carregar som:', error);
      }
    },
    
    pular() {
      this.irParaLogin();
    },
    
    irParaLogin() {
      this.show = false;
      localStorage.setItem('gamepray_splash_visto', 'true');
      
      // Verificar se há usuário logado
      const currentUser = DataManager.getCurrentUser();
      if (currentUser) {
        Alpine.store('app').currentScreen = 'home';
        Alpine.store('app').loadUserData(currentUser);
      } else {
        Alpine.store('app').currentScreen = 'login';
      }
    }
  };
}

