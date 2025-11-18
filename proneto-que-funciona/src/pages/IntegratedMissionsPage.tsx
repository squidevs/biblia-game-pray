import React, { useState } from 'react';
import { Clock, Trophy, Flame, Sword, Shield, Crown, Heart, Target, BookOpen, Star, CheckCircle, ArrowLeft, Zap, XCircle } from 'lucide-react';
import { Mission, getMissionsByType, getMissionsByCategory, getMissionsByStatus, getAvailableMissionsForUser } from '../data/enhancedMissions';

interface MissionsPageProps {
  userStatus: 'solteiro' | 'casado';
}

interface QuizState {
  mission: Mission;
  currentQuestion: number;
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean;
}

const MissionsPage: React.FC<MissionsPageProps> = ({ userStatus }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | Mission['type'] | Mission['category'] | Mission['status']>('all');
  const [activeQuiz, setActiveQuiz] = useState<QuizState | null>(null);

  // Filtrar missões baseado no filtro ativo
  const getFilteredMissions = (): Mission[] => {
    let filtered = getAvailableMissionsForUser(userStatus);
    
    switch (activeFilter) {
      case 'cruz_diaria':
      case 'batalha_espiritual':
      case 'guerra_santa':
      case 'quiz_biblia':
        filtered = getMissionsByType(activeFilter);
        break;
      case 'verdade':
      case 'sabedoria':
      case 'amor':
      case 'conhecimento':
      case 'oracao':
      case 'jejum':
      case 'quiz':
        filtered = getMissionsByCategory(activeFilter);
        break;
      case 'ativa':
      case 'completa':
      case 'falhada':
      case 'disponivel':
        filtered = getMissionsByStatus(activeFilter);
        break;
      default:
        break;
    }
    
    return filtered.filter(mission => 
      !mission.relationshipStatus || mission.relationshipStatus === userStatus
    );
  };

  const startQuiz = (mission: Mission) => {
    if (mission.quizData) {
      setActiveQuiz({
        mission,
        currentQuestion: 0,
        selectedAnswer: null,
        showResult: false,
        isCorrect: false
      });
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!activeQuiz) return;
    
    setActiveQuiz(prev => prev ? {
      ...prev,
      selectedAnswer: answerIndex
    } : null);
  };

  const submitAnswer = () => {
    if (!activeQuiz || activeQuiz.selectedAnswer === null) return;
    
    const isCorrect = activeQuiz.selectedAnswer === activeQuiz.mission.quizData!.correctAnswer;
    
    setActiveQuiz(prev => prev ? {
      ...prev,
      showResult: true,
      isCorrect
    } : null);
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
  };

  const getMissionTypeIcon = (type: Mission['type']) => {
    switch (type) {
      case 'cruz_diaria': return <Heart className="text-red-500" />;
      case 'batalha_espiritual': return <Sword className="text-blue-500" />;
      case 'guerra_santa': return <Crown className="text-purple-500" />;
      case 'quiz_biblia': return <BookOpen className="text-green-500" />;
    }
  };

  const getMissionTypeName = (type: Mission['type']) => {
    switch (type) {
      case 'cruz_diaria': return 'Cruz Diária';
      case 'batalha_espiritual': return 'Batalha Espiritual';
      case 'guerra_santa': return 'Guerra Santa';
      case 'quiz_biblia': return 'Afiar a Espada';
    }
  };

  const getCategoryIcon = (category: Mission['category']) => {
    switch (category) {
      case 'verdade': return <Shield size={16} />;
      case 'sabedoria': return <BookOpen size={16} />;
      case 'amor': return <Heart size={16} />;
      case 'conhecimento': return <Star size={16} />;
      case 'oracao': return <Target size={16} />;
      case 'jejum': return <Flame size={16} />;
      case 'quiz': return <Zap size={16} />;
    }
  };

  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'ativa': return 'text-blue-600 bg-blue-100';
      case 'completa': return 'text-green-600 bg-green-100';
      case 'falhada': return 'text-red-600 bg-red-100';
      case 'disponivel': return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredMissions = getFilteredMissions();

  // Agrupar missões por tipo
  const missionGroups = {
    cruz_diaria: filteredMissions.filter(m => m.type === 'cruz_diaria'),
    batalha_espiritual: filteredMissions.filter(m => m.type === 'batalha_espiritual'),
    guerra_santa: filteredMissions.filter(m => m.type === 'guerra_santa'),
    quiz_biblia: filteredMissions.filter(m => m.type === 'quiz_biblia')
  };

  if (activeQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-spiritual to-wisdom text-white">
        <div className="p-6">
          {/* Quiz Header */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={closeQuiz}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-center flex-1">
              {activeQuiz.mission.name}
            </h1>
            <div className="w-10"></div>
          </div>

          {/* Quiz Content */}
          <div className="bg-white/10 rounded-xl p-6 mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                {activeQuiz.mission.quizData!.question}
              </h2>
            </div>

            {!activeQuiz.showResult ? (
              <>
                {/* Options */}
                <div className="space-y-3 mb-6">
                  {activeQuiz.mission.quizData!.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg transition-colors ${
                        activeQuiz.selectedAnswer === index
                          ? 'bg-white text-spiritual'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)})</span> {option}
                    </button>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  onClick={submitAnswer}
                  disabled={activeQuiz.selectedAnswer === null}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar Resposta
                </button>
              </>
            ) : (
              <>
                {/* Result */}
                <div className={`text-center mb-6 ${activeQuiz.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                  {activeQuiz.isCorrect ? (
                    <CheckCircle size={48} className="mx-auto mb-2" />
                  ) : (
                    <XCircle size={48} className="mx-auto mb-2" />
                  )}
                  <h3 className="text-xl font-bold">
                    {activeQuiz.isCorrect ? 'Correto!' : 'Incorreto'}
                  </h3>
                </div>

                {/* Explanation */}
                <div className="bg-white/20 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-2">Explicação:</h4>
                  <p className="text-sm opacity-90">
                    {activeQuiz.mission.quizData!.explanation}
                  </p>
                </div>

                {/* Verse */}
                <div className="bg-white/20 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-2">Versículo:</h4>
                  <p className="text-sm italic opacity-90">
                    "{activeQuiz.mission.verse.text}"
                  </p>
                  <p className="text-xs opacity-70 mt-2">
                    {activeQuiz.mission.verse.reference}
                  </p>
                </div>

                {/* Rewards */}
                {activeQuiz.isCorrect && (
                  <div className="bg-green-500/20 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Trophy size={16} />
                      Recompensas Ganhas:
                    </h4>
                    <div className="flex gap-4 text-sm">
                      <span>+{activeQuiz.mission.reward.wisdom} Sabedoria</span>
                      <span>+{activeQuiz.mission.reward.spiritPoints} Espírito</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={closeQuiz}
                  className="w-full btn-primary"
                >
                  Concluir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-spiritual text-white p-6">
        <h1 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
          <Target size={28} />
          Missões Espirituais
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { key: 'all', label: 'Todas', icon: null },
            { key: 'cruz_diaria', label: 'Cruz Diária', icon: Heart },
            { key: 'batalha_espiritual', label: 'Batalha', icon: Sword },
            { key: 'guerra_santa', label: 'Guerra Santa', icon: Crown },
            { key: 'quiz_biblia', label: 'Quiz Bíblia', icon: BookOpen },
            { key: 'ativa', label: 'Ativas', icon: Clock },
            { key: 'disponivel', label: 'Disponíveis', icon: Star }
          ].map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  activeFilter === filter.key
                    ? 'bg-white text-spiritual'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {Icon && <Icon size={14} />}
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mission Groups */}
      <div className="p-4 space-y-6">
        {Object.entries(missionGroups).map(([type, missions]) => {
          if (missions.length === 0) return null;
          
          return (
            <div key={type} className="space-y-4">
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-3">
                {getMissionTypeIcon(type as Mission['type'])}
                <h2 className="text-lg font-bold text-gray-800">
                  {getMissionTypeName(type as Mission['type'])}
                </h2>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {missions.length}
                </span>
              </div>

              {/* Missions List */}
              <div className="space-y-3">
                {missions.map((mission) => (
                  <div
                    key={mission.id}
                    className="bg-white rounded-xl p-4 shadow-sm border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{mission.name}</h3>
                          {getCategoryIcon(mission.category)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{mission.description}</p>
                        
                        {/* Status Badge */}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                          {mission.status}
                        </span>
                      </div>

                      {/* Action Button */}
                      <div className="ml-4">
                        {mission.type === 'quiz_biblia' ? (
                          <button
                            onClick={() => startQuiz(mission)}
                            className="bg-spiritual text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-spiritual/90 transition-colors flex items-center gap-2"
                          >
                            <BookOpen size={16} />
                            Iniciar Quiz
                          </button>
                        ) : (
                          <button
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              mission.status === 'ativa' 
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                : mission.status === 'completa'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {mission.status === 'ativa' ? 'Em Progresso' : 
                             mission.status === 'completa' ? 'Completa' : 'Iniciar'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar (for non-quiz missions) */}
                    {mission.type !== 'quiz_biblia' && mission.status === 'ativa' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progresso</span>
                          <span>{Math.round((mission.progress ?? 0) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-spiritual h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(mission.progress ?? 0) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Rewards */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-wisdom">
                          <Star size={14} />
                          +{mission.reward.wisdom}
                        </span>
                        <span className="flex items-center gap-1 text-spiritual">
                          <Zap size={14} />
                          +{mission.reward.spiritPoints}
                        </span>
                      </div>

                      {/* Verse Reference */}
                      <span className="text-gray-500 italic">
                        {mission.verse.reference}
                      </span>
                    </div>

                    {/* Verse (expandable) */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm italic text-gray-700">
                        "{mission.verse.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-12">
          <Target size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma missão encontrada com este filtro.</p>
        </div>
      )}
    </div>
  );
};

export default MissionsPage;