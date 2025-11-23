import { fetchJSON } from "./utils.js";

const INV_FILTERS = [
  { id: "permanente", label: "Permanente" },
  { id: "consumivel", label: "Consumível" },
  { id: "armadura", label: "Armadura" },
];

const ITEM_BLOCK_RULES = [
  {
    key: "ambicaoEgoista",
    threshold: 75,
    match: (item) => item.tipo === "permanente" || item.tipo === "armadura",
    message: "Ambição/Egoísmo elevado bloqueia itens permanentes/armaduras.",
  },
  {
    key: "orgulhoEgoismo",
    threshold: 75,
    match: (item) => item.tipo === "consumivel",
    message: "Orgulho/Egoísmo elevado bloqueia consumíveis estratégicos.",
  },
];

function evaluateInventoryItem(entry, catalog, works = {}) {
  const meta =
    catalog.find((item) => item.id === entry.itemId) ?? {
      id: entry.itemId,
      nome: "Item desconhecido",
      tipo: "permanente",
      descricao: "Não localizado em itens.json",
    };
  const blockRule = ITEM_BLOCK_RULES.find(
    (rule) =>
      rule.match(meta) && (works[rule.key] ?? 0) >= (rule.threshold ?? 0)
  );
  return {
    ...meta,
    quantidade: entry.quantidade ?? 0,
    blocked: Boolean(blockRule),
    blockMessage: blockRule?.message ?? null,
  };
}

window.inventoryStore = function inventoryStore() {
  return {
    loading: true,
    items: [],
    status: null,
    users: [],
    filters: INV_FILTERS,
    activeFilter: INV_FILTERS[0].id,
    selectedItem: null,
    bannerMessage: null,

    async init() {
      console.log('[Inventário] init() chamado');
      try {
        await this.load();
        console.log('[Inventário] Dados carregados:', {
          items: this.items?.length ?? 0,
          status: !!this.status,
          banner: !!this.bannerMessage
        });
      } catch (error) {
        console.error('[Inventário] ERRO no init:', error);
      }
    },

    async load() {
      console.log('[Inventário] load() iniciado');
      this.loading = true;
      try {
        const [status, usuarios, itens] = await Promise.all([
          fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json")),
          fetchJSON("dados/usuarios.json").catch(() => fetchJSON("usuarios.json")),
          fetchJSON("dados/itens.json").catch(() => fetchJSON("itens.json")),
        ]);
        
        console.log('[Inventário] Dados recebidos:', {
          status: !!status,
          usuarios: usuarios?.usuarios?.length ?? 0,
          itens: itens?.itens?.length ?? 0
        });
        
        this.status = status;
        this.users = usuarios?.usuarios ?? [];
        const works = status?.atributos?.obrasCarneAgrupadas ?? {};
        const activeInventory = this.users?.[0]?.inventario ?? [];
        const catalog = itens?.itens ?? [];
        
        console.log('[Inventário] Processando inventário:', {
          inventory: activeInventory.length,
          catalog: catalog.length
        });
        
        this.items = activeInventory.map((entry) =>
          evaluateInventoryItem(entry, catalog, works)
        );

        const anyBlocked = this.items.some((item) => item.blocked);
        this.bannerMessage = anyBlocked
          ? "Alguns itens estão bloqueados devido ao seu status. Considere uma ação de confissão para liberar."
          : null;
        
        console.log('[Inventário] Itens processados:', {
          total: this.items.length,
          blocked: this.items.filter(i => i.blocked).length
        });
      } catch (error) {
        console.error("[Inventário] Falha ao carregar dados", error);
        console.error("[Inventário] Stack trace:", error.stack);
      } finally {
        this.loading = false;
        console.log('[Inventário] load() finalizado, loading =', this.loading);
      }
    },

    setFilter(id) {
      this.activeFilter = id;
    },

    get filteredItems() {
      if (!this.items || this.items.length === 0) {
        console.log('[Inventário] filteredItems: items vazio');
        return [];
      }
      
      const filtered = this.items.filter((item) => {
        if (this.activeFilter === "permanente") return item.tipo === "permanente";
        if (this.activeFilter === "consumivel") return item.tipo === "consumivel";
        if (this.activeFilter === "armadura") return item.tipo === "armadura";
        return true;
      });
      
      console.log('[Inventário] filteredItems:', {
        total: this.items.length,
        filter: this.activeFilter,
        filtered: filtered.length
      });
      
      return filtered;
    },

    openModal(item) {
      this.selectedItem = item;
      document.body.classList.add("modal-open");
    },

    closeModal() {
      this.selectedItem = null;
      document.body.classList.remove("modal-open");
    },
  };
};

