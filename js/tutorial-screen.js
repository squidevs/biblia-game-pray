// Tela de Tutorial Interativo
function tutorialScreen() {
  return {
    paginaAtual: 1,
    totalPaginas: 7,
    mostrar: false,
    
    get pagina() {
      return TutorialSystem.paginas.find(p => p.id === this.paginaAtual) || TutorialSystem.paginas[0];
    },
    
    get progresso() {
      return Math.round((this.paginaAtual / this.totalPaginas) * 100);
    },
    
    init() {
      // Escutar evento para abrir tutorial
      window.addEventListener('abrir-tutorial', () => {
        this.mostrar = true;
        this.paginaAtual = 1;
      });
      
      // Verificar se precisa mostrar tutorial no primeiro acesso
      const user = Alpine.store('app').currentUser;
      if (user && !TutorialSystem.verificarTutorialConcluido(user.id)) {
        // Mostrar tutorial após login/cadastro
        setTimeout(() => {
          this.mostrar = true;
        }, 1000);
      }
    },
    
    proximaPagina() {
      if (this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
        Utils.playSound('confirm');
      } else {
        this.finalizar();
      }
    },
    
    paginaAnterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
        Utils.playSound('confirm');
      }
    },
    
    pular() {
      if (confirm('Deseja pular o tutorial? Você pode revê-lo nas configurações.')) {
        this.finalizar();
      }
    },
    
    finalizar() {
      const user = Alpine.store('app').currentUser;
      if (user) {
        TutorialSystem.marcarTutorialConcluido(user.id);
      }
      this.mostrar = false;
      Utils.playSound('success');
      Utils.showToast('Tutorial concluído!', 'success');
    }
  };
}

