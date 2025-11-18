import React from 'react';
import { Target, Package, User, BookOpen, Trophy, Lock } from 'lucide-react';

  type BottomNavigationProps = {
    activeTab: string;
    onTabChange: (tab: string) => void;
    isStudyLocked?: boolean;
  };

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange, isStudyLocked }) => {
  const tabs = [
    { id: 'missoes', name: 'Missões', icon: Target },
    { id: 'inventario', name: 'Inventário', icon: Package },
    { id: 'perfil', name: 'Perfil', icon: User },
    { id: 'estudos', name: 'Estudos', icon: BookOpen },
    { id: 'conquistas', name: 'Conquistas', icon: Trophy }
  ];

  return (
    <nav className="bg-white border-t border-gray-200 px-2 sm:px-4 py-2 safe-area-bottom z-[100]">
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isEstudos = tab.id === 'estudos';
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (isEstudos && isStudyLocked) return;
                onTabChange(tab.id);
              }}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-[60px] relative ${
                isActive 
                  ? 'text-spiritual bg-spiritual/10' 
                  : 'text-gray-500 hover:text-gray-700'
              } ${isEstudos && isStudyLocked ? 'pointer-events-none opacity-60' : ''}`}
            >
              <Icon size={20} className="sm:w-6 sm:h-6" />
              {isEstudos && isStudyLocked && (
                <Lock size={18} className="absolute -top-2 -right-2 text-red-500 z-20 bg-white rounded-full border border-red-200 shadow" />
              )}
              <span className="text-xs mt-1 truncate w-full text-center">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;