import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { 
  Mission, 
  MissionStatus, 
  getAvailableMissions, 
  getTimeRemaining, 
  getCategoryColor, 
  getCategoryName 
} from '../data/simpleMissions';
import { safeLocalStorage } from '../utils/storage';

interface MissionsPageSimpleProps {
  userStatus: 'solteiro' | 'casado';
}

interface MissionState {
  status: MissionStatus;
  startTime?: Date;
  endTime?: Date;
  progress: number;
  objectivesCompleted?: boolean[];
}

type MissionStates = Record<string, MissionState>;

const MissionsPageSimple: React.FC<MissionsPageSimpleProps> = ({ userStatus }) => {
  const [missionStates, setMissionStates] = useState<MissionStates>({});
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualizar relógio a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Carregar estados das missões do localStorage
  useEffect(() => {
    const saved = safeLocalStorage.getItem('christon-mission-states');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Converter strings de data de volta para objetos Date
        Object.keys(parsed).forEach(key => {
          if (parsed[key].startTime) {
            parsed[key].startTime = new Date(parsed[key].startTime);
          }
          if (parsed[key].endTime) {
            parsed[key].endTime = new Date(parsed[key].endTime);
          }
        });
        setMissionStates(parsed);
      } catch (error) {
        console.warn('Erro ao carregar estados das missões:', error);
      }
    }
  }, []);

  // Salvar estados das missões
  const saveMissionStates = (states: MissionStates) => {
    setMissionStates(states);
    safeLocalStorage.setItem('christon-mission-states', JSON.stringify(states));
  };

  // Iniciar missão
  const startMission = (mission: Mission) => {
    const now = new Date();
    const endTime = new Date(now.getTime() + mission.duration * 60 * 60 * 1000);
    
    const newState: MissionState = {
      status: 'in_progress',
      startTime: now,
      endTime: endTime,
      progress: 0,
      objectivesCompleted: mission.objectives ? new Array(mission.objectives.length).fill(false) : undefined
    };

    const newStates = {
      ...missionStates,
      [mission.id]: newState
    };

    saveMissionStates(newStates);
  };

  // Concluir missão
  const completeMission = (mission: Mission) => {
    const currentState = missionStates[mission.id];
    if (!currentState) return;

    const newState: MissionState = {
      ...currentState,
      status: 'completed',
      progress: 1,
      endTime: new Date()
    };

    const newStates = {
      ...missionStates,
      [mission.id]: newState
    };

    saveMissionStates(newStates);
    
    // Aqui você adicionaria a lógica para dar as recompensas
    console.log(`Missão concluída! +${mission.xpReward} XP, +${mission.wisdomReward} Sabedoria`);
  };

  // Desistir da missão
  const abandonMission = (mission: Mission) => {
    const currentState = missionStates[mission.id];
    if (!currentState) return;

    const newState: MissionState = {
      ...currentState,
      status: 'abandoned',
      endTime: new Date()
    };

    const newStates = {
      ...missionStates,
      [mission.id]: newState
    };

    saveMissionStates(newStates);
    
    // Aplicar penalidades
    console.log(`Missão abandonada! +${mission.sinPenalty} Pecado, -${mission.xpPenalty} XP`);
  };

  // Obter missões disponíveis baseado no status do usuário
  const availableMissions = getAvailableMissions(userStatus);

  // Verificar se missão expirou
  const isMissionExpired = (mission: Mission): boolean => {
    const state = missionStates[mission.id];
    if (!state || !state.endTime) return false;
    return currentTime > state.endTime && state.status === 'in_progress';
  };

  // Renderizar card da missão
  const renderMissionCard = (mission: Mission) => {
    const state = missionStates[mission.id];
    const isExpired = isMissionExpired(mission);
    
    // Se expirou, marcar como falhou
    if (isExpired && state?.status === 'in_progress') {
      const newState: MissionState = {
        ...state,
        status: 'failed'
      };
      const newStates = {
        ...missionStates,
        [mission.id]: newState
      };
      saveMissionStates(newStates);
    }

    const currentStatus = isExpired ? 'failed' : (state?.status || 'available');
    const isInProgress = currentStatus === 'in_progress';
    const isAvailable = currentStatus === 'available';
    const isCompleted = currentStatus === 'completed';

    return (
      <div key={mission.id} className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
        {/* Header com badges e timer */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(mission.category)}`}>
              {getCategoryName(mission.category)}
            </span>
            {mission.type !== 'quiz' && (
              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                Ação
              </span>
            )}
            {mission.requirements?.maritalStatus === 'casado' && (
              <span className="px-2 py-1 rounded text-xs font-medium bg-pink-100 text-pink-600">
                Casal
              </span>
            )}
          </div>
          
          {isInProgress && state?.endTime && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock size={14} className="mr-1" />
              {getTimeRemaining(state.endTime)}
            </div>
          )}
        </div>

        {/* Conteúdo principal */}
        <div className="flex items-center gap-4">
          {/* Ícone da missão com multiplicador */}
            <div className="relative">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
              {mission.icon ?? '📋'}
            </div>
            <div className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs px-1 py-0.5 rounded font-bold">
              2x
            </div>
          </div>

          {/* Informações da missão */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{mission.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{mission.description}</p>
            
            {/* Recompensas */}
              <div className="flex gap-4 text-sm text-gray-500">
              <span>{String(mission.sinPenalty ?? 0).padStart(2, '0')} Pecado</span>
              <span>{mission.wisdomReward}x Sabedoria</span>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2">
            {isAvailable && (
              <button
                onClick={() => startMission(mission)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Iniciar
              </button>
            )}
            
            {isInProgress && (
              <>
                <button
                  onClick={() => abandonMission(mission)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Desistir
                </button>
                <button
                  onClick={() => completeMission(mission)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Concluir
                </button>
              </>
            )}
            
            {isCompleted && (
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                Concluída
              </div>
            )}
          </div>
        </div>

        {/* Barra de progresso para missões com objetivos */}
        {mission.objectives && isInProgress && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progresso</span>
              <span>{Math.round((state?.progress || 0) * 100)}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(state?.progress || 0) * 100}%` }}
              />
            </div>

            {/* Lista de objetivos */}
            <div className="space-y-1">
              {mission.objectives.map((_, index) => {
                const isCompleted = state?.objectivesCompleted?.[index] || false;
                return (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {isCompleted && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={isCompleted ? 'text-green-600' : 'text-gray-600'}>
                      Objetivo {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-spiritual mb-2">Missões Espirituais</h2>
        <p className="text-gray-600">Fortaleça sua fé através de ações diárias</p>
      </div>

      {/* Filtros */}
      <div className="mb-4">
        <div className="bg-gray-600 rounded-lg p-1 flex text-white text-sm">
          <span className="px-3 py-1 rounded bg-gray-700">Filtros</span>
        </div>
      </div>

      {/* Lista de missões */}
      <div>
        {availableMissions.map(renderMissionCard)}
        
        {availableMissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📋</div>
            <p className="text-gray-500">Nenhuma missão disponível para seu status atual.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionsPageSimple;