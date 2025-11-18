export type RelationshipStatus = 'solteiro' | 'casado' | undefined;

export type MissionType = 'cruz_diaria' | 'batalha_espiritual' | 'guerra_santa' | 'quiz_biblia';
export type MissionCategory = 'verdade' | 'sabedoria' | 'amor' | 'conhecimento' | 'oracao' | 'jejum' | 'quiz';
export type MissionStatus = 'ativa' | 'completa' | 'falhada' | 'disponivel' | 'expirada' | 'concluida';

export interface Mission {
  id: number;
  name: string;
  title?: string;
  description: string;
  type: MissionType;
  category: MissionCategory;
  status: MissionStatus;
  reward: { wisdom: number; spiritPoints: number };
  verse: { text: string; reference: string };
  progress?: number;
  relationshipStatus?: RelationshipStatus;
  quizData?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  };
}

// Pequeno conjunto de missões de exemplo para compilar e executar
export const missions: Mission[] = [
  {
    id: 1,
    name: 'Leia o Salmo',
    description: 'Leia o Salmo 23 e medite por 5 minutos',
    type: 'cruz_diaria',
    category: 'sabedoria',
    status: 'disponivel',
    reward: { wisdom: 10, spiritPoints: 5 },
    verse: { text: 'O Senhor é meu pastor...', reference: 'Salmos 23:1-6' },
    progress: 0
  },
  {
    id: 2,
    name: 'Treino de Oração',
    description: 'Ore por 10 minutos intercedendo por alguém',
    type: 'batalha_espiritual',
    category: 'oracao',
    status: 'disponivel',
    reward: { wisdom: 8, spiritPoints: 6 },
    verse: { text: 'Orai sem cessar', reference: '1 Tessalonicenses 5:17' },
    progress: 0
  },
  {
    id: 3,
    name: 'Quiz Bíblico - Gênesis',
    description: 'Teste seus conhecimentos em Gênesis',
    type: 'quiz_biblia',
    category: 'quiz',
    status: 'disponivel',
    reward: { wisdom: 25, spiritPoints: 10 },
    verse: { text: 'No princípio...', reference: 'Gênesis 1:1' },
    progress: 0,
    quizData: {
      question: 'Quem criou os céus e a terra?',
      options: ['Moises', 'Deus', 'Jesus', 'Davi'],
      correctAnswer: 1,
      explanation: 'Deus é o Criador segundo Gênesis.'
    }
  }
];

export const getMissionsByType = (type: MissionType): Mission[] => {
  return missions.filter(m => m.type === type);
};

export const getMissionsByCategory = (category: MissionCategory): Mission[] => {
  return missions.filter(m => m.category === category);
};

export const getMissionsByStatus = (status: MissionStatus): Mission[] => {
  return missions.filter(m => m.status === status);
};

export const getAvailableMissionsForUser = (userStatus: RelationshipStatus): Mission[] => {
  // Filtra por relacionamento quando necessário
  return missions.filter(m => !m.relationshipStatus || m.relationshipStatus === userStatus);
};

export default missions;
