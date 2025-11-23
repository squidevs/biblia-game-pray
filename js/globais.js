import { fetchJSON, loadGlobalConfig } from "./utils.js";

const APP_VERSION = "0.2.0";
const SW_PATH = "service-worker.js";
const DEFAULT_SCREEN = "inicio";

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.info("[BGP] Service worker não suportado");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register(SW_PATH);
    console.info("[BGP] SW registrado:", registration.scope);
  } catch (error) {
    console.error("[BGP] Erro ao registrar SW", error);
  }
}

async function preloadCoreData() {
  try {
    await Promise.all([
      loadGlobalConfig(),
      fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json")),
    ]);
    console.info("[BGP] Dados principais carregados");
  } catch (error) {
    console.warn("[BGP] Falha ao pré-carregar dados", error);
  }
}

function initDrawer() {
  const drawer = document.querySelector("[data-drawer]");
  if (!drawer) {
    return { close: () => undefined };
  }

  drawer.setAttribute("data-state", "closed");
  drawer.setAttribute("aria-hidden", "true");

  const overlay = drawer.querySelector(".drawer__overlay");
  const panel = drawer.querySelector(".drawer__panel");
  panel?.setAttribute("tabindex", "-1");

  const openers = document.querySelectorAll("[data-drawer-open]");
  const closers = drawer.querySelectorAll("[data-drawer-close]");
  let lastFocusedElement = null;

  const closeDrawer = () => {
    drawer.setAttribute("data-state", "closed");
    drawer.setAttribute("aria-hidden", "true");
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  const openDrawer = () => {
    lastFocusedElement = document.activeElement;
    drawer.setAttribute("data-state", "open");
    drawer.setAttribute("aria-hidden", "false");
    panel?.focus();
  };

  openers.forEach((btn) => btn.addEventListener("click", openDrawer));
  closers.forEach((btn) => btn.addEventListener("click", closeDrawer));
  overlay?.addEventListener("click", closeDrawer);
  drawer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDrawer();
    }
  });

  return { close: closeDrawer };
}

function updateHashSegment(value) {
  try {
    history.replaceState(null, "", `#${value}`);
  } catch {
    window.location.hash = `#${value}`;
  }
}

function initNavigation(drawerApi = { close: () => undefined }) {
  const sections = Array.from(document.querySelectorAll("[data-screen]"));
  if (!sections.length) return;

  const screenMap = new Map();
  sections.forEach((section) => {
    const id = section.dataset.screen;
    if (!id) return;
    section.setAttribute("tabindex", "-1");
    screenMap.set(id, section);
  });

  const navButtons = Array.from(
    document.querySelectorAll("[data-screen-target]")
  );
  let currentScreen = null;

  const setScreen = (target, options = {}) => {
    console.log('[Navigation] setScreen chamado:', target, options);
    if (!target || !screenMap.has(target)) {
      console.warn('[Navigation] Target não encontrado:', target);
      return;
    }
    if (currentScreen === target && !options.force) {
      console.log('[Navigation] Já está na tela:', target);
      return;
    }

    screenMap.forEach((section, key) => {
      const isActive = key === target;
      section.classList.toggle("screen--active", isActive);
      
      // Telas fullscreen (splash, login, tutorial) usam display ao invés de hidden
      if (section.classList.contains("screen--fullscreen")) {
        if (isActive) {
          // Tutorial precisa de flex, login precisa de flex também
          if (section.classList.contains("tutorial-screen") || section.id === "screen-login") {
            section.style.display = "flex";
          } else {
            section.style.display = "block";
          }
          section.setAttribute("aria-hidden", "false");
        } else {
          section.style.display = "none";
          section.setAttribute("aria-hidden", "true");
        }
      } else {
        section.toggleAttribute("hidden", !isActive);
        section.setAttribute("aria-hidden", String(!isActive));
      }

      // Força inicialização do store quando a tela se torna ativa
      if (isActive && section.hasAttribute('x-data')) {
        // Aguarda Alpine.js estar pronto e força re-inicialização se necessário
        setTimeout(() => {
          if (window.Alpine && section.__x) {
            // Alpine já inicializou, mas força atualização
            const storeName = section.getAttribute('x-data');
            if (storeName && typeof window[storeName.replace('()', '')] === 'function') {
              console.log('[Navigation] Forçando atualização do store:', storeName);
              // Dispara evento para que o store recarregue dados se necessário
              section.dispatchEvent(new CustomEvent('screen-activated'));
            }
          }
        }, 100);
      }

      if (isActive && options.focus !== false) {
        requestAnimationFrame(() => section.focus());
      }
    });

    navButtons.forEach((btn) => {
      const matches = btn.dataset.screenTarget === target;
      btn.classList.toggle("app-navbar__item--active", matches);
      if (btn.getAttribute("role") === "tab") {
        btn.setAttribute("aria-selected", String(matches));
      }
    });

    currentScreen = target;
    if (!options.skipHash) {
      updateHashSegment(target);
    }
    
    console.log('[Navigation] Tela alterada para:', target);
  };
  
  // Torna setScreen global para fallback
  window.setScreen = setScreen;
  
  navButtons.forEach((btn) => {
    const target = btn.dataset.screenTarget;
    if (!target) return;
    
    // Event listener principal
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log('[Navigation] Botão clicado:', target);
      setScreen(target, { focus: true });
      if (btn.closest(".drawer__panel")) {
        drawerApi.close();
      }
    });
    
    // Fallback onclick caso event listener não funcione
    btn.setAttribute('onclick', `event.preventDefault(); if (window.setScreen) { window.setScreen('${target}', { focus: true }); } else { window.location.hash = '#${target}'; }`);
  });

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");
    console.log('[Navigation] Hash mudou para:', hash);
    if (hash && screenMap.has(hash)) {
      setScreen(hash, { skipHash: true, focus: false });
    } else {
      console.warn('[Navigation] Hash não encontrado no screenMap:', hash);
    }
  });
  
  // Determina tela inicial
  const currentHash = window.location.hash.replace("#", "");
  let initialScreen;
  
  if (currentHash && screenMap.has(currentHash)) {
    initialScreen = currentHash;
    console.log('[Navigation] Hash inicial encontrado:', initialScreen);
  } else if (screenMap.has(DEFAULT_SCREEN)) {
    initialScreen = DEFAULT_SCREEN;
    console.log('[Navigation] Usando tela padrão:', initialScreen);
  } else if (sections.length > 0 && sections[0].dataset.screen) {
    initialScreen = sections[0].dataset.screen;
    console.log('[Navigation] Usando primeira tela disponível:', initialScreen);
  } else {
    console.warn('[Navigation] Nenhuma tela inicial encontrada');
    return;
  }

  // Define tela inicial (mas não força se já estiver no hash correto)
  setScreen(initialScreen, { skipHash: true, focus: false, force: true });
}

function wireUi() {
  const scanButton = document.querySelector("[data-action='scan']");
  if (scanButton) {
    scanButton.addEventListener("click", () => {
      alert(
        "Checklist disponível em docs/prompts_execucao.md. Próximo passo: Prompt 3 (HUD)."
      );
    });
  }

  const drawerApi = initDrawer();
  initNavigation(drawerApi);
}

async function bootstrap() {
  window.BGP = {
    version: APP_VERSION,
    fetchJSON,
  };

  // Verificar se precisa mostrar splash/tutorial
  const hasSeenSplash = localStorage.getItem('hasSeenSplash');
  const hasCompletedTutorial = localStorage.getItem('hasCompletedTutorial');
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  console.info('[BGP] Init:', { hasSeenSplash, hasCompletedTutorial, isLoggedIn });

  await Promise.all([registerServiceWorker(), preloadCoreData()]);
  wireUi();
  
  // Inicializa splash screen se necessário
  if (window.splashManager) {
    window.splashManager.init();
  }
  
  // Se não há hash na URL, determinar tela inicial baseado no estado
  // Aguarda um pouco para garantir que Alpine.js e navegação estejam prontos
  setTimeout(() => {
    if (!window.location.hash || window.location.hash === '#') {
      if (!hasSeenSplash) {
        // Primeiro acesso: mostra splash (splash.js gerencia a transição)
        // Não precisa redirecionar, splash já está visível
      } else if (!hasCompletedTutorial) {
        // Viu splash mas não completou tutorial
        window.location.hash = '#tutorial';
      } else if (!isLoggedIn) {
        // Completou tutorial mas não está logado
        window.location.hash = '#login';
      } else {
        // Tudo completo: vai para início
        window.location.hash = '#inicio';
      }
    }
  }, 300);
  
  console.info(`[BGP] v${APP_VERSION} inicializado com sucesso!`);
}

bootstrap();

