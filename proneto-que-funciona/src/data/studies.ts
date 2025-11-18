export interface StudyChapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  title: string;
  description: string;
  questions: string[]; // IDs das questões do quiz do capítulo
  isLocked: boolean;
  isCompleted: boolean;
  xpReward: number;
  wisdomReward: number;
}

export interface StudyBook {
  id: string;
  name: string;
  testament: 'old' | 'new';
  chapters: StudyChapter[];
  finalQuiz: {
    questions: string[]; // 40 questões do livro
    passPercentage: 65; // 65% para passar
    xpReward: number;
    wisdomReward: number;
  };
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number; // 0-100%
}

export interface StudyProgress {
  completedChapters: string[];
  completedBooks: string[];
  currentBook?: string;
  currentChapter?: string;
  totalXp: number;
  totalWisdom: number;
}

// Livros disponíveis para estudo (começando com alguns principais)
export const studyBooks: StudyBook[] = [
  {
    id: 'genesis',
    name: 'Gênesis',
    testament: 'old',
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    chapters: [
      {
        id: 'genesis_1',
        bookId: 'genesis',
        chapterNumber: 1,
        title: 'A Criação',
        description: 'No princípio Deus criou os céus e a terra',
        questions: ['gen_001', 'gen_002'],
        isLocked: false,
        isCompleted: false,
        xpReward: 25,
        wisdomReward: 15
      },
      {
        id: 'genesis_2',
        bookId: 'genesis',
        chapterNumber: 2,
        title: 'O Jardim do Éden',
        description: 'Deus forma o homem e a mulher',
        questions: ['gen_003'],
        isLocked: true,
        isCompleted: false,
        xpReward: 25,
        wisdomReward: 15
      },
      {
        id: 'genesis_3',
        bookId: 'genesis',
        chapterNumber: 3,
        title: 'A Queda',
        description: 'A desobediência e suas consequências',
        questions: ['gen_001'], // Reutilizando por enquanto
        isLocked: true,
        isCompleted: false,
        xpReward: 30,
        wisdomReward: 20
      }
    ],
    finalQuiz: {
      questions: ['gen_001', 'gen_002', 'gen_003'], // Em um cenário real, seria 40 questões
      passPercentage: 65,
      xpReward: 200,
      wisdomReward: 100
    }
  },
  {
    id: 'matthew',
    name: 'Mateus',
    testament: 'new',
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    chapters: [
      {
        id: 'matthew_1',
        bookId: 'matthew',
        chapterNumber: 1,
        title: 'Genealogia de Jesus',
        description: 'A linhagem do Messias',
        questions: ['joa_001'],
        isLocked: false,
        isCompleted: false,
        xpReward: 30,
        wisdomReward: 20
      },
      {
        id: 'matthew_5',
        bookId: 'matthew',
        chapterNumber: 5,
        title: 'Sermão do Monte',
        description: 'As bem-aventuranças',
        questions: ['joa_001'],
        isLocked: true,
        isCompleted: false,
        xpReward: 40,
        wisdomReward: 25
      }
    ],
    finalQuiz: {
      questions: ['joa_001'],
      passPercentage: 65,
      xpReward: 300,
      wisdomReward: 150
    }
  },
  {
    id: 'psalms',
    name: 'Salmos',
    testament: 'old',
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    chapters: [
      {
        id: 'psalms_23',
        bookId: 'psalms',
        chapterNumber: 23,
        title: 'O Bom Pastor',
        description: 'O Senhor é o meu pastor',
        questions: ['sal_001'],
        isLocked: false,
        isCompleted: false,
        xpReward: 35,
        wisdomReward: 25
      }
    ],
    finalQuiz: {
      questions: ['sal_001'],
      passPercentage: 65,
      xpReward: 250,
      wisdomReward: 120
    }
  }
];

// Funções utilitárias
export const getUnlockedBooks = (): StudyBook[] => {
  return studyBooks.filter(book => book.isUnlocked);
};

export const getBookProgress = (bookId: string, completedChapters: string[]): number => {
  const book = studyBooks.find(b => b.id === bookId);
  if (!book) return 0;
  
  const completedInBook = completedChapters.filter(chId => 
    book.chapters.some(ch => ch.id === chId)
  ).length;
  
  return Math.round((completedInBook / book.chapters.length) * 100);
};

export const unlockNextChapter = (bookId: string, completedChapterId: string): void => {
  const book = studyBooks.find(b => b.id === bookId);
  if (!book) return;
  
  const completedChapterIndex = book.chapters.findIndex(ch => ch.id === completedChapterId);
  if (completedChapterIndex >= 0 && completedChapterIndex < book.chapters.length - 1) {
    book.chapters[completedChapterIndex + 1].isLocked = false;
  }
};

export const unlockNextBook = (completedBookId: string): void => {
  const completedBookIndex = studyBooks.findIndex(b => b.id === completedBookId);
  if (completedBookIndex >= 0 && completedBookIndex < studyBooks.length - 1) {
    studyBooks[completedBookIndex + 1].isUnlocked = true;
  }
};

export const getCurrentStudyData = (): StudyProgress => {
  // Em um app real, isso viria do localStorage ou API
  return {
    completedChapters: [],
    completedBooks: [],
    currentBook: 'genesis',
    currentChapter: 'genesis_1',
    totalXp: 0,
    totalWisdom: 0
  };
};