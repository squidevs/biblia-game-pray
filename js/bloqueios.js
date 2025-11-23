/**
 * SISTEMA DE BLOQUEIOS - Bíblia GamePray
 * 
 * Controla bloqueios de conteúdo baseados em Obras da Carne ≥ 75
 * Conforme docs/regras_status.md
 */

import { fetchJSON } from "./utils.js";

// Alpine.js Store Global para Bloqueios
window.bloqueiosStore = function bloqueiosStore() {
  return {
    // Estado
    status: null,
    loading: true,
    showOverlay: false,
    currentBlock: null,

    // Inicialização
    async init() {
      await this.loadStatus();
      this.loading = false;
    },

    // Carregar status do jogador
    async loadStatus() {
      try {
        this.status = await fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json"));
      } catch (err) {
        console.error("[Bloqueios] Erro ao carregar status", err);
        this.status = null;
      }
    },

    // Verificar se algum atributo está bloqueado (≥ 75)
    get hasBloqueio() {
      if (!this.status?.atributos?.obrasCarneAgrupadas) return false;
      
      const obras = this.status.atributos.obrasCarneAgrupadas;
      return Object.values(obras).some((valor) => valor >= 75);
    },

    // Obter lista de atributos bloqueados
    get atributosBloqueados() {
      if (!this.status?.atributos?.obrasCarneAgrupadas) return [];
      
      const obras = this.status.atributos.obrasCarneAgrupadas;
      const labels = this.getObrasLabels();
      
      return Object.entries(obras)
        .filter(([key, valor]) => valor >= 75)
        .map(([key, valor]) => ({
          key,
          label: labels[key] || key,
          valor,
        }));
    },

    // Labels das Obras da Carne (mesmos da HUD)
    getObrasLabels() {
      return {
        imoralidadeImpureza: "Imoralidade/Impureza",
        idolatriaFeiticaria: "Idolatria/Feitiçaria",
        inimizadeOdio: "Inimizade/Ódio",
        ciumesInveja: "Ciúmes/Inveja",
        ira: "Ira",
        dissensaoFaccao: "Dissensão/Facção",
        orgiasBebedices: "Orgias/Bebedices",
        ambicaoEgoista: "Ambição egoísta",
        orgulhoEgoismo: "Orgulho/Egoísmo",
      };
    },

    // Verificar bloqueio para uma tela/ação específica
    verificarBloqueio(tipo, id) {
      if (!this.hasBloqueio) {
        return { bloqueado: false };
      }

      // Regras de bloqueio
      const REGRAS = {
        missao: this.verificarBloqueioMissao,
        item: this.verificarBloqueioItem,
        loja: this.verificarBloqueioLoja,
        conquista: this.verificarBloqueioConquista,
      };

      const verificador = REGRAS[tipo];
      if (!verificador) {
        return { bloqueado: false };
      }

      return verificador.call(this, id);
    },

    // Verificar bloqueio de missão
    verificarBloqueioMissao(missaoId) {
      // TODO: Implementar regras específicas de cada missão
      // Por enquanto, bloqueia missões de tipo "devocional" se houver bloqueio
      return {
        bloqueado: this.hasBloqueio,
        motivo: "Você precisa se arrepender antes de continuar com esta missão.",
        atributos: this.atributosBloqueados,
      };
    },

    // Verificar bloqueio de item
    verificarBloqueioItem(itemId) {
      // TODO: Implementar regras específicas de cada item
      return {
        bloqueado: false,
      };
    },

    // Verificar bloqueio de loja
    verificarBloqueioLoja(offerId) {
      // Itens premium podem ser bloqueados
      return {
        bloqueado: this.hasBloqueio,
        motivo: "Alguns itens não estão disponíveis no momento.",
        atributos: this.atributosBloqueados,
      };
    },

    // Verificar bloqueio de conquista
    verificarBloqueioConquista(conquistaId) {
      return {
        bloqueado: false,
      };
    },

    // Mostrar overlay de bloqueio
    mostrarOverlay(bloqueio) {
      this.currentBlock = bloqueio;
      this.showOverlay = true;
    },

    // Fechar overlay
    fecharOverlay() {
      this.showOverlay = false;
      this.currentBlock = null;
    },

    // Ação de arrependimento (redireciona para tela de confissão)
    irParaArrependimento() {
      this.fecharOverlay();
      // TODO: Redirecionar para tela de confissão/arrependimento
      window.location.hash = "#perfil";
      alert("Funcionalidade de arrependimento em desenvolvimento.");
    },
  };
};

