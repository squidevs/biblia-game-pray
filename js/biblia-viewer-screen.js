// Tela do Visualizador de Bíblia
function bibliaViewerScreen() {
  return {
    testamentoSelecionado: null,
    livroSelecionado: null,
    capituloSelecionado: null,
    capituloCarregado: false,
    capituloData: null,
    isFavorito: false,
    loading: false,
    
    get livrosFiltrados() {
      if (!this.testamentoSelecionado) return [];
      return EstudosSystem.livros[this.testamentoSelecionado] || [];
    },
    
    selecionarTestamento(testamento) {
      this.testamentoSelecionado = testamento;
      this.livroSelecionado = null;
      this.capituloSelecionado = null;
    },
    
    selecionarLivro(livro) {
      this.livroSelecionado = livro;
      this.capituloSelecionado = null;
    },
    
    async carregarCapitulo(capitulo) {
      if (!this.livroSelecionado) return;
      this.loading = true;
      this.capituloSelecionado = capitulo;
      try {
        // Buscar todos os versículos do capítulo
        const response = await fetch(`https://www.abibliadigital.com.br/api/verses/nvi/${this.livroSelecionado.abreviacao}/${capitulo}`);
        const data = await response.json();
        if (data && data.verses) {
          this.capituloData = {
            livro: this.livroSelecionado.nome,
            livroAbrev: this.livroSelecionado.abreviacao,
            capitulo,
            versiculos: data.verses
          };
          this.capituloCarregado = true;
          this.verificarFavorito();
          // Renderizar leitura contínua
          setTimeout(() => { this.renderLeituraContinua(); }, 100);
        } else {
          Utils.showToast('Erro ao carregar capítulo', 'error');
        }
      } catch (error) {
        console.error('Erro:', error);
        Utils.showToast('Erro ao carregar capítulo', 'error');
      } finally {
        this.loading = false;
      }
    },

    renderLeituraContinua() {
      const container = document.getElementById('leitura-biblica');
      if (!container || !this.capituloData?.versiculos) return;
      container.innerHTML = '';
      this.capituloData.versiculos.forEach(v => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${v.number}</strong> ${v.text}`;
        container.appendChild(p);
      });
      // Barra de progresso
      const barra = document.getElementById('progresso-leitura');
      const btnQuiz = document.getElementById('btn-quiz-biblia');
      container.addEventListener('scroll', function(){
        const scrollMax = container.scrollHeight - container.clientHeight;
        const scrollAtual = container.scrollTop;
        const pct = scrollMax > 0 ? Math.min(100, Math.round((scrollAtual/scrollMax)*100)) : 100;
        barra.style.width = pct + '%';
        if (pct === 100) {
          btnQuiz.style.display = 'inline-block';
        }
      });
      container.addEventListener('mouseenter', function(){
        const scrollMax = container.scrollHeight - container.clientHeight;
        if (scrollMax === 0) btnQuiz.style.display = 'inline-block';
      });
      btnQuiz.addEventListener('click', function(){
        window.dispatchEvent(new CustomEvent('liberar-quiz', { detail: { livro: this.capituloData.livroAbrev, capitulo: this.capituloData.capitulo } }));
        btnQuiz.disabled = true;
        btnQuiz.textContent = 'Quiz liberado!';
      }.bind(this));
    },
    
    selecionarVersiculo(versiculo) {
      // Copiar versículo para área de transferência
      const texto = `${this.capituloData.livro} ${this.capituloData.capitulo}:${versiculo.numero} - ${versiculo.texto}`;
      navigator.clipboard.writeText(texto).then(() => {
        Utils.showToast('Versículo copiado!', 'success');
      });
    },
    
    verificarFavorito() {
      const user = Alpine.store('app').currentUser;
      if (!user) return;
      
      const favoritos = JSON.parse(localStorage.getItem(`favoritos_${user.id}`) || '[]');
      const ref = `${this.capituloData.livroAbrev}_${this.capituloData.capitulo}`;
      this.isFavorito = favoritos.includes(ref);
    },
    
    toggleFavorito() {
      const user = Alpine.store('app').currentUser;
      if (!user) {
        Utils.showToast('Faça login para favoritar', 'warning');
        return;
      }
      
      const favoritos = JSON.parse(localStorage.getItem(`favoritos_${user.id}`) || '[]');
      const ref = `${this.capituloData.livroAbrev}_${this.capituloData.capitulo}`;
      
      if (this.isFavorito) {
        const index = favoritos.indexOf(ref);
        if (index > -1) {
          favoritos.splice(index, 1);
        }
        this.isFavorito = false;
        Utils.showToast('Removido dos favoritos', 'info');
      } else {
        favoritos.push(ref);
        this.isFavorito = true;
        Utils.showToast('Adicionado aos favoritos', 'success');
      }
      
      localStorage.setItem(`favoritos_${user.id}`, JSON.stringify(favoritos));
    }
  };
}

