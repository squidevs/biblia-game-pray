import { fetchJSON } from "./utils.js";

const RANK_FILTERS = [
  { id: "semanal", label: "Semanal" },
  { id: "mensal", label: "Mensal" },
  { id: "all-time", label: "All-time" },
];

function decorateEntry(entry, status) {
  const works = status?.atributos?.obrasCarneAgrupadas ?? {};
  const blocked =
    entry.uid === status?.userID &&
    ((works.ciumesInveja ?? 0) >= 75 || (works.orgulhoEgoismo ?? 0) >= 75);

  return {
    ...entry,
    blocked,
    blockMessage: blocked
      ? "Ranking bloqueado por status elevado (ciúmes/orgulho)."
      : null,
  };
}

window.rankingStore = function rankingStore() {
  return {
    loading: true,
    status: null,
    boards: [],
    filters: RANK_FILTERS,
    activeFilter: "semanal",
    selectedPlayer: null,

    async init() {
      await this.load();
    },

    async load() {
      this.loading = true;
      try {
        const [status, ranking] = await Promise.all([
          fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json")),
          fetchJSON("dados/ranking.json").catch(() => fetchJSON("ranking.json")),
        ]);
        this.status = status;
        const boards = ranking?.ranking?.leaderboards ?? [];
        this.boards = boards.map((board) => ({
          ...board,
          entries: board.entries.map((entry) => decorateEntry(entry, status)),
        }));
      } catch (error) {
        console.error("[Ranking] Falha ao carregar dados", error);
      } finally {
        this.loading = false;
      }
    },

    setFilter(id) {
      this.activeFilter = id;
    },

    get currentBoard() {
      return (
        this.boards.find((board) => board.periodo === this.activeFilter) ??
        this.boards[0]
      );
    },

    openModal(player) {
      this.selectedPlayer = player;
      document.body.classList.add("modal-open");
    },

    closeModal() {
      this.selectedPlayer = null;
      document.body.classList.remove("modal-open");
    },
  };
};

