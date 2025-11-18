import React, { useState } from 'react';
import { CheckCircle, Award } from 'lucide-react';

interface QuizQuestion {
  id: number;
  pergunta: string;
  opcoes: string[];
  correta: string;
}

interface QuizInterfaceProps {
  questoes: QuizQuestion[];
  onComplete: (score: number, correct: number, total: number) => void;
  onCancel: () => void;
  missionTitle?: string;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ 
  questoes, 
  onComplete, 
  onCancel,
  missionTitle = 'Quiz Bíblico'
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) return;

    const newAnswers = [...selectedAnswers, selectedOption];
    setSelectedAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questoes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completo
      const correctCount = newAnswers.reduce((count, answer, index) => {
        return count + (answer === questoes[index].correta ? 1 : 0);
      }, 0);

      const score = Math.round((correctCount / questoes.length) * 100);
      setShowResult(true);
      setTimeout(() => {
        onComplete(score, correctCount, questoes.length);
      }, 3000);
    }
  };

  const currentQ = questoes[currentQuestion];
  const progress = ((currentQuestion + 1) / questoes.length) * 100;

  if (showResult) {
    const correctCount = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === questoes[index].correta ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / questoes.length) * 100);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h3 className="text-2xl font-bold text-dark mb-2">Quiz Completo!</h3>
          <p className="text-gray-600 mb-4">Você acertou:</p>
          <div className="text-5xl font-bold text-spiritual mb-2">
            {correctCount}/{questoes.length}
          </div>
          <div className="text-xl text-wisdom mb-4">
            {score}% de acerto
          </div>
          <p className="text-sm text-gray-500">
            Processando recompensas...
          </p>
        </div>
      </div>
    );
  }

  return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-[999]">
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] sm:max-h-[70vh] overflow-y-auto flex flex-col"
        style={{
          maxHeight: '90vh',
          height: '100%',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-spiritual text-white p-4 rounded-t-xl">
          <h2 className="text-xl font-bold mb-2">{missionTitle}</h2>
          <div className="flex items-center justify-between text-sm">
            <span>Questão {currentQuestion + 1} de {questoes.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2 mt-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-dark mb-6">
            {currentQ.pergunta}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.opcoes.map((opcao, index) => {
              const isSelected = selectedOption === opcao;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(opcao)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-spiritual bg-spiritual/10 font-medium'
                      : 'border-gray-200 hover:border-spiritual/50 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected 
                        ? 'border-spiritual bg-spiritual' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-gray-700">{opcao}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
  <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-xl flex justify-between gap-3 z-[60]" style={{marginBottom: 'env(safe-area-inset-bottom, 56px)'}}>
          <button
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedOption
                ? 'bg-spiritual text-white hover:bg-spiritual/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion < questoes.length - 1 ? 'Próxima' : 'Finalizar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;
