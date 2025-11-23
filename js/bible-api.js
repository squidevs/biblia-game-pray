/**
 * Integração com API da Bíblia
 * Busca versículos, capítulos e livros
 */

// API da Bíblia (usando Bible API ou similar)
const BIBLE_API_BASE = "https://www.abibliadigital.com.br/api";
const BIBLE_API_VERSES = `${BIBLE_API_BASE}/verses`;
const BIBLE_API_CHAPTERS = `${BIBLE_API_BASE}/chapters`;
const BIBLE_API_BOOKS = `${BIBLE_API_BASE}/books`;

/**
 * Busca versículo do dia
 * @param {string} version - Versão da Bíblia (default: 'nvi')
 * @returns {Promise<Object>} Versículo do dia
 */
export async function getVerseOfTheDay(version = 'nvi') {
  try {
    // Gera data do dia como seed para versículo
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    // Lista de versículos populares (pode ser expandida)
    const popularVerses = [
      { book: 'jo', chapter: 3, verse: 16 },
      { book: 'mt', chapter: 28, verse: 20 },
      { book: 'rm', chapter: 8, verse: 28 },
      { book: 'sl', chapter: 23, verse: 1 },
      { book: '1co', chapter: 13, verse: 4 },
      { book: 'ef', chapter: 2, verse: 8 },
      { book: 'fp', chapter: 4, verse: 13 },
      { book: 'is', chapter: 40, verse: 31 },
      { book: 'jr', chapter: 29, verse: 11 },
      { book: 'pv', chapter: 3, verse: 5 }
    ];
    
    const selected = popularVerses[dayOfYear % popularVerses.length];
    
    const response = await fetch(
      `${BIBLE_API_VERSES}/${version}/${selected.book}/${selected.chapter}/${selected.verse}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      text: data.text,
      book: data.book.name,
      chapter: data.chapter,
      verse: data.number,
      version: data.version
    };
  } catch (error) {
    console.error('[Bible API] Erro ao buscar versículo do dia:', error);
    // Fallback
    return {
      text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
      book: "João",
      chapter: 3,
      verse: 16,
      version: "NVI"
    };
  }
}

/**
 * Busca capítulo completo
 * @param {string} book - Abreviação do livro (ex: 'jo', 'mt')
 * @param {number} chapter - Número do capítulo
 * @param {string} version - Versão da Bíblia (default: 'nvi')
 * @returns {Promise<Object>} Capítulo completo
 */
export async function getChapter(book, chapter, version = 'nvi') {
  try {
    const response = await fetch(
      `${BIBLE_API_CHAPTERS}/${version}/${book}/${chapter}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      book: data.book.name,
      chapter: data.chapter.number,
      verses: data.verses.map(v => ({
        number: v.number,
        text: v.text
      })),
      version: data.version
    };
  } catch (error) {
    console.error('[Bible API] Erro ao buscar capítulo:', error);
    return null;
  }
}

/**
 * Busca lista de livros da Bíblia
 * @returns {Promise<Array>} Lista de livros
 */
export async function getBooks() {
  try {
    const response = await fetch(BIBLE_API_BOOKS);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[Bible API] Erro ao buscar livros:', error);
    // Fallback com lista básica
    return [
      { abbrev: 'gn', name: 'Gênesis', chapters: 50 },
      { abbrev: 'ex', name: 'Êxodo', chapters: 40 },
      { abbrev: 'lv', name: 'Levítico', chapters: 27 },
      // ... outros livros
    ];
  }
}

/**
 * Calcula progresso de leitura baseado em versículos lidos
 * @param {number} versesRead - Versículos lidos
 * @param {number} totalVerses - Total de versículos
 * @returns {number} Percentual de progresso (0-100)
 */
export function calculateReadingProgress(versesRead, totalVerses) {
  if (!totalVerses || totalVerses === 0) return 0;
  return Math.min(100, Math.round((versesRead / totalVerses) * 100));
}

/**
 * Salva progresso de leitura no localStorage
 * @param {string} book - Abreviação do livro
 * @param {number} chapter - Número do capítulo
 * @param {number} versesRead - Versículos lidos
 */
export function saveReadingProgress(book, chapter, versesRead) {
  const key = `bgp-reading-${book}-${chapter}`;
  localStorage.setItem(key, JSON.stringify({
    book,
    chapter,
    versesRead,
    updatedAt: new Date().toISOString()
  }));
}

/**
 * Carrega progresso de leitura do localStorage
 * @param {string} book - Abreviação do livro
 * @param {number} chapter - Número do capítulo
 * @returns {number} Versículos lidos
 */
export function loadReadingProgress(book, chapter) {
  const key = `bgp-reading-${book}-${chapter}`;
  const stored = localStorage.getItem(key);
  if (!stored) return 0;
  
  try {
    const data = JSON.parse(stored);
    return data.versesRead || 0;
  } catch {
    return 0;
  }
}

