import React from 'react';
import { Shield, Lock, Eye, Database, Share2, Trash2, AlertCircle } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-spiritual rounded-2xl flex items-center justify-center shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-2">
          Política de Privacidade
        </h1>
        <p className="text-sm text-gray-600">
          Última atualização: 11 de novembro de 2025
        </p>
      </div>

      {/* Introdução */}
      <div className="card mb-6 bg-spiritual/5 border-spiritual/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-spiritual flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-bold text-dark mb-2">Seu Compromisso com a Privacidade</h2>
            <p className="text-sm text-gray-700">
              No Christ.On, levamos sua privacidade muito a sério. Esta política explica como 
              coletamos, usamos e protegemos suas informações pessoais.
            </p>
          </div>
        </div>
      </div>

      {/* Informações Coletadas */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-wisdom/10 rounded-full flex items-center justify-center">
            <Database className="w-5 h-5 text-wisdom" />
          </div>
          <h2 className="text-lg font-bold text-dark">1. Informações que Coletamos</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-dark mb-2">1.1 Informações Fornecidas por Você</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-spiritual mt-1">•</span>
                <span><strong>Perfil:</strong> Nome espiritual, status civil, versão bíblica preferida</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-spiritual mt-1">•</span>
                <span><strong>Avatar:</strong> Personalização do avatar (armazenada localmente)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-spiritual mt-1">•</span>
                <span><strong>Email (opcional):</strong> Para recuperação de conta e notificações</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-dark mb-2">1.2 Informações Coletadas Automaticamente</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-spiritual mt-1">•</span>
                <span><strong>Progresso:</strong> Missões concluídas, conquistas desbloqueadas, estatísticas espirituais</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-spiritual mt-1">•</span>
                <span><strong>Uso:</strong> Páginas visitadas, tempo de uso, funcionalidades utilizadas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-spiritual mt-1">•</span>
                <span><strong>Dispositivo:</strong> Tipo de navegador, sistema operacional (apenas para compatibilidade)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Como Usamos */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-victory/10 rounded-full flex items-center justify-center">
            <Eye className="w-5 h-5 text-victory" />
          </div>
          <h2 className="text-lg font-bold text-dark">2. Como Usamos Suas Informações</h2>
        </div>
        
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-victory font-bold mt-1">✓</span>
            <span><strong>Personalização:</strong> Adaptar a experiência às suas preferências e progresso</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-victory font-bold mt-1">✓</span>
            <span><strong>Salvamento:</strong> Manter seu progresso sincronizado entre sessões</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-victory font-bold mt-1">✓</span>
            <span><strong>Melhorias:</strong> Analisar uso para aprimorar funcionalidades</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-victory font-bold mt-1">✓</span>
            <span><strong>Comunicação:</strong> Enviar notificações importantes (se autorizado)</span>
          </li>
        </ul>
      </div>

      {/* Armazenamento */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-spiritual/10 rounded-full flex items-center justify-center">
            <Lock className="w-5 h-5 text-spiritual" />
          </div>
          <h2 className="text-lg font-bold text-dark">3. Armazenamento de Dados</h2>
        </div>
        
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong className="text-dark">Armazenamento Local:</strong> A maior parte dos seus dados 
            é armazenada diretamente no seu dispositivo usando LocalStorage do navegador. Isso significa:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-victory mt-1">✓</span>
              <span>Seus dados permanecem no seu dispositivo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-victory mt-1">✓</span>
              <span>Não compartilhamos com terceiros</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-victory mt-1">✓</span>
              <span>Você tem controle total para limpar quando quiser</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Compartilhamento */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-sin/10 rounded-full flex items-center justify-center">
            <Share2 className="w-5 h-5 text-sin" />
          </div>
          <h2 className="text-lg font-bold text-dark">4. Compartilhamento de Dados</h2>
        </div>
        
        <div className="p-4 bg-victory/10 border border-victory/20 rounded-lg">
          <p className="text-sm text-gray-700 font-semibold mb-2">
            🔒 NÃO vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros.
          </p>
          <p className="text-xs text-gray-600">
            Podemos compartilhar informações agregadas e anônimas (estatísticas gerais) para 
            pesquisas sobre crescimento espiritual, mas nunca informações que identifiquem você.
          </p>
        </div>
      </div>

      {/* Seus Direitos */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-wisdom/10 rounded-full flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-wisdom" />
          </div>
          <h2 className="text-lg font-bold text-dark">5. Seus Direitos</h2>
        </div>
        
        <div className="space-y-3 text-sm text-gray-700">
          <p>Você tem o direito de:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-wisdom font-bold mt-1">→</span>
              <span><strong>Acessar:</strong> Ver todos os dados que temos sobre você</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-wisdom font-bold mt-1">→</span>
              <span><strong>Corrigir:</strong> Atualizar informações incorretas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-wisdom font-bold mt-1">→</span>
              <span><strong>Excluir:</strong> Remover sua conta e todos os dados associados</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-wisdom font-bold mt-1">→</span>
              <span><strong>Exportar:</strong> Receber uma cópia dos seus dados</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            Para exercer esses direitos, entre em contato conosco em: privacidade@christon.app
          </p>
        </div>
      </div>

      {/* Segurança */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-dark mb-3">6. Segurança</h2>
        <p className="text-sm text-gray-700 mb-3">
          Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-dark mb-1">🔐 Criptografia</p>
            <p className="text-xs text-gray-600">Dados sensíveis são criptografados</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-dark mb-1">🛡️ HTTPS</p>
            <p className="text-xs text-gray-600">Conexão segura sempre</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-dark mb-1">🔒 Acesso Restrito</p>
            <p className="text-xs text-gray-600">Apenas pessoal autorizado</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-dark mb-1">📱 Armazenamento Local</p>
            <p className="text-xs text-gray-600">Dados no seu dispositivo</p>
          </div>
        </div>
      </div>

      {/* Menores de Idade */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-dark mb-3">7. Menores de 13 Anos</h2>
        <p className="text-sm text-gray-700">
          O Christ.On não é direcionado a crianças menores de 13 anos. Se você é pai/mãe/responsável 
          e descobre que seu filho forneceu informações pessoais, entre em contato para que possamos 
          excluí-las.
        </p>
      </div>

      {/* Alterações */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-dark mb-3">8. Alterações nesta Política</h2>
        <p className="text-sm text-gray-700">
          Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas 
          através do app ou por email. A data da última atualização estará sempre no topo desta página.
        </p>
      </div>

      {/* Contato */}
      <div className="card bg-spiritual/5 border-spiritual/20">
        <h2 className="text-lg font-bold text-dark mb-3">9. Entre em Contato</h2>
        <p className="text-sm text-gray-700 mb-3">
          Dúvidas sobre privacidade? Entre em contato:
        </p>
        <div className="space-y-2 text-sm">
          <p><strong className="text-dark">Email:</strong> privacidade@christon.app</p>
          <p><strong className="text-dark">Suporte:</strong> contato@christon.app</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Esta política está em conformidade com a LGPD (Lei Geral de Proteção de Dados)
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
