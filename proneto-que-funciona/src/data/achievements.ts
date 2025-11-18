import { BookOpen, Award, Star, Shield, Heart, Target, Crown, Gift, Flame } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType;
  category: 'biblia' | 'espiritual' | 'missoes' | 'especial' | 'devocional';
  points: number;
  rewards?: {
    xp?: number;
    wisdom?: number;
    items?: string[];
    spirit?: number;
  };
  difficulty?: 'facil' | 'medio' | 'dificil';
  requirement: {
    type: 'chapters_read' | 'missions_completed' | 'prayers' | 'consecutive_days' | 'wisdom_points' | 'special_action' | 'bible_books';
    target: number | string;
  };
  unlocked?: boolean;
  unlockedAt?: Date;
}

// 66 Conquistas dos livros da Bíblia
const bibleBooks = [
  'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Josué', 'Juízes', 'Rute',
  '1 Samuel', '2 Samuel', '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras', 'Neemias',
  'Ester', 'Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cantares', 'Isaías', 'Jeremias',
  'Lamentações', 'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós', 'Obadias', 'Jonas',
  'Miqueias', 'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias', 'Malaquias',
  'Mateus', 'Marcos', 'Lucas', 'João', 'Atos', 'Romanos', '1 Coríntios', '2 Coríntios',
  'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses',
  '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro', '2 Pedro',
  '1 João', '2 João', '3 João', 'Judas', 'Apocalipse'
];

export const achievements: Achievement[] = [
  // Conquistas dos 66 livros da Bíblia
  ...bibleBooks.map((book) => ({
    id: `bible_${book.toLowerCase().replace(/\s+/g, '_')}`,
    name: `Estudioso de ${book}`,
    description: `Complete o estudo do livro de ${book}`,
    icon: BookOpen,
    category: 'biblia' as const,
    points: 10,
    rewards: {
      xp: 50,
      wisdom: 25,
      spirit: 5
    },
    requirement: {
      type: 'bible_books' as const,
      target: book
    }
  })),

  // Conquistas Espirituais
  {
    id: 'first_prayer',
    name: 'Primeiros Passos',
    description: 'Faça sua primeira oração',
    icon: Heart,
    category: 'espiritual',
    points: 5,
    rewards: {
      xp: 25,
      wisdom: 10,
      items: ['cruz_pequena']
    },
    requirement: {
      type: 'prayers',
      target: 1
    }
  },
  {
    id: 'wisdom_seeker',
    name: 'Buscador de Sabedoria',
    description: 'Acumule 50 pontos de sabedoria',
    icon: Star,
    category: 'espiritual',
    difficulty: 'facil',
    points: 10,
    requirement: {
      type: 'wisdom_points',
      target: 50
    }
  },
  {
    id: 'faithful_three',
    name: 'Fiel por Três',
    description: 'Mantenha sua ofensiva por 3 dias consecutivos',
    icon: Flame,
    category: 'devocional',
    difficulty: 'facil',
    points: 15,
    requirement: {
      type: 'consecutive_days',
      target: 3
    }
  },
  {
    id: 'mission_starter',
    name: 'Guerreiro Iniciante',
    description: 'Complete 5 missões espirituais',
    icon: Target,
    category: 'missoes',
    difficulty: 'facil',
    points: 20,
    requirement: {
      type: 'missions_completed',
      target: 5
    }
  },

  // Conquistas Médias
  {
    id: 'wisdom_scholar',
    name: 'Erudito da Sabedoria',
    description: 'Acumule 200 pontos de sabedoria',
    icon: Award,
    category: 'espiritual',
    difficulty: 'medio',
    points: 25,
    requirement: {
      type: 'wisdom_points',
      target: 200
    }
  },
  {
    id: 'faithful_week',
    name: 'Guardião Semanal',
    description: 'Mantenha sua ofensiva por 7 dias consecutivos',
    icon: Shield,
    category: 'devocional',
    difficulty: 'medio',
    points: 30,
    requirement: {
      type: 'consecutive_days',
      target: 7
    }
  },
  {
    id: 'mission_warrior',
    name: 'Guerreiro Experiente',
    description: 'Complete 25 missões espirituais',
    icon: Target,
    category: 'missoes',
    difficulty: 'medio',
    points: 40,
    requirement: {
      type: 'missions_completed',
      target: 25
    }
  },
  {
    id: 'prayer_devotee',
    name: 'Devoto da Oração',
    description: 'Faça 50 orações',
    icon: Heart,
    category: 'espiritual',
    difficulty: 'medio',
    points: 35,
    requirement: {
      type: 'prayers',
      target: 50
    }
  },
  {
    id: 'pentateuco_master',
    name: 'Mestre do Pentateuco',
    description: 'Complete o estudo dos 5 primeiros livros da Bíblia',
    icon: BookOpen,
    category: 'biblia',
    difficulty: 'medio',
    points: 50,
    requirement: {
      type: 'special_action',
      target: 'complete_pentateuco'
    }
  },

  // Conquistas Difíceis
  {
    id: 'wisdom_master',
    name: 'Mestre da Sabedoria',
    description: 'Acumule 500 pontos de sabedoria',
    icon: Crown,
    category: 'espiritual',
    difficulty: 'dificil',
    points: 75,
    requirement: {
      type: 'wisdom_points',
      target: 500
    }
  },
  {
    id: 'faithful_month',
    name: 'Fiel Incansável',
    description: 'Mantenha sua ofensiva por 30 dias consecutivos',
    icon: Flame,
    category: 'devocional',
    difficulty: 'dificil',
    points: 100,
    requirement: {
      type: 'consecutive_days',
      target: 30
    }
  },
  {
    id: 'mission_champion',
    name: 'Campeão das Missões',
    description: 'Complete 100 missões espirituais',
    icon: Crown,
    category: 'missoes',
    difficulty: 'dificil',
    points: 100,
    requirement: {
      type: 'missions_completed',
      target: 100
    }
  },
  {
    id: 'old_testament',
    name: 'Conhecedor do Antigo',
    description: 'Complete o estudo de todo o Antigo Testamento',
    icon: BookOpen,
    category: 'biblia',
    difficulty: 'dificil',
    points: 200,
    requirement: {
      type: 'special_action',
      target: 'complete_old_testament'
    }
  },
  {
    id: 'new_testament',
    name: 'Seguidor do Novo',
    description: 'Complete o estudo de todo o Novo Testamento',
    icon: Heart,
    category: 'biblia',
    difficulty: 'dificil',
    points: 150,
    requirement: {
      type: 'special_action',
      target: 'complete_new_testament'
    }
  },
  {
    id: 'bible_scholar',
    name: 'Erudito das Escrituras',
    description: 'Complete o estudo de toda a Bíblia (66 livros)',
    icon: Crown,
    category: 'biblia',
    difficulty: 'dificil',
    points: 500,
    requirement: {
      type: 'special_action',
      target: 'complete_entire_bible'
    }
  },

  // Conquistas Especiais
  {
    id: 'first_login',
    name: 'Bem-vindo ao Reino',
    description: 'Faça seu primeiro login no Christ.On',
    icon: Gift,
    category: 'especial',
    difficulty: 'facil',
    points: 5,
    requirement: {
      type: 'special_action',
      target: 'first_login'
    }
  },
  {
    id: 'armor_complete',
    name: 'Soldado Completo',
    description: 'Equipe todas as peças da Armadura de Deus',
    icon: Shield,
    category: 'especial',
    difficulty: 'medio',
    points: 50,
    requirement: {
      type: 'special_action',
      target: 'complete_armor'
    }
  },
  {
    id: 'perfect_week',
    name: 'Semana Perfeita',
    description: 'Complete todas as ações diárias por uma semana',
    icon: Star,
    category: 'especial',
    difficulty: 'dificil',
    points: 80,
    requirement: {
      type: 'special_action',
      target: 'perfect_week'
    }
  },
  {
    id: 'evangelist',
    name: 'Evangelista Digital',
    description: 'Compartilhe o app com 5 amigos',
    icon: Heart,
    category: 'especial',
    difficulty: 'medio',
    points: 40,
    requirement: {
      type: 'special_action',
      target: 'share_with_friends'
    }
  }
];

export const getAchievementsByCategory = (category: Achievement['category']) => {
  return achievements.filter(achievement => achievement.category === category);
};

export const getAchievementsByDifficulty = (difficulty: Achievement['difficulty']) => {
  return achievements.filter(achievement => achievement.difficulty === difficulty);
};

export const checkAchievementUnlock = (achievement: Achievement, playerStats: any): boolean => {
  switch (achievement.requirement.type) {
    case 'chapters_read':
      return playerStats.chaptersRead >= achievement.requirement.target;
    case 'missions_completed':
      return playerStats.missionsCompleted >= achievement.requirement.target;
    case 'prayers':
      return playerStats.prayers >= achievement.requirement.target;
    case 'consecutive_days':
      return playerStats.consecutiveDays >= achievement.requirement.target;
    case 'wisdom_points':
      return playerStats.wisdom >= achievement.requirement.target;
    case 'bible_books':
      return playerStats.completedBooks?.includes(achievement.requirement.target);
    case 'special_action':
      return playerStats.specialActions?.includes(achievement.requirement.target);
    default:
      return false;
  }
};