import React, { useState } from 'react';
import { Clock, Trophy, ArrowLeft, Sword, Shield, Crown, Heart, Target, CheckCircle, Star, BookOpen } from 'lucide-react';
import { missions, getAvailableMissions, Mission } from '../data/missions';
import missionsManager from '../utils/missionsManager';


interface QuizState {
  mission: Mission;
  currentQuestion: number;
  answers: number[];
  score: number;
  isCompleted: boolean;
}

const MissionsPage: React.FC = () => {
  const [_selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [completedMissions, setCompletedMissions] = useState<string[]>(['espada_001']); // Mock data
  const [_missionStates, setMissionStates] = useState<Record<string, any>>({});
  
  // Mock player data
  const playerSpirit = 75;
  const playerStreak = 5;

  // initialize mission states from the missions data
  React.useEffect(() => {
    const s = missionsManager.initializeMissionStates(missions);
    setMissionStates(s);
  }, []);

  // recompute available missions based on player and states
  const availableMissions = getAvailableMissions(playerSpirit, completedMissions).map(m => ({
    mission: m,
    state: missionsManager.getMissionState(m.id)
  }));
  const completedCount = completedMissions.length;

  const getCategoryIcon = (category: Mission['category']) => {
    switch (category) {
      case 'espada': return <Sword size={20} className="text-red-500" />;
      case 'escudo': return <Shield size={20} className="text-blue-500" />;
      case 'capacete': return <Crown size={20} className="text-yellow-500" />;
      case 'couraca': return <Heart size={20} className="text-green-500" />;
      default: return <Target size={20} className="text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'facil': return 'text-green-600 bg-green-100';
      case 'medio': return 'text-yellow-600 bg-yellow-100';
      case 'dificil': return 'text-red-600 bg-red-100';
    }
  };

  const startQuiz = (mission: Mission) => {
    // Accept mission if not already in progress
    const state = missionsManager.getMissionState(mission.id);
    if (!state || state.status !== 'in_progress') {
      missionsManager.acceptMission(mission);
      setMissionStates(missionsManager.loadMissionStates());
    }

    if (mission.type === 'quiz' && mission.questions) {
      setQuizState({
        mission,
        currentQuestion: 0,
        answers: [],
        score: 0,
        isCompleted: false
      });
    }
    setSelectedMission(mission);
  };

  const handleAccept = (mission: Mission) => {
    missionsManager.acceptMission(mission);
    setMissionStates(missionsManager.loadMissionStates());
  };

  const handleComplete = (mission: Mission) => {
    missionsManager.completeMission(mission);
    setMissionStates(missionsManager.loadMissionStates());
    setCompletedMissions(prev => prev.includes(mission.id) ? prev : [...prev, mission.id]);
  };

  const handleAbandon = (mission: Mission) => {
    missionsManager.abandonMission(mission);
    setMissionStates(missionsManager.loadMissionStates());
  };

  const answerQuestion = (answerIndex: number) => {
    if (!quizState || !quizState.mission.questions) return;

    const question = quizState.mission.questions[quizState.currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;
    
    const newAnswers = [...quizState.answers, answerIndex];
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    if (quizState.currentQuestion + 1 >= quizState.mission.questions.length) {
      // Quiz completo
      setQuizState({
        ...quizState,
        answers: newAnswers,
        score: newScore,
        isCompleted: true
      });
      
      // Adicionar à lista de concluídas se passou
      if (newScore / quizState.mission.questions.length >= 0.7) {
        setCompletedMissions(prev => [...prev, quizState.mission.id]);
      }
    } else {
      // Próxima pergunta
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        answers: newAnswers,
        score: newScore
      });
    }
  };

  const resetMission = () => {
    setSelectedMission(null);
    setQuizState(null);
  };

  // Vista do Quiz
  if (quizState && !quizState.isCompleted) {
    const question = quizState.mission.questions![quizState.currentQuestion];
    const progress = ((quizState.currentQuestion + 1) / quizState.mission.questions!.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header do Quiz */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <button onClick={resetMission} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-center">{quizState.mission.title}</h1>
              <div className="w-8"></div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Pergunta {quizState.currentQuestion + 1} de {quizState.mission.questions!.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-spiritual h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Pergunta */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => answerQuestion(index)}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-spiritual hover:bg-spiritual/5 transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center">
                      <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {question.verse && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm italic text-gray-600">📖 Referência: {question.verse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Resultado do Quiz
  if (quizState && quizState.isCompleted) {
    const percentage = (quizState.score / quizState.mission.questions!.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="mb-6">
              {passed ? (
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-2xl">✗</span>
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-2">
                {passed ? 'Parabéns!' : 'Tente novamente'}
              </h2>
              
              <p className="text-gray-600 mb-4">
                Você acertou {quizState.score} de {quizState.mission.questions!.length} questões ({Math.round(percentage)}%)
              </p>

              {passed && (
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-medium">
                    +{quizState.mission.xpReward} XP • +{quizState.mission.wisdomReward} Sabedoria
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 mb-6">
              <button
                onClick={resetMission}
                className="w-full btn-primary"
              >
                Voltar às Missões
              </button>
              
              {!passed && (
                <button
                  onClick={() => setQuizState({
                    mission: quizState.mission,
                    currentQuestion: 0,
                    answers: [],
                    score: 0,
                    isCompleted: false
                  })}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Tentar Novamente
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Lista principal de missões
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-spiritual mb-2">Missões Espirituais</h2>
        <p className="text-gray-600">Fortaleça sua fé através de estudos e desafios</p>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-victory">{completedCount}</div>
            <div className="text-sm text-gray-600">Concluídas</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-spiritual">{availableMissions.length}</div>
            <div className="text-sm text-gray-600">Disponíveis</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-500">{playerStreak}</div>
            <div className="text-sm text-gray-600">Ofensiva</div>
          </div>
        </div>
      </div>

      {/* Lista de Missões */}
      <div className="space-y-4">
        {availableMissions.map(({ mission, state }) => (
          <div key={mission.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getCategoryIcon(mission.category)}
                <div>
                  <h3 className="font-semibold text-lg">{mission.title}</h3>
                  <p className="text-gray-600 text-sm">{mission.description}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                  {((mission.difficulty ?? 'facil') as string).charAt(0).toUpperCase() + ((mission.difficulty ?? 'facil') as string).slice(1)}
                </span>
                {state && state.status === 'in_progress' && (
                  <span className="text-xs text-gray-500">Em progresso • {missionsManager.getTimeRemaining(state.endTime)}</span>
                )}
                {state && state.status === 'completed' && (
                  <span className="text-xs text-green-600">Concluída</span>
                )}
                {state && state.status === 'abandoned' && (
                  <span className="text-xs text-red-600">Desistida</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{mission.timeEstimate} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} />
                  <span>+{mission.xpReward} XP</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={14} />
                  <span>+{mission.wisdomReward} Sabedoria</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {mission.type === 'quiz' && `${mission.questions?.length || 0} questões`}
                {mission.type === 'meditation' && 'Meditação guiada'}
                {mission.type === 'prayer' && 'Oração dirigida'}
                {mission.type === 'study' && 'Estudo bíblico'}
              </div>
              <div className="flex items-center gap-2">
                {(!state || state.status === 'available') && (
                  <button onClick={() => handleAccept(mission)} className="px-4 py-2 bg-spiritual text-white rounded-lg">Aceitar</button>
                )}

                {state && state.status === 'in_progress' && (
                  <>
                    <button onClick={() => {
                      if (mission.type === 'quiz') startQuiz(mission);
                      else handleComplete(mission);
                    }} className="px-4 py-2 bg-green-600 text-white rounded-lg">Concluir</button>
                    <button onClick={() => handleAbandon(mission)} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg">Desistir</button>
                  </>
                )}

                {state && state.status === 'completed' && (
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Revisar</button>
                )}

                {/* Fallback action */}
                {(!state || state.status === 'available') && mission.type === 'quiz' && (
                  <button onClick={() => startQuiz(mission)} className="px-4 py-2 btn-primary">Iniciar</button>
                )}
              </div>
            </div>
          </div>
        ))}

        {availableMissions.length === 0 && (
          <div className="text-center py-12">
            <Trophy size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Todas as missões disponíveis foram concluídas!</p>
            <p className="text-sm text-gray-400 mt-2">Volte amanhã para novas missões.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionsPage;