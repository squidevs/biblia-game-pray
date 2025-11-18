// Sistemas de jogo (XP, níveis, corações, bloqueios, etc.)

const GameSystems = {
  // Sistema de XP e progressão
  calcularXPProximoNivel(nivel, baseXP = 100, multiplier = 1.25) {
    return Math.floor(baseXP * Math.pow(multiplier, nivel - 1));
  },
  
  adicionarXP(userId, xpGanho, multiplicador = 1.0) {
    return new Promise(async (resolve) => {
      const status = await DataManager.getUserStatus(userId);
      const xpAtual = status.atributos?.xp || 0;
      const nivelAtual = status.atributos?.nivel || 1;
      
      const xpTotal = xpAtual + (xpGanho * multiplicador);
      const xpProximoNivel = this.calcularXPProximoNivel(nivelAtual);
      
      let novoNivel = nivelAtual;
      let xpRestante = xpTotal;
      
      // Verificar se subiu de nível
      while (xpRestante >= xpProximoNivel && novoNivel < 7) {
        xpRestante -= xpProximoNivel;
        novoNivel++;
        const novoXPProximo = this.calcularXPProximoNivel(novoNivel);
        if (xpRestante < novoXPProximo) break;
      }
      
      // Atualizar status
      status.atributos.xp = Math.floor(xpRestante);
      status.atributos.nivel = novoNivel;
      status.atributos.xpProximoNivel = this.calcularXPProximoNivel(novoNivel);
      
      await DataManager.updateUserStatus(userId, status);
      
      // Se subiu de nível
      if (novoNivel > nivelAtual) {
        Utils.playSound('level_up');
        Utils.showToast(`Parabéns! Você subiu para o nível ${novoNivel}!`, 'success');
        // Disparar evento de level up
        window.dispatchEvent(new CustomEvent('level-up', { detail: { nivel: novoNivel } }));
      }
      
      resolve(status);
    });
  },
  
  // Sistema de bloqueio/desbloqueio baseado em status
  verificarBloqueio(status, tipo, itemId = null) {
    const obrasCarne = status?.atributos?.obrasCarneAgrupadas || {};
    
    // Verificar se algum atributo negativo está >= 75
    const bloqueado = Object.values(obrasCarne).some(valor => valor >= 75);
    
    if (!bloqueado) return { bloqueado: false, motivo: null };
    
    // Encontrar qual atributo está bloqueando
    const atributoBloqueador = Object.entries(obrasCarne).find(([_, valor]) => valor >= 75);
    
    return {
      bloqueado: true,
      motivo: `Bloqueado por ${atributoBloqueador[0]} ≥ 75`,
      atributo: atributoBloqueador[0],
      valor: atributoBloqueador[1]
    };
  },
  
  // Verificar faixa de status
  getFaixaStatus(valor) {
    if (valor >= 0 && valor <= 24) return { faixa: 'baixa', cor: '#4CAF50', efeito: 'nenhum' };
    if (valor >= 25 && valor <= 49) return { faixa: 'leve', cor: '#8BC34A', efeito: 'leve' };
    if (valor >= 50 && valor <= 74) return { faixa: 'moderada', cor: '#FF9800', efeito: 'moderado' };
    if (valor >= 75 && valor <= 100) return { faixa: 'alta', cor: '#F44336', efeito: 'máximo' };
    return { faixa: 'desconhecida', cor: '#9E9E9E', efeito: 'nenhum' };
  },
  
  // Helper para getUserStatus
  async getUserStatus(userId) {
    return await DataManager.getUserStatus(userId);
  },
  
  // Sistema de regeneração de corações
  async regenerarCoracoes(userId) {
    const status = await DataManager.getUserStatus(userId);
    const tentativas = status.sistemaProgresso?.tentativasEstudo || {};
    const config = await DataManager.getConfig();
    
    const heartsRegenMinutes = config?.config_global?.parametrosJogo?.heart_regen_minutes || 60;
    const heartsMax = config?.config_global?.parametrosJogo?.hearts_base || 5;
    
    const agora = new Date();
    const ultimoUso = tentativas.ultimoUso ? new Date(tentativas.ultimoUso) : null;
    
    if (!ultimoUso) {
      // Primeira vez, definir como agora
      tentativas.ultimoUso = agora.toISOString();
      tentativas.proximaRecarga = new Date(agora.getTime() + heartsRegenMinutes * 60000).toISOString();
    } else {
      // Verificar se já passou tempo suficiente para regenerar
      const tempoPassado = (agora - ultimoUso) / 60000; // minutos
      const coracoesRegenerados = Math.floor(tempoPassado / heartsRegenMinutes);
      
      if (coracoesRegenerados > 0 && tentativas.atual < heartsMax) {
        tentativas.atual = Math.min(heartsMax, tentativas.atual + coracoesRegenerados);
        tentativas.ultimoUso = agora.toISOString();
        tentativas.proximaRecarga = new Date(agora.getTime() + heartsRegenMinutes * 60000).toISOString();
      }
    }
    
    status.sistemaProgresso.tentativasEstudo = tentativas;
    await DataManager.updateUserStatus(userId, status);
    
    return tentativas;
  },
  
  // Sistema de Espírito Santo (diminui ao longo do tempo)
  async atualizarEspiritoSanto(userId) {
    const status = await DataManager.getUserStatus(userId);
    const config = await DataManager.getConfig();
    const espiritoSanto = status?.atributos?.atributosPrincipais?.espiritoSanto || 100;
    const batizado = status?.hudStatus?.batizado || false;
    
    const reduzPorHora = config?.config_global?.espiritoSanto?.reduzPorHora || 1;
    const travaBatizado = config?.config_global?.espiritoSanto?.travaBatizado || 50;
    const travaNaoBatizado = config?.config_global?.espiritoSanto?.travaNaoBatizado || 15;
    
    // Calcular redução baseada no tempo desde última atualização
    const ultimaAtualizacao = status.updated_at ? new Date(status.updated_at) : new Date();
    const agora = new Date();
    const horasPassadas = (agora - ultimaAtualizacao) / (1000 * 60 * 60);
    
    if (horasPassadas > 0) {
      let novoValor = Math.max(0, espiritoSanto - (reduzPorHora * horasPassadas));
      
      // Aplicar trava
      const trava = batizado ? travaBatizado : travaNaoBatizado;
      novoValor = Math.max(trava, novoValor);
      
      status.atributos.atributosPrincipais.espiritoSanto = Math.round(novoValor);
      
      // Verificar se precisa mostrar notificação
      const notificacoes = config?.config_global?.espiritoSanto?.notificacoes || [85, 70, 55, 40, 25, 10];
      const valorAnterior = Math.floor(espiritoSanto / 15) * 15;
      const valorAtual = Math.floor(novoValor / 15) * 15;
      
      if (notificacoes.includes(valorAtual) && valorAtual < valorAnterior) {
        // Mostrar notificação motivacional
        const mensagens = config?.config_global?.espiritoSanto?.mensagemMotivacional || [
          "O Espírito Santo sente sua ausência. Que tal uma missão ou estudo bíblico?",
          "Sua luz está diminuindo, busque fortalecer seu espírito!",
          "Busque o batismo para fortalecer seu espírito!",
          "O Espírito Santo permanece com você!"
        ];
        
        const mensagem = batizado ? mensagens[3] : mensagens[2];
        Utils.showToast(mensagem, 'warning');
      }
      
      status.updated_at = agora.toISOString();
      await DataManager.updateUserStatus(userId, status);
    }
    
    return status;
  },
  
  // Aplicar efeitos de ação/missão
  async aplicarEfeitos(userId, efeitos) {
    const status = await DataManager.getUserStatus(userId);
    
    // Aplicar atributos positivos
    if (efeitos.atributosPositivos) {
      Object.entries(efeitos.atributosPositivos).forEach(([atributo, valor]) => {
        if (atributo === 'espiritoSanto') {
          status.atributos.atributosPrincipais.espiritoSanto = Math.min(100, 
            (status.atributos.atributosPrincipais.espiritoSanto || 0) + valor);
        } else if (atributo === 'fe' || atributo === 'sabedoria') {
          status.atributos.atributosPrincipais[atributo] = Math.min(100,
            (status.atributos.atributosPrincipais[atributo] || 0) + valor);
        } else if (status.atributos.frutosEspirito) {
          status.atributos.frutosEspirito[atributo] = Math.min(100,
            (status.atributos.frutosEspirito[atributo] || 0) + valor);
        }
      });
    }
    
    // Aplicar atributos negativos (redução)
    if (efeitos.atributosNegativos) {
      Object.entries(efeitos.atributosNegativos).forEach(([atributo, valor]) => {
        if (status.atributos.obrasCarneAgrupadas && valor < 0) {
          const chave = atributo.replace(/s$/, ''); // Remove 's' final se houver
          if (status.atributos.obrasCarneAgrupadas[chave] !== undefined) {
            status.atributos.obrasCarneAgrupadas[chave] = Math.max(0,
              (status.atributos.obrasCarneAgrupadas[chave] || 0) + valor);
          }
        }
      });
    }
    
    // Aplicar buffs/debuffs temporários se houver
    if (efeitos.duracaoMinutos) {
      const efeitosAtivos = JSON.parse(localStorage.getItem(`efeitos_${userId}`) || '[]');
      const novoEfeito = {
        id: `efeito_${Date.now()}`,
        nome: efeitos.nome || 'Efeito',
        tipo: efeitos.tipo || 'buff',
        descricao: efeitos.descricao || '',
        icone: efeitos.icone || 'bi-star',
        expiraEm: new Date(Date.now() + efeitos.duracaoMinutos * 60000).toISOString()
      };
      efeitosAtivos.push(novoEfeito);
      localStorage.setItem(`efeitos_${userId}`, JSON.stringify(efeitosAtivos));
    }
    
    await DataManager.updateUserStatus(userId, status);
    
    // Verificar conquistas após aplicar efeitos
    await ConquistasSystem.verificarConquistas(userId);
    
    return status;
  },
  
  // Consumir coração
  async consumirCoracao(userId) {
    const status = await this.getUserStatus(userId);
    const tentativas = status.sistemaProgresso?.tentativasEstudo || {};
    
    if (tentativas.atual > 0) {
      tentativas.atual--;
      tentativas.ultimoUso = new Date().toISOString();
      status.sistemaProgresso.tentativasEstudo = tentativas;
      await DataManager.updateUserStatus(userId, status);
      
      if (tentativas.atual === 0) {
        Utils.showToast('Sem corações! Aguarde regeneração ou use um item.', 'warning');
        Utils.playSound('no_hearts');
      }
    } else {
      Utils.showToast('Sem corações disponíveis!', 'error');
      Utils.playSound('no_hearts');
    }
  },
  
  // Sistema de confissão/arrependimento
  async executarConfissao(userId) {
    const status = await DataManager.getUserStatus(userId);
    const config = await DataManager.getConfig();
    const cooldownMinutos = config?.config_global?.cooldowns?.confissao_cooldown_minutos || 60;
    
    // Verificar cooldown
    const ultimaConfissao = localStorage.getItem(`confissao_${userId}`);
    if (ultimaConfissao) {
      const tempoPassado = (new Date() - new Date(ultimaConfissao)) / 60000;
      if (tempoPassado < cooldownMinutos) {
        const minutosRestantes = Math.ceil(cooldownMinutos - tempoPassado);
        Utils.showToast(`Aguarde ${minutosRestantes} minutos para confessar novamente.`, 'warning');
        return false;
      }
    }
    
    // Buscar ação de confissão
    const acoes = await DataManager.loadJSON('acoes');
    const acaoConfissao = acoes?.acoes?.find(a => a.categoria === 'arrependimento' || a.id.includes('confissao'));
    
    if (acaoConfissao && acaoConfissao.efeitos) {
      await this.aplicarEfeitos(userId, acaoConfissao.efeitos);
      localStorage.setItem(`confissao_${userId}`, new Date().toISOString());
      Utils.showToast('Confissão realizada! Seu status foi restaurado.', 'success');
      Utils.playSound('success');
      return true;
    }
    
    // Efeito padrão se não houver ação específica
    const efeitosPadrao = {
      atributosPositivos: {
        espiritoSanto: 20,
        fe: 10
      },
      atributosNegativos: {
        pecado: -5
      }
    };
    
    await this.aplicarEfeitos(userId, efeitosPadrao);
    localStorage.setItem(`confissao_${userId}`, new Date().toISOString());
    Utils.showToast('Confissão realizada! Seu status foi restaurado.', 'success');
    Utils.playSound('success');
    return true;
  }
};

// Exportar para uso global
window.GameSystems = GameSystems;

