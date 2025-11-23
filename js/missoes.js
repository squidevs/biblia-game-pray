import { fetchJSON } from "./utils.js";

const FILTERS = [
  { id: "todas", label: "Todas" },
  { id: "devocional", label: "Devocionais" },
  { id: "social", label: "Sociais" },
  { id: "servico", label: "Serviço" },
  { id: "disciplina", label: "Disciplina" },
  { id: "reflexao", label: "Reflexão" },
];

const STATUS_META = {
  ativa: { label: "Em andamento", tone: "warning" },
  aguardando: { label: "Aguardando revisão", tone: "info" },
  concluida: { label: "Concluída", tone: "success" },
  falhada: { label: "Falhada", tone: "danger" },
  expirou: { label: "Expirada", tone: "danger" },
};

const STATUS_OVERRIDES = {
  21: "concluida",
  11: "aguardando",
  31: "falhada",
};

const BLOCK_RULES = [
  {
    key: "ambicaoEgoista",
    threshold: 75,
    match: (mission) =>
      mission.tipo === "compartilhada" || mission.categoria === "servico",
    message:
      "Ambição/Egoísmo elevado bloqueia missões colaborativas. Procure confessar para liberar.",
  },
  {
    key: "orgulhoEgoismo",
    threshold: 75,
    match: (mission) =>
      mission.categoria === "discipulado" || mission.categoria === "social",
    message:
      "Orgulho/Egoísmo elevado impede missões de discipulado/social. Busque humildade.",
  },
  {
    key: "ciumesInveja",
    threshold: 75,
    match: (mission) => mission.categoria === "social",
    message:
      "Ciúmes/Inveja elevado impede missões sociais. Considere ações de reconciliação.",
  },
];

function formatReward(rewards = {}) {
  const parts = [];
  // Suporta tanto rewards.xp quanto rewards direto (xp, moedas)
  const xp = rewards.xp ?? rewards?.xp ?? 0;
  const moeda = rewards.moeda ?? rewards.moedas ?? 0;
  if (xp) parts.push(`${xp} XP`);
  if (moeda) parts.push(`${moeda} ●`);
  if (rewards.itens?.length) parts.push(`${rewards.itens.length} item(ns)`);
  return parts.join(" + ") || "Sem recompensa numérica";
}

function analyzeAttributes(attrs = {}) {
  const positiveKeys = Object.entries(attrs).filter(([, value]) => value > 0);
  const negativeKeys = Object.entries(attrs).filter(([, value]) => value < 0);
  return {
    positive: positiveKeys,
    negative: negativeKeys,
    hasHealing: negativeKeys.length > 0,
  };
}

window.missoesStore = function missoesStore() {
  return {
    loading: true,
    missions: [],
    status: null,
    filters: FILTERS,
    activeFilter: FILTERS[0].id,
    selectedMission: null,
    showSpiritBanner: false,
    async init() {
      console.log('[Missões] init() chamado');
      try {
        // Se já carregou e tem dados, não recarrega
        if (this.missions.length > 0 && this.status) {
          console.log('[Missões] Dados já carregados, pulando reload');
          return;
        }
        await this.load();
        console.log('[Missões] Dados carregados:', {
          missions: this.missions?.length ?? 0,
          status: !!this.status,
          showBanner: this.showSpiritBanner
        });
      } catch (error) {
        console.error('[Missões] ERRO no init:', error);
      }
    },
    async load() {
      console.log('[Missões] load() iniciado');
      this.loading = true;
      try {
        const [missions, status] = await Promise.all([
          fetchJSON("dados/missoes.json").catch(() => fetchJSON("missoes.json")),
          fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json")),
        ]);
        
        console.log('[Missões] Dados recebidos:', {
          missions: missions?.missoes?.length ?? missions?.length ?? 0,
          status: !!status
        });
        
        const works = status?.atributos?.obrasCarneAgrupadas ?? {};
        this.status = status;
        this.showSpiritBanner =
          (status?.atributos?.espiritoSanto?.valor ?? 100) <= 60;

        const rawMissions = missions?.missoes ?? missions ?? [];
        console.log('[Missões] Processando', rawMissions.length, 'missões');
        
        this.missions = rawMissions.map((mission) => {
          const statusKey = STATUS_OVERRIDES[mission.id] ?? mission.status ?? "ativa";
          const blockInfo = this.evaluateBlock(mission, works);
          const attrInfo = analyzeAttributes(
            mission.recompensas?.atributos ?? {}
          );

          // Formata recompensa: suporta tanto mission.recompensas quanto mission.xp/moedas direto
          const rewards = mission.recompensas || { xp: mission.xp, moeda: mission.moedas };
          
          return {
            ...mission,
            statusKey,
            statusMeta: STATUS_META[statusKey] ?? STATUS_META.ativa,
            rewardLabel: formatReward(rewards),
            blockInfo,
            attrInfo,
          };
        });
        
        console.log('[Missões] Missões processadas:', this.missions.length);
      } catch (error) {
        console.error("[Missões] Falha ao carregar dados", error);
        console.error("[Missões] Stack trace:", error.stack);
      } finally {
        this.loading = false;
        console.log('[Missões] load() finalizado, loading =', this.loading);
      }
    },
    evaluateBlock(mission, works) {
      for (const rule of BLOCK_RULES) {
        if ((works[rule.key] ?? 0) >= rule.threshold && rule.match(mission)) {
          return { reason: rule.message, key: rule.key };
        }
      }
      return null;
    },
    setFilter(filterId) {
      this.activeFilter = filterId;
    },
    get filteredMissions() {
      if (!this.missions || this.missions.length === 0) {
        console.log('[Missões] filteredMissions: missions vazio');
        return [];
      }
      
      const filtered = this.missions.filter((mission) => {
        if (this.activeFilter === "todas") return true;
        if (this.activeFilter === "concluidas")
          return mission.statusKey === "concluida";
        if (this.activeFilter === "falhadas")
          return (
            mission.statusKey === "falhada" ||
            mission.statusKey === "expirou"
          );
        return mission.tipo === this.activeFilter;
      });
      
      console.log('[Missões] filteredMissions:', {
        total: this.missions.length,
        filter: this.activeFilter,
        filtered: filtered.length
      });
      
      return filtered;
    },
    get emptyMessage() {
      if (this.activeFilter === "concluidas")
        return "Você ainda não concluiu missões neste período.";
      if (this.activeFilter === "falhadas")
        return "Sem missões falhadas recentemente. Continue assim!";
      return "Nenhuma missão disponível com os filtros atuais.";
    },
    openModal(mission) {
      this.selectedMission = mission;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.selectedMission = null;
      document.body.classList.remove("modal-open");
    },
    performAction(mission) {
      if (mission.blockInfo) return;
      alert(
        `Ação simulada: ${
          mission.statusKey === "concluida" ? "Revisar" : "Iniciar"
        } missão "${mission.titulo}".`
      );
    },
  };
};

