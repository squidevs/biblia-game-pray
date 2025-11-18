const BIBLE_API_URL = 'https://bible-api.com';

// Mapeamento de livros PT-BR para códigos da API
export const BOOK_CODES: Record<string, string> = {
  // Antigo Testamento
  'genesis': 'GEN', 'exodo': 'EXO', 'levitico': 'LEV', 'numeros': 'NUM', 'deuteronomio': 'DEU',
  'josue': 'JOS', 'juizes': 'JDG', 'rute': 'RUT', '1samuel': '1SA', '2samuel': '2SA',
  '1reis': '1KI', '2reis': '2KI', '1cronicas': '1CH', '2cronicas': '2CH', 'esdras': 'EZR',
  'neemias': 'NEH', 'ester': 'EST', 'jo': 'JOB', 'salmos': 'PSA', 'proverbios': 'PRO',
  'eclesiastes': 'ECC', 'cantares': 'SNG', 'isaias': 'ISA', 'jeremias': 'JER', 'lamentacoes': 'LAM',
  'ezequiel': 'EZK', 'daniel': 'DAN', 'oseias': 'HOS', 'joel': 'JOL', 'amos': 'AMO',
  'obadias': 'OBA', 'jonas': 'JON', 'miqueias': 'MIC', 'naum': 'NAH', 'habacuque': 'HAB',
  'sofonias': 'ZEP', 'ageu': 'HAG', 'zacarias': 'ZEC', 'malaquias': 'MAL',
  // Novo Testamento
  'mateus': 'MAT', 'marcos': 'MRK', 'lucas': 'LUK', 'joao': 'JHN', 'atos': 'ACT',
  'romanos': 'ROM', '1corintios': '1CO', '2corintios': '2CO', 'galatas': 'GAL', 'efesios': 'EPH',
  'filipenses': 'PHP', 'colossenses': 'COL', '1tessalonicenses': '1TH', '2tessalonicenses': '2TH',
  '1timoteo': '1TI', '2timoteo': '2TI', 'tito': 'TIT', 'filemom': 'PHM', 'hebreus': 'HEB',
  'tiago': 'JAS', '1pedro': '1PE', '2pedro': '2PE', '1joao': '1JN', '2joao': '2JN',
  '3joao': '3JN', 'judas': 'JUD', 'apocalipse': 'REV'
};

export interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface ChapterData {
  reference: string;
  verses: BibleVerse[];
  text: string;
  translation_id: string;
  translation_name: string;
}

// Buscar capítulo completo
export async function fetchChapter(bookId: string, chapterNumber: number): Promise<ChapterData | null> {
  try {
    const bookCode = BOOK_CODES[bookId.toLowerCase()];
    if (!bookCode) {
      console.error('Livro não encontrado:', bookId);
      return null;
    }

    const url = `${BIBLE_API_URL}/${bookCode}+${chapterNumber}?translation=almeida`;
    console.log('🔍 Buscando capítulo:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('📖 Capítulo carregado:', data.reference);
    
    return data;
  } catch (error) {
    console.error('❌ Erro ao buscar capítulo:', error);
    return null;
  }
}

// Buscar versículo aleatório (exceto Salmos e Provérbios)
export async function fetchRandomVerse(): Promise<{ text: string; reference: string } | null> {
  try {
    const excludeBooks = 'PSA,PRO';
    const allBooks = Object.values(BOOK_CODES).filter(code => !excludeBooks.includes(code));
    const randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
    
    const url = `${BIBLE_API_URL}/random/${randomBook}?translation=almeida`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    
    const data = await response.json();
    
    if (data && data.text) {
      return {
        text: data.text.trim(),
        reference: data.reference
      };
    }
    
    return null;
  } catch (error) {
    console.error('❌ Erro ao buscar versículo aleatório:', error);
    return null;
  }
}

// Buscar Salmo aleatório
export async function fetchRandomPsalm(): Promise<{ text: string; reference: string } | null> {
  try {
    const url = `${BIBLE_API_URL}/random/PSA?translation=almeida`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    
    const data = await response.json();
    
    if (data && data.text) {
      return {
        text: data.text.trim(),
        reference: `Salmos ${data.reference.split(' ').slice(1).join(' ')}`
      };
    }
    
    return null;
  } catch (error) {
    console.error('❌ Erro ao buscar salmo:', error);
    return null;
  }
}

// Buscar Provérbio aleatório
export async function fetchRandomProverb(): Promise<{ text: string; reference: string } | null> {
  try {
    const url = `${BIBLE_API_URL}/random/PRO?translation=almeida`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    
    const data = await response.json();
    
    if (data && data.text) {
      return {
        text: data.text.trim(),
        reference: `Provérbios ${data.reference.split(' ').slice(1).join(' ')}`
      };
    }
    
    return null;
  } catch (error) {
    console.error('❌ Erro ao buscar provérbio:', error);
    return null;
  }
}
