import React, { useState, useEffect } from 'react';
import { Mission } from '../types/mission';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { inventoryManager } from '../utils/inventoryManager';
import QuizInterface from './QuizInterface';

interface MissionCardProps {
  mission: Mission;
  onComplete: (missionId: number) => void;
  onGiveUp: (missionId: number) => void;
  onCheckboxToggle: (missionId: number, checkboxId: number) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onComplete,
  onGiveUp,
  onCheckboxToggle
}) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [messageText, setMessageText] = useState('');
  const [hasSword, setHasSword] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // Verificar se tem Espada equipada (necessária para Quiz - EXCETO missões de armadura IDs 101-106)
  useEffect(() => {
    if (mission.categoria === 'quiz') {
      // Missões de armadura (IDs 101-106) não requerem espada
      const isArmorMission = mission.id >= 101 && mission.id <= 107;
      if (isArmorMission) {
        setHasSword(true); // Sempre permitir
      } else {
        setHasSword(inventoryManager.hasSword());
      }
    }
  }, [mission.categoria, mission.id]);

  // Ícone dinâmico
  const IconComponent = (Icons as any)[mission.elementos.icone] || Icons.Circle;

  // Cor da dificuldade
  const getDifficultyColor = () => {
    switch (mission.nivelDificuldade) {
      case 'comum': return 'bg-gray-500';
      case 'rara': return 'bg-blue-500';
      case 'lendaria': return 'bg-purple-500';
      case 'divina': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Calcular tempo restante
  useEffect(() => {
    const updateTimer = () => {
      if (!mission.dataExpiracao) return;
      const now = Date.now();
      const diff = mission.dataExpiracao - now;
      if (diff <= 0) {
        setTimeRemaining('Expirada');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  setTimeRemaining(`${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000); // Atualiza a cada segundo
    return () => clearInterval(interval);
  }, [mission.dataExpiracao]);

  // Mostrar mensagem temporária
  const showFeedback = (type: 'success' | 'error' | 'info', text: string) => {
    setMessageType(type);
    setMessageText(text);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  // Handler de conclusão
  const handleComplete = () => {
    onComplete(mission.id);
    showFeedback('success', `Glória a Deus! Você concluiu a missão e ganhou +${mission.recompensas.xpSabedoria} XP de Sabedoria.`);
  };

  // Handler de desistência
  const handleGiveUp = () => {
    onGiveUp(mission.id);
    showFeedback('error', `Você desistiu. ${mission.penalidades.descricao}`);
  };

  // Calcular progresso do checklist
  const calculateProgress = () => {
    if (mission.interacoes.progresso.checkboxes.length === 0) return 0;
    const completed = mission.interacoes.progresso.checkboxes.filter(cb => cb.feito).length;
    return Math.round((completed / mission.interacoes.progresso.checkboxes.length) * 100);
  };

  // Verificar se pode concluir checklist
  const canCompleteChecklist = () => {
    return mission.interacoes.progresso.checkboxes.every(cb => cb.feito);
  };

  // Renderizar card de AÇÃO
  const renderActionCard = () => (
    <>
      {/* Timer no canto superior direito */}
  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200 z-20">
        <Icons.Clock className="w-4 h-4 text-spiritual" />
        <span className="font-bold text-spiritual" style={{ fontSize: '7px' }}>{timeRemaining}</span>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: mission.elementos.background }}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-display font-bold text-lg text-text">{mission.titulo}</h3>
            
            {/* Badge especial para missões de Armadura de Deus */}
            {mission.id >= 101 && mission.id <= 107 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold shadow-md animate-pulse">
                ⚔️ ARMADURA DE DEUS
              </span>
            )}
            
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white">
              Ação
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getDifficultyColor()}`}>
              {mission.nivelDificuldade}
            </span>
          </div>
          
          {/* Tags */}
          {mission.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {mission.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-sm text-gray-600 mb-2">{mission.descricao}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Icons.Zap className="w-3 h-3" />
              {mission.tipoMissao}
            </span>
          </div>
        </div>
      </div>

      {/* Recompensas */}
      <div className="bg-gradient-to-r from-wisdom/10 to-spiritual/10 rounded-lg p-3 mb-3 border border-wisdom/20">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-gray-700">Recompensas:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Icons.Brain className="w-4 h-4 text-wisdom" />
            <div>
              <p className="text-xs font-medium text-wisdom">+{mission.recompensas.xpSabedoria} Sabedoria</p>
              <p className="text-xs text-gray-500">XP espiritual</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Flame className="w-4 h-4 text-spiritual" />
            <div>
              <p className="text-xs font-medium text-spiritual">+{mission.recompensas.moedasFe} Fé</p>
              <p className="text-xs text-gray-500">Espírito Santo</p>
            </div>
          </div>
        </div>
        
        {/* Armadura */}
        {(mission.recompensas.armadura.capacete > 0 || 
          mission.recompensas.armadura.espada > 0 || 
          mission.recompensas.armadura.escudo > 0 || 
          mission.recompensas.armadura.couraca > 0 || 
          mission.recompensas.armadura.sandalias > 0) && (
          <div className="mt-2 pt-2 border-t border-wisdom/20">
            <p className="text-xs font-medium text-gray-700 mb-1">Armadura de Deus:</p>
            <div className="flex flex-wrap gap-2">
              {mission.recompensas.armadura.capacete > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Shield className="w-3 h-3" />
                  Capacete +{mission.recompensas.armadura.capacete}
                </span>
              )}
              {mission.recompensas.armadura.espada > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Sword className="w-3 h-3" />
                  Espada +{mission.recompensas.armadura.espada}
                </span>
              )}
              {mission.recompensas.armadura.escudo > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.ShieldCheck className="w-3 h-3" />
                  Escudo +{mission.recompensas.armadura.escudo}
                </span>
              )}
              {mission.recompensas.armadura.couraca > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Shield className="w-3 h-3" />
                  Couraça +{mission.recompensas.armadura.couraca}
                </span>
              )}
              {mission.recompensas.armadura.sandalias > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Footprints className="w-3 h-3" />
                  Sandálias +{mission.recompensas.armadura.sandalias}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Consumíveis */}
        {mission.recompensas.consumiveis.length > 0 && (
          <div className="mt-2 pt-2 border-t border-wisdom/20">
            <p className="text-xs font-medium text-gray-700 mb-1">Itens (Inventário):</p>
            <div className="flex flex-wrap gap-2">
              {mission.recompensas.consumiveis.map((consumivel, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-victory/20 text-victory rounded-md flex items-center gap-1"
                >
                  <Icons.Package className="w-3 h-3" />
                  {consumivel.quantidade}x {consumivel.tipo} ({consumivel.duracao})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botões */}
      {mission.status === 'ativa' && (
        <div className="flex gap-2">
          <button
            onClick={handleComplete}
            className="flex-1 bg-victory text-white py-2 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Concluir
          </button>
          <button
            onClick={handleGiveUp}
            className="flex-1 bg-sin text-white py-2 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Desistir
          </button>
        </div>
      )}
    </>
  );

  // Renderizar card de QUIZ
  const renderQuizCard = () => (
    <>
      {/* Timer no canto superior esquerdo */}
  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200 z-20">
        <Icons.Clock className="w-4 h-4 text-spiritual" />
        <span className="font-bold text-spiritual" style={{ fontSize: '7px' }}>{timeRemaining}</span>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: mission.elementos.background }}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-display font-bold text-lg text-text">{mission.titulo}</h3>
            
            {/* Badge especial para missões de Armadura de Deus */}
            {mission.id >= 101 && mission.id <= 107 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold shadow-md animate-pulse">
                ⚔️ ARMADURA DE DEUS
              </span>
            )}
            
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500 text-white">
              Quiz
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getDifficultyColor()}`}>
              {mission.nivelDificuldade}
            </span>
          </div>
          
          {/* Tags */}
          {mission.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {mission.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-sm text-gray-600 mb-2">{mission.descricao}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Icons.BookOpen className="w-3 h-3" />
              {mission.quizDados.questoes.length} questões
            </span>
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600">Progresso</span>
          <span className="font-medium">{mission.interacoes.progresso.porcentagem}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${mission.interacoes.progresso.porcentagem}%`,
              background: mission.elementos.background
            }}
          />
        </div>
      </div>

      {/* Recompensas */}
      <div className="bg-gradient-to-r from-wisdom/10 to-spiritual/10 rounded-lg p-3 mb-3 border border-wisdom/20">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-gray-700">Recompensas:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Icons.Brain className="w-4 h-4 text-wisdom" />
            <div>
              <p className="text-xs font-medium text-wisdom">+{mission.recompensas.xpSabedoria} Sabedoria</p>
              <p className="text-xs text-gray-500">XP espiritual</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Flame className="w-4 h-4 text-spiritual" />
            <div>
              <p className="text-xs font-medium text-spiritual">+{mission.recompensas.moedasFe} Fé</p>
              <p className="text-xs text-gray-500">Espírito Santo</p>
            </div>
          </div>
        </div>
        
        {/* Armadura */}
        {(mission.recompensas.armadura.capacete > 0 || 
          mission.recompensas.armadura.espada > 0 || 
          mission.recompensas.armadura.escudo > 0 || 
          mission.recompensas.armadura.couraca > 0 || 
          mission.recompensas.armadura.sandalias > 0) && (
          <div className="mt-2 pt-2 border-t border-wisdom/20">
            <p className="text-xs font-medium text-gray-700 mb-1">Armadura de Deus:</p>
            <div className="flex flex-wrap gap-2">
              {mission.recompensas.armadura.capacete > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Shield className="w-3 h-3" />
                  Capacete +{mission.recompensas.armadura.capacete}
                </span>
              )}
              {mission.recompensas.armadura.espada > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Sword className="w-3 h-3" />
                  Espada +{mission.recompensas.armadura.espada}
                </span>
              )}
              {mission.recompensas.armadura.escudo > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.ShieldCheck className="w-3 h-3" />
                  Escudo +{mission.recompensas.armadura.escudo}
                </span>
              )}
              {mission.recompensas.armadura.couraca > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Shield className="w-3 h-3" />
                  Couraça +{mission.recompensas.armadura.couraca}
                </span>
              )}
              {mission.recompensas.armadura.sandalias > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Footprints className="w-3 h-3" />
                  Sandálias +{mission.recompensas.armadura.sandalias}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Botões */}
      {mission.status === 'ativa' && (
        <>
          {!hasSword && (
            <div className="mb-3 p-3 bg-sin/10 border border-sin/30 rounded-lg flex items-start gap-2">
              <Icons.Lock className="w-4 h-4 text-sin mt-0.5 flex-shrink-0" />
              <p className="text-sm text-sin">
                Você precisa equipar a <strong>Espada do Espírito</strong> para participar de quizzes.
              </p>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setShowQuiz(true)}
              disabled={!hasSword}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                hasSword
                  ? 'bg-spiritual text-white hover:bg-opacity-90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {mission.interacoes.progresso.porcentagem > 0 ? 'Continuar' : 'Iniciar'}
            </button>
            <button
              onClick={handleGiveUp}
              className="flex-1 bg-sin text-white py-2 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Desistir
            </button>
          </div>

          {/* Quiz Modal */}
          {showQuiz && mission.quizDados && (
            <QuizInterface
              questoes={mission.quizDados.questoes}
              missionTitle={mission.titulo}
              onComplete={(score, correct, total) => {
                setShowQuiz(false);
                if (score >= 60) {
                  handleComplete();
                } else {
                  showFeedback('error', `Você acertou ${correct}/${total} questões. Necessário 60% para passar.`);
                }
              }}
              onCancel={() => setShowQuiz(false)}
            />
          )}
        </>
      )}
    </>
  );

  // Renderizar card de CASAL
  const renderCoupleCard = () => (
    <>
      {/* Timer no canto superior esquerdo */}
  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200 z-20">
        <Icons.Clock className="w-4 h-4 text-spiritual" />
        <span className="font-bold text-spiritual" style={{ fontSize: '7px' }}>{timeRemaining}</span>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: mission.elementos.background }}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-display font-bold text-lg text-text">{mission.titulo}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500 text-white">
              Casal
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getDifficultyColor()}`}>
              {mission.nivelDificuldade}
            </span>
          </div>
          
          {/* Tags */}
          {mission.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {mission.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-sm text-gray-600 mb-2">{mission.descricao}</p>
          <p className="text-xs italic text-gray-500 mb-2">
            "O amor é paciente, o amor é bondoso." - 1 Coríntios 13:4
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Icons.Heart className="w-3 h-3" />
              {mission.tipoMissao}
            </span>
          </div>
        </div>
      </div>

      {/* Recompensas */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-3 mb-3 border border-pink-200">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-gray-700">Recompensas:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Icons.Brain className="w-4 h-4 text-wisdom" />
            <div>
              <p className="text-xs font-medium text-wisdom">+{mission.recompensas.xpSabedoria} Sabedoria</p>
              <p className="text-xs text-gray-500">XP espiritual</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Flame className="w-4 h-4 text-spiritual" />
            <div>
              <p className="text-xs font-medium text-spiritual">+{mission.recompensas.moedasFe} Fé</p>
              <p className="text-xs text-gray-500">Espírito Santo</p>
            </div>
          </div>
        </div>
        
        {/* Armadura */}
        {(mission.recompensas.armadura.capacete > 0 || 
          mission.recompensas.armadura.espada > 0 || 
          mission.recompensas.armadura.escudo > 0 || 
          mission.recompensas.armadura.couraca > 0 || 
          mission.recompensas.armadura.sandalias > 0) && (
          <div className="mt-2 pt-2 border-t border-pink-200">
            <p className="text-xs font-medium text-gray-700 mb-1">Armadura de Deus:</p>
            <div className="flex flex-wrap gap-2">
              {mission.recompensas.armadura.capacete > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Shield className="w-3 h-3" />
                  Capacete +{mission.recompensas.armadura.capacete}
                </span>
              )}
              {mission.recompensas.armadura.espada > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Sword className="w-3 h-3" />
                  Espada +{mission.recompensas.armadura.espada}
                </span>
              )}
              {mission.recompensas.armadura.escudo > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.ShieldCheck className="w-3 h-3" />
                  Escudo +{mission.recompensas.armadura.escudo}
                </span>
              )}
              {mission.recompensas.armadura.couraca > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Shield className="w-3 h-3" />
                  Couraça +{mission.recompensas.armadura.couraca}
                </span>
              )}
              {mission.recompensas.armadura.sandalias > 0 && (
                <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                  <Icons.Footprints className="w-3 h-3" />
                  Sandálias +{mission.recompensas.armadura.sandalias}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Consumíveis */}
        {mission.recompensas.consumiveis.length > 0 && (
          <div className="mt-2 pt-2 border-t border-pink-200">
            <p className="text-xs font-medium text-gray-700 mb-1">Itens (Inventário):</p>
            <div className="flex flex-wrap gap-2">
              {mission.recompensas.consumiveis.map((consumivel, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-victory/20 text-victory rounded-md flex items-center gap-1"
                >
                  <Icons.Package className="w-3 h-3" />
                  {consumivel.quantidade}x {consumivel.tipo} ({consumivel.duracao})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botões */}
      {mission.status === 'ativa' && (
        <div className="flex gap-2">
          <button
            onClick={handleComplete}
            className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Concluir
          </button>
          <button
            onClick={handleGiveUp}
            className="flex-1 bg-sin text-white py-2 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Desistir
          </button>
        </div>
      )}
    </>
  );

  // Renderizar card de CHECKLIST
  const renderChecklistCard = () => {
    const progress = calculateProgress();
    const canComplete = canCompleteChecklist();

    return (
      <>
        {/* Timer no canto superior esquerdo */}
  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200 z-20">
          <Icons.Clock className="w-4 h-4 text-spiritual" />
          <span className="font-bold text-spiritual" style={{ fontSize: '7px' }}>{timeRemaining}</span>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: mission.elementos.background }}
          >
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-display font-bold text-lg text-text">{mission.titulo}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-white">
                Checklist
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getDifficultyColor()}`}>
                {mission.nivelDificuldade}
              </span>
            </div>
            
            {/* Tags */}
            {mission.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {mission.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <p className="text-sm text-gray-600 mb-2">{mission.descricao}</p>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Icons.ListChecks className="w-3 h-3" />
                {mission.interacoes.progresso.checkboxes.filter(cb => cb.feito).length}/{mission.interacoes.progresso.checkboxes.length}
              </span>
            </div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Progresso</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                background: progress === 100 ? '#3DA35D' : mission.elementos.background
              }}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 mb-4">
          {mission.interacoes.progresso.checkboxes.map((checkbox) => (
            <label 
              key={checkbox.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={checkbox.feito}
                onChange={() => onCheckboxToggle(mission.id, checkbox.id)}
                disabled={mission.status !== 'ativa'}
                className="mt-1 w-4 h-4 text-spiritual border-gray-300 rounded focus:ring-spiritual"
              />
              <span className={`text-sm ${checkbox.feito ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {checkbox.texto}
              </span>
            </label>
          ))}
        </div>

        {/* Recompensas */}
        <div className="bg-gradient-to-r from-wisdom/10 to-spiritual/10 rounded-lg p-3 mb-3 border border-wisdom/20">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-gray-700">Recompensas:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Icons.Brain className="w-4 h-4 text-wisdom" />
              <div>
                <p className="text-xs font-medium text-wisdom">+{mission.recompensas.xpSabedoria} Sabedoria</p>
                <p className="text-xs text-gray-500">XP espiritual</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Flame className="w-4 h-4 text-spiritual" />
              <div>
                <p className="text-xs font-medium text-spiritual">+{mission.recompensas.moedasFe} Fé</p>
                <p className="text-xs text-gray-500">Espírito Santo</p>
              </div>
            </div>
          </div>
          
          {/* Armadura */}
          {(mission.recompensas.armadura.capacete > 0 || 
            mission.recompensas.armadura.espada > 0 || 
            mission.recompensas.armadura.escudo > 0 || 
            mission.recompensas.armadura.couraca > 0 || 
            mission.recompensas.armadura.sandalias > 0) && (
            <div className="mt-2 pt-2 border-t border-wisdom/20">
              <p className="text-xs font-medium text-gray-700 mb-1">Armadura de Deus:</p>
              <div className="flex flex-wrap gap-2">
                {mission.recompensas.armadura.capacete > 0 && (
                  <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                    <Icons.Shield className="w-3 h-3" />
                    Capacete +{mission.recompensas.armadura.capacete}
                  </span>
                )}
                {mission.recompensas.armadura.espada > 0 && (
                  <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                    <Icons.Sword className="w-3 h-3" />
                    Espada +{mission.recompensas.armadura.espada}
                  </span>
                )}
                {mission.recompensas.armadura.escudo > 0 && (
                  <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                    <Icons.ShieldCheck className="w-3 h-3" />
                    Escudo +{mission.recompensas.armadura.escudo}
                  </span>
                )}
                {mission.recompensas.armadura.couraca > 0 && (
                  <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                    <Icons.Shield className="w-3 h-3" />
                    Couraça +{mission.recompensas.armadura.couraca}
                  </span>
                )}
                {mission.recompensas.armadura.sandalias > 0 && (
                  <span className="text-xs px-2 py-1 bg-spiritual/20 text-spiritual rounded-md flex items-center gap-1">
                    <Icons.Footprints className="w-3 h-3" />
                    Sandálias +{mission.recompensas.armadura.sandalias}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Consumíveis */}
          {mission.recompensas.consumiveis.length > 0 && (
            <div className="mt-2 pt-2 border-t border-wisdom/20">
              <p className="text-xs font-medium text-gray-700 mb-1">Itens (Inventário):</p>
              <div className="flex flex-wrap gap-2">
                {mission.recompensas.consumiveis.map((consumivel, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 bg-victory/20 text-victory rounded-md flex items-center gap-1"
                  >
                    <Icons.Package className="w-3 h-3" />
                    {consumivel.quantidade}x {consumivel.tipo} ({consumivel.duracao})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botões */}
        {mission.status === 'ativa' && (
          <div className="flex gap-2">
            <button
              onClick={handleComplete}
              disabled={!canComplete}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                canComplete 
                  ? 'bg-victory text-white hover:bg-opacity-90' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Concluir Missão
            </button>
            <button
              onClick={handleGiveUp}
              className="flex-1 bg-sin text-white py-2 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Desistir
            </button>
          </div>
        )}

        {/* Mensagem de conclusão */}
        {progress === 100 && mission.status === 'ativa' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-victory/20 border border-victory rounded-lg"
          >
            <p className="text-sm text-victory font-medium text-center">
              Todos os objetivos foram cumpridos! Clique em Concluir Missão.
            </p>
          </motion.div>
        )}
      </>
    );
  };

  // Renderizar baseado no tipo
  const renderCardContent = () => {
    switch (mission.categoria) {
      case 'acao':
        return renderActionCard();
      case 'quiz':
        return renderQuizCard();
      case 'casal':
        return renderCoupleCard();
      case 'checklist':
        return renderChecklistCard();
      default:
        return renderActionCard();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`card relative overflow-hidden p-3 sm:p-4 ${
        mission.status === 'concluida' ? 'opacity-60' : ''
      } ${
        mission.status === 'expirada' ? 'border-sin border-2' : ''
      }`}
    >
      {/* Badge de status */}
      {mission.status === 'concluida' && (
        <div className="absolute top-2 right-2">
          <Icons.CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-victory" />
        </div>
      )}

      {/* Conteúdo */}
      {renderCardContent()}

      {/* Mensagem de feedback */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-3 p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
              messageType === 'success' ? 'bg-victory/20 text-victory' :
              messageType === 'error' ? 'bg-sin/20 text-sin' :
              'bg-spiritual/20 text-spiritual'
            }`}
          >
            {messageText}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MissionCard;
