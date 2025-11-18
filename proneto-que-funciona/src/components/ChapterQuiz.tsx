import React, { useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

  export interface ChapterQuizProps {
    chapterNumber: number;
    questions: QuizQuestion[];
    onComplete: (passed: boolean, score: number) => void;
    onCancel?: () => void;
  }

export const ChapterQuiz: React.FC<ChapterQuizProps> = ({
  chapterNumber,
  questions,
  onComplete,
  onCancel
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Já respondeu

    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === questions[currentQuestion].correctIndex;
    setAnswers([...answers, isCorrect]);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Avançar para próxima pergunta após 2 segundos
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completo
        const finalScore = isCorrect ? score + 1 : score;
        const passed = (finalScore / questions.length) * 100 >= 70; // 70% para passar
        setTimeout(() => onComplete(passed, finalScore), 1000);
      }
    }, 2000);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-spiritual">Quiz do Capítulo</h1>
            <p className="text-sm text-gray-500">Capítulo {chapterNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-victory">{score}/{questions.length}</p>
            <p className="text-xs text-gray-400">Pontuação</p>
          </div>
        </div>
        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-8">
          <div 
            className="h-full bg-gradient-to-r from-spiritual to-victory transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Número da pergunta */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-gray-500">
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
          {showResult && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              selectedAnswer === question.correctIndex
                ? 'bg-victory/20 text-victory'
                : 'bg-red-100 text-red-600'
            }`}>
              {selectedAnswer === question.correctIndex ? (
                <>
                  <Check size={16} />
                  <span className="text-sm font-medium">Correto!</span>
                </>
              ) : (
                <>
                  <X size={16} />
                  <span className="text-sm font-medium">Incorreto</span>
                </>
              )}
            </div>
          )}
        </div>
        {/* Pergunta */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          {question.question}
        </h2>
        {/* Opções */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctIndex;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl text-left transition-all transform hover:scale-[1.02] ${
                  showCorrect
                    ? 'bg-victory text-white border-2 border-victory'
                    : showWrong
                    ? 'bg-red-500 text-white border-2 border-red-500'
                    : isSelected
                    ? 'bg-spiritual/10 border-2 border-spiritual'
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-spiritual'
                } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    showCorrect || showWrong
                      ? 'bg-white/20 text-white'
                      : isSelected
                      ? 'bg-spiritual text-white'
                      : 'bg-white text-gray-600'
                  }`}>
                    {showCorrect ? (
                      <Check size={20} />
                    ) : showWrong ? (
                      <X size={20} />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={`flex-1 ${
                    showCorrect || showWrong ? 'font-medium' : ''
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {/* Dica */}
        {!showResult && (
          <div className="mt-6 flex items-start gap-2 p-4 bg-blue-50 rounded-lg">
            <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Selecione a resposta correta. Você precisa de 70% de acerto para passar!
            </p>
          </div>
        )}
        {/* Botão Cancelar */}
        <div className="flex justify-end mt-8">
          <button
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            onClick={() => {
              if (onCancel) onCancel();
            }}
          >Cancelar</button>
        </div>
      </div>
    </div>
  );
};

// Gerador de perguntas de quiz (exemplo - você pode fazer perguntas melhores)
export function generateQuizQuestions(bookId: string, chapterNumber: number): QuizQuestion[] {
  // Em produção, você teria um banco de perguntas específicas por capítulo
  // Por agora, vamos gerar perguntas genéricas como exemplo
  
  const templates: QuizQuestion[] = [
    {
      id: `${bookId}_${chapterNumber}_q1`,
      question: `Qual é o tema principal de ${bookId} capítulo ${chapterNumber}?`,
      options: [
        'A criação do mundo',
        'As leis de Deus',
        'A vida de Jesus',
        'As profecias do fim'
      ],
      correctIndex: 0
    },
    {
      id: `${bookId}_${chapterNumber}_q2`,
      question: `Quantos versículos você leu neste capítulo aproximadamente?`,
      options: ['Menos de 10', 'Entre 10 e 20', 'Entre 20 e 30', 'Mais de 30'],
      correctIndex: 2
    },
    {
      id: `${bookId}_${chapterNumber}_q3`,
      question: `Qual palavra-chave apareceu com frequência no capítulo?`,
      options: ['Fé', 'Amor', 'Graça', 'Sabedoria'],
      correctIndex: 0
    },
    {
      id: `${bookId}_${chapterNumber}_q4`,
      question: `O que este capítulo nos ensina?`,
      options: [
        'A importância da obediência',
        'O poder da oração',
        'A necessidade de perdão',
        'Todas as anteriores'
      ],
      correctIndex: 3
    },
    {
      id: `${bookId}_${chapterNumber}_q5`,
      question: `Qual personagem foi mencionado neste capítulo?`,
      options: ['Moisés', 'Davi', 'Paulo', 'Jesus'],
      correctIndex: 0
    },
    {
      id: `${bookId}_${chapterNumber}_q6`,
      question: `Este capítulo fala sobre:`,
      options: [
        'Promessas de Deus',
        'Julgamento',
        'Restauração',
        'Adoração'
      ],
      correctIndex: 0
    },
    {
      id: `${bookId}_${chapterNumber}_q7`,
      question: `Qual é a lição prática deste capítulo?`,
      options: [
        'Confiar em Deus em todas as circunstâncias',
        'Ser generoso com os outros',
        'Estudar as Escrituras diariamente',
        'Evangelizar os perdidos'
      ],
      correctIndex: 0
    },
    {
      id: `${bookId}_${chapterNumber}_q8`,
      question: `O capítulo menciona algum milagre?`,
      options: ['Sim, vários', 'Sim, um específico', 'Não', 'Não se aplica'],
      correctIndex: 3
    },
    {
      id: `${bookId}_${chapterNumber}_q9`,
      question: `Qual emoção predomina neste capítulo?`,
      options: ['Alegria', 'Tristeza', 'Esperança', 'Reverência'],
      correctIndex: 2
    },
    {
      id: `${bookId}_${chapterNumber}_q10`,
      question: `Como você aplicaria este capítulo em sua vida?`,
      options: [
        'Orando mais',
        'Sendo mais paciente',
        'Ajudando os necessitados',
        'Todas as opções são válidas'
      ],
      correctIndex: 3
    }
  ];

  return templates;
}
