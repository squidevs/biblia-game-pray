// Componentes de autenticação Alpine.js

function loginScreen() {
  return {
    username: '',
    password: '',
    showPassword: false,
    loading: false,
    error: '',
    
    async handleLogin() {
      this.loading = true;
      this.error = '';
      
      try {
        const user = await DataManager.authenticate(this.username, this.password);
        
        if (user) {
          DataManager.setCurrentUser(user);
          await DataManager.initializeUserStatus(user.id);
          await Alpine.store('app').loadUserData(user);
          
          // Verificar se precisa mostrar tutorial
          if (!TutorialSystem.verificarTutorialConcluido(user.id)) {
            // Mostrar tutorial após um breve delay
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('abrir-tutorial'));
            }, 500);
          }
          
          Alpine.store('app').currentScreen = 'home';
          Utils.showToast('Login realizado com sucesso!', 'success');
          Utils.playSound('success');
        } else {
          this.error = 'Usuário ou senha incorretos';
          Utils.playSound('fail');
        }
      } catch (error) {
        this.error = 'Erro ao fazer login. Tente novamente.';
        console.error('Erro no login:', error);
      } finally {
        this.loading = false;
      }
    },
    
    handleForgotPassword() {
      Utils.showToast('Funcionalidade em desenvolvimento', 'info');
    }
  };
}

function registerScreen() {
  return {
    form: {
      nome: '',
      email: '',
      senha: '',
      senhaConfirm: ''
    },
    showPassword: false,
    showPasswordConfirm: false,
    loading: false,
    error: '',
    success: '',
    
    async handleRegister() {
      this.loading = true;
      this.error = '';
      this.success = '';
      
      // Validações
      if (this.form.senha !== this.form.senhaConfirm) {
        this.error = 'As senhas não coincidem';
        this.loading = false;
        Utils.playSound('fail');
        return;
      }
      
      if (this.form.senha.length < 6) {
        this.error = 'A senha deve ter pelo menos 6 caracteres';
        this.loading = false;
        Utils.playSound('fail');
        return;
      }
      
      try {
        // Verificar se email já existe
        const usuarios = await DataManager.getUsuarios();
        const emailExists = usuarios.some(u => u.email === this.form.email);
        
        if (emailExists) {
          this.error = 'Este email já está cadastrado';
          this.loading = false;
          Utils.playSound('fail');
          return;
        }
        
        // Criar usuário
        const novoUsuario = await DataManager.createUsuario({
          nome: this.form.nome,
          email: this.form.email,
          senha: this.form.senha
        });
        
        if (novoUsuario) {
          this.success = 'Conta criada com sucesso! Redirecionando...';
          Utils.playSound('success');
          
          // Auto-login e mostrar tutorial
          setTimeout(async () => {
            DataManager.setCurrentUser(novoUsuario);
            await Alpine.store('app').loadUserData(novoUsuario);
            
            // Sempre mostrar tutorial para novo usuário
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('abrir-tutorial'));
            }, 500);
            
            Alpine.store('app').currentScreen = 'home';
            Utils.showToast('Bem-vindo ao Bíblia GamePray!', 'success');
          }, 1500);
        } else {
          this.error = 'Erro ao criar conta. Tente novamente.';
          Utils.playSound('fail');
        }
      } catch (error) {
        this.error = 'Erro ao criar conta. Tente novamente.';
        console.error('Erro no registro:', error);
        Utils.playSound('fail');
      } finally {
        this.loading = false;
      }
    }
  };
}

