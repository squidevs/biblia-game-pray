import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Trophy, CheckCircle, XCircle, Search } from 'lucide-react';
import { safeLocalStorage } from '../utils/storage';

interface MissionHistoryEntry {
  missionId: string;
  missionTitle: string;
  completedAt: string;
  questions?: number;
  correctAnswers?: number;
  percentage?: number;
  timeElapsed?: number;
  passed?: boolean;
  results?: any[];
  type?: 'quiz' | 'action' | 'prayer' | 'meditation' | 'study';
  reward?: { wisdom?: number; spiritPoints?: number; items?: string[] };
}

interface MissionsHistoryPageProps {
  onBack: () => void;
}

const MissionsHistoryPage: React.FC<MissionsHistoryPageProps> = ({ onBack }) => {
  const [history, setHistory] = useState<MissionHistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'quiz' | 'action' | 'prayer'>('all');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const historyData = JSON.parse(safeLocalStorage.getItem('christon-missions-history') || '[]');
      // Ordenar por data de conclusão (mais recente primeiro)
      const sortedHistory = historyData.sort((a: MissionHistoryEntry, b: MissionHistoryEntry) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
      setHistory(sortedHistory);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      setHistory([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeLabel = (type?: string) => {
    switch (type) {
      case 'quiz': return 'Quiz';
      case 'action': return 'Ação';
      case 'prayer': return 'Oração';
      case 'meditation': return 'Meditação';
      case 'study': return 'Estudo';
      default: return 'Missão';
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'quiz': return 'bg-yellow-500';
      case 'action': return 'bg-blue-500';
      case 'prayer': return 'bg-green-500';
      case 'meditation': return 'bg-purple-500';
      case 'study': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredHistory = history.filter(entry => {
    const matchesSearch = entry.missionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalMissions = history.length;
  const totalQuizzes = history.filter(h => h.type === 'quiz').length;
  const averageQuizScore = totalQuizzes > 0 
    ? history.filter(h => h.type === 'quiz' && h.percentage !== undefined)
           .reduce((acc, h) => acc + (h.percentage || 0), 0) / totalQuizzes
    : 0;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-display text-xl font-bold">Histórico de Missões</h1>
          <p className="text-sm text-gray-600">Suas missões completadas</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
          <div className="text-lg font-bold text-spiritual">{totalMissions}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
          <div className="text-lg font-bold text-victory">{totalQuizzes}</div>
          <div className="text-xs text-gray-600">Quizzes</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
          <div className="text-lg font-bold text-wisdom">{averageQuizScore.toFixed(0)}%</div>
          <div className="text-xs text-gray-600">Média Quiz</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card space-y-4">
        <div className="flex items-center space-x-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar missões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-spiritual"
          />
        </div>
        <div className="flex space-x-2">
          {['all', 'quiz', 'action', 'prayer'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`px-3 py-1 rounded-full text-sm ${
                filterType === type 
                  ? 'bg-spiritual text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? 'Todas' : getTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* História */}
      <div className="space-y-3">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((entry, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {entry.type && (
                      <span className={`text-xs px-2 py-1 rounded text-white ${getTypeColor(entry.type)}`}>
                        {getTypeLabel(entry.type)}
                      </span>
                    )}
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(entry.completedAt)}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{entry.missionTitle}</h3>
                  
                  {/* Quiz específico */}
                  {entry.type === 'quiz' && entry.questions && (
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="flex items-center justify-center mb-1">
                          {entry.passed ? (
                            <CheckCircle size={16} className="text-green-500 mr-1" />
                          ) : (
                            <XCircle size={16} className="text-red-500 mr-1" />
                          )}
                          <span className="text-sm font-medium">
                            {entry.correctAnswers} / {entry.questions}
                          </span>
                        </div>
                        <div className={`text-xs ${entry.passed ? 'text-green-600' : 'text-red-600'}`}>
                          {entry.percentage?.toFixed(0)}% {entry.passed ? '(Aprovado)' : '(Reprovado)'}
                        </div>
                      </div>
                      
                      {entry.timeElapsed && (
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="flex items-center justify-center mb-1">
                            <Clock size={16} className="text-gray-500 mr-1" />
                            <span className="text-sm font-medium">
                              {formatTime(entry.timeElapsed)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">Tempo gasto</div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Recompensas */}
                  {entry.reward && (
                    <div className="mt-3 p-2 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-4 text-sm">
                        {entry.reward.wisdom && (
                          <div className="flex items-center text-green-600">
                            <Trophy size={12} className="mr-1" />
                            +{entry.reward.wisdom} Sabedoria
                          </div>
                        )}
                        {entry.reward.items && entry.reward.items.length > 0 && (
                          <div className="flex items-center text-green-600">
                            🎁 {entry.reward.items.length} itens
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-8">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchTerm ? 'Nenhuma missão encontrada' : 'Nenhuma missão concluída'}
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'Tente buscar por outros termos.' 
                : 'Complete missões para ver seu histórico aqui!'
              }
            </p>
          </div>
        )}
      </div>

      {/* Dica */}
      {history.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Trophy size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800">Dica</h3>
              <p className="text-sm text-blue-600">
                Continue completando missões para aumentar sua sabedoria e desbloquear novos desafios!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionsHistoryPage;