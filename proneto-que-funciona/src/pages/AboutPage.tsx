import React from 'react';
import { Heart, Target, Sparkles, Shield, Book, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-spiritual to-victory rounded-2xl flex items-center justify-center shadow-lg">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-2">
          Christ.On
        </h1>
        <p className="text-lg text-spiritual font-semibold mb-1">
          O Caminho da Sabedoria
        </p>
        <p className="text-sm text-gray-600">
          Versão 1.0.0 • Novembro 2025
        </p>
      </div>

      {/* Missão */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-spiritual/10 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-spiritual" />
          </div>
          <h2 className="text-xl font-bold text-dark">Nossa Missão</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Transformar a jornada espiritual cristã em uma experiência interativa e gamificada, 
          ajudando os crentes a crescerem em sabedoria, fortalecerem sua fé e vestirem 
          completamente a Armadura de Deus através de missões diárias inspiradas nas Escrituras.
        </p>
      </div>

      {/* Visão */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-wisdom/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-wisdom" />
          </div>
          <h2 className="text-xl font-bold text-dark">Nossa Visão</h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          Ser a principal plataforma de crescimento espiritual gamificado, onde milhões de 
          cristãos ao redor do mundo possam:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-victory mt-1">✓</span>
            <span className="text-gray-700">Desenvolver disciplinas espirituais consistentes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-victory mt-1">✓</span>
            <span className="text-gray-700">Aprofundar seu conhecimento bíblico</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-victory mt-1">✓</span>
            <span className="text-gray-700">Fortalecer relacionamentos cristãos (casais, famílias)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-victory mt-1">✓</span>
            <span className="text-gray-700">Combater o pecado através de prestação de contas</span>
          </li>
        </ul>
      </div>

      {/* Valores */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-victory/10 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-victory" />
          </div>
          <h2 className="text-xl font-bold text-dark">Nossos Valores</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-spiritual mb-2">🙏 Centralidade Bíblica</h3>
            <p className="text-sm text-gray-600">
              Todas as missões e conteúdos são fundamentados nas Escrituras Sagradas
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-spiritual mb-2">💪 Crescimento Prático</h3>
            <p className="text-sm text-gray-600">
              Foco em ações concretas que transformam a vida espiritual diária
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-spiritual mb-2">🤝 Comunidade</h3>
            <p className="text-sm text-gray-600">
              Incentivo ao crescimento conjunto e fortalecimento mútuo
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-spiritual mb-2">✨ Graça e Verdade</h3>
            <p className="text-sm text-gray-600">
              Equilíbrio entre desafios espirituais e compreensão das fragilidades humanas
            </p>
          </div>
        </div>
      </div>

      {/* Inspiração Bíblica */}
      <div className="card mb-6 bg-gradient-to-br from-spiritual/5 to-victory/5 border-spiritual/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Book className="w-6 h-6 text-spiritual" />
          </div>
          <h2 className="text-xl font-bold text-dark">Fundamento Bíblico</h2>
        </div>
        <blockquote className="border-l-4 border-spiritual pl-4 mb-3">
          <p className="text-gray-700 italic mb-2">
            "Portanto, tomai toda a armadura de Deus, para que possais resistir no dia mau 
            e, havendo feito tudo, ficar firmes."
          </p>
          <cite className="text-sm text-spiritual font-semibold">- Efésios 6:13</cite>
        </blockquote>
        <p className="text-sm text-gray-600">
          O app é inspirado na metáfora da Armadura de Deus (Efésios 6:10-18), 
          transformando cada peça espiritual em uma jornada interativa de crescimento.
        </p>
      </div>

      {/* Equipe */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-wisdom/10 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-wisdom" />
          </div>
          <h2 className="text-xl font-bold text-dark">Equipe</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Christ.On é desenvolvido por uma equipe de cristãos apaixonados por tecnologia 
          e crescimento espiritual, comprometidos em criar ferramentas que aproximem as 
          pessoas de Deus.
        </p>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong className="text-dark">Desenvolvimento:</strong> Matheus Bonotto
          </p>
          <p className="text-sm text-gray-600">
            <strong className="text-dark">Contato:</strong> contato@christon.app
          </p>
        </div>
      </div>

      {/* Tecnologia */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark mb-4">Tecnologia</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl mb-1">⚛️</p>
            <p className="text-xs font-medium text-gray-600">React 18</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl mb-1">📘</p>
            <p className="text-xs font-medium text-gray-600">TypeScript</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl mb-1">🎨</p>
            <p className="text-xs font-medium text-gray-600">Tailwind CSS</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl mb-1">📱</p>
            <p className="text-xs font-medium text-gray-600">PWA</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Feito com ❤️ para a glória de Deus
        </p>
        <p className="text-xs text-gray-400 mt-2">
          © 2025 Christ.On. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
