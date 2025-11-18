import React, { useState } from 'react';
import { ArrowLeft, Trophy, Lock, Star, Award, BookOpen, Heart, Target, Crown } from 'lucide-react';
import { achievements, Achievement, getAchievementsByCategory, getAchievementsByDifficulty } from '../data/achievements';

interface AchievementsPageProps {
  onBack: () => void;
}

const AchievementsPage: React.FC<AchievementsPageProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked' | 'facil' | 'medio' | 'dificil' | 'biblia' | 'espiritual' | 'missoes' | 'especial' | 'devocional'>('all');

  // Mock de conquistas desbloqueadas (será conectado ao sistema real depois)
  const unlockedAchievements = ['first_login', 'first_prayer', 'bible_genesis', 'wisdom_seeker'];

  const getFilteredAchievements = (): Achievement[] => {
    let filtered = achievements;

    switch (filter) {
      case 'unlocked':
        filtered = achievements.filter(a => unlockedAchievements.includes(a.id));
        break;
      case 'locked':
        filtered = achievements.filter(a => !unlockedAchievements.includes(a.id));
        break;
      case 'facil':
      case 'medio':
      case 'dificil':
        filtered = getAchievementsByDifficulty(filter);
        break;
      case 'biblia':
      case 'espiritual':
      case 'missoes':
      case 'especial':
      case 'devocional':
        filtered = getAchievementsByCategory(filter);
        break;
      default:
        filtered = achievements;
    }

    // Ordenar: desbloqueadas primeiro, depois por nome alfabético
    return filtered.sort((a, b) => {
      const aUnlocked = unlockedAchievements.includes(a.id);
      const bUnlocked = unlockedAchievements.includes(b.id);
      
      if (aUnlocked && !bUnlocked) return -1;
      if (!aUnlocked && bUnlocked) return 1;
      
      return a.name.localeCompare(b.name);
    });
  };

  const getDifficultyColor = (difficulty: Achievement['difficulty']) => {
    switch (difficulty) {
      case 'facil': return 'text-green-600 bg-green-100';
      case 'medio': return 'text-yellow-600 bg-yellow-100';
      case 'dificil': return 'text-red-600 bg-red-100';
    }
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'biblia': return <BookOpen size={16} />;
      case 'espiritual': return <Heart size={16} />;
      case 'missoes': return <Target size={16} />;
      case 'especial': return <Crown size={16} />;
      case 'devocional': return <Award size={16} />;
    }
  };

  const totalAchievements = achievements.length;
  const unlockedCount = unlockedAchievements.length;
  const totalPoints = unlockedAchievements.reduce((sum, id) => {
    const achievement = achievements.find(a => a.id === id);
    return sum + (achievement?.points || 0);
  }, 0);

  const filteredAchievements = getFilteredAchievements();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header + Stats + Filtros - Sticky abaixo do header e armadura */}
      <div className="sticky top-[218px] sm:top-[264px] z-30 bg-spiritual text-white shadow-lg">
        <div className="p-2 sm:p-3">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={onBack}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Trophy size={18} />
              Conquistas
            </h1>
            <div className="w-8 sm:w-10"></div>
          </div>

          {/* Estatísticas compactas */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center mb-2">
            <div className="bg-white/10 rounded-lg p-1.5">
              <div className="text-sm sm:text-base font-bold">{unlockedCount}</div>
              <div className="text-[9px] sm:text-[10px] opacity-90">Desbloq.</div>
            </div>
            <div className="bg-white/10 rounded-lg p-1.5">
              <div className="text-sm sm:text-base font-bold">{totalAchievements}</div>
              <div className="text-[9px] sm:text-[10px] opacity-90">Total</div>
            </div>
            <div className="bg-white/10 rounded-lg p-1.5">
              <div className="text-sm sm:text-base font-bold">{totalPoints}</div>
              <div className="text-[9px] sm:text-[10px] opacity-90">Pontos</div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mb-2">
            <div className="flex justify-between text-[9px] sm:text-[10px] mb-1">
              <span>Progresso</span>
              <span>{Math.round((unlockedCount / totalAchievements) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5">
              <div 
                className="bg-white h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(unlockedCount / totalAchievements) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="px-2 sm:px-3 pb-2 bg-gray-50">
          <div className="flex flex-wrap gap-1 pt-2">
            {[
              { key: 'all', label: 'Todas' },
              { key: 'unlocked', label: 'Desbloqueadas' },
              { key: 'locked', label: 'Bloqueadas' },
              { key: 'facil', label: 'Fácil' },
              { key: 'medio', label: 'Médio' },
              { key: 'dificil', label: 'Difícil' },
              { key: 'biblia', label: 'Bíblia' },
              { key: 'espiritual', label: 'Espiritual' },
              { key: 'missoes', label: 'Missões' },
              { key: 'especial', label: 'Especial' },
              { key: 'devocional', label: 'Devocional' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-spiritual text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de conquistas */}
      <div className="p-4">
        <div className="space-y-3">
          {filteredAchievements.map((achievement) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            const IconComponent = achievement.icon;

            return (
              <div
                key={achievement.id}
                className={`bg-white rounded-lg p-4 shadow-sm border transition-all ${
                  isUnlocked 
                    ? 'border-spiritual shadow-md' 
                    : 'border-gray-200 opacity-75'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div className={`p-3 rounded-full ${
                    isUnlocked 
                      ? 'bg-spiritual text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {isUnlocked ? <IconComponent /> : <Lock size={24} />}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${
                        isUnlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {/* Categoria */}
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          {getCategoryIcon(achievement.category)}
                        </span>
                        {/* Pontos */}
                        <span className="flex items-center gap-1 text-xs font-medium text-spiritual">
                          <Star size={12} />
                          {achievement.points}
                        </span>
                      </div>
                    </div>

                    <p className={`text-sm mb-3 ${
                      isUnlocked ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Dificuldade */}
                      {achievement.difficulty && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getDifficultyColor(achievement.difficulty)
                        }`}>
                          {achievement.difficulty.charAt(0).toUpperCase() + achievement.difficulty.slice(1)}
                        </span>
                      )}

                      {/* Status */}
                      {isUnlocked ? (
                        <div className="flex items-center gap-1 text-xs text-spiritual font-medium">
                          <Trophy size={12} />
                          Desbloqueada
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Lock size={12} />
                          Bloqueada
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma conquista encontrada com este filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;