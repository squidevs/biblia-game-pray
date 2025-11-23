/**
 * Splash Screen
 * Gerencia a tela de introdução do app com animações e transição para login/tutorial
 */

const SPLASH_DURATION = 3000; // 3 segundos
const SPLASH_KEY = "hasSeenSplash";

window.splashManager = {
  init() {
    const splashEl = document.querySelector("[data-splash]");
    if (!splashEl) return;

    // Verifica se é o primeiro acesso
    const isFirstAccess = !localStorage.getItem(SPLASH_KEY);
    
    // Toca som de intro se disponível e permitido
    this.playIntroSound();

    // Aplica animações
    this.animateLogo();

    // Define duração e próxima tela
    setTimeout(() => {
      this.hideSplash(isFirstAccess);
    }, SPLASH_DURATION);

    // Botão de pular
    const skipBtn = splashEl.querySelector("[data-splash-skip]");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        this.hideSplash(isFirstAccess);
      });
    }
  },

  playIntroSound() {
    try {
      const audio = new Audio("assets/sounds/intro.wav");
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Navegadores bloqueiam autoplay sem interação do usuário
        console.log("[Splash] Autoplay bloqueado pelo navegador");
      });
    } catch (error) {
      console.log("[Splash] Som de intro não disponível");
    }
  },

  animateLogo() {
    const logo = document.querySelector("[data-splash-logo]");
    if (logo) {
      logo.style.opacity = "0";
      logo.style.transform = "scale(0.8)";
      setTimeout(() => {
        logo.style.transition = "all 0.8s ease-out";
        logo.style.opacity = "1";
        logo.style.transform = "scale(1)";
      }, 100);
    }
  },

  hideSplash(isFirstAccess) {
    const splashEl = document.querySelector("[data-splash]");
    if (!splashEl) return;

    splashEl.style.transition = "opacity 0.5s ease-out";
    splashEl.style.opacity = "0";

    setTimeout(() => {
      splashEl.style.display = "none";
      splashEl.setAttribute("data-hidden", "true");
      splashEl.style.pointerEvents = "none";
      splashEl.style.zIndex = "-1";
      
      // Marca como visto
      localStorage.setItem(SPLASH_KEY, Date.now());

      // Redireciona para tutorial ou login
      if (isFirstAccess) {
        window.location.hash = "#tutorial";
      } else {
        window.location.hash = "#login";
      }
    }, 500);
  }
};

// Inicializa ao carregar
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.splashManager.init();
  });
} else {
  window.splashManager.init();
}

