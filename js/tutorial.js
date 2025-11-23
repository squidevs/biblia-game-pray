/**
 * Tutorial de Primeiro Acesso
 * Carousel com 7 passos de onboarding
 */

const TUTORIAL_STEPS = [
  {
    id: 1,
    title: "Bem-vindo ao Bíblia GamePray!",
    description: "Uma jornada gamificada de crescimento espiritual. Aprenda orando, lendo a Bíblia e completando missões.",
    icon: "church",
    image: "assets/tutorial/step1.png"
  },
  {
    id: 2,
    title: "HUD - Seu Painel Espiritual",
    description: "Acompanhe seu XP, Espírito Santo, recursos (moedas, corações, chaves) e itens equipados diretamente no topo.",
    icon: "dashboard",
    image: "assets/tutorial/step2.png"
  },
  {
    id: 3,
    title: "Missões - Sua Jornada Diária",
    description: "Complete missões diárias, semanais e especiais para ganhar XP, moedas e itens. Envie evidências e acompanhe seu progresso!",
    icon: "map",
    image: "assets/tutorial/step3.png"
  },
  {
    id: 4,
    title: "Estudos - Leia e Aprenda",
    description: "Estude a Bíblia por livros e capítulos. Cada ciclo inclui leitura, reflexão, quiz e oração guiada.",
    icon: "menu_book",
    image: "assets/tutorial/step4.png"
  },
  {
    id: 5,
    title: "Frutos do Espírito & Obras da Carne",
    description: "Seus atributos espirituais evoluem conforme suas ações. Mantenha frutos altos e obras baixas para liberar funções!",
    icon: "favorite",
    image: "assets/tutorial/step5.png"
  },
  {
    id: 6,
    title: "Inventário & Loja",
    description: "Colete itens, equipamentos e consumíveis. Use moedas da fé para adquirir buffs, armaduras e cosméticos.",
    icon: "backpack",
    image: "assets/tutorial/step6.png"
  },
  {
    id: 7,
    title: "Pronto para Começar!",
    description: "Você está preparado(a) para iniciar sua jornada. Explore, cresça e compartilhe com a comunidade!",
    icon: "rocket_launch",
    image: "assets/tutorial/step7.png"
  }
];

window.tutorialStore = function tutorialStore() {
  return {
    currentStep: 1,
    totalSteps: TUTORIAL_STEPS.length,
    steps: TUTORIAL_STEPS,

    init() {
      // Não redireciona aqui - deixa o globais.js gerenciar
      // Apenas inicializa o estado do tutorial
      console.log('[Tutorial] Inicializado, step:', this.currentStep);
      console.log('[Tutorial] Store disponível:', typeof this.nextStep === 'function');
      
      // Testa se os métodos estão acessíveis
      if (typeof this.nextStep !== 'function') {
        console.error('[Tutorial] ERRO: nextStep não é uma função!');
      }
    },

    get currentStepData() {
      return this.steps.find((s) => s.id === this.currentStep) || this.steps[0];
    },

    get progress() {
      return Math.round((this.currentStep / this.totalSteps) * 100);
    },

    get isFirstStep() {
      return this.currentStep === 1;
    },

    get isLastStep() {
      return this.currentStep === this.totalSteps;
    },

    nextStep() {
      console.log('[Tutorial] nextStep chamado', { current: this.currentStep, total: this.totalSteps });
      console.log('[Tutorial] this:', this);
      try {
        if (this.currentStep < this.totalSteps) {
          this.currentStep++;
          console.log('[Tutorial] Avançou para step', this.currentStep);
        } else {
          console.log('[Tutorial] Último step, completando...');
          this.complete();
        }
      } catch (error) {
        console.error('[Tutorial] ERRO em nextStep:', error);
      }
    },

    prevStep() {
      console.log('[Tutorial] prevStep chamado', { current: this.currentStep });
      try {
        if (this.currentStep > 1) {
          this.currentStep--;
          console.log('[Tutorial] Voltou para step', this.currentStep);
        }
      } catch (error) {
        console.error('[Tutorial] ERRO em prevStep:', error);
      }
    },

    skip() {
      console.log('[Tutorial] skip chamado');
      try {
        this.complete();
      } catch (error) {
        console.error('[Tutorial] ERRO em skip:', error);
        // Fallback: redireciona diretamente
        localStorage.setItem("hasCompletedTutorial", "true");
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        window.location.hash = isLoggedIn ? "#inicio" : "#login";
      }
    },

    complete() {
      console.log('[Tutorial] complete chamado');
      localStorage.setItem("hasCompletedTutorial", "true");
      // Após tutorial, vai para login (não logado) ou início (logado)
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      console.log('[Tutorial] Redirecionando para:', isLoggedIn ? "#inicio" : "#login");
      window.location.hash = isLoggedIn ? "#inicio" : "#login";
    }
  };
};

