import { fetchJSON } from "./utils.js";

const SHOP_FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "consumiveis", label: "Consumíveis" },
  { id: "recursos", label: "Recursos" },
  { id: "cosmeticos", label: "Cosméticos" },
  { id: "bundles", label: "Pacotes" },
  { id: "avatar", label: "Avatar" },
];

const SHOP_BLOCK_RULES = [
  {
    key: "ambicaoEgoista",
    threshold: 80,
    match: (item) => item.categoriaLoja === "bundles",
    message:
      "Ambição/Egoísmo elevado impede comprar pacotes especiais. Equilibre seus status.",
  },
  {
    key: "orgulhoEgoismo",
    threshold: 75,
    match: (item) => item.categoriaLoja === "cosmeticos" || item.categoriaLoja === "avatar",
    message: "Orgulho/Egoísmo elevado bloqueia itens cosméticos temporariamente.",
  },
];

function decorateOffer(offer, works = {}) {
  const blockRule = SHOP_BLOCK_RULES.find(
    (rule) =>
      rule.match(offer) && (works[rule.key] ?? 0) >= (rule.threshold ?? 0)
  );
  return {
    ...offer,
    blocked: Boolean(blockRule),
    blockMessage: blockRule?.message ?? null,
  };
}

window.lojaStore = function lojaStore() {
  return {
    loading: true,
    offers: [],
    filters: SHOP_FILTERS,
    activeFilter: SHOP_FILTERS[0].id,
    selectedOffer: null,
    status: null,
    bannerMessage: null,

    async init() {
      console.log('[Loja] init() chamado');
      try {
        await this.load();
        console.log('[Loja] Dados carregados:', {
          offers: this.offers?.length ?? 0,
          status: !!this.status,
          banner: !!this.bannerMessage
        });
      } catch (error) {
        console.error('[Loja] ERRO no init:', error);
      }
    },

    async load() {
      console.log('[Loja] load() iniciado');
      this.loading = true;
      try {
        const [status, loja] = await Promise.all([
          fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json")),
          fetchJSON("dados/loja.json").catch(() => fetchJSON("loja.json")),
        ]);
        
        console.log('[Loja] Dados recebidos:', {
          status: !!status,
          loja: loja?.loja?.length ?? loja?.length ?? 0
        });
        
        this.status = status;
        const works = status?.atributos?.obrasCarneAgrupadas ?? {};
        const offers = loja?.loja ?? loja ?? [];
        
        console.log('[Loja] Processando ofertas:', offers.length);
        
        this.offers = offers.map((offer) => decorateOffer(offer, works));
        this.bannerMessage = this.offers.some((offer) => offer.blocked)
          ? "Algumas ofertas estão bloqueadas pelo seu status atual."
          : null;
        
        console.log('[Loja] Ofertas processadas:', {
          total: this.offers.length,
          blocked: this.offers.filter(o => o.blocked).length
        });
      } catch (error) {
        console.error("[Loja] Falha ao carregar dados", error);
        console.error("[Loja] Stack trace:", error.stack);
      } finally {
        this.loading = false;
        console.log('[Loja] load() finalizado, loading =', this.loading);
      }
    },

    setFilter(id) {
      this.activeFilter = id;
    },

    get filteredOffers() {
      if (!this.offers || this.offers.length === 0) {
        console.log('[Loja] filteredOffers: offers vazio');
        return [];
      }
      
      if (this.activeFilter === "todos") {
        console.log('[Loja] filteredOffers: todos, retornando', this.offers.length);
        return this.offers;
      }
      
      const filtered = this.offers.filter(
        (offer) => offer.categoriaLoja === this.activeFilter
      );
      
      console.log('[Loja] filteredOffers:', {
        total: this.offers.length,
        filter: this.activeFilter,
        filtered: filtered.length
      });
      
      return filtered;
    },

    openModal(offer) {
      this.selectedOffer = offer;
      document.body.classList.add("modal-open");
    },

    closeModal() {
      this.selectedOffer = null;
      document.body.classList.remove("modal-open");
    },

    purchase(offer) {
      if (offer.blocked) {
        alert(offer.blockMessage);
        return;
      }
      if ((this.status?.recursos?.moedas ?? 0) < (offer.preco?.moeda ?? 0)) {
        alert("Moedas insuficientes para comprar esta oferta.");
        return;
      }
      alert(`Compra simulada: ${offer.nome}. Deduzir ${offer.preco?.moeda} ●.`);
    },
  };
};

