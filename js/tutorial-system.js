// Sistema de Tutorial Interativo

const TutorialSystem = {
  paginas: [
    {
      id: 1,
      titulo: 'Bem-vindo!',
      conteudo: `
        <div class="tutorial-page-content">
          <img src="assets/logotipos/logo/logo.svg" alt="Logo" class="tutorial-logo">
          <h2>Bíblia GamePray</h2>
          <p class="tutorial-subtitle">Jogando e Crescendo no Espírito</p>
          <p class="tutorial-text">Bem-vindo ao app! Aqui você pode gamificar sua jornada espiritual através de missões, estudos bíblicos e conquistas.</p>
        </div>
      `
    },
    {
      id: 2,
      titulo: 'HUD e Status Espiritual',
      conteudo: `
        <div class="tutorial-page-content">
          <h3>Seu Status Espiritual</h3>
          <p class="tutorial-text">A HUD mostra seus atributos espirituais:</p>
          <ul class="tutorial-list">
            <li><strong>Espírito Santo:</strong> Diminui com o tempo, mantenha-o alto!</li>
            <li><strong>Frutos do Espírito:</strong> Atributos positivos que desbloqueiam funcionalidades</li>
            <li><strong>Obras da Carne:</strong> Atributos negativos que podem bloquear ações</li>
          </ul>
          <p class="tutorial-text"><strong>Dica:</strong> Mantenha seus atributos positivos altos para evitar bloqueios!</p>
        </div>
      `
    },
    {
      id: 3,
      titulo: 'Inventário',
      conteudo: `
        <div class="tutorial-page-content">
          <h3>Seus Itens</h3>
          <p class="tutorial-text">No inventário você encontra:</p>
          <ul class="tutorial-list">
            <li><strong>Itens Permanentes:</strong> Equipamentos que dão buffs contínuos</li>
            <li><strong>Consumíveis:</strong> Itens que podem ser usados para restaurar corações, XP, etc</li>
            <li><strong>Armadura:</strong> Peças da Armadura de Deus (Efésios 6)</li>
          </ul>
          <p class="tutorial-text"><strong>Dica:</strong> Alguns itens podem estar bloqueados se seu status espiritual estiver baixo.</p>
        </div>
      `
    },
    {
      id: 4,
      titulo: 'Missões e Estudos',
      conteudo: `
        <div class="tutorial-page-content">
          <h3>Missões e Estudos Bíblicos</h3>
          <p class="tutorial-text">Complete missões para ganhar recompensas:</p>
          <ul class="tutorial-list">
            <li><strong>Missões:</strong> Aceite, registre evidências e ganhe XP e moedas</li>
            <li><strong>Estudos:</strong> Leia capítulos, responda quizzes e desbloqueie novos conteúdos</li>
            <li><strong>Recompensas:</strong> XP, moedas, itens e melhorias nos atributos</li>
          </ul>
          <p class="tutorial-text"><strong>Dica:</strong> Mantenha uma sequência diária para ganhar bônus!</p>
        </div>
      `
    },
    {
      id: 5,
      titulo: 'Ranking e Conquistas',
      conteudo: `
        <div class="tutorial-page-content">
          <h3>Competição e Reconhecimento</h3>
          <p class="tutorial-text">Participe do ranking e desbloqueie conquistas:</p>
          <ul class="tutorial-list">
            <li><strong>Ranking:</strong> Compare seu progresso com outros jogadores</li>
            <li><strong>Conquistas:</strong> Desbloqueie troféus completando objetivos</li>
            <li><strong>Ligas:</strong> Suba de nível conforme seu desempenho</li>
          </ul>
          <p class="tutorial-text"><strong>Dica:</strong> Conquistas dão recompensas especiais!</p>
        </div>
      `
    },
    {
      id: 6,
      titulo: 'Loja e Economia',
      conteudo: `
        <div class="tutorial-page-content">
          <h3>Compre Itens</h3>
          <p class="tutorial-text">Use suas moedas na loja:</p>
          <ul class="tutorial-list">
            <li><strong>Moedas:</strong> Ganhe completando missões e estudos</li>
            <li><strong>Itens:</strong> Compre equipamentos e consumíveis</li>
            <li><strong>Pacotes:</strong> Ofertas especiais com desconto</li>
          </ul>
          <p class="tutorial-text"><strong>Dica:</strong> Alguns itens podem estar bloqueados se seu status estiver baixo.</p>
        </div>
      `
    },
    {
      id: 7,
      titulo: 'Configurações e Recuperação',
      conteudo: `
        <div class="tutorial-page-content">
          <h3>Personalize e Recupere-se</h3>
          <p class="tutorial-text">Ajuste o app às suas necessidades:</p>
          <ul class="tutorial-list">
            <li><strong>Configurações:</strong> Ajuste notificações, som, acessibilidade</li>
            <li><strong>Confissão/Arrependimento:</strong> Recupere seu status espiritual</li>
            <li><strong>Tutorial:</strong> Revise este tutorial a qualquer momento</li>
          </ul>
          <p class="tutorial-text"><strong>Dica:</strong> Use confissão/arrependimento para desbloquear funcionalidades!</p>
        </div>
      `
    }
  ],
  
  verificarTutorialConcluido(userId) {
    return localStorage.getItem(`tutorial_concluido_${userId}`) === 'true';
  },
  
  marcarTutorialConcluido(userId) {
    localStorage.setItem(`tutorial_concluido_${userId}`, 'true');
  },
  
  resetarTutorial(userId) {
    localStorage.removeItem(`tutorial_concluido_${userId}`);
  }
};

window.TutorialSystem = TutorialSystem;

