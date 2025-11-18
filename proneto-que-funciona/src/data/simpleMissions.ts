export type MissionStatus = 'available' | 'in_progress' | 'completed' | 'abandoned' | 'failed';

import React from 'react';

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'quiz' | 'study';
  category: 'espada' | 'escudo' | 'capacete' | 'couraca' | 'outro';
  duration: number; // horas
  objectives?: string[];
  xpReward?: number;
  wisdomReward?: number;
  sinPenalty?: number;
  xpPenalty?: number;
  requirements?: { maritalStatus?: 'casado' | 'solteiro' };
  icon?: React.ReactNode;
}

export const SAMPLE_MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Orar por alguém',
    description: 'Ore por uma pessoa em necessidade por 5 minutos',
    type: 'action',
    category: 'outro',
    duration: 0.1,
    objectives: ['Orar 5 minutos'],
    xpReward: 5,
    wisdomReward: 3,
    sinPenalty: 1,
    xpPenalty: 1
  },
  {
    id: 'm2',
    title: 'Estudo rápido',
    description: 'Leia um capítulo e faça anotações',
    type: 'study',
    category: 'escudo',
    duration: 1,
    objectives: ['Ler capítulo', 'Anotar 3 pontos'],
    xpReward: 10,
    wisdomReward: 8,
    sinPenalty: 0,
    xpPenalty: 2,
    requirements: { maritalStatus: 'solteiro' },
    icon: '📖'
  }
];

export const getAvailableMissions = (userStatus: 'solteiro' | 'casado') => {
  // Exemplo simples: poderia filtrar missões exclusivas para casais
  if (userStatus === 'casado') {
    return SAMPLE_MISSIONS;
  }
  return SAMPLE_MISSIONS.filter(m => m.id !== 'm_casal');
};

export const getTimeRemaining = (endTime: Date) => {
  const now = new Date().getTime();
  const diff = endTime.getTime() - now;
  if (diff <= 0) return '00:00';
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const getCategoryColor = (category: Mission['category']) => {
  switch (category) {
    case 'espada': return 'bg-red-100 text-red-700';
    case 'escudo': return 'bg-blue-100 text-blue-700';
    case 'capacete': return 'bg-yellow-100 text-yellow-700';
    case 'couraca': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const getCategoryName = (category: Mission['category']) => {
  switch (category) {
    case 'espada': return 'Espada';
    case 'escudo': return 'Escudo';
    case 'capacete': return 'Capacete';
    case 'couraca': return 'Couraça';
    default: return 'Geral';
  }
};

export default SAMPLE_MISSIONS;
