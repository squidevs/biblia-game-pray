import React, { useState, useEffect } from 'react';
import { Clock, Trophy, Flame } from 'lucide-react';
import { safeLocalStorage } from '../utils/storage';
import missionsManager from '../utils/missionsManager';

// Usamos um tipo local para missões nesta página para ter flexibilidade no formato
type Goal = { text: string; completed?: boolean };
interface LocalMission {
  id: string;
  title?: string;
  name?: string;
  description: string;
  type: string;
  tags?: string[];
  schedule?: 'daily'|'weekly'|'monthly'|'once';
  startTime?: string;
  endTime?: string;
  goals?: Goal[];
  reward?: { wisdom?: number; spiritPoints?: number; items?: string[] };
  penalty?: { sin?: number; wisdomLoss?: number };
  status?: string;
  progress?: number;
  verse?: { text: string; reference: string };
  icon?: string;
}

interface MissionCardProps {
  mission: LocalMission & { onToggleGoal?: (id:string, idx:number)=>void; onStart?: (id:string)=>void };
  onComplete: (missionId: string) => void;
  onGiveUp: (missionId: string) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, onComplete, onGiveUp }) => {
  const getTimeRemaining = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = Date.now();
    const remaining = end - now;
    
    if (remaining <= 0) return 'Expirada';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ação':
      case 'acao':
      case 'acao_diaria': return 'bg-blue-500';
      case 'batalha_espiritual':
      case 'batalha': return 'bg-purple-500';
      case 'guerra_santa':
      case 'guerra': return 'bg-red-500';
      case 'casal': return 'bg-pink-500';
      case 'quiz': return 'bg-yellow-500';
      case 'oração': return 'bg-green-600';
      case 'jejum': return 'bg-indigo-500';
      case 'louvor': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'acao_diaria':
      case 'acao':
      case 'ação': return 'Ação';
      case 'batalha_espiritual':
      case 'batalha': return 'Batalha';
      case 'guerra_santa':
      case 'guerra': return 'Guerra';
      case 'casal': return 'Casal';
      case 'quiz': return 'Quiz';
      case 'oração': return 'Oração';
      case 'jejum': return 'Jejum';
      case 'louvor': return 'Louvor';
      default: return type;
    }
  };

  const isExpired = mission.endTime ? new Date(mission.endTime).getTime() < Date.now() : false;

  return (
    <div className="card border-l-4 border-spiritual">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded text-white ${getTypeColor(mission.type)}`}>
              {getTypeLabel(mission.type)}
            </span>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={14} className="mr-1" />
              {getTimeRemaining(mission.endTime || '')}
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mb-1">{mission.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{mission.description}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className="bg-victory h-2 rounded-full transition-all duration-300"
              style={{ width: `${(mission.progress || 0) * 100}%` }}
            />
          </div>
          
          {/* Verse */}
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            {mission.verse && (
              <>
                <p className="text-sm italic text-gray-700">"{mission.verse.text}"</p>
                <p className="text-xs text-gray-500 mt-1">- {mission.verse.reference}</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Rewards and Penalties */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-2 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Trophy size={16} className="text-victory mr-1" />
            <span className="text-sm font-medium">Recompensa</span>
          </div>
            <div className="text-xs text-gray-600">+{mission.reward?.wisdom || 0} Sabedoria</div>
        </div>
        
        <div className="text-center p-2 bg-red-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Flame size={16} className="text-sin mr-1" />
            <span className="text-sm font-medium">Penalidade</span>
          </div>
          <div className="text-xs text-gray-600">+{mission.penalty?.sin || 0} Pecado • -{mission.penalty?.wisdomLoss || 0} Sabedoria</div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-2">
        {!isExpired && mission.status === 'available' && (
          <>
            {mission.type === 'quiz' ? (
              <button
                onClick={() => mission.onStart?.(mission.id)}
                className="btn-primary flex-1"
              >
                Iniciar Quiz
              </button>
            ) : (
              <button
                onClick={() => mission.onStart?.(mission.id)}
                className="btn-primary flex-1"
              >
                Iniciar
              </button>
            )}
          </>
        )}
        
        {!isExpired && mission.status === 'in_progress' && (
          <>
            <button
              onClick={() => onComplete(mission.id)}
              disabled={mission.progress !== 1}
              className="btn-victory flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Concluir
            </button>
            <button
              onClick={() => onGiveUp(mission.id)}
              className="btn-sin flex-1"
            >
              Desistir
            </button>
          </>
        )}
        
        {isExpired && (
          <button className="btn-primary flex-1" disabled>
            Perdão (Em breve)
          </button>
        )}
      </div>
    </div>
  );
};

interface MissionsPageProps {
  userStatus?: 'solteiro' | 'casado';
}

const MissionsPage: React.FC<MissionsPageProps> = ({ userStatus }) => {
  // Estado civil do usuário - usa o status passado como prop ou o padrão do JSON
  const userMaritalStatus = userStatus || 'solteiro'; // default 'solteiro'

  const [allMissions] = React.useState<LocalMission[]>([
    {
      id: 'nao_mentir_001',
      title: 'Não mentir',
      description: 'Passe o dia sem contar nenhuma mentira',
      type: 'acao',
      tags: ['ação'],
      schedule: 'daily',
      endTime: '',
      goals: [
        { text: 'Não falar mentiras', completed: false },
        { text: 'Não omitir a verdade', completed: false }
      ],
      reward: { wisdom: 25, spiritPoints: 5, items: ['2xFaith_15m'] },
      penalty: { sin: 1, wisdomLoss: 10 },
      status: 'available',
      progress: 0,
      verse: { text: 'Portanto, deixem a mentira e falem a verdade cada um ao seu próximo', reference: 'Efésios 4:25' }
    },
    {
      id: 'nao_fofocar_001',
      title: 'Não fofocar',
      description: 'Evite fofocas e maledicência durante o dia',
      type: 'acao',
      tags: ['ação','jejum'],
      schedule: 'weekly',
      endTime: '',
      goals: [ { text: 'Evitar fofocas durante o dia', completed: false } ],
      reward: { wisdom: 50, spiritPoints: 15, items: [] },
      penalty: { sin: 3, wisdomLoss: 25 },
      status: 'available',
      progress: 0,
      verse: { text: 'Quem muito fala, muito erra; quem é sábio refreia a língua', reference: 'Provérbios 10:19' }
    },
    {
      id: 'declarar_amor_001',
      title: 'Declarar amor',
      description: 'Diga que ama seu cônjuge hoje',
      type: 'acao',
      tags: ['casal','ação'],
      schedule: 'daily',
      endTime: '',
      goals: [ { text: 'Dizer "Eu te amo" ao cônjuge', completed: false } ],
      reward: { wisdom: 35, spiritPoints: 10, items: [] },
      penalty: { sin: 2, wisdomLoss: 15 },
      status: 'available',
      progress: 0,
      verse: { text: 'Acima de tudo, revistam-se do amor, que é o elo perfeito', reference: 'Colossenses 3:14' }
    },
    {
      id: 'orar_junto_001',
      title: 'Orar em casal',
      description: 'Orem juntos por 15 minutos',
      type: 'acao',
      tags: ['casal','oração'],
      schedule: 'weekly',
      endTime: '',
      goals: [ { text: 'Orar juntos por 15 minutos', completed: false } ],
      reward: { wisdom: 40, spiritPoints: 15, items: [] },
      penalty: { sin: 1, wisdomLoss: 20 },
      status: 'available',
      progress: 0,
      verse: { text: 'Onde dois ou três estiverem reunidos em meu nome, ali eu estou', reference: 'Mateus 18:20' }
    },
    {
      id: 'estudo_gen_001',
      title: 'Estudo: Gênesis 1',
      description: 'Leia Gênesis 1 e responda o quiz do capítulo',
      type: 'quiz',
      tags: ['quiz','estudo'],
      schedule: 'once',
      endTime: '',
      goals: [ { text: 'Ler o capítulo', completed: false }, { text: 'Responder o quiz (>=65%)', completed: false } ],
      reward: { wisdom: 60, spiritPoints: 20, items: ['smallBible'] },
      penalty: { sin: 0, wisdomLoss: 0 },
      status: 'available',
      progress: 0,
      verse: { text: 'No princípio, Deus criou os céus e a terra.', reference: 'Gênesis 1:1' }
    },
    {
      id: 'quiz_salmos_001',
      title: 'Quiz: Salmos Básico',
      description: 'Teste seus conhecimentos sobre os Salmos',
      type: 'quiz',
      tags: ['quiz','biblia'],
      schedule: 'once',
      endTime: '',
      goals: [ { text: 'Responder quiz (>=65%)', completed: false } ],
      reward: { wisdom: 45, spiritPoints: 15, items: ['scroll'] },
      penalty: { sin: 0, wisdomLoss: 0 },
      status: 'available',
      progress: 0,
      verse: { text: 'O Senhor é o meu pastor, nada me faltará.', reference: 'Salmos 23:1' }
    },
    {
      id: 'quiz_novo_testamento_001',
      title: 'Quiz: Jesus e os Apóstolos',
      description: 'Questões sobre a vida de Jesus e seus discípulos',
      type: 'quiz',
      tags: ['quiz','novo_testamento'],
      schedule: 'once',
      endTime: '',
      goals: [ { text: 'Responder quiz (>=65%)', completed: false } ],
      reward: { wisdom: 75, spiritPoints: 25, items: ['cross', 'faith_booster'] },
      penalty: { sin: 0, wisdomLoss: 0 },
      status: 'available',
      progress: 0,
      verse: { text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...', reference: 'João 3:16' }
    }
  ]);

  // Filtrar missões baseadas no estado civil + filtros do usuário
  const [missions, setMissions] = React.useState<LocalMission[]>([]);
  const [inventory, setInventory] = useState<any[]>(() => {
    try {
      const raw = safeLocalStorage.getItem('christon-inventory');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [_notifications, setNotifications] = useState<{id:string,message:string}[]>([]);
  const [statusFilter, _setStatusFilter] = useState<'all'|'available'|'in_progress'|'completed'|'abandoned'>('all');       
  const [tagFilter, _setTagFilter] = useState<string>('all');
  const [activeQuizMission, setActiveQuizMission] = useState<string | null>(null);

  // Atualizar missões quando o status mudar ou filtros forem aplicados
  React.useEffect(() => {
    let filteredMissions = allMissions.filter(mission => {
      // Se a missão é do tipo 'casal', só mostrar se o usuário for casado
      if ((mission.tags || []).includes('casal')) {
        return userMaritalStatus === 'casado';
      }
      // Outras missões são sempre visíveis
      return true;
    });

    if (statusFilter !== 'all') filteredMissions = filteredMissions.filter(m => m.status === statusFilter);
    if (tagFilter !== 'all') filteredMissions = filteredMissions.filter(m => (m.tags || []).includes(tagFilter));

    setMissions(filteredMissions);
  }, [userMaritalStatus, allMissions, statusFilter, tagFilter]);

  // persist inventory
  useEffect(() => {
    safeLocalStorage.setItem('christon-inventory', JSON.stringify(inventory));
  }, [inventory]);

  const handleCompleteMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    
    // Para missões quiz, verificar se pode ser concluída (todos os objetivos completos)
    if (mission?.type === 'quiz') {
      const allGoalsCompleted = mission.goals?.every(g => g.completed) || false;
      if (!allGoalsCompleted) {
        setNotifications(prev => [...prev, { 
          id: String(Date.now()), 
          message: 'Complete o quiz com pelo menos 65% de acertos para concluir a missão!' 
        }]);
        return;
      }
    }
    
    setMissions(prevMissions => prevMissions.map(m => m.id === missionId ? { ...m, status: 'completed', progress: 1 } : m));
    
    if (mission) {
      // Salvar no histórico
      saveMissionToHistory(mission);
      
      if (mission.reward?.wisdom) {
        setNotifications(prev => [...prev, { id: String(Date.now()), message: `+${mission.reward?.wisdom} Sabedoria 🧠` }]);
      }
      if (mission.reward?.items && mission.reward.items.length > 0) {
        mission.reward.items.forEach(item => {
          setInventory(prev => {
            const idx = prev.findIndex(i => i.id === item);
            if (idx >= 0) {
              const copy = [...prev]; copy[idx].qty = (copy[idx].qty || 0) + 1; copy[idx].isNew = true; return copy;
            }
            return [...prev, { id: item, qty: 1, isNew: true }];
          });
          setNotifications(prev => [...prev, { id: String(Date.now()+1), message: `Você ganhou 1 item: ${item} 🎁` }]);
        });
      }
    }
    console.log(`Missão concluída: ${missionId}`);
  };

  const saveMissionToHistory = (mission: LocalMission) => {
    try {
      const history = JSON.parse(safeLocalStorage.getItem('christon-missions-history') || '[]');
      const historyEntry = {
        missionId: mission.id,
        missionTitle: mission.title || mission.name || 'Missão',
        completedAt: new Date().toISOString(),
        type: mission.type,
        reward: mission.reward
      };
      history.push(historyEntry);
      safeLocalStorage.setItem('christon-missions-history', JSON.stringify(history));
    } catch (error) {
      console.error('Erro ao salvar missão no histórico:', error);
    }
  };

  const handleGiveUpMission = (missionId: string) => {
    setMissions(prevMissions => prevMissions.map(mission => mission.id === missionId ? { ...mission, status: 'abandoned' } : mission));
    const mission = missions.find(m => m.id === missionId);
    if (mission) {
      setNotifications(prev => [...prev, { id: String(Date.now()), message: `Você desistiu: +${mission.penalty?.sin || 0} Pecado 🐍 e -${mission.penalty?.wisdomLoss || 0} Sabedoria` }]);
    }
    console.log(`Desistiu da missão: ${missionId}`);
  };

  const handleToggleGoal = (missionId: string, goalIndex: number) => {
    setMissions(prev => prev.map(m => {
      if (m.id !== missionId) return m;
      const goals = (m.goals || []).map((g, i) => i === goalIndex ? { ...g, completed: !g.completed } : g);
      const progress = goals.length ? (goals.filter(g => g.completed).length / goals.length) : 0;
      return { ...m, goals, progress };
    }));
  };

  const handleStartMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    
    // Se for uma missão quiz, abrir o quiz
    if (mission?.type === 'quiz') {
      setActiveQuizMission(missionId);
      return;
    }
    
    // Para outras missões, iniciar normalmente
    setMissions(prev => prev.map(m => {
      if (m.id !== missionId) return m;
      const endTime = missionsManager.computeEndTime((m.schedule as any) || 'once');
      setNotifications(prev => [...prev, { id: String(Date.now()), message: `Missão iniciada: ${m.title || m.name}` }]);
      return { ...m, status: 'in_progress', startTime: new Date().toISOString(), endTime };
    }));
  };

  const activeMissions = missions.filter(m => m.status === 'in_progress' || m.status === 'available');
  const completedMissions = missions.filter(m => m.status === 'completed');

  // Quiz Component Simples
  const QuizComponent = ({ missionId }: { missionId: string }) => {
    const mission = allMissions.find(m => m.id === missionId);
    const [quizScore, setQuizScore] = useState<number | null>(null);
    
    if (!mission) return null;

    const simulateQuiz = () => {
      // Simular um quiz rápido
      const score = Math.floor(Math.random() * 100);
      setQuizScore(score);
      
      const passed = score >= 65;
      
      // Salvar no histórico
      try {
        const history = JSON.parse(safeLocalStorage.getItem('christon-missions-history') || '[]');
        history.push({
          missionId,
          missionTitle: mission.title || mission.name || 'Quiz',
          completedAt: new Date().toISOString(),
          questions: 3,
          correctAnswers: Math.floor((score / 100) * 3),
          percentage: score,
          passed,
          type: 'quiz'
        });
        safeLocalStorage.setItem('christon-missions-history', JSON.stringify(history));
      } catch (error) {
        console.error('Erro ao salvar:', error);
      }

      // Atualizar missão se passou
      if (passed) {
        setMissions(prev => prev.map(m => m.id === missionId ? {
          ...m,
          goals: m.goals?.map(g => ({ ...g, completed: true })),
          progress: 1,
          status: 'completed'
        } : m));
        setNotifications(prev => [...prev, { 
          id: String(Date.now()), 
          message: `Quiz aprovado! ${score}% de acertos 🎉` 
        }]);
      } else {
        setNotifications(prev => [...prev, { 
          id: String(Date.now()), 
          message: `Quiz reprovado. ${score}% de acertos. Mínimo: 65% ❌` 
        }]);
      }
    };

    const resetQuiz = () => {
      setQuizScore(null);
    };

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">{mission.title || mission.name}</h1>
          <button 
            onClick={() => setActiveQuizMission(null)}
            className="btn-secondary"
          >
            Voltar
          </button>
        </div>
        
        {quizScore === null ? (
          <div className="card text-center space-y-4">
            <h2 className="text-lg font-semibold">Quiz - {mission.title || mission.name}</h2>
            <p className="text-gray-600">{mission.description}</p>
            <p className="text-sm text-blue-600">
              ⚡ Você precisa de pelo menos 65% para passar no quiz
            </p>
            <button 
              onClick={simulateQuiz}
              className="btn-primary"
            >
              Iniciar Quiz
            </button>
          </div>
        ) : (
          <div className={`card text-center space-y-4 ${quizScore >= 65 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`text-6xl ${quizScore >= 65 ? 'text-green-500' : 'text-red-500'}`}>
              {quizScore >= 65 ? '✅' : '❌'}
            </div>
            <h2 className="text-2xl font-bold">
              {quizScore >= 65 ? 'Aprovado!' : 'Reprovado'}
            </h2>
            <p className="text-lg">
              Pontuação: {quizScore}%
            </p>
            {quizScore >= 65 ? (
              <p className="text-green-700">
                Parabéns! Você pode concluir esta missão agora.
              </p>
            ) : (
              <p className="text-red-700">
                Você precisa de pelo menos 65% para passar. Tente novamente!
              </p>
            )}
            <div className="flex space-x-2">
              <button onClick={resetQuiz} className="btn-primary">
                Tentar Novamente
              </button>
              <button 
                onClick={() => setActiveQuizMission(null)}
                className="btn-secondary"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Se estiver fazendo um quiz
  if (activeQuizMission) {
    return <QuizComponent missionId={activeQuizMission} />;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-dark mb-2">
              Missões Espirituais
            </h1>
            <p className="text-gray-600">
              Prove sua fé através de desafios diários
            </p>
          </div>
        </div>
      </div>

      {/* Missions Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
          <div className="text-lg font-bold text-spiritual">{activeMissions.length}</div>
          <div className="text-xs text-gray-600">Ativas</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
          <div className="text-lg font-bold text-victory">{completedMissions.length}</div>
          <div className="text-xs text-gray-600">Concluídas</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
          <div className="text-lg font-bold text-wisdom">7</div>
          <div className="text-xs text-gray-600">Ofensiva</div>
        </div>
      </div>

      {/* Active Missions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Missões Ativas</h2>
        
        {/* Mensagem para solteiros sobre missões de casal */}
        {userMaritalStatus === 'solteiro' && (
          <div className="card bg-pink-50 border-pink-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💕</span>
              </div>
              <div>
                <h3 className="font-semibold text-pink-800">Missões de Casal</h3>
                <p className="text-sm text-pink-600">
                  Altere seu status para "Casado(a)" no perfil para desbloquear missões especiais para casais.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeMissions.length > 0 ? (
          activeMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={{ ...mission, onToggleGoal: handleToggleGoal, onStart: handleStartMission }}
              onComplete={handleCompleteMission}
              onGiveUp={handleGiveUpMission}
            />
          ))
        ) : (
          <div className="card text-center py-8">
            <Trophy size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhuma missão ativa
            </h3>
            <p className="text-gray-500">
              Novas missões estarão disponíveis em breve!
            </p>
          </div>
        )}
      </div>

      {/* Completed Missions */}
      {completedMissions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Missões Concluídas</h2>
          {completedMissions.map((mission) => (
            <div key={mission.id} className="card bg-green-50 border-green-200">
              <div className="flex items-center space-x-3">
                <Trophy size={24} className="text-victory" />
                <div>
                  <h3 className="font-semibold">{mission.name}</h3>
                  <p className="text-sm text-gray-600">Concluída com sucesso!</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionsPage;