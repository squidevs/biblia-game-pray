// Telas Alpine.js

function homeScreen() {
  return {
    get user() {
      return Alpine.store('app').currentUser;
    },
    
    get status() {
      return Alpine.store('app').statusData;
    },
    
    getAvatarUrl() {
      if (!this.user?.sid) return 'assets/logotipos/notext-perfil-logo/perfil-colorido.png';
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.user.sid}`;
    },
    
    getXPPercentage() {
      const xp = this.status?.atributos?.xp || 0;
      const xpNext = this.status?.atributos?.xpProximoNivel || 100;
      return Math.min((xp / xpNext) * 100, 100);
    },
    
    async init() {
      // Carregar dados se necessário
      if (!this.status && this.user) {
        const status = await DataManager.getUserStatus(this.user.id);
        Alpine.store('app').statusData = status;
      }
    }
  };
}

function missoesScreen() {
  return {
    missoes: [],
    filter: 'ativas',
    
    get filteredMissoes() {
      return this.missoes.filter(m => {
        if (this.filter === 'ativas') return m.status === 'ativa';
        if (this.filter === 'concluidas') return m.status === 'concluida';
        if (this.filter === 'falhadas') return m.status === 'falhada';
        return true;
      });
    },
    
    async init() {
      const todasMissoes = await DataManager.getMissoes();
      const user = Alpine.store('app').currentUser;
      
      if (user) {
        const missoesAtivas = await DataManager.getMissoesAtivas(user.id);
        // Combinar missões disponíveis com ativas do usuário
        this.missoes = todasMissoes.map(m => {
          const ativa = missoesAtivas.find(ma => ma.id === m.id);
          return {
            ...m,
            status: ativa ? 'ativa' : (m.status || 'disponivel')
          };
        });
      } else {
        this.missoes = todasMissoes;
      }
    },
    
    async iniciarMissao(missao) {
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      // Verificar bloqueio
      const status = await DataManager.getUserStatus(user.id);
      const bloqueio = GameSystems.verificarBloqueio(status, 'missao', missao.id);
      
      if (bloqueio.bloqueado) {
        Utils.showToast(bloqueio.motivo, 'error');
        return;
      }
      
      const sucesso = await MissoesSystem.iniciarMissao(user.id, missao.id);
      if (sucesso) {
        await this.init(); // Recarregar missões
      }
    },
    
    abrirModalEvidencia(missao) {
      window.dispatchEvent(new CustomEvent('abrir-modal-evidencia', { detail: { missao } }));
    },
    
    init() {
      this.carregarMissoes();
      
      // Escutar evento de recarregar
      window.addEventListener('recarregar-missoes', () => {
        this.carregarMissoes();
      });
    },
    
    async carregarMissoes() {
      try {
        const todasMissoes = await DataManager.getMissoes();
        const user = Alpine.store('app').currentUser;
        
        if (user) {
          const missoesAtivas = await DataManager.getMissoesAtivas(user.id);
          // Combinar missões disponíveis com ativas do usuário
          this.missoes = todasMissoes.map(m => {
            const ativa = missoesAtivas.find(ma => ma.missaoId === m.id || ma.id === m.id);
            if (ativa) {
              return {
                ...m,
                status: ativa.status || 'em_andamento',
                missaoAtiva: ativa
              };
            }
            return {
              ...m,
              status: 'disponivel'
            };
          });
        } else {
          this.missoes = todasMissoes.map(m => ({
            ...m,
            status: 'disponivel'
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar missões:', error);
        this.missoes = [];
        Utils.showToast('Erro ao carregar missões', 'error');
      }
    }
  };
}

function estudosScreen() {
  return {
    testamentoSelecionado: null,
    livroSelecionado: null,
    capituloAtivo: null,
    cicloAtual: 1,
    progressoCiclo: 0,
    versiculoAtual: null,
    versiculoIndex: 0,
    perguntaAtual: null,
    respostaSelecionada: null,
    perguntasFinais: [],
    perguntaIndex: 0,
    acertos: 0,
    erros: 0,
    
    get livrosFiltrados() {
      if (!this.testamentoSelecionado) return [];
      const livros = EstudosSystem.livros[this.testamentoSelecionado] || [];
      const user = Alpine.store('app').currentUser;
      
      return livros.map(livro => ({
        ...livro,
        progresso: user ? EstudosSystem.calcularProgressoLivro(user.id, livro.nome, livro.capitulos) : 0
      }));
    },
    
    async init() {
      // Inicializar
    },
    
    selecionarTestamento(testamento) {
      this.testamentoSelecionado = testamento;
      this.livroSelecionado = null;
      this.capituloAtivo = null;
    },
    
    selecionarLivro(livro) {
      this.livroSelecionado = livro;
      this.capituloAtivo = null;
    },
    
    isCapituloConcluido(capitulo) {
      const user = Alpine.store('app').currentUser;
      if (!user || !this.livroSelecionado) return false;
      return EstudosSystem.isCapituloConcluido(user.id, this.livroSelecionado.nome, capitulo);
    },
    
    isCapituloAtual(capitulo) {
      // Primeiro capítulo não concluído
      if (capitulo === 1 && !this.isCapituloConcluido(1)) return true;
      const anterior = capitulo - 1;
      return !this.isCapituloConcluido(capitulo) && this.isCapituloConcluido(anterior);
    },
    
    isCapituloBloqueado(capitulo) {
      if (capitulo === 1) return false;
      const anterior = capitulo - 1;
      return !this.isCapituloConcluido(anterior);
    },
    
    async iniciarCapitulo(capitulo) {
      if (this.isCapituloBloqueado(capitulo)) {
        Utils.showToast('Complete o capítulo anterior primeiro!', 'warning');
        return;
      }
      
      this.capituloAtivo = capitulo;
      this.cicloAtual = 1;
      this.versiculoIndex = 0;
      this.progressoCiclo = 0;
      await this.carregarVersiculo();
    },
    
    async carregarVersiculo() {
      if (!this.livroSelecionado || !this.capituloAtivo) return;
      
      const versiculo = this.versiculoIndex + 1;
      this.versiculoAtual = await EstudosSystem.buscarVersiculo(
        this.livroSelecionado.abreviacao,
        this.capituloAtivo,
        versiculo
      );
    },
    
    async proximoVersiculo() {
      this.versiculoIndex++;
      this.progressoCiclo = Math.min(100, (this.versiculoIndex / 10) * 100);
      
      if (this.progressoCiclo >= 100) {
        // Avançar para próximo ciclo
        this.cicloAtual = 2;
        this.progressoCiclo = 0;
        await this.carregarPergunta();
      } else {
        await this.carregarVersiculo();
      }
    },
    
    async carregarPergunta() {
      if (!this.livroSelecionado || !this.capituloAtivo) return;
      
      const perguntas = EstudosSystem.gerarPerguntas(this.livroSelecionado.nome, this.capituloAtivo);
      this.perguntaAtual = perguntas[0];
      this.respostaSelecionada = null;
    },
    
    responderQuiz(index, correta) {
      this.respostaSelecionada = index;
      
      if (correta) {
        Utils.showToast('Resposta correta!', 'success');
        Utils.playSound('success');
        this.acertos++;
      } else {
        Utils.showToast('Resposta incorreta!', 'error');
        Utils.playSound('fail');
        this.erros++;
        
        // Consumir coração
        const user = Alpine.store('app').currentUser;
        if (user) {
          GameSystems.consumirCoracao(user.id);
        }
      }
    },
    
    async proximoCiclo() {
      if (this.cicloAtual < 4) {
        this.cicloAtual++;
        this.progressoCiclo = 0;
        this.respostaSelecionada = null;
        
        if (this.cicloAtual === 4) {
          // Carregar quiz final
          await this.carregarQuizFinal();
        } else {
          await this.carregarVersiculo();
          await this.carregarPergunta();
        }
      }
    },
    
    async carregarQuizFinal() {
      if (!this.livroSelecionado || !this.capituloAtivo) return;
      
      // Gerar 5-10 perguntas finais
      this.perguntasFinais = [];
      for (let i = 0; i < 5; i++) {
        const perguntas = EstudosSystem.gerarPerguntas(this.livroSelecionado.nome, this.capituloAtivo);
        this.perguntasFinais.push(perguntas[0]);
      }
      this.perguntaIndex = 0;
      this.respostaSelecionada = null;
    },
    
    responderQuizFinal(index, correta) {
      this.respostaSelecionada = index;
      
      if (correta) {
        this.acertos++;
        Utils.playSound('success');
      } else {
        this.erros++;
        Utils.playSound('fail');
        const user = Alpine.store('app').currentUser;
        if (user) {
          GameSystems.consumirCoracao(user.id);
        }
      }
    },
    
    proximaPerguntaFinal() {
      if (this.perguntaIndex < this.perguntasFinais.length - 1) {
        this.perguntaIndex++;
        this.respostaSelecionada = null;
      }
    },
    
    async finalizarQuiz() {
      const total = this.perguntasFinais.length;
      const nota = Math.round((this.acertos / total) * 100);
      
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      if (nota >= 75) {
        // Concluir capítulo
        await EstudosSystem.salvarProgresso(user.id, this.livroSelecionado.nome, this.capituloAtivo, true);
        
        // Dar recompensas
        await GameSystems.adicionarXP(user.id, 50);
        const status = await DataManager.getUserStatus(user.id);
        if (status.hudStatus) {
          status.hudStatus.moeda = (status.hudStatus.moeda || 0) + 10;
        }
        await DataManager.updateUserStatus(user.id, status);
        
        Utils.showToast(`Parabéns! Capítulo concluído! Nota: ${nota}%`, 'success');
        Utils.playSound('mission_done');
        
        // Resetar
        this.capituloAtivo = null;
        this.cicloAtual = 1;
        this.acertos = 0;
        this.erros = 0;
      } else {
        Utils.showToast(`Nota: ${nota}%. Tente novamente! (Mínimo: 75%)`, 'warning');
        Utils.playSound('fail');
      }
    },
    
    async consumirCoracao(userId) {
      await GameSystems.consumirCoracao(userId);
    }
  };
}

function conquistasScreen() {
  return {
    conquistas: [],
    loading: false,
    filter: 'todas',
    
    get filteredConquistas() {
      if (this.filter === 'todas') return this.conquistas;
      if (this.filter === 'desbloqueadas') return this.conquistas.filter(c => c.unlocked);
      if (this.filter === 'bloqueadas') return this.conquistas.filter(c => !c.unlocked);
      return this.conquistas;
    },
    
    async init() {
      this.loading = true;
      try {
        // Verificar novas conquistas primeiro
        const user = Alpine.store('app').currentUser;
        if (user) {
          await ConquistasSystem.verificarConquistas(user.id);
        }
        
        const todasConquistas = await DataManager.getConquistas();
        
        if (user) {
          const usuario = await DataManager.getUsuario(user.id);
          const conquistasDesbloqueadas = usuario?.conquistas || [];
          
          this.conquistas = todasConquistas.map(c => {
            const id = c.id?.toString();
            const unlocked = conquistasDesbloqueadas.some(cd => 
              cd?.toString() === id || cd === c.id || cd === parseInt(c.id)
            );
            return {
              ...c,
              unlocked: unlocked
            };
          });
        } else {
          this.conquistas = todasConquistas.map(c => ({ ...c, unlocked: false }));
        }
      } catch (error) {
        console.error('Erro ao carregar conquistas:', error);
        this.conquistas = [];
        Utils.showToast('Erro ao carregar conquistas', 'error');
      } finally {
        this.loading = false;
      }
    }
  };
}

function sobreScreen() {
  return {
    about: null,
    loading: true,
    
    async init() {
      try {
        const data = await DataManager.loadJSON('about');
        this.about = data?.about || null;
      } catch (error) {
        console.error('Erro ao carregar sobre:', error);
      } finally {
        this.loading = false;
      }
    }
  };
}

function termosScreen() {
  return {};
}

function politicaScreen() {
  return {};
}

function acoesScreen() {
  return {
    acoes: [],
    filter: 'todas',
    loading: false,
    
    get filteredAcoes() {
      if (this.filter === 'todas') return this.acoes;
      return this.acoes.filter(a => a.categoria === this.filter);
    },
    
    async init() {
      this.loading = true;
      try {
        const data = await DataManager.loadJSON('acoes');
        this.acoes = data?.acoes || [];
      } catch (error) {
        console.error('Erro ao carregar ações:', error);
        this.acoes = [];
      } finally {
        this.loading = false;
      }
    },
    
    podeExecutar(acao) {
      const user = Alpine.store('app').currentUser;
      if (!user) return false;
      
      // Verificar cooldown
      const ultimaExecucao = localStorage.getItem(`acao_${acao.id}_${user.id}`);
      if (ultimaExecucao) {
        const tempoRecarga = acao.configuracoes?.tempoRecargaMinutos || 60;
        const agora = new Date();
        const ultima = new Date(ultimaExecucao);
        const minutosPassados = (agora - ultima) / 60000;
        
        if (minutosPassados < tempoRecarga) {
          return false;
        }
      }
      
      // Verificar bloqueio por status
      const status = Alpine.store('app').statusData;
      if (status) {
        const bloqueio = GameSystems.verificarBloqueio(status, 'acao', acao.id);
        return !bloqueio.bloqueado;
      }
      
      return true;
    },
    
    async executarAcao(acao) {
      const user = Alpine.store('app').currentUser;
      if (!user) {
        Utils.showToast('Faça login para executar ações', 'warning');
        return;
      }
      
      if (!this.podeExecutar(acao)) {
        Utils.showToast('Ação em cooldown ou bloqueada', 'warning');
        return;
      }
      
      // Registrar execução
      localStorage.setItem(`acao_${acao.id}_${user.id}`, new Date().toISOString());
      
      // Aplicar efeitos
      if (acao.efeitos) {
        await GameSystems.aplicarEfeitos(user.id, acao.efeitos);
      }
      
      // Aplicar recompensas
      if (acao.recompensas) {
        if (acao.recompensas.xp) {
          await GameSystems.adicionarXP(user.id, acao.recompensas.xp);
        }
        if (acao.recompensas.moeda) {
          const status = await DataManager.getUserStatus(user.id);
          if (status.hudStatus) {
            status.hudStatus.moeda = (status.hudStatus.moeda || 0) + acao.recompensas.moeda;
          }
          await DataManager.updateUserStatus(user.id, status);
        }
      }
      
      // Atualizar status
      const status = await DataManager.getUserStatus(user.id);
      Alpine.store('app').statusData = status;
      
      Utils.showToast('Ação executada com sucesso!', 'success');
      Utils.playSound('success');
    }
  };
}

function ofensivaScreen() {
  return {
    diasConsecutivos: 0,
    mensagemMotivacional: 'Sua ofensiva começou! Pratique todos os dias para ela crescer.',
    diasSemana: [],
    recompensasDiarias: [],
    
    async init() {
      const user = Alpine.store('app').currentUser;
      if (user) {
        const status = await DataManager.getUserStatus(user.id);
        this.diasConsecutivos = status?.estatisticas?.diasConsecutivos || 0;
        this.carregarDiasSemana();
        this.carregarRecompensas();
      }
    },
    
    carregarDiasSemana() {
      const hoje = new Date();
      const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const diaAtual = hoje.getDay();
      
      this.diasSemana = dias.map((nome, index) => ({
        nome,
        ativo: index === diaAtual,
        futuro: index > diaAtual
      }));
    },
    
    carregarRecompensas() {
      this.recompensasDiarias = [
        { dia: 1, nome: 'Cristal', icone: 'bi bi-gem', disponivel: true, coletada: false },
        { dia: 2, nome: 'Baú', icone: 'bi bi-box', disponivel: false, coletada: false },
        { dia: 3, nome: 'Cesta de Cristais', icone: 'bi bi-basket', disponivel: false, coletada: false },
        { dia: 4, nome: 'Poção de Fé', icone: 'bi bi-heart', disponivel: false, coletada: false },
        { dia: 5, nome: 'Baú Dourado', icone: 'bi bi-box-seam', disponivel: false, coletada: false },
        { dia: 6, nome: 'Cristal Especial', icone: 'bi bi-star', disponivel: false, coletada: false },
        { dia: 7, nome: 'Baú Épico', icone: 'bi bi-trophy', disponivel: false, coletada: false }
      ];
      
      this.recompensasDiarias.forEach((r, index) => {
        r.disponivel = index < this.diasConsecutivos;
        r.coletada = index < this.diasConsecutivos - 1;
      });
    },
    
    async coletarRecompensa(recompensa) {
      if (!recompensa.disponivel || recompensa.coletada) return;
      
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      const status = await DataManager.getUserStatus(user.id);
      if (status.hudStatus) {
        status.hudStatus.moeda = (status.hudStatus.moeda || 0) + 50;
      }
      await DataManager.updateUserStatus(user.id, status);
      
      recompensa.coletada = true;
      Utils.showToast(`Recompensa coletada: ${recompensa.nome}!`, 'success');
      Utils.playSound('reward');
    },
    
    definirLembrete() {
      if ('Notification' in window && Notification.permission === 'granted') {
        Utils.showToast('Lembrete configurado!', 'success');
      } else {
        Integrations.requestNotificationPermission().then(granted => {
          if (granted) {
            Utils.showToast('Lembrete configurado!', 'success');
          } else {
            Utils.showToast('Permissão de notificação negada', 'warning');
          }
        });
      }
    }
  };
}

function lojaScreen() {
  return {
    lojaItems: [],
    itens: [],
    
    get moedas() {
      const status = Alpine.store('app').statusData;
      return status?.hudStatus?.moeda || 100;
    },
    
    async init() {
      this.lojaItems = await DataManager.getLojaItems();
      this.itens = await DataManager.getItens();
    },
    
    getItemImage(item) {
      // Tentar pegar imagem do item do catálogo
      if (item.conteudo && item.conteudo.length > 0) {
        const itemId = item.conteudo[0].itemId;
        const itemData = this.itens.find(i => i.id === itemId);
        if (itemData?.imagem) {
          return itemData.imagem;
        }
      }
      return item.imagem || 'assets/logotipos/notext-perfil-logo/perfil-colorido.png';
    },
    
    podeComprar(item) {
      const preco = item.preco?.moeda || item.preco || 0;
      return this.moedas >= preco;
    },
    
    async comprarItem(item) {
      if (!this.podeComprar(item)) {
        Utils.showToast('Moedas insuficientes!', 'error');
        Utils.playSound('fail');
        return;
      }
      
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      const preco = item.preco?.moeda || item.preco || 0;
      
      // Atualizar moedas
      const status = await DataManager.getUserStatus(user.id);
      if (status.hudStatus) {
        status.hudStatus.moeda = Math.max(0, (status.hudStatus.moeda || 0) - preco);
      } else {
        status.hudStatus = { moeda: Math.max(0, -preco) };
      }
      
      // Adicionar itens ao inventário (pode ter múltiplos itens no conteúdo)
      const usuario = await DataManager.getUsuario(user.id);
      if (!usuario.inventario) {
        usuario.inventario = [];
      }
      
      const conteudo = item.conteudo || [{ itemId: item.itemId || item.id, quantidade: 1 }];
      conteudo.forEach(conteudoItem => {
        const itemInventario = usuario.inventario.find(i => i.itemId === conteudoItem.itemId);
        if (itemInventario) {
          itemInventario.quantidade = (itemInventario.quantidade || 0) + (conteudoItem.quantidade || 1);
        } else {
          usuario.inventario.push({
            itemId: conteudoItem.itemId,
            quantidade: conteudoItem.quantidade || 1
          });
        }
      });
      
      // Salvar
      await DataManager.updateUserStatus(user.id, status);
      
      const usuarios = await DataManager.getUsuarios();
      const index = usuarios.findIndex(u => u.id === usuario.id);
      if (index >= 0) {
        usuarios[index] = usuario;
        const data = await DataManager.loadJSON('usuarios');
        if (data) {
          data.usuarios = usuarios;
          DataManager.saveJSON('usuarios', data);
        }
      }
      
      // Atualizar store
      Alpine.store('app').statusData = status;
      
      Utils.showToast('Item comprado com sucesso!', 'success');
      Utils.playSound('reward');
    }
  };
}

function inventarioScreen() {
  return {
    inventario: [],
    itens: [],
    filter: 'todos',
    
    get filteredInventario() {
      if (this.filter === 'todos') return this.inventario;
      return this.inventario.filter(item => {
        const itemData = this.itens.find(i => i.id === item.itemId);
        if (!itemData) return false;
        if (this.filter === 'permanente') return itemData.tipo === 'permanente';
        if (this.filter === 'consumivel') return itemData.tipo === 'consumivel';
        if (this.filter === 'armadura') return itemData.categoria === 'armadura';
        return true;
      });
    },
    
    async init() {
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      const usuario = await DataManager.getUsuario(user.id);
      this.inventario = usuario?.inventario || [];
      
      // Carregar dados dos itens
      this.itens = await DataManager.getItens();
    },
    
    getItemName(itemId) {
      const item = this.itens.find(i => i.id === itemId);
      return item?.nome || `Item ${itemId}`;
    },
    
    getItemImage(itemId) {
      const item = this.itens.find(i => i.id === itemId);
      return item?.imagem || 'assets/logotipos/notext-perfil-logo/perfil-colorido.png';
    },
    
    async usarItem(item) {
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      const itemData = this.itens.find(i => i.id === item.itemId);
      if (!itemData) return;
      
      // Verificar bloqueio
      const status = await DataManager.getUserStatus(user.id);
      const bloqueio = GameSystems.verificarBloqueio(status, 'item', item.itemId);
      
      if (bloqueio.bloqueado) {
        Utils.showToast(bloqueio.motivo, 'error');
        return;
      }
      
      // Aplicar efeitos do item
      if (itemData.efeitos) {
        await GameSystems.aplicarEfeitos(user.id, itemData.efeitos);
      }
      
      // Reduzir quantidade
      item.quantidade--;
      if (item.quantidade <= 0) {
        const usuario = await DataManager.getUsuario(user.id);
        usuario.inventario = usuario.inventario.filter(i => i.itemId !== item.itemId);
        const usuarios = await DataManager.getUsuarios();
        const index = usuarios.findIndex(u => u.id === usuario.id);
        if (index >= 0) {
          usuarios[index] = usuario;
          const data = await DataManager.loadJSON('usuarios');
          if (data) {
            data.usuarios = usuarios;
            DataManager.saveJSON('usuarios', data);
          }
        }
      }
      
      Utils.showToast('Item usado!', 'success');
      Utils.playSound('confirm');
      await this.init(); // Recarregar
    }
  };
}

function configuracoesScreen() {
  return {
    config: {
      notificacoes: { push: true, email: true },
      som: true,
      acessibilidade: { tts: false, highContrast: false, libras: false }
    },
    
    async init() {
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      const status = await DataManager.getUserStatus(user.id);
      if (status.configuracoes) {
        this.config = { ...this.config, ...status.configuracoes };
      }
    },
    
    async salvarConfig() {
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      const status = await DataManager.getUserStatus(user.id);
      status.configuracoes = this.config;
      await DataManager.updateUserStatus(user.id, status);
      Utils.showToast('Configurações salvas!', 'success');
    },
    
    async executarConfissao() {
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      const sucesso = await GameSystems.executarConfissao(user.id);
      if (sucesso) {
        // Recarregar dados
        const status = await DataManager.getUserStatus(user.id);
        Alpine.store('app').statusData = status;
      }
    },
    
    verTutorial() {
      window.dispatchEvent(new CustomEvent('abrir-tutorial'));
    }
  };
}

function rankingScreen() {
  return {
    ranking: [],
    filter: 'geral',
    
    async init() {
      await this.carregarRanking();
    },
    
    async carregarRanking() {
      const usuarios = await DataManager.getUsuarios();
      const rankingData = [];
      
      for (const usuario of usuarios) {
        const status = await DataManager.getUserStatus(usuario.id);
        rankingData.push({
          id: usuario.id,
          nome: usuario.nome,
          pontuacao: status?.atributos?.xp || 0,
          nivel: status?.atributos?.nivel || 1,
          sid: usuario.sid
        });
      }
      
      // Ordenar por pontuação
      this.ranking = rankingData.sort((a, b) => b.pontuacao - a.pontuacao);
    },
    
    getAvatarUrl(jogador) {
      if (!jogador?.sid) return 'assets/logotipos/notext-perfil-logo/perfil-colorido.png';
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${jogador.sid}`;
    }
  };
}

