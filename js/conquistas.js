import { fetchJSON } from "./utils.js";

const ACHIEVEMENT_FILTERS = [
  { id: "todas", label: "Todas" },
  { id: "desbloqueadas", label: "Desbloqueadas" },
  { id: "em-progresso", label: "Em progresso" },
  { id: "ocultas", label: "Ocultas" },
];

function decorateAchievement(achievement) {
  const desbloqueada = Boolean(
    achievement.status?.desbloqueada ?? achievement.desbloqueada
  );
  const progresso = achievement.status?.progresso ?? 0;
  const status = desbloqueada
    ? "desbloqueada"
    : progresso > 0
    ? "em-progresso"
    : "oculta";
  return {
    ...achievement,
    status,
    progresso,
  };
}

window.conquistasStore = function conquistasStore() {
  return {
    loading: true,
    conquistas: [],
    filters: ACHIEVEMENT_FILTERS,
    activeFilter: "todas",
    selected: null,

    async init() {
      console.log('[Conquistas] init() chamado');
      try {
        await this.load();
        console.log('[Conquistas] Dados carregados:', {
          conquistas: this.conquistas?.length ?? 0
        });
      } catch (error) {
        console.error('[Conquistas] ERRO no init:', error);
      }
    },

    async load() {
      console.log('[Conquistas] load() iniciado');
      this.loading = true;
      try {
        const conquistas = await fetchJSON("dados/conquistas.json").catch(() => fetchJSON("conquistas.json"));
        
        console.log('[Conquistas] Dados recebidos:', {
          conquistas: conquistas?.conquistas?.length ?? conquistas?.length ?? 0
        });
        
        const lista = conquistas?.conquistas ?? conquistas ?? [];
        
        console.log('[Conquistas] Processando conquistas:', lista.length);
        
        this.conquistas = lista.map(decorateAchievement);
        
        console.log('[Conquistas] Conquistas processadas:', this.conquistas.length);
      } catch (error) {
        console.error("[Conquistas] Falha ao carregar dados", error);
        console.error("[Conquistas] Stack trace:", error.stack);
      } finally {
        this.loading = false;
        console.log('[Conquistas] load() finalizado, loading =', this.loading);
      }
    },

    setFilter(id) {
      this.activeFilter = id;
    },

    get filteredConquistas() {
      if (!this.conquistas || this.conquistas.length === 0) {
        console.log('[Conquistas] filteredConquistas: conquistas vazio');
        return [];
      }
      
      let filtered;
      if (this.activeFilter === "todas") {
        filtered = this.conquistas;
      } else if (this.activeFilter === "desbloqueadas") {
        filtered = this.conquistas.filter((item) => item.status === "desbloqueada");
      } else if (this.activeFilter === "em-progresso") {
        filtered = this.conquistas.filter((item) => item.status === "em-progresso");
      } else {
        filtered = this.conquistas.filter((item) => item.status === "oculta");
      }
      
      console.log('[Conquistas] filteredConquistas:', {
        total: this.conquistas.length,
        filter: this.activeFilter,
        filtered: filtered.length
      });
      
      return filtered;
    },

    openModal(conquista) {
      this.selected = conquista;
      document.body.classList.add("modal-open");
    },

    closeModal() {
      this.selected = null;
      document.body.classList.remove("modal-open");
    },
  };
};

