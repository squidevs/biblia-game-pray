import React from 'react';
import { 
  BsHeart, 
  BsEye, 
  BsArrowCounterclockwise, 
  BsStars, 
  BsShield, 
  BsBuilding,
  BsPeace
} from 'react-icons/bs';
import { 
  MdWaterDrop
} from 'react-icons/md';

interface ActionButtonProps {
  action: {
    id: string;
    name: string;
    description: string;
    icon: string;
    cooldown: number;
  };
  onExecute: (actionId: string) => void;
  isOnCooldown: boolean;
}

const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  BsHeart,
  BsEye,
  BsArrowCounterclockwise,
  MdWaterDrop,
  BsStars,
  BsShield,
  BsPeace,
  BsBuilding
};

const ActionButton: React.FC<ActionButtonProps> = ({ action, onExecute, isOnCooldown }) => {
  const IconComponent = iconMap[action.icon];
  
  return (
    <button
      onClick={() => !isOnCooldown && onExecute(action.id)}
      disabled={isOnCooldown}
      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
        isOnCooldown 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-spiritual shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-spiritual text-2xl">
          {IconComponent && <IconComponent size={32} />}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{action.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{action.description}</p>
          {isOnCooldown && (
            <p className="text-xs text-sin mt-2">
              Em recarga...
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

const ActionsPage: React.FC = () => {
  const [cooldowns, setCooldowns] = React.useState<Record<string, boolean>>({});

  const actions = [
    {
      id: 'orar',
      name: 'Orar',
      description: 'Conectar-se com Deus em oração',
      icon: 'BsHeart',
      cooldown: 3600000
    },
    {
      id: 'confessar', 
      name: 'Confessar',
      description: 'Reconhecer pecados e buscar perdão',
      icon: 'BsEye',
      cooldown: 86400000
    },
    {
      id: 'arrepender',
      name: 'Arrepender',
      description: 'Mudança genuína de coração e mente',
      icon: 'BsArrowCounterclockwise',
      cooldown: 2592000000
    },
    {
      id: 'justificar',
      name: 'Justificar',
      description: 'Corrigir falhas passadas com ações justas',
      icon: 'MdWaterDrop',
      cooldown: 43200000
    },
    {
      id: 'glorificar',
      name: 'Glorificar',
      description: 'Dar glória a Deus e compartilhar bênçãos',
      icon: 'BsStars',
      cooldown: 21600000
    },
    {
      id: 'perdoar',
      name: 'Perdoar',
      description: 'Perdoar ofensas e liberar rancor',
      icon: 'BsShield',
      cooldown: 86400000
    },
    {
      id: 'adorar',
      name: 'Adorar',
      description: 'Adoração sincera e louvor a Deus',
      icon: 'BsPeace',
      cooldown: 14400000
    },
    {
      id: 'santificar',
      name: 'Santificar', 
      description: 'Separar-se para uso sagrado de Deus',
      icon: 'BsBuilding',
      cooldown: 604800000
    }
  ];

  const handleActionExecute = (actionId: string) => {
    // Executar ação
    console.log(`Executando ação: ${actionId}`);
    
    // Ativar cooldown
    setCooldowns(prev => ({ ...prev, [actionId]: true }));
    
    // Simular cooldown (para demo, usando apenas 5 segundos)
    setTimeout(() => {
      setCooldowns(prev => ({ ...prev, [actionId]: false }));
    }, 5000);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="font-display text-2xl font-bold text-dark mb-2">
          Ações Espirituais
        </h1>
        <p className="text-gray-600">
          Fortaleça sua fé através de ações diárias
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {actions.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            onExecute={handleActionExecute}
            isOnCooldown={cooldowns[action.id] || false}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionsPage;