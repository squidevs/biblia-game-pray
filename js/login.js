/**
 * Login & Cadastro
 * Gerencia autenticação, tabs, modo demo e integração com tutorial
 */

window.loginStore = function loginStore() {
  return {
    activeTab: "entrar",
    loading: false,
    error: "",
    showPassword: false,
    formData: {
      email: "",
      password: "",
      nome: "",
      confirmPassword: ""
    },

    init() {
      // Se já estiver logado, redireciona
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn) {
        window.location.hash = "#inicio";
      }
    },

    setTab(tab) {
      this.activeTab = tab;
      this.error = "";
      this.resetForm();
    },

    resetForm() {
      this.formData = {
        email: "",
        password: "",
        nome: "",
        confirmPassword: ""
      };
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    async handleLogin(e) {
      if (e && e.preventDefault) e.preventDefault();
      console.log('[Login] handleLogin chamado');
      this.error = "";
      this.loading = true;

      try {
        // Simulação de login (substituir por API real)
        await this.fakeDelay(1500);

        // Pega valores dos inputs diretamente se formData estiver vazio (fallback)
        let email = (this.formData.email || document.getElementById('login-email')?.value || '').trim();
        let password = (this.formData.password || document.getElementById('login-password')?.value || '').trim();

        console.log('[Login] Dados:', { email, password: password ? '***' : '' });

        // Validação básica
        if (!email || !password) {
          throw new Error("Preencha todos os campos.");
        }

        // Mock: aceita qualquer email/senha válidos
        if (email.includes("@") && password.length >= 6) {
          // Salva token e dados do usuário
          localStorage.setItem("bgp-auth-token", "mock-token-" + Date.now());
          localStorage.setItem("bgp-user-email", email);
          
          // Marca como logado
          localStorage.setItem("isLoggedIn", "true");
          
          // Verifica se já fez tutorial
          const tutorialDone = localStorage.getItem("hasCompletedTutorial");
          
          console.log('[Login] Login bem-sucedido, redirecionando...', { tutorialDone });
          
          if (!tutorialDone) {
            window.location.hash = "#tutorial";
          } else {
            window.location.hash = "#inicio";
          }
        } else {
          throw new Error("Email ou senha inválidos.");
        }
      } catch (error) {
        console.error('[Login] Erro:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async handleSignup(e) {
      if (e && e.preventDefault) e.preventDefault();
      console.log('[Login] handleSignup chamado');
      this.error = "";
      this.loading = true;

      try {
        await this.fakeDelay(1500);

        // Pega valores dos inputs diretamente se formData estiver vazio (fallback)
        let nome = this.formData.nome || document.getElementById('signup-nome')?.value || '';
        let email = this.formData.email || document.getElementById('signup-email')?.value || '';
        let password = this.formData.password || document.getElementById('signup-password')?.value || '';
        let confirmPassword = this.formData.confirmPassword || document.getElementById('signup-confirm')?.value || '';

        console.log('[Login] Dados signup:', { nome, email, password: password ? '***' : '', confirmPassword: confirmPassword ? '***' : '' });

        // Validações
        if (!nome || !email || !password || !confirmPassword) {
          throw new Error("Preencha todos os campos.");
        }

        if (password !== confirmPassword) {
          throw new Error("As senhas não coincidem.");
        }

        if (password.length < 6) {
          throw new Error("A senha deve ter pelo menos 6 caracteres.");
        }

        if (!email.includes("@")) {
          throw new Error("Email inválido.");
        }

        // Mock: cria conta
        localStorage.setItem("bgp-auth-token", "mock-token-" + Date.now());
        localStorage.setItem("bgp-user-email", email);
        localStorage.setItem("bgp-user-nome", nome);

        // Marca como logado
        localStorage.setItem("isLoggedIn", "true");
        
        console.log('[Login] Conta criada, redirecionando para tutorial...');
        
        // Primeiro acesso sempre vai para tutorial
        window.location.hash = "#tutorial";
      } catch (error) {
        console.error('[Login] Erro signup:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    handleDemo() {
      console.log('[Login] handleDemo chamado');
      // Modo demo: cria usuário temporário
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isGuest", "true");
      localStorage.setItem("bgp-user-email", "demo@bibliaexplorer.com");
      localStorage.setItem("bgp-user-nome", "Visitante");
      localStorage.setItem("bgp-demo-mode", "true");
      
      // Marca como logado e completa tutorial no modo demo
      localStorage.setItem("hasCompletedTutorial", "true");
      
      console.log('[Login] Demo configurado, redirecionando para inicio...');
      window.location.hash = "#inicio";
    },

    handlePasswordRecovery() {
      alert("Funcionalidade de recuperação de senha será implementada em breve. Por favor, entre em contato com o suporte.");
    },

    async handleSocialLogin(provider) {
      this.error = "";
      this.loading = true;

      try {
        await this.fakeDelay(1000);
        alert(`Login com ${provider} será implementado na integração com backend.`);
      } finally {
        this.loading = false;
      }
    },

    fakeDelay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  };
};

