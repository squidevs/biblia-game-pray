import React from 'react';
import { FileText, AlertTriangle, UserCheck, Scale, Ban, RefreshCw } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-wisdom rounded-2xl flex items-center justify-center shadow-lg">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-2">
          Termos de Serviço
        </h1>
        <p className="text-sm text-gray-600">
          Última atualização: 11 de novembro de 2025
        </p>
      </div>

      {/* Introdução */}
      <div className="card mb-6 bg-wisdom/5 border-wisdom/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-wisdom flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-bold text-dark mb-2">Bem-vindo ao Christ.On</h2>
            <p className="text-sm text-gray-700">
              Ao usar nosso aplicativo, você concorda com estes termos. Por favor, leia-os 
              cuidadosamente antes de continuar. Se não concordar, não use o serviço.
            </p>
          </div>
        </div>
      </div>

      {/* Aceitação dos Termos */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-spiritual/10 rounded-full flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-spiritual" />
          </div>
          <h2 className="text-lg font-bold text-dark">1. Aceitação dos Termos</h2>
        </div>
        
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Ao acessar e usar o Christ.On ("Aplicativo", "Serviço", "nós", "nosso"), você aceita 
            estar legalmente vinculado a estes Termos de Serviço. Se você não concordar com 
            qualquer parte destes termos, não deve usar o Aplicativo.
          </p>
          <p>
            O Christ.On é uma ferramenta de crescimento espiritual baseada na Bíblia, projetada 
            para ajudar cristãos a desenvolver disciplinas espirituais através de missões, 
            conquistas e gamificação.
          </p>
        </div>
      </div>

      {/* Uso Aceitável */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-victory/10 rounded-full flex items-center justify-center">
            <Scale className="w-5 h-5 text-victory" />
          </div>
          <h2 className="text-lg font-bold text-dark">2. Uso Aceitável</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-dark mb-2">2.1 Você Concorda em:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-victory mt-1">✓</span>
                <span>Usar o Aplicativo apenas para fins pessoais e não comerciais</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-victory mt-1">✓</span>
                <span>Fornecer informações precisas e verdadeiras</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-victory mt-1">✓</span>
                <span>Manter a segurança da sua conta (se aplicável)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-victory mt-1">✓</span>
                <span>Respeitar os direitos de propriedade intelectual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-victory mt-1">✓</span>
                <span>Usar o Aplicativo de forma ética e responsável</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-dark mb-2">2.2 Você NÃO Pode:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-sin mt-1">✗</span>
                <span>Tentar acessar áreas não autorizadas do sistema</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sin mt-1">✗</span>
                <span>Modificar, copiar ou distribuir o código do Aplicativo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sin mt-1">✗</span>
                <span>Usar o Aplicativo para fins ilegais ou prejudiciais</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sin mt-1">✗</span>
                <span>Criar contas falsas ou enganosas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sin mt-1">✗</span>
                <span>Interferir no funcionamento normal do Aplicativo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Propriedade Intelectual */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-wisdom/10 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-wisdom" />
          </div>
          <h2 className="text-lg font-bold text-dark">3. Propriedade Intelectual</h2>
        </div>
        
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong className="text-dark">Direitos Autorais:</strong> Todo o conteúdo do Christ.On 
            (código, design, textos, imagens, missões, etc.) é de propriedade exclusiva da equipe 
            Christ.On ou de seus licenciadores e está protegido por leis de direitos autorais.
          </p>
          <p>
            <strong className="text-dark">Licença de Uso:</strong> Concedemos a você uma licença 
            limitada, não exclusiva, intransferível e revogável para usar o Aplicativo conforme 
            estes Termos.
          </p>
          <p>
            <strong className="text-dark">Conteúdo Bíblico:</strong> Os textos bíblicos utilizados 
            são de domínio público ou usados com permissão das respectivas editoras (NVI, ARA, etc.).
          </p>
        </div>
      </div>

      {/* Conteúdo do Usuário */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-dark mb-3">4. Conteúdo do Usuário</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Se você compartilhar conteúdo no Aplicativo (comentários, testemunhos, etc.), você:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-spiritual mt-1">•</span>
              <span>Mantém os direitos sobre seu conteúdo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-spiritual mt-1">•</span>
              <span>Nos concede uma licença mundial, gratuita e não exclusiva para usar, 
              reproduzir e exibir esse conteúdo no contexto do Aplicativo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-spiritual mt-1">•</span>
              <span>Garante que seu conteúdo não viola direitos de terceiros</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Isenção de Garantias */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-sin/10 rounded-full flex items-center justify-center">
            <Ban className="w-5 h-5 text-sin" />
          </div>
          <h2 className="text-lg font-bold text-dark">5. Isenção de Garantias</h2>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-3">
          <p className="text-sm text-gray-700 font-semibold mb-2">
            ⚠️ IMPORTANTE: O Aplicativo é fornecido "COMO ESTÁ"
          </p>
          <p className="text-xs text-gray-600">
            Não garantimos que o serviço será ininterrupto, livre de erros ou completamente seguro.
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong className="text-dark">Uso Espiritual:</strong> O Christ.On é uma ferramenta 
          complementar ao crescimento espiritual, não substitui a igreja local, comunhão cristã, 
          leitura bíblica pessoal ou orientação pastoral.</p>
          
          <p><strong className="text-dark">Conteúdo Educacional:</strong> As missões e estudos 
          são baseados em interpretações bíblicas evangélicas. Incentivamos o discernimento e 
          diálogo com líderes espirituais qualificados.</p>
        </div>
      </div>

      {/* Limitação de Responsabilidade */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-dark mb-3">6. Limitação de Responsabilidade</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Na extensão máxima permitida por lei, o Christ.On e seus desenvolvedores NÃO serão 
            responsáveis por:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-sin mt-1">•</span>
              <span>Perda de dados ou progresso no Aplicativo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sin mt-1">•</span>
              <span>Danos indiretos, incidentais ou consequenciais</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sin mt-1">•</span>
              <span>Problemas causados por uso indevido do Aplicativo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sin mt-1">•</span>
              <span>Incompatibilidade com dispositivos ou navegadores</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Modificações do Serviço */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-spiritual/10 rounded-full flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-spiritual" />
          </div>
          <h2 className="text-lg font-bold text-dark">7. Modificações do Serviço</h2>
        </div>
        
        <p className="text-sm text-gray-700">
          Reservamos o direito de modificar, suspender ou descontinuar o Aplicativo (ou qualquer 
          parte dele) a qualquer momento, com ou sem aviso prévio. Não seremos responsáveis 
          perante você ou terceiros por qualquer modificação, suspensão ou descontinuação do Serviço.
        </p>
      </div>

      {/* Rescisão */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-dark mb-3">8. Rescisão</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong className="text-dark">Por Você:</strong> Você pode parar de usar o Aplicativo 
            a qualquer momento. Para excluir seus dados, entre em contato conosco.
          </p>
          <p>
            <strong className="text-dark">Por Nós:</strong> Podemos suspender ou encerrar seu 
            acesso ao Aplicativo se você violar estes Termos, sem aviso prévio e sem reembolso 
            (se aplicável).
          </p>
        </div>
      </div>

      {/* Lei Aplicável */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-dark mb-3">9. Lei Aplicável e Jurisdição</h2>
        <p className="text-sm text-gray-700">
          Estes Termos serão regidos e interpretados de acordo com as leis do Brasil. Qualquer 
          disputa relacionada a estes Termos será resolvida nos tribunais competentes no Brasil.
        </p>
      </div>

      {/* Alterações nos Termos */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-dark mb-3">10. Alterações nos Termos</h2>
        <p className="text-sm text-gray-700">
          Podemos atualizar estes Termos periodicamente. Notificaremos sobre mudanças significativas 
          através do Aplicativo. O uso continuado após alterações constitui aceitação dos novos Termos.
        </p>
      </div>

      {/* Disposições Gerais */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold text-dark mb-3">11. Disposições Gerais</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong className="text-dark">Integralidade:</strong> Estes Termos constituem o acordo 
          completo entre você e o Christ.On.</p>
          
          <p><strong className="text-dark">Divisibilidade:</strong> Se qualquer disposição for 
          considerada inválida, as demais permanecerão em vigor.</p>
          
          <p><strong className="text-dark">Renúncia:</strong> A falha em fazer cumprir qualquer 
          direito não constitui renúncia.</p>
        </div>
      </div>

      {/* Contato */}
      <div className="card bg-wisdom/5 border-wisdom/20">
        <h2 className="text-lg font-bold text-dark mb-3">12. Entre em Contato</h2>
        <p className="text-sm text-gray-700 mb-3">
          Dúvidas sobre estes Termos? Entre em contato:
        </p>
        <div className="space-y-2 text-sm">
          <p><strong className="text-dark">Email:</strong> legal@christon.app</p>
          <p><strong className="text-dark">Suporte:</strong> contato@christon.app</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Ao usar o Christ.On, você confirma ter lido, compreendido e concordado com estes Termos de Serviço.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
