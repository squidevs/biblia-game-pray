import { fetchJSON } from "./utils.js";

window.configuracoesStore = function configuracoesStore() {
  return {
    loading: true,
    settings: {
      notificacoes: { push: true, email: true },
      privacidade: { perfilPublico: true },
      tema: "claro",
      idioma: "pt-BR",
      acessibilidade: {
        tts: true,
        altoContraste: false,
        libras: false,
      },
    },
    blocked: false,
    bannerMessage: null,

    async init() {
      await this.load();
    },

    async load() {
      this.loading = true;
      try {
        const [usuarios, status] = await Promise.all([
          fetchJSON("dados/usuarios.json").catch(() => fetchJSON("usuarios.json")),
          fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json")),
        ]);
        const user = usuarios?.usuarios?.[0];
        if (user?.preferencias) {
          this.settings = {
            ...this.settings,
            ...user.preferencias,
            notificacoes: {
              ...this.settings.notificacoes,
              ...user.preferencias.notificacoes,
            },
            privacidade: {
              ...this.settings.privacidade,
              ...user.preferencias.privacidade,
            },
          };
        }
        const works = status?.atributos?.obrasCarneAgrupadas ?? {};
        this.blocked =
          (works.ambicaoEgoista ?? 0) >= 80 || (works.orgulhoEgoismo ?? 0) >= 75;
        this.bannerMessage = this.blocked
          ? "Algumas configurações estão bloqueadas devido ao seu status. Confessar pode liberar as opções."
          : null;
      } catch (error) {
        console.error("[Configurações] Falha ao carregar dados", error);
      } finally {
        this.loading = false;
      }
    },
  };
};

