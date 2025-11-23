import { fetchJSON } from "./utils.js";

const ARMOR_ORDER = [
  { key: "cintoVerdade", label: "Cinto da Verdade", icon: "deployed_code" },
  { key: "couracaJustica", label: "Couraça da Justiça", icon: "shield" },
  { key: "sandaliasEvangelho", label: "Sandálias do Evangelho", icon: "hiking" },
  { key: "escudoFe", label: "Escudo da Fé", icon: "security" },
  { key: "capaceteSalvacao", label: "Capacete da Salvação", icon: "psychiatry" },
  { key: "espadaEspirito", label: "Espada do Espírito", icon: "swords" }
];

const FRUITS_LABELS = {
  amor: "Amor",
  alegria: "Alegria",
  paz: "Paz",
  paciencia: "Paciência",
  bondade: "Bondade",
  benignidade: "Benignidade",
  fidelidade: "Fidelidade",
  mansidao: "Mansidão",
  dominioProprio: "Domínio próprio"
};

const WORKS_LABELS = {
  imoralidadeImpureza: "Imoralidade/Impureza",
  idolatriaFeiticaria: "Idolatria/Feitiçaria",
  inimizadeOdio: "Inimizade/Ódio",
  ciumesInveja: "Ciúmes/Inveja",
  ira: "Ira",
  dissensaoFaccao: "Dissensão/Fação",
  orgiasBebedices: "Orgias/Bebedices",
  ambicaoEgoista: "Ambição/Egoísmo",
  orgulhoEgoismo: "Orgulho/Egoísmo"
};

const SLOT_LIMIT = 6;
const PLACEHOLDER_AVATAR =
  "assets/logotipos/notext-perfil-logo/perfil-colorido.png";

// Filtra itens equipados do usuário
function getEquippedItems(allItems) {
  return allItems.filter((item) => {
    // Verifica se está equipado de várias formas
    return item.status?.equipado === true || 
           item.equipado === true ||
           (item.status && item.status.equipado !== false && item.status.adquirido === true);
  });
}

function fillSlots(collection, limit = SLOT_LIMIT) {
  const filled = collection.slice(0, limit);
  while (filled.length < limit) {
    filled.push(null);
  }
  return filled;
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(value ?? 0);
}

function abbreviationFromName(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

window.hudStore = function hudStore() {
  return {
    loading: true,
    expanded: false,
    status: null,
    items: [],
    selectedSlot: null,
    async init() {
      console.log('[HUD] init() chamado');
      try {
        await this.loadData();
        console.log('[HUD] Dados carregados:', {
          status: !!this.status,
          items: this.items?.length ?? 0,
          permanentSlots: this.permanentSlots?.filter(s => s).length ?? 0,
          consumableSlots: this.consumableSlots?.filter(s => s).length ?? 0
        });
      } catch (error) {
        console.error('[HUD] ERRO no init:', error);
      }
    },
    formatNumber(num) {
      if (!num) return "0";
      return num.toLocaleString("pt-BR");
    },
    async loadData() {
      console.log('[HUD] loadData() iniciado');
      this.loading = true;
      try {
        const [status, usuarios, itens] = await Promise.all([
          fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json")),
          fetchJSON("dados/usuarios.json").catch(() => fetchJSON("usuarios.json")),
          fetchJSON("dados/itens.json").catch(() => fetchJSON("itens.json"))
        ]);
        
        console.log('[HUD] Dados recebidos:', {
          status: !!status,
          usuarios: usuarios?.usuarios?.length ?? 0,
          itens: itens?.itens?.length ?? 0
        });
        
        this.status = status;
        
        // Mapeia inventário do usuário com catálogo de itens
        const userInventory = usuarios?.usuarios?.[0]?.inventario ?? [];
        const catalog = itens?.itens ?? [];
        
        console.log('[HUD] Inventário do usuário:', userInventory.length, 'itens');
        console.log('[HUD] Catálogo:', catalog.length, 'itens');
        
        // Cria mapa de itens por ID para busca rápida
        const itemsMap = new Map(catalog.map(item => [item.id, item]));
        
        // Mapeia inventário do usuário para itens completos
        const userItems = userInventory.map(entry => {
          const item = itemsMap.get(entry.itemId);
          if (!item) {
            console.warn('[HUD] Item não encontrado no catálogo:', entry.itemId);
            return null;
          }
          
          // Verifica se está equipado (pode estar no item ou no status)
          const isEquipped = item.status?.equipado === true || 
                            status?.atributos?.armaduraEquipada?.includes(item.nome) ||
                            false;
          
          // Corrige caminho da imagem se necessário
          let imagem = item.imagem || null;
          if (imagem && !imagem.startsWith('http') && !imagem.startsWith('/') && !imagem.startsWith('assets')) {
            // Se imagem começa com /imagens, mantém; senão tenta corrigir
            if (imagem.startsWith('imagens')) {
              imagem = '/' + imagem;
            }
          }
          
          return {
            ...item,
            quantidade: entry.quantidade ?? item.status?.quantidade ?? 1,
            imagem: imagem, // Caminho corrigido
            raridade: item.raridade || 'comum', // Garante raridade
            status: {
              ...item.status,
              equipado: isEquipped,
              adquirido: true
            }
          };
        }).filter(Boolean);
        
        this.items = userItems;
        console.log('[HUD] Itens mapeados:', {
          total: this.items.length,
          equipados: this.items.filter(i => i.status?.equipado).length,
          permanentes: this.items.filter(i => i.tipo === 'permanente' && i.status?.equipado).length,
          consumiveis: this.items.filter(i => i.tipo === 'consumivel' && i.status?.equipado).length
        });
      } catch (error) {
        console.error("[HUD] Falha ao carregar dados", error);
        console.error("[HUD] Stack trace:", error.stack);
      } finally {
        this.loading = false;
        console.log('[HUD] loadData() finalizado, loading =', this.loading);
      }
    },
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
    openContext(type, item) {
      if (!item) return;
      this.selectedSlot = { type, item };
    },
    closeContext() {
      this.selectedSlot = null;
    },
    get avatar() {
      return this.status?.perfil?.avatar ?? PLACEHOLDER_AVATAR;
    },
    get userName() {
      return this.status?.perfil?.nome ?? "Discípulo(a)";
    },
    get title() {
      return this.status?.perfil?.titulo ?? "Companheiro(a)";
    },
    get level() {
      return this.status?.atributos?.nivel ?? 1;
    },
    get xpPercent() {
      const xp = this.status?.atributos?.xp ?? 0;
      const xpNext = this.status?.atributos?.xpProximoNivel ?? 100;
      if (!xpNext) return 0;
      return Math.min(100, Math.round((xp / xpNext) * 100));
    },
    get xpLabel() {
      const xp = this.status?.atributos?.xp ?? 0;
      const xpNext = this.status?.atributos?.xpProximoNivel ?? 100;
      return `${xp}/${xpNext} XP`;
    },
    get spirit() {
      return (
        this.status?.atributos?.atributosPrincipais?.espiritoSanto ??
        this.status?.atributos?.espiritoSanto?.valor ??
        0
      );
    },
    get spiritLabel() {
      const value = this.status?.atributos?.espiritoSanto?.valor ?? this.spirit;
      return `${value}%`;
    },
    get coins() {
      return this.status?.recursos?.moedas ?? 0;
    },
    get chaves() {
      return this.status?.recursos?.chaves ?? 0;
    },
    get hearts() {
      return this.status?.recursos?.coracoes ?? 3;
    },
    get heartsMax() {
      return this.status?.recursos?.coracoesMax ?? 5;
    },
    get permanentSlots() {
      // Busca itens permanentes do inventário do usuário
      // Prioriza itens equipados, depois itens com maior quantidade
      const permanentes = this.items.filter(item => item.tipo === "permanente");
      
      // Separa equipados e não equipados
      const equipados = permanentes.filter(item => 
        item.status?.equipado === true || item.equipado === true
      );
      const naoEquipados = permanentes.filter(item => 
        !(item.status?.equipado === true || item.equipado === true)
      );
      
      // Ordena não equipados por quantidade (maior primeiro)
      naoEquipados.sort((a, b) => (b.quantidade ?? 0) - (a.quantidade ?? 0));
      
      // Combina: primeiro os equipados, depois os não equipados
      const todos = [...equipados, ...naoEquipados];
      
      // Preenche slots até 6
      return fillSlots(todos.slice(0, SLOT_LIMIT), SLOT_LIMIT);
    },
    get consumableSlots() {
      // Busca itens consumíveis do inventário (não precisa estar equipado, apenas ter quantidade)
      const consumables = this.items.filter(item => 
        item.tipo === "consumivel" && 
        (item.quantidade ?? 0) > 0
      );
      // Ordena por quantidade (maior primeiro) e pega os 6 primeiros
      const sorted = consumables.sort((a, b) => (b.quantidade ?? 0) - (a.quantidade ?? 0));
      return fillSlots(sorted.slice(0, SLOT_LIMIT), SLOT_LIMIT);
    },
    get armorPieces() {
      const map = this.status?.atributos?.armaduraDeus ?? {};
      return ARMOR_ORDER.map((piece) => ({
        ...piece,
        valor: map[piece.key]?.valor ?? 0
      }));
    },
    get fruits() {
      const data = this.status?.atributos?.frutosEspirito ?? {};
      return Object.entries(FRUITS_LABELS).map(([key, label]) => ({
        key,
        label,
        valor: data[key] ?? 0
      }));
    },
    get works() {
      const data = this.status?.atributos?.obrasCarneAgrupadas ?? {};
      return Object.entries(WORKS_LABELS).map(([key, label]) => ({
        key,
        label,
        valor: data[key] ?? 0
      }));
    },
    get buffs() {
      return this.status?.atributos?.efeitosAtivos?.buffs ?? [];
    },
    get debuffs() {
      return this.status?.atributos?.efeitosAtivos?.debuffs ?? [];
    },
  get fruitsScore() {
    return this.fruits.reduce((total, fruit) => total + (fruit.valor ?? 0), 0);
  },
  get worksScore() {
    return this.works.reduce((total, work) => total + (work.valor ?? 0), 0);
  },
  get fruitsScorePercent() {
    return Math.min(100, Math.round((this.fruitsScore / 900) * 100));
  },
  get worksScorePercent() {
    return Math.min(100, Math.round((this.worksScore / 900) * 100));
  },
  get warningWorks() {
    return this.works.filter((work) => work.valor >= 50);
  },
  get positiveHighlights() {
    return this.fruits
      .filter((fruit) => fruit.valor >= 50)
      .map((fruit) => fruit.label);
  },

    slotLabel(item, fallback = "Vazio") {
      return item?.nome ?? fallback;
    },
    slotAbbr(item) {
      return item ? abbreviationFromName(item.nome) : "–";
    },
    slotRarity(item) {
      return item?.raridade ?? "vazio";
    },
    formatNumber,
    abbreviationFromName
  };
};

