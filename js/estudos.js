import { fetchJSON } from "./utils.js";
import { getChapter, saveReadingProgress, loadReadingProgress, calculateReadingProgress } from "./bible-api.js";

const TESTAMENTS = [
  {
    id: "antigo",
    nome: "Antigo Testamento",
    descricao: "Lei, história e poesia",
    icon: "auto_stories",
  },
  {
    id: "novo",
    nome: "Novo Testamento",
    descricao: "Evangelhos e cartas",
    icon: "book_online",
  },
];

const BOOKS_DATA = {
  antigo: [
    {
      id: "genesis",
      nome: "Gênesis",
      resumo: "Criação e patriarcas",
      icon: "forest",
      categoria: "pureza",
      capitulos: [
        { numero: 1, titulo: "Criação", status: "done" },
        { numero: 2, titulo: "Queda", status: "done" },
        { numero: 3, titulo: "Dilúvio", status: "current" },
        {
          numero: 4,
          titulo: "Torre de Babel",
          status: "locked",
          guard: {
            key: "orgulhoEgoismo",
            threshold: 75,
            message:
              "Orgulho/Egoísmo elevado impede avançar neste capítulo. Confesse para continuar.",
          },
        },
        { numero: 5, titulo: "Abraão", status: "locked" },
      ],
    },
    {
      id: "exodo",
      nome: "Êxodo",
      resumo: "Libertação",
      icon: "hail",
      categoria: "libertacao",
      capitulos: [
        { numero: 1, titulo: "Escravidão", status: "done" },
        { numero: 2, titulo: "Chamado de Moisés", status: "done" },
        { numero: 3, titulo: "Pragas", status: "done" },
        { numero: 4, titulo: "Páscoa", status: "current" },
        { numero: 5, titulo: "Mar Vermelho", status: "locked" },
      ],
    },
  ],
  novo: [
    {
      id: "mateus",
      nome: "Mateus",
      resumo: "Vida de Jesus",
      icon: "church",
      categoria: "evangelho",
      capitulos: [
        { numero: 1, titulo: "Genealogia", status: "done" },
        { numero: 2, titulo: "Nascimento", status: "done" },
        { numero: 3, titulo: "Batismo", status: "current" },
        { numero: 4, titulo: "Tentação", status: "locked" },
        { numero: 5, titulo: "Sermão", status: "locked" },
      ],
    },
    {
      id: "atos",
      nome: "Atos",
      resumo: "Igreja primitiva",
      icon: "groups",
      categoria: "igreja",
      capitulos: [
        { numero: 1, titulo: "Ascensão", status: "done" },
        { numero: 2, titulo: "Pentecostes", status: "current" },
        { numero: 3, titulo: "Milagres", status: "locked" },
        { numero: 4, titulo: "Perseguição", status: "locked" },
      ],
    },
  ],
};

const CYCLE_STEPS = [
  {
    id: 1,
    title: "Ciclo 1 • Leitura inicial",
    description: "Leia o capítulo completo e marque um versículo favorito.",
  },
  {
    id: 2,
    title: "Ciclo 2 • Revisão + Quiz curto",
    description: "Leia novamente parte do capítulo e responda 3 perguntas.",
  },
  {
    id: 3,
    title: "Ciclo 3 • Aplicação prática",
    description:
      "Leia a última parte e escreva como aplicar o texto ao seu dia.",
  },
  {
    id: 4,
    title: "Ciclo 4 • Quiz final",
    description:
      "Quiz completo do capítulo. Precisa de 75% para liberar o próximo.",
  },
];

function cloneBooks(testamentId, works = {}) {
  return BOOKS_DATA[testamentId].map((book) => {
    const completedChapters = book.capitulos.filter(
      (chapter) => chapter.status === "done"
    ).length;
    const progress = Math.round(
      (completedChapters / book.capitulos.length) * 100
    );

    const bloqueado = works.imoralidadeImpureza >= 75 && book.categoria === "pureza";

    return {
      ...book,
      progresso: progress,
      bloqueado,
      blockMessage: bloqueado
        ? "Impureza elevada bloqueia este livro. Conclua missões de pureza."
        : null,
      testament: testamentId,
    };
  });
}

function evaluateChapter(chapter, works = {}) {
  const guard = chapter.guard;
  if (!guard) {
    return { ...chapter, blocked: chapter.status === "locked", blockMessage: null };
  }

  const current = works[guard.key] ?? 0;
  const blocked = current >= guard.threshold;
  return {
    ...chapter,
    blocked: blocked || chapter.status === "locked",
    blockMessage: blocked ? guard.message : null,
  };
}

function createEstudosStore() {
  return {
    loading: true,
    status: null,
    estudos: [],
    testaments: TESTAMENTS,
    selectedTestament: "antigo",
    books: [],
    selectedBook: null,
    chapters: [],
    selectedChapter: null,
    showCyclePanel: false,
    cycleStep: 1,
    currentChapterData: null,
    readingProgress: 0,

    async init() {
      console.log('[Estudos] init() chamado');
      if (this.loading === false && this.books.length) {
        console.log('[Estudos] Já carregado, pulando');
        return;
      }

      this.loading = true;
      try {
        const [status, estudos] = await Promise.all([
          fetchJSON("dados/status_player_base.json").catch(() => fetchJSON("status_player_base.json")),
          fetchJSON("dados/estudos.json").catch(() => fetchJSON("estudos.json")),
        ]);
        
        console.log('[Estudos] Dados recebidos:', {
          status: !!status,
          estudos: estudos?.estudos?.length ?? estudos?.length ?? 0
        });
        
        this.status = status;
        // estudos.json tem testamentos e livros, não estudos[]
        // Vamos usar os testamentos e livros diretamente
        if (estudos?.testamentos && estudos?.livros) {
          // Atualiza testaments com dados do JSON
          this.testaments = estudos.testamentos.map(t => ({
            id: t.id === 'velho' ? 'antigo' : t.id === 'novo' ? 'novo' : t.id,
            nome: t.titulo,
            descricao: t.descricao,
            icon: t.id === 'velho' ? 'auto_stories' : 'book_online'
          }));
          // Salva estudos.json para usar em refreshBooks
          this.estudos = estudos;
          console.log('[Estudos] estudos.json carregado:', {
            testamentos: estudos.testamentos.length,
            livros: estudos.livros.length
          });
        } else {
          this.estudos = estudos?.estudos ?? estudos ?? [];
          console.log('[Estudos] Usando estrutura alternativa');
        }
        this.refreshBooks();
        
        console.log('[Estudos] Dados processados:', {
          testaments: this.testaments.length,
          books: this.books.length
        });
      } catch (error) {
        console.error("[Estudos] Falha ao carregar dados", error);
        console.error("[Estudos] Stack trace:", error.stack);
      } finally {
        this.loading = false;
        console.log('[Estudos] load() finalizado, loading =', this.loading);
      }
    },

    refreshBooks() {
      const works = this.status?.atributos?.obrasCarneAgrupadas ?? {};
      
      // Se temos estudos.json carregado, usa os livros de lá
      if (this.estudos?.livros) {
        // Mapeia 'antigo' -> 'velho' e 'novo' -> 'novo' para corresponder ao JSON
        const testamentId = this.selectedTestament === 'antigo' ? 'velho' : 
                           this.selectedTestament === 'novo' ? 'novo' : 
                           this.selectedTestament;
        const filteredBooks = this.estudos.livros
          .filter(book => book.testamento === testamentId)
          .map(book => {
            const progresso = book.progresso ?? 0;
            const bloqueado = evaluateChapter({ 
              guard: book.guard 
            }, works).blocked;
            
            return {
              id: book.id,
              nome: book.titulo || book.nome || book.id,
              resumo: book.resumo || book.descricao || '',
              icon: book.icone || 'menu_book',
              progresso,
              bloqueado,
              blockMessage: bloqueado ? 'Bloqueado por status' : null,
              testamento: book.testamento,
              testament: this.selectedTestament, // Para compatibilidade
              capitulos_total: book.capitulos_total || 0,
              capitulos_lidos: book.capitulos_lidos || 0,
              categoria: book.categoria || '',
              // Gera capítulos básicos se não existirem
              capitulos: book.capitulos || Array.from({ length: book.capitulos_total || 0 }, (_, i) => ({
                numero: i + 1,
                titulo: `Capítulo ${i + 1}`,
                status: i < book.capitulos_lidos ? 'done' : i === book.capitulos_lidos ? 'current' : 'locked'
              }))
            };
          });
        
        this.books = filteredBooks;
        console.log('[Estudos] refreshBooks usando estudos.json:', {
          testament: this.selectedTestament,
          books: this.books.length
        });
      } else {
        // Fallback para BOOKS_DATA hardcoded
        this.books = cloneBooks(this.selectedTestament, works);
        console.log('[Estudos] refreshBooks usando BOOKS_DATA (fallback):', {
          testament: this.selectedTestament,
          books: this.books.length
        });
      }
      
      if (!this.selectedBook || this.selectedBook.testament !== this.selectedTestament) {
        this.selectedBook = this.books[0];
      } else {
        const updated = this.books.find((book) => book.id === this.selectedBook.id);
        this.selectedBook = updated ?? this.books[0];
      }
      this.refreshChapters();
    },

    refreshChapters() {
      if (!this.selectedBook) {
        this.chapters = [];
        return;
      }
      const works = this.status?.atributos?.obrasCarneAgrupadas ?? {};
      this.chapters = this.selectedBook.capitulos.map((chapter) =>
        evaluateChapter(chapter, works)
      );
    },

    selectTestament(id) {
      if (this.selectedTestament === id) return;
      this.selectedTestament = id;
      this.refreshBooks();
      this.showCyclePanel = false;
    },

    selectBook(bookId) {
      const book = this.books.find((item) => item.id === bookId);
      if (!book || book.bloqueado) return;
      this.selectedBook = book;
      this.refreshChapters();
      this.showCyclePanel = false;
    },

    async startChapter(chapter) {
      if (chapter.blocked) return;
      this.selectedChapter = chapter;
      this.cycleStep = 1;
      this.showCyclePanel = true;
      
      // Carrega capítulo da API da Bíblia
      if (this.selectedBook && chapter.numero) {
        try {
          const bookAbbrev = this.getBookAbbrev(this.selectedBook.id);
          const chapterData = await getChapter(bookAbbrev, chapter.numero);
          if (chapterData) {
            this.currentChapterData = chapterData;
            // Carrega progresso salvo
            const versesRead = loadReadingProgress(bookAbbrev, chapter.numero);
            this.readingProgress = calculateReadingProgress(versesRead, chapterData.verses.length);
          }
        } catch (error) {
          console.error("[Estudos] Erro ao carregar capítulo:", error);
        }
      }
    },
    
    getBookAbbrev(bookId) {
      // Mapeia IDs dos livros para abreviações da API
      const abbrevMap = {
        genesis: 'gn',
        exodo: 'ex',
        levitico: 'lv',
        numeros: 'nm',
        deuteronomio: 'dt',
        joao: 'jo',
        mateus: 'mt',
        marcos: 'mc',
        lucas: 'lc'
      };
      return abbrevMap[bookId] || bookId;
    },
    
    updateReadingProgress(versesRead) {
      if (!this.selectedBook || !this.selectedChapter) return;
      const bookAbbrev = this.getBookAbbrev(this.selectedBook.id);
      saveReadingProgress(bookAbbrev, this.selectedChapter.numero, versesRead);
      if (this.currentChapterData) {
        this.readingProgress = calculateReadingProgress(versesRead, this.currentChapterData.verses.length);
      }
    },
    
    markVerseRead(verseNumber) {
      if (!this.selectedBook || !this.selectedChapter) return;
      const bookAbbrev = this.getBookAbbrev(this.selectedBook.id);
      const currentRead = loadReadingProgress(bookAbbrev, this.selectedChapter.numero);
      const newRead = Math.max(currentRead, verseNumber);
      this.updateReadingProgress(newRead);
    },
    
    isVerseRead(verseNumber) {
      if (!this.selectedBook || !this.selectedChapter) return false;
      const bookAbbrev = this.getBookAbbrev(this.selectedBook.id);
      const versesRead = loadReadingProgress(bookAbbrev, this.selectedChapter.numero);
      return verseNumber <= versesRead;
    },

    advanceCycle() {
      if (this.cycleStep < CYCLE_STEPS.length) {
        this.cycleStep += 1;
      } else {
        alert(
          "Parabéns! Você concluiu o ciclo deste capítulo. Em breve liberaremos o próximo."
        );
        this.showCyclePanel = false;
      }
    },

    get selectedCycle() {
      return CYCLE_STEPS[this.cycleStep - 1];
    },

    get cycleTimeline() {
      return CYCLE_STEPS.map((step) => ({
        ...step,
        state: step.id < this.cycleStep ? "done" : step.id === this.cycleStep ? "current" : "locked",
      }));
    },

    get bannerMessage() {
      if (!this.selectedBook) return null;
      if (this.selectedBook.blockMessage) return this.selectedBook.blockMessage;
      if (this.chapters.some((chapter) => chapter.blockMessage)) {
        return "Alguns capítulos estão bloqueados pelo seu status. Considere confessar para desbloquear.";
      }
      return null;
    },
  };
}

// Exporta como window.estudosStore para compatibilidade
window.estudosStore = createEstudosStore;

