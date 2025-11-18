export type MissionDifficulty = 'facil' | 'medio' | 'dificil';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  verse?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'meditation' | 'prayer' | 'study' | 'action';
  category?: string;
  difficulty?: MissionDifficulty;
  timeEstimate?: number; // minutos
  xpReward?: number;
  wisdomReward?: number;
  questions?: Question[];
}

export const missions: Mission[] = [
  {
    id: 'quiz_gen_001',
    title: 'Quiz Rápido: Gênesis',
    description: 'Responda um pequeno quiz sobre Gênesis',
    type: 'quiz',
    difficulty: 'facil',
    timeEstimate: 5,
    xpReward: 10,
    wisdomReward: 5,
    questions: [
      {
        question: 'Quem criou os céus e a terra?',
        options: ['Moisés', 'Deus', 'Noé', 'Davi'],
        correctAnswer: 1,
        verse: 'Gênesis 1:1'
      }
    ]
  },
  {
    id: 'study_psalms_001',
    title: 'Estudo: Salmos 23',
    description: 'Leia e medite no Salmo 23',
    type: 'study',
    difficulty: 'facil',
    timeEstimate: 10,
    xpReward: 6,
    wisdomReward: 8
  }
];

export const getAvailableMissions = (playerSpirit: number, completedMissions: string[] = []): Mission[] => {
  // Exemplo: missões difíceis requerem spirit >= 50
  return missions.filter(m => {
    if (completedMissions.includes(m.id)) return false;
    if (m.difficulty === 'dificil' && playerSpirit < 50) return false;
    return true;
  });
};

export default missions;
