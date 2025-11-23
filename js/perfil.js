import { fetchJSON } from "./utils.js";

window.perfilStore = function perfilStore() {
  return {
    loading: true,
    usuario: null,
    status: null,
    hasBlock: false,

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
        this.usuario = usuarios?.usuarios?.[0] ?? null;
        this.status = status;
        const works = status?.atributos?.obrasCarneAgrupadas ?? {};
        this.hasBlock = (works.ambicaoEgoista ?? 0) >= 75 || (works.orgulhoEgoismo ?? 0) >= 75;
      } catch (error) {
        console.error("[Perfil] Falha ao carregar dados", error);
      } finally {
        this.loading = false;
      }
    },

    get nome() {
      return this.usuario?.nome ?? "Discípulo(a)";
    },
    get email() {
      return this.usuario?.email ?? "email@exemplo.com";
    },
    get avatar() {
      return this.status?.perfil?.avatar ?? "assets/logotipos/notext-perfil-logo/perfil-colorido.png";
    },
    get nivel() {
      return this.status?.atributos?.nivel ?? 1;
    },
    get xpPercent() {
      const xp = this.status?.atributos?.xp ?? 0;
      const xpNext = this.status?.atributos?.xpProximoNivel ?? 1;
      return Math.min(100, Math.round((xp / xpNext) * 100));
    },
    get reputacao() {
      return this.usuario?.reputacao ?? 0;
    },
    get stats() {
      const estatisticas = this.status?.estatisticas ?? {};
      return [
        { label: "Missões completas", value: estatisticas.missoesCompletas ?? 0, icon: "task_alt" },
        { label: "Dias consecutivos", value: estatisticas.diasConsecutivos ?? 0, icon: "calendar_month" },
        { label: "Conquistas", value: estatisticas.conquistasDesbloqueadas ?? 0, icon: "emoji_events" },
        { label: "Livros estudados", value: estatisticas.livrosEstudados ?? 0, icon: "menu_book" },
      ];
    },
  };
};

