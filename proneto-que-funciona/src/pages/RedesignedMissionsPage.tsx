import React, { useState, useEffect } from 'react';
import { Clock, Target, Heart, Book, Trophy } from 'lucide-react';
import missionsManager, { MissionState } from '../utils/missionsManager';
import { LucideIcon } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'acao' | 'quiz' | 'casal' | 'batalha_espiritual' | 'guerra_santa';
  category: 'Cruz Diária' | 'Batalha Espiritual Semanal' | 'Guerra Santa Mensal' | 'Quiz' | 'Casal';
  schedule: 'daily' | 'weekly' | 'monthly' | 'once';
  multiplier: number;
  rewards: {
    sabedoria?: number;
    xp?: number;
    items?: string[];
  };
  penalties: {
    pecado?: number;
    sabedoriaLoss?: number;
  };
  objectives?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  timeLimit: number; // em horas
  icon: LucideIcon;
}

const sampleMissions: Mission[] = [
  {
    id: 'nao_mentir',
    title: 'Não mentir',
    description: 'Passe o dia sem contar nenhuma mentira',
    type: 'acao',
    category: 'Cruz Diária',
    schedule: 'daily',
    multiplier: 2,
    rewards: {
      sabedoria: 10,
      xp: 50
    },
    penalties: {
      pecado: 1,
      sabedoriaLoss: 5
    },
    timeLimit: 24,
    icon: Heart
  },
  {
    id: 'nao_fofocar',
    title: 'Não fofocar',
    description: 'Fuja da aparência do mal, não fofoque!',
    type: 'acao',
    category: 'Batalha Espiritual Semanal',
    schedule: 'weekly',
    multiplier: 2,
    rewards: {
      sabedoria: 10,
      xp: 75
    },
    penalties: {
      pecado: 1,
      sabedoriaLoss: 10
    },
    timeLimit: 168, // 7 dias
    icon: Target
  },
  {
    id: 'declarar_amor_casal',
    title: 'Declarar amor',
    description: 'Diga que ama seu cônjuge',
    type: 'casal',
    category: 'Casal',
    schedule: 'daily',
    multiplier: 2,
    rewards: {
      sabedoria: 30,
      xp: 60
    },
    penalties: {
      pecado: 1,
      sabedoriaLoss: 15
    },
    timeLimit: 24,
    icon: Heart
  },
  {
    id: 'estudar_biblia_quiz',
    title: 'Estudar bíblia',
    description: 'Afie a espada de Deus',
    type: 'quiz',
    category: 'Quiz',
    schedule: 'once',
    multiplier: 1,
    rewards: {
      sabedoria: 80,
      xp: 100
    },
    penalties: {
      pecado: 1,
      sabedoriaLoss: 20
    },
    timeLimit: 48,
    icon: Book
  },
  {
    id: 'declarar_amor_mensal',
    title: 'Declarar amor',
    description: 'Diga que ama seu cônjuge',
    type: 'casal',
    category: 'Batalha Espiritual Semanal',
    schedule: 'monthly',
    multiplier: 2,
    rewards: {
      sabedoria: 30,
      xp: 120
    },
    penalties: {
      pecado: 1,
      sabedoriaLoss: 15
    },
    objectives: [
      { id: 'obj1', title: 'Objetivo 1', completed: true },
      { id: 'obj2', title: 'Objetivo 2', completed: false }
    ],
    timeLimit: 720, // 30 dias
    icon: Heart
  }
];

interface MissionsPageProps {
  userStatus?: 'solteiro' | 'casado';
}

const MissionsPage: React.FC<MissionsPageProps> = ({ userStatus = 'solteiro' }) => {
  const [missionStates, setMissionStates] = useState<Record<string, MissionState>>({});
  const [filter, setFilter] = useState<string>('Todos');

  useEffect(() => {
    const states = missionsManager.initializeMissionStates(sampleMissions as any);
    setMissionStates(states);
  }, []);

  const handleAccept = (mission: Mission) => {
    missionsManager.acceptMission(mission as any);
    setMissionStates(missionsManager.loadMissionStates());
  };

  const handleComplete = (mission: Mission) => {
    missionsManager.completeMission(mission as any);
    setMissionStates(missionsManager.loadMissionStates());
  };

  const handleAbandon = (mission: Mission) => {
    missionsManager.abandonMission(mission as any);
    setMissionStates(missionsManager.loadMissionStates());
  };

  const getCategoryBadge = (category: string, type: string) => {
    const badges = [];
    
    // Categoria principal
    badges.push(category);
    
    // Tipo específico
    if (type === 'acao') badges.push('Ação');
    else if (type === 'quiz') badges.push('Quiz');
    else if (type === 'casal') badges.push('Casal');
    
    return badges;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cruz Diária':
        return 'bg-blue-100 text-blue-700';
      case 'Batalha Espiritual Semanal':
        return 'bg-purple-100 text-purple-700';
      case 'Guerra Santa Mensal':
        return 'bg-red-100 text-red-700';
      case 'Quiz':
        return 'bg-orange-100 text-orange-700';
      case 'Casal':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimeRemaining = (state?: MissionState) => {
    if (!state?.endTime) return '22h43m';
    return missionsManager.getTimeRemaining(state.endTime) || '22h43m';
  };

  const filteredMissions = sampleMissions.filter(mission => {
    if (filter === 'Todos') return true;
    if (userStatus === 'solteiro' && mission.type === 'casal') return false;
    return mission.category === filter;
  });

  const filters = ['Todos', 'Cruz Diária', 'Batalha Espiritual Semanal', 'Guerra Santa Mensal', 'Quiz'];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Filtros */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Filtros</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filterName) => (
            <button
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === filterName 
                  ? 'bg-spiritual text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Missões */}
      <div className="space-y-4">
        {filteredMissions.map((mission) => {
          const state = missionStates[mission.id];
          const isInProgress = state?.status === 'in_progress';
          const isCompleted = state?.status === 'completed';
          const badges = getCategoryBadge(mission.category, mission.type);
          const Icon = mission.icon;

          return (
            <div key={mission.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              {/* Header com badges */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-2">
                  {badges.map((badge, index) => (
                    <span 
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(badge)}`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                
                {/* Timer */}
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>{getTimeRemaining(state)}</span>
                </div>
              </div>

              {/* Conteúdo principal */}
              <div className="flex items-center gap-4">
                {/* Ícone e Multiplicador */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon size={24} className="text-gray-600" />
                  </div>
                  {mission.multiplier > 1 && (
                    <div className="absolute -top-1 -right-1 bg-spiritual text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {mission.multiplier}x
                    </div>
                  )}
                </div>

                {/* Título e Descrição */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{mission.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{mission.description}</p>
                  
                  {/* Recompensas */}
                  <div className="text-sm text-gray-500">
                    {mission.penalties.pecado && (
                      <span className="mr-4">
                        {String(mission.penalties.pecado).padStart(2, '0')} Pecado
                      </span>
                    )}
                    {mission.rewards.sabedoria && (
                      <span>
                        {String(mission.rewards.sabedoria).padStart(2, '0')}x Sabedoria
                      </span>
                    )}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-2">
                  {!isInProgress && !isCompleted && (
                    <button
                      onClick={() => handleAccept(mission)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Iniciar
                    </button>
                  )}
                  
                  {isInProgress && (
                    <>
                      <button
                        onClick={() => handleAbandon(mission)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Desistir
                      </button>
                      <button
                        onClick={() => handleComplete(mission)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Concluir
                      </button>
                    </>
                  )}

                  {isCompleted && (
                    <div className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium">
                      Concluída
                    </div>
                  )}
                </div>
              </div>

              {/* Barra de Progresso para missões com objetivos */}
              {mission.objectives && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-4 text-sm">
                      {mission.objectives.map((objective) => (
                        <div key={objective.id} className="flex items-center gap-1">
                          <div className={`w-3 h-3 rounded-full ${
                            objective.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <span className={objective.completed ? 'text-green-600' : 'text-gray-500'}>
                            {objective.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Barra de Progresso */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(mission.objectives.filter(obj => obj.completed).length / mission.objectives.length) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-12">
          <Trophy size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma missão disponível para este filtro.</p>
        </div>
      )}
    </div>
  );
};

export default MissionsPage;