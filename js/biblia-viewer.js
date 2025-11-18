// Visualizador de Bíblia - Leitor de versículos

const BibliaViewer = {
  async buscarCapitulo(livro, capitulo, traducao = 'nvi') {
    try {
      // Primeiro, buscar informações do capítulo
      const url = `https://www.abibliadigital.com.br/api/verses/${traducao}/${livro}/${capitulo}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        // Tentar buscar versículo por versículo
        return await this.buscarCapituloVersiculoPorVersiculo(livro, capitulo, traducao);
      }
      
      const data = await response.json();
      
      // Verificar estrutura da resposta
      if (data.verses && Array.isArray(data.verses)) {
        return {
          livro: data.book?.name || livro,
          livroAbrev: livro,
          capitulo: data.chapter || capitulo,
          versiculos: data.verses.map(v => ({
            numero: v.number || v.verse || 0,
            texto: v.text || ''
          }))
        };
      } else if (data.verse) {
        // Se retornou apenas um versículo, buscar todos
        return await this.buscarCapituloVersiculoPorVersiculo(livro, capitulo, traducao);
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar capítulo:', error);
      // Tentar método alternativo
      return await this.buscarCapituloVersiculoPorVersiculo(livro, capitulo, traducao);
    }
  },
  
  async buscarCapituloVersiculoPorVersiculo(livro, capitulo, traducao = 'nvi') {
    try {
      // Buscar versículos um por um (máximo 50 versículos por capítulo)
      const versiculos = [];
      let versiculoNum = 1;
      let tentativas = 0;
      const maxTentativas = 50;
      
      while (tentativas < maxTentativas) {
        try {
          const url = `https://www.abibliadigital.com.br/api/verses/${traducao}/${livro}/${capitulo}/${versiculoNum}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            // Se não encontrou este versículo, provavelmente acabou o capítulo
            break;
          }
          
          const data = await response.json();
          if (data && data.text) {
            versiculos.push({
              numero: data.number || versiculoNum,
              texto: data.text
            });
            versiculoNum++;
            tentativas = 0; // Reset contador se encontrou
          } else {
            break;
          }
        } catch (err) {
          tentativas++;
          if (tentativas >= 3) break; // Parar após 3 erros consecutivos
          versiculoNum++;
        }
      }
      
      if (versiculos.length > 0) {
        // Buscar nome do livro
        const primeiroVersiculo = await fetch(`https://www.abibliadigital.com.br/api/verses/${traducao}/${livro}/${capitulo}/1`);
        const livroData = primeiroVersiculo.ok ? await primeiroVersiculo.json() : null;
        
        return {
          livro: livroData?.book?.name || livro,
          livroAbrev: livro,
          capitulo: capitulo,
          versiculos: versiculos
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar capítulo versículo por versículo:', error);
      return null;
    }
  },
  
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
        livroAbrev: livro,
        capitulo: data.chapter,
        versiculo: data.number
      };
    } catch (error) {
      console.error('Erro ao buscar versículo:', error);
      return null;
    }
  },
  
  async buscarPorTermo(termo, traducao = 'nvi') {
    try {
      const url = `https://www.abibliadigital.com.br/api/verses/${traducao}/search/${encodeURIComponent(termo)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao buscar');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar por termo:', error);
      return null;
    }
  }
};

window.BibliaViewer = BibliaViewer;

