import { fetchJSON } from "./utils.js";
import { getVerseOfTheDay } from "./bible-api.js";

const QUICK_LINKS = [
  {
    id: "missoes",
    label: "Missões",
    description: "Avance na sua jornada diária",
    icon: "map",
    href: "#missoes",
  },
  {
    id: "estudos",
    label: "Estudos",
    description: "Continue a trilha de capítulos",
    icon: "menu_book",
    href: "#estudos",
  },
  {
    id: "conquistas",
    label: "Conquistas",
    description: "Veja metas desbloqueadas",
    icon: "emoji_events",
    href: "#conquistas",
  },
];

window.inicioStore = function inicioStore() {
  return {
    loading: true,
    status: null,
    conquistas: [],
    alertWorks: [],
    verseOfTheDay: null,
    async init() {
      console.log('[Início] init() chamado');
      try {
        await this.load();
        console.log('[Início] Dados carregados:', {
          status: !!this.status,
          conquistas: this.conquistas?.length ?? 0,
          verse: !!this.verseOfTheDay
        });
      } catch (error) {
        console.error('[Início] ERRO no init:', error);
      }
      
      // Escuta atualizações de avatar
      window.addEventListener('avatar-updated', (e) => {
        if (this.status && this.status.perfil) {
          this.status.perfil.avatar = e.detail.url;
          this.status.perfil.avatarSid = e.detail.sid;
        }
      });
    },
    async load() {
      console.log('[Início] load() iniciado');
      this.loading = true;
      try {
        const [status, conquistas, verse] = await Promise.all([
          fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json")),
          fetchJSON("dados/conquistas.json").catch(() => fetchJSON("conquistas.json")),
          getVerseOfTheDay().catch(() => null),
        ]);

        console.log('[Início] Dados recebidos:', {
          status: !!status,
          conquistas: conquistas?.lista?.length ?? conquistas?.length ?? 0,
          verse: !!verse
        });

        this.status = status;
        // conquistas.json tem estrutura { "conquistas": [...] }
        const conquistasList = conquistas?.conquistas ?? conquistas?.lista ?? conquistas ?? [];
        this.conquistas = Array.isArray(conquistasList) ? conquistasList : [];
        this.alertWorks = this.computeWorksAlert(status);
        this.verseOfTheDay = verse;
        
        console.log('[Início] Dados atribuídos:', {
          statusKeys: status ? Object.keys(status) : [],
          conquistasCount: this.conquistas.length,
          alertWorksCount: this.alertWorks.length
        });
      } catch (error) {
        console.error("[Início] Falha ao carregar dados", error);
        console.error("[Início] Stack trace:", error.stack);
      } finally {
        this.loading = false;
        console.log('[Início] load() finalizado, loading =', this.loading);
      }
    },
    computeWorksAlert(status) {
      const works = status?.atributos?.obrasCarneAgrupadas ?? {};
      const WORKS_LABELS = {
        imoralidadeImpureza: "Imoralidade/Impureza",
        idolatriaFeiticaria: "Idolatria/Feitiçaria",
        inimizadeOdio: "Inimizade/Ódio",
        ciumesInveja: "Ciúmes/Inveja",
        ira: "Ira",
        dissensaoFaccao: "Dissensão/Facção",
        orgiasBebedices: "Orgias/Bebedices",
        ambicaoEgoista: "Ambição/Egoísmo",
        orgulhoEgoismo: "Orgulho/Egoísmo"
      };
      return Object.entries(works)
        .filter(([, value]) => value >= 50)
        .map(([key, value]) => ({ 
          key, 
          value,
          label: WORKS_LABELS[key] || key
        }));
    },
    get userName() {
      return this.status?.perfil?.nome ?? "Discípulo(a)";
    },
    get avatar() {
      return (
        this.status?.perfil?.avatar ??
        "assets/logotipos/notext-perfil-logo/perfil-colorido.png"
      );
    },
    get title() {
      return this.status?.perfil?.titulo ?? "Chamado";
    },
    get level() {
      return this.status?.atributos?.nivel ?? 1;
    },
    get coins() {
      return this.status?.recursos?.moedas ?? 0;
    },
    get hearts() {
      return this.status?.recursos?.coracoes ?? 0;
    },
    get heartsMax() {
      return this.status?.recursos?.coracoesMax ?? 0;
    },
    get xpPercent() {
      const xp = this.status?.atributos?.xp ?? 0;
      const xpNext = this.status?.atributos?.xpProximoNivel ?? 1;
      return Math.min(100, Math.round((xp / xpNext) * 100));
    },
    get spiritPercent() {
      return this.status?.atributos?.espiritoSanto?.valor ?? 0;
    },
    get streak() {
      return this.status?.estatisticas?.diasConsecutivos ?? 0;
    },
    get statsCards() {
      const stats = this.status?.estatisticas ?? {};
      // Calcula conquistas desbloqueadas
      const conquistasDesbloqueadas = this.conquistas.filter(c => 
        c.status?.desbloqueada === true || 
        c.desbloqueada === true ||
        c.status === 'desbloqueada'
      ).length;
      
      return [
        {
          label: "Missões concluídas",
          value: stats.missoesCompletas ?? stats.missoes_concluidas ?? 0,
          icon: "task_alt",
        },
        {
          label: "Dias consecutivos",
          value: stats.diasConsecutivos ?? stats.sequenciaAtual ?? this.streak ?? 0,
          icon: "calendar_month",
        },
        {
          label: "Conquistas",
          value: stats.conquistasDesbloqueadas ?? conquistasDesbloqueadas,
          icon: "emoji_events",
        },
      ];
    },
    get quickLinks() {
      return QUICK_LINKS;
    },
    get highlightedConquests() {
      return this.conquistas.slice(0, 3);
    },
    get fruits() {
      const data = this.status?.atributos?.frutosEspirito ?? {};
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
      return Object.entries(FRUITS_LABELS).map(([key, label]) => ({
        key,
        label,
        valor: data[key] ?? 0
      }));
    },
    get works() {
      const data = this.status?.atributos?.obrasCarneAgrupadas ?? {};
      const WORKS_LABELS = {
        imoralidadeImpureza: "Imoralidade/Impureza",
        idolatriaFeiticaria: "Idolatria/Feitiçaria",
        inimizadeOdio: "Inimizade/Ódio",
        ciumesInveja: "Ciúmes/Inveja",
        ira: "Ira",
        dissensaoFaccao: "Dissensão/Facção",
        orgiasBebedices: "Orgias/Bebedices",
        ambicaoEgoista: "Ambição/Egoísta",
        orgulhoEgoismo: "Orgulho/Egoísmo"
      };
      return Object.entries(WORKS_LABELS).map(([key, label]) => ({
        key,
        label,
        valor: data[key] ?? 0
      }));
    },
    formatNumber(num) {
      if (!num) return "0";
      return num.toLocaleString("pt-BR");
    },
  };
};

