import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Trophy, BookOpen } from 'lucide-react';
import { fetchChapter, type ChapterData } from '../services/bibleApi';

interface ChapterReaderProps {
  bookId: string;
  bookName: string;
  chapterNumber: number;
  onBack: () => void;
  onComplete: () => void;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({
  bookId,
  bookName,
  chapterNumber,
  onBack,
  onComplete
}) => {
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [readVerses, setReadVerses] = useState<Set<number>>(new Set());
  const [hasCompleted, setHasCompleted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChapter();
    setReadVerses(new Set());
    setHasCompleted(false);
  }, [bookId, chapterNumber]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current || !chapterData) return;
      const verseEls = Array.from(contentRef.current.querySelectorAll('.verse-item'));
      const newRead = new Set(readVerses);
      verseEls.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          newRead.add(chapterData.verses[idx].verse);
        }
      });
      setReadVerses(newRead);
      // Capítulo só conclui se todos os versículos foram lidos
      if (chapterData.verses.every(v => newRead.has(v.verse)) && !hasCompleted) {
        setHasCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };
    const element = contentRef.current;
    element?.addEventListener('scroll', handleScroll);
    return () => element?.removeEventListener('scroll', handleScroll);
  }, [chapterData, readVerses, hasCompleted, onComplete]);

  const loadChapter = async () => {
    setLoading(true);
    const data = await fetchChapter(bookId, chapterNumber);
    setChapterData(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-spiritual/5 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto mb-4 text-spiritual animate-pulse" />
          <p className="text-gray-600">Carregando capítulo...</p>
        </div>
      </div>
    );
  }

  if (!chapterData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-spiritual/5 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar capítulo</p>
          <button onClick={onBack} className="btn-primary">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // Progresso por versículo
  const progress = chapterData ? Math.round((readVerses.size / chapterData.verses.length) * 100) : 0;
  return (
    <div className="min-h-screen bg-gradient-to-b from-spiritual/5 to-gray-50">
      {/* Header fixo com progresso */}
      <div className="bg-gradient-to-r from-spiritual to-victory text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
              <span className="font-bold text-sm">{progress}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{bookName}</h1>
            <p className="text-sm text-white/80">Capítulo {chapterNumber}</p>
          </div>
          {/* Barra de progresso */}
          <div className="w-full bg-white/20 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo rolável - apenas uma barra de scroll */}
      <div className="max-w-4xl mx-auto p-6" style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }} ref={contentRef}>
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
          {chapterData.verses.map((verse, index) => (
            <div key={index} className="flex gap-3 group verse-item">
              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${readVerses.has(verse.verse) ? 'bg-victory/20 text-victory' : 'bg-spiritual/10 text-spiritual'}`}>
                {verse.verse}
              </span>
              <p className="flex-1 text-gray-700 leading-relaxed text-lg">
                {verse.text}
              </p>
            </div>
          ))}

          {/* Indicador de conclusão */}
          {hasCompleted && (
            <div className="mt-8 bg-gradient-to-r from-victory to-victory/80 text-white rounded-2xl p-6 text-center animate-bounce">
              <Trophy size={48} className="mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">Capítulo Concluído!</h3>
              <p className="text-white/90">Você leu todos os versículos</p>
            </div>
          )}
        </div>
        {/* Navegação entre capítulos */}
        <div className="flex justify-between mt-6">
          <button className="btn-secondary" onClick={() => onBack()}>Voltar</button>
          <button className="btn-primary" disabled={!hasCompleted} onClick={() => onComplete()}>Avançar</button>
        </div>
        <div className="h-16"></div>
      </div>
    </div>
  );
};
