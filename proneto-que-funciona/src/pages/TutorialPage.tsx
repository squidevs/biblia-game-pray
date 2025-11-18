import React, { useState } from 'react';
import { 
  BookOpen, Target, Trophy, Shield, Heart, TrendingUp, 
  CheckCircle, ArrowRight, Sparkles
} from 'lucide-react';

const TutorialPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: 'Bem-vindo ao Christ.On',
      icon: Sparkles,
      color: 'spiritual',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Christ.On é uma jornada espiritual gamificada que transforma disciplinas cristãs 
            em missões épicas. Vista a <strong>Armadura de Deus</strong> e cresça na fé!
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 bg-spiritual/10 rounded-lg">
              <Target className="w-6 h-6 text-spiritual mb-2" />
              <h4 className="font-semibold text-dark mb-1">Missões Diárias</h4>
              <p className="text-xs text-gray-600">Complete tarefas baseadas na Bíblia</p>
            </div>
            <div className="p-4 bg-victory/10 rounded-lg">
              <Trophy className="w-6 h-6 text-victory mb-2" />
              <h4 className="font-semibold text-dark mb-1">Conquistas</h4>
              <p className="text-xs text-gray-600">Desbloqueie troféus espirituais</p>
            </div>
            <div className="p-4 bg-wisdom/10 rounded-lg">
              <Shield className="w-6 h-6 text-wisdom mb-2" />
              <h4 className="font-semibold text-dark mb-1">Armadura de Deus</h4>
              <p className="text-xs text-gray-600">Colete as 6 peças da armadura</p>
            </div>
            <div className="p-4 bg-love/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-love mb-2" />
              <h4 className="font-semibold text-dark mb-1">Progresso Real</h4>
              <p className="text-xs text-gray-600">Acompanhe seu crescimento espiritual</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: 'Conheça o HUD',
      icon: Shield,
      color: 'wisdom',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            O <strong>HUD (Heads-Up Display)</strong> mostra suas estatísticas espirituais em tempo real:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-love rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-dark">❤️ Vida</h4>
                <p className="text-xs text-gray-600">
                  Sua saúde espiritual. Recupere através de oração e devocionais. 
                  Perde quando falha em missões.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-spiritual rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-dark">✨ Espírito Santo</h4>
                <p className="text-xs text-gray-600">
                  Energia para completar missões. Regenera automaticamente ao longo do tempo 
                  ou instantaneamente com itens especiais.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-wisdom rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-dark">📖 Sabedoria</h4>
                <p className="text-xs text-gray-600">
                  Conhecimento bíblico acumulado. Aumenta ao completar estudos e quizzes. 
                  Necessária para missões avançadas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-sin rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">💀</span>
              </div>
              <div>
                <h4 className="font-semibold text-dark">💀 Pecado</h4>
                <p className="text-xs text-gray-600">
                  Acumula quando você falha ou ignora missões. Reduza através de confissão 
                  e arrependimento. Afeta a expressão do seu avatar.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-spiritual/10 border border-spiritual/20 rounded-lg">
            <p className="text-xs text-gray-700">
              💡 <strong>Dica:</strong> Mantenha suas estatísticas equilibradas para 
              maximizar o crescimento espiritual!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Como Funcionam as Missões',
      icon: Target,
      color: 'victory',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Missões são desafios práticos baseados em princípios bíblicos. Existem 3 tipos:
          </p>

          <div className="space-y-3">
            <div className="border-l-4 border-spiritual pl-4 py-2">
              <h4 className="font-semibold text-dark mb-1">📝 Missões de Ação</h4>
              <p className="text-sm text-gray-700 mb-2">
                Tarefas práticas do dia a dia (orar, jejuar, servir, etc.)
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-3 h-3 text-spiritual" />
                <span>Exemplo: "Ore por 15 minutos pela manhã"</span>
              </div>
            </div>

            <div className="border-l-4 border-wisdom pl-4 py-2">
              <h4 className="font-semibold text-dark mb-1">❓ Missões de Quiz</h4>
              <p className="text-sm text-gray-700 mb-2">
                Perguntas sobre passagens bíblicas para testar conhecimento
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-3 h-3 text-wisdom" />
                <span>Exemplo: Quizzes sobre Efésios 6:10-18</span>
              </div>
            </div>

            <div className="border-l-4 border-victory pl-4 py-2 bg-yellow-50">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-dark">⚔️ ARMADURA DE DEUS</h4>
                <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-0.5 rounded-full font-bold">
                  ESPECIAL
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Missões épicas baseadas em Efésios 6:10-18. Desbloqueie as 6 peças da armadura!
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-yellow-600">🛡️</span>
                  <span><strong>Escudo da Fé</strong> - Protege contra ataques espirituais</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-yellow-600">⚔️</span>
                  <span><strong>Espada do Espírito</strong> - A Palavra de Deus</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-yellow-600">🪖</span>
                  <span><strong>Capacete da Salvação</strong> - Proteção da mente</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-victory/10 border border-victory/20 rounded-lg">
            <p className="text-xs text-gray-700">
              🎯 <strong>Recompensas:</strong> Missões concedidas incluem XP, moedas espirituais, 
              itens consumíveis e peças da armadura!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'A Armadura de Deus',
      icon: Shield,
      color: 'wisdom',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Baseada em <strong>Efésios 6:10-18</strong>, a Armadura de Deus tem 6 peças que 
            você pode desbloquear:
          </p>

          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
              <span className="text-2xl">🪖</span>
              <div>
                <h4 className="font-semibold text-dark">Capacete da Salvação</h4>
                <p className="text-xs text-gray-600 mb-1">
                  "Tomai também o capacete da salvação..." (Ef 6:17)
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Efeito:</strong> Protege sua mente de pensamentos destrutivos (+10 Sabedoria)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
              <span className="text-2xl">🛡️</span>
              <div>
                <h4 className="font-semibold text-dark">Escudo da Fé</h4>
                <p className="text-xs text-gray-600 mb-1">
                  "Embraçai sempre o escudo da fé..." (Ef 6:16)
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Efeito:</strong> Bloqueia ataques espirituais (+20 Vida Máxima)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
              <span className="text-2xl">⚔️</span>
              <div>
                <h4 className="font-semibold text-dark">Espada do Espírito</h4>
                <p className="text-xs text-gray-600 mb-1">
                  "E a espada do Espírito, que é a palavra de Deus" (Ef 6:17)
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Efeito:</strong> Arma ofensiva contra o mal (+15 Sabedoria, +50% XP)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
              <span className="text-2xl">👞</span>
              <div>
                <h4 className="font-semibold text-dark">Calçados da Prontidão</h4>
                <p className="text-xs text-gray-600 mb-1">
                  "Calçai os pés com a preparação do evangelho da paz" (Ef 6:15)
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Efeito:</strong> Aumenta mobilidade e rapidez (+20 Espírito Santo Máximo)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
              <span className="text-2xl">🦺</span>
              <div>
                <h4 className="font-semibold text-dark">Couraça da Justiça</h4>
                <p className="text-xs text-gray-600 mb-1">
                  "Vesti-vos da couraça da justiça" (Ef 6:14)
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Efeito:</strong> Protege o coração de impurezas (+15 Vida Máxima, -1 Pecado/dia)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
              <span className="text-2xl">🔗</span>
              <div>
                <h4 className="font-semibold text-dark">Cinto da Verdade</h4>
                <p className="text-xs text-gray-600 mb-1">
                  "Cingindo-vos com a verdade" (Ef 6:14)
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Efeito:</strong> Sustenta toda a armadura (+10 Sabedoria, +10 Vida)
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-spiritual/10 border-2 border-spiritual/30 rounded-lg">
            <p className="text-sm text-gray-700 font-semibold mb-2">
              🏆 Bônus de Conjunto Completo
            </p>
            <p className="text-xs text-gray-600">
              Colete todas as 6 peças para desbloquear buffs permanentes e a conquista 
              <strong> "Soldado de Cristo"</strong>!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Conquistas e Progresso',
      icon: Trophy,
      color: 'love',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Conquistas são marcos importantes na sua jornada espiritual:
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-spiritual">
              <h4 className="font-semibold text-dark mb-1">🥉 Bronze</h4>
              <p className="text-xs text-gray-600">
                Primeiros passos (ex: "Primeira Oração", "Devocional Iniciado")
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-wisdom">
              <h4 className="font-semibold text-dark mb-1">🥈 Prata</h4>
              <p className="text-xs text-gray-600">
                Progresso significativo (ex: "7 Dias de Jejum", "50 Missões Completas")
              </p>
            </div>

            <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-dark mb-1">🥇 Ouro</h4>
              <p className="text-xs text-gray-600">
                Maestria espiritual (ex: "Armadura Completa", "100 Pessoas Evangelizadas")
              </p>
            </div>
          </div>

          <div className="p-4 bg-victory/10 border border-victory/20 rounded-lg">
            <h4 className="font-semibold text-dark mb-2">📊 Acompanhe Seu Progresso</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span>Missões Completas</span>
                <span className="font-bold text-victory">15/50</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Conquistas Desbloqueadas</span>
                <span className="font-bold text-victory">8/42</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Armadura de Deus</span>
                <span className="font-bold text-victory">2/6 peças</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-spiritual/10 rounded-lg">
            <p className="text-xs text-gray-700">
              💡 <strong>Dica:</strong> Acesse a página de <strong>Conquistas</strong> para 
              ver todas disponíveis e como desbloqueá-las!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: 'Dicas Finais',
      icon: Sparkles,
      color: 'spiritual',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 font-semibold">
            Aproveite ao máximo sua jornada no Christ.On:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-spiritual/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-spiritual flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-dark">Consistência {'>'} Perfeição</h4>
                <p className="text-xs text-gray-600">
                  É melhor fazer pequenas missões diariamente do que tentar tudo de uma vez. 
                  Cresça gradualmente!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-wisdom/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-wisdom flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-dark">Use Itens Estrategicamente</h4>
                <p className="text-xs text-gray-600">
                  Poções de cura e energéticos são preciosos. Guarde para momentos críticos 
                  ou missões difíceis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-victory/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-victory flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-dark">Foco na Armadura de Deus</h4>
                <p className="text-xs text-gray-600">
                  Priorize missões com o selo dourado "⚔️ ARMADURA DE DEUS". São as mais 
                  valiosas para seu crescimento!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-love/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-love flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-dark">Reduza o Pecado</h4>
                <p className="text-xs text-gray-600">
                  Quando o ícone 💀 aparecer, busque missões de confissão e arrependimento. 
                  Um coração limpo é essencial!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-dark">Não Substitui a Igreja</h4>
                <p className="text-xs text-gray-600">
                  Christ.On é uma ferramenta complementar. Continue frequentando cultos, 
                  células e mantendo comunhão com outros cristãos!
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-spiritual/20 to-victory/20 border-2 border-spiritual/30 rounded-lg">
            <h4 className="font-semibold text-dark mb-2 text-center">
              🙏 Que Deus abençoe sua jornada!
            </h4>
            <p className="text-xs text-center text-gray-700">
              "Portanto, tomai toda a armadura de Deus, para que possais resistir no dia mau 
              e, depois de terdes vencido tudo, permanecer inabaláveis."
            </p>
            <p className="text-xs text-center text-spiritual font-semibold mt-2">
              - Efésios 6:13
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className={`w-16 h-16 mx-auto mb-4 bg-${currentStep.color} rounded-2xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-2">
          {currentStep.title}
        </h1>
        <p className="text-sm text-gray-600">
          Passo {activeStep + 1} de {steps.length}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex gap-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`h-2 flex-1 rounded-full transition-all ${
                step.id <= activeStep ? `bg-${currentStep.color}` : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="card mb-6">
        {currentStep.content}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            activeStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-dark hover:bg-gray-300'
          }`}
        >
          ← Anterior
        </button>

        <div className="flex gap-2">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`w-2 h-2 rounded-full transition-all ${
                step.id === activeStep ? `bg-${currentStep.color} w-6` : 'bg-gray-300'
              }`}
              aria-label={`Ir para passo ${step.id + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
          className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            activeStep === steps.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : `bg-${currentStep.color} text-white hover:opacity-90`
          }`}
        >
          {activeStep === steps.length - 1 ? (
            'Concluído ✓'
          ) : (
            <>
              Próximo
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Quick Links */}
      {activeStep === steps.length - 1 && (
        <div className="mt-6 p-4 bg-spiritual/5 border border-spiritual/20 rounded-lg">
          <h3 className="font-semibold text-dark mb-3 text-center">🚀 Pronto para começar?</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <button className="p-3 bg-white border-2 border-spiritual rounded-lg hover:bg-spiritual/10 transition-all">
              <Target className="w-5 h-5 text-spiritual mx-auto mb-1" />
              <p className="text-xs font-semibold text-dark">Ver Missões</p>
            </button>
            <button className="p-3 bg-white border-2 border-wisdom rounded-lg hover:bg-wisdom/10 transition-all">
              <Shield className="w-5 h-5 text-wisdom mx-auto mb-1" />
              <p className="text-xs font-semibold text-dark">Armadura de Deus</p>
            </button>
            <button className="p-3 bg-white border-2 border-victory rounded-lg hover:bg-victory/10 transition-all">
              <Trophy className="w-5 h-5 text-victory mx-auto mb-1" />
              <p className="text-xs font-semibold text-dark">Conquistas</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialPage;
