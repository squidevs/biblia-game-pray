// Sistema completo de estudos

const EstudosSystem = {
  // Livros da Bíblia
  livros: {
    AT: [
      { nome: 'Gênesis', capitulos: 50, abreviacao: 'Gn' },
      { nome: 'Êxodo', capitulos: 40, abreviacao: 'Ex' },
      { nome: 'Levítico', capitulos: 27, abreviacao: 'Lv' },
      { nome: 'Números', capitulos: 36, abreviacao: 'Nm' },
      { nome: 'Deuteronômio', capitulos: 34, abreviacao: 'Dt' },
      { nome: 'Josué', capitulos: 24, abreviacao: 'Js' },
      { nome: 'Juízes', capitulos: 21, abreviacao: 'Jz' },
      { nome: 'Rute', capitulos: 4, abreviacao: 'Rt' },
      { nome: '1 Samuel', capitulos: 31, abreviacao: '1Sm' },
      { nome: '2 Samuel', capitulos: 24, abreviacao: '2Sm' },
      { nome: '1 Reis', capitulos: 22, abreviacao: '1Rs' },
      { nome: '2 Reis', capitulos: 25, abreviacao: '2Rs' },
      { nome: '1 Crônicas', capitulos: 29, abreviacao: '1Cr' },
      { nome: '2 Crônicas', capitulos: 36, abreviacao: '2Cr' },
      { nome: 'Esdras', capitulos: 10, abreviacao: 'Ed' },
      { nome: 'Neemias', capitulos: 13, abreviacao: 'Ne' },
      { nome: 'Ester', capitulos: 10, abreviacao: 'Et' },
      { nome: 'Jó', capitulos: 42, abreviacao: 'Jó' },
      { nome: 'Salmos', capitulos: 150, abreviacao: 'Sl' },
      { nome: 'Provérbios', capitulos: 31, abreviacao: 'Pv' },
      { nome: 'Eclesiastes', capitulos: 12, abreviacao: 'Ec' },
      { nome: 'Cantares', capitulos: 8, abreviacao: 'Ct' },
      { nome: 'Isaías', capitulos: 66, abreviacao: 'Is' },
      { nome: 'Jeremias', capitulos: 52, abreviacao: 'Jr' },
      { nome: 'Lamentações', capitulos: 5, abreviacao: 'Lm' },
      { nome: 'Ezequiel', capitulos: 48, abreviacao: 'Ez' },
      { nome: 'Daniel', capitulos: 12, abreviacao: 'Dn' },
      { nome: 'Oséias', capitulos: 14, abreviacao: 'Os' },
      { nome: 'Joel', capitulos: 3, abreviacao: 'Jl' },
      { nome: 'Amós', capitulos: 9, abreviacao: 'Am' },
      { nome: 'Obadias', capitulos: 1, abreviacao: 'Ob' },
      { nome: 'Jonas', capitulos: 4, abreviacao: 'Jn' },
      { nome: 'Miqueias', capitulos: 7, abreviacao: 'Mq' },
      { nome: 'Naum', capitulos: 3, abreviacao: 'Na' },
      { nome: 'Habacuque', capitulos: 3, abreviacao: 'Hc' },
      { nome: 'Sofonias', capitulos: 3, abreviacao: 'Sf' },
      { nome: 'Ageu', capitulos: 2, abreviacao: 'Ag' },
      { nome: 'Zacarias', capitulos: 14, abreviacao: 'Zc' },
      { nome: 'Malaquias', capitulos: 4, abreviacao: 'Ml' }
    ],
    NT: [
      { nome: 'Mateus', capitulos: 28, abreviacao: 'Mt' },
      { nome: 'Marcos', capitulos: 16, abreviacao: 'Mc' },
      { nome: 'Lucas', capitulos: 24, abreviacao: 'Lc' },
      { nome: 'João', capitulos: 21, abreviacao: 'Jo' },
      { nome: 'Atos', capitulos: 28, abreviacao: 'At' },
      { nome: 'Romanos', capitulos: 16, abreviacao: 'Rm' },
      { nome: '1 Coríntios', capitulos: 16, abreviacao: '1Co' },
      { nome: '2 Coríntios', capitulos: 13, abreviacao: '2Co' },
      { nome: 'Gálatas', capitulos: 6, abreviacao: 'Gl' },
      { nome: 'Efésios', capitulos: 6, abreviacao: 'Ef' },
      { nome: 'Filipenses', capitulos: 4, abreviacao: 'Fp' },
      { nome: 'Colossenses', capitulos: 4, abreviacao: 'Cl' },
      { nome: '1 Tessalonicenses', capitulos: 5, abreviacao: '1Ts' },
      { nome: '2 Tessalonicenses', capitulos: 3, abreviacao: '2Ts' },
      { nome: '1 Timóteo', capitulos: 6, abreviacao: '1Tm' },
      { nome: '2 Timóteo', capitulos: 4, abreviacao: '2Tm' },
      { nome: 'Tito', capitulos: 3, abreviacao: 'Tt' },
      { nome: 'Filemom', capitulos: 1, abreviacao: 'Fm' },
      { nome: 'Hebreus', capitulos: 13, abreviacao: 'Hb' },
      { nome: 'Tiago', capitulos: 5, abreviacao: 'Tg' },
      { nome: '1 Pedro', capitulos: 5, abreviacao: '1Pe' },
      { nome: '2 Pedro', capitulos: 3, abreviacao: '2Pe' },
      { nome: '1 João', capitulos: 5, abreviacao: '1Jo' },
      { nome: '2 João', capitulos: 1, abreviacao: '2Jo' },
      { nome: '3 João', capitulos: 1, abreviacao: '3Jo' },
      { nome: 'Judas', capitulos: 1, abreviacao: 'Jd' },
      { nome: 'Apocalipse', capitulos: 22, abreviacao: 'Ap' }
    ]
  },
  
  // Buscar versículo da API
  async buscarVersiculo(livro, capitulo, versiculo, traducao = 'nvi') {
    try {
      const url = `https://www.abibliadigital.com.br/api/verses/${traducao}/${livro}/${capitulo}/${versiculo}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao buscar versículo');
      const data = await response.json();
      return {
        texto: data.text,
        referencia: `${data.book.name} ${data.chapter}:${data.number}`,
        livro: data.book.name,
        capitulo: data.chapter,
        versiculo: data.number
      };
    } catch (error) {
      console.error('Erro ao buscar versículo:', error);
      return {
        texto: `Versículo ${versiculo} de ${livro} ${capitulo}`,
        referencia: `${livro} ${capitulo}:${versiculo}`
      };
    }
  },
  
  // Gerar perguntas de quiz (simplificado)
  gerarPerguntas(livro, capitulo) {
    // Em produção, isso viria de um banco de perguntas
    return [
      {
        pergunta: `Qual é o tema principal do capítulo ${capitulo} de ${livro}?`,
        opcoes: [
          { texto: 'Opção A', correta: false },
          { texto: 'Opção B', correta: true },
          { texto: 'Opção C', correta: false },
          { texto: 'Opção D', correta: false }
        ]
      },
      {
        pergunta: `Qual versículo menciona...?`,
        opcoes: [
          { texto: 'Versículo 1', correta: false },
          { texto: 'Versículo 5', correta: true },
          { texto: 'Versículo 10', correta: false },
          { texto: 'Versículo 15', correta: false }
        ]
      }
    ];
  },
  
  // Salvar progresso
  async salvarProgresso(userId, livro, capitulo, concluido) {
    const progresso = JSON.parse(localStorage.getItem(`progresso_estudos_${userId}`) || '{}');
    if (!progresso[livro]) {
      progresso[livro] = {};
    }
    progresso[livro][capitulo] = {
      concluido: concluido,
      data: new Date().toISOString()
    };
    localStorage.setItem(`progresso_estudos_${userId}`, JSON.stringify(progresso));
    
    // Atualizar estatísticas
    const status = await DataManager.getUserStatus(userId);
    if (status.estatisticas) {
      if (concluido) {
        status.estatisticas.livrosEstudados = (status.estatisticas.livrosEstudados || 0) + 1;
      }
    }
    await DataManager.updateUserStatus(userId, status);
  },
  
  // Verificar se capítulo está concluído
  isCapituloConcluido(userId, livro, capitulo) {
    const progresso = JSON.parse(localStorage.getItem(`progresso_estudos_${userId}`) || '{}');
    return progresso[livro]?.[capitulo]?.concluido || false;
  },
  
  // Calcular progresso do livro
  calcularProgressoLivro(userId, livro, totalCapitulos) {
    const progresso = JSON.parse(localStorage.getItem(`progresso_estudos_${userId}`) || '{}');
    const capitulosConcluidos = Object.values(progresso[livro] || {}).filter(c => c.concluido).length;
    return Math.round((capitulosConcluidos / totalCapitulos) * 100);
  }
};

window.EstudosSystem = EstudosSystem;

