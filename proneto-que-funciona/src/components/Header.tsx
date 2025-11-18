import React, { useState, useEffect, useRef } from 'react';
import { User, Settings, Bell, ChevronDown, UserCog, LogOut, Info, Shield, FileText, HelpCircle, AlertTriangle, Brain, Flame, ShieldCheck, Sword, Crown, Footprints, Layers, Heart } from 'lucide-react';
import AvatarWithBackground from './AvatarBackgrounds';
import EquippedItemsSlots from './EquippedItemsSlots';

interface ArmorPiece {
  equipped: boolean;
  integrity: number;
  level: number;
}

interface HeaderProps {
  playerName: string;
  spiritLevel: number;
  wisdom: number;
  streak: number;
  avatarUrl?: string;
  avatarBackground?: string;
  sin?: number;
  onNavigate?: (tab: string) => void;
  armorPieces?: {
    beltOfTruth: ArmorPiece;
    breastplateOfRighteousness: ArmorPiece;
    sandalsOfPeace: ArmorPiece;
    shieldOfFaith: ArmorPiece;
    helmetOfSalvation: ArmorPiece;
    swordOfSpirit: ArmorPiece;
    cloakOfWisdom: ArmorPiece;
  };
}

const Header: React.FC<HeaderProps> = ({ 
  playerName, 
  spiritLevel, 
  wisdom, 
  streak, 
  avatarUrl, 
  avatarBackground = 'spiritual1', 
  sin = 0,
  onNavigate,
  armorPieces
}) => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="p-3 sm:p-4">
        {/* Título HUD */}
        <div className="flex flex-wrap gap-2 mb-2 text-[11px] sm:text-xs font-semibold text-gray-300">
        </div>
        {/* Linha Principal */}
        <div className="flex items-center justify-between gap-4">
          {/* Esquerda: Avatar + Nome + Barra Espírito Santo */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Avatar */}
            <AvatarWithBackground
              avatarUrl={avatarUrl}
              backgroundId={avatarBackground}
              size="md"
              fallbackIcon={<User size={16} className="sm:w-5 sm:h-5" />}
            />
            
            {/* Nome + Barra Espírito Santo */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display font-semibold text-sm sm:text-base truncate">{playerName}</h2>
                
                {/* Badge de Nível */}
                <div className="bg-spiritual/30 border-2 border-spiritual rounded-full px-2 py-0.5 flex items-center gap-1">
                  <span className="text-xs font-bold text-spiritual">Nv {spiritLevel}</span>
                </div>
              </div>
              
              {/* Barra de Espírito Santo com texto dentro */}
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] bg-gray-700 rounded-full h-5 sm:h-6 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-spiritual to-victory transition-all duration-300"
                  style={{ width: `${Math.min((spiritLevel * 20), 100)}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow-lg">
                    Espírito Santo {spiritLevel * 20}/100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Direita: Notificações + Configurações */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg transition-colors relative">
              <Bell size={14} className="sm:w-4 sm:h-4" />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Menu de Configurações */}
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1"
              >
                <Settings size={14} className="sm:w-4 sm:h-4" />
                <ChevronDown size={10} className={`hidden sm:block transition-transform ${showSettingsMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {showSettingsMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onNavigate?.('perfil');
                      setShowSettingsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <UserCog size={16} />
                    <span>Perfil</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onNavigate?.('about');
                      setShowSettingsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Info size={16} />
                    <span>Sobre</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onNavigate?.('tutorial');
                      setShowSettingsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <HelpCircle size={16} />
                    <span>Tutorial</span>
                  </button>
                  
                  <hr className="my-2 border-gray-200" />
                  
                  <button
                    onClick={() => {
                      onNavigate?.('privacy');
                      setShowSettingsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Shield size={16} />
                    <span>Privacidade</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onNavigate?.('terms');
                      setShowSettingsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FileText size={16} />
                    <span>Termos de Uso</span>
                  </button>
                  
                  <hr className="my-2 border-gray-200" />
                  
                  <button
                    onClick={() => {
                      if (confirm('Tem certeza que deseja limpar o cache? Isso removerá todos os dados salvos localmente.')) {
                        localStorage.clear();
                        sessionStorage.clear();
                        alert('Cache limpo com sucesso! A página será recarregada.');
                        window.location.reload();
                      }
                      setShowSettingsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-orange-600 hover:bg-orange-50 flex items-center space-x-2"
                  >
                    <AlertTriangle size={16} />
                    <span>Limpar Cache</span>
                  </button>
                  
                  <hr className="my-2 border-gray-200" />
                  
                  <button
                    onClick={() => {
                      setShowSettingsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Linha de Slots de Itens Equipados + Stats */}
        <div className="mt-3 border-t border-gray-700 pt-3">
          <div className="flex items-center justify-start gap-1 sm:gap-1.5">
            {/* Slots de itens */}
            <div className="flex flex-col items-start gap-0.5">
              <div className='flex flex-eow itens-between gap-12'>
              <span className="text-[8px] sm:text-[10px] text-wisdom">Permanentes</span>
              <span className="text-[8px] sm:text-[10px] text-wisdom">Consumíveis</span>

              </div>
              <div><EquippedItemsSlots compact={true} /></div>
            </div>
            <div className="w-px h-10 sm:h-10 bg-gray-600 self-end" />
            {/* Stats à direita dos slots - mesma altura */}
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-[8px] sm:text-[10px] text-wisdom">Status</span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Sabedoria */}
                <div className="fflex items-center justify-center gap-1 bg-wisdom/30 rounded-lg border border-wisdom/50 h-9 w-9 sm:h-11 sm:w-11 relative">
                  <div className="flex flex-col items-center">
                    <Brain size={12} className="sm:w-4 sm:h-4 text-wisdom" />
                    <span className="text-wisdom font-bold text-[6px] sm:text-[8px]">{wisdom}</span>
                    <span className="text-wisdom font-bold text-[6px] sm:text-[6px]">sabedoria</span>
                  </div>
                </div>
                {/* Ofensiva (Streak) */}
                <div className="flex items-center justify-center gap-1 bg-victory/30 rounded-lg border border-victory/50 h-9 w-9 sm:h-11 sm:w-11 relative">
                  <div className="flex flex-col items-center w-full h-full">
                    <Flame size={12} className="sm:w-4 sm:h-4 text-victory" />
                    <span className="text-victory font-bold text-[8px] sm:text-[8px]">{streak}</span>
                    <span className="text-victory font-bold text-[6px] sm:text-[6px]">ofensiva</span>
                  </div>
                </div>
                {/* Pecado */}
                {sin > 0 && (
                  <div className="flex items-center justify-center gap-1 bg-sin/30 rounded-lg border border-sin/50 h-9 w-9 sm:h-11 sm:w-11 relative">
                    <div className="flex flex-col items-center w-full h-full">
                      <AlertTriangle size={12} className="sm:w-4 sm:h-4 text-sin" />
                      <span className="text-sin font-bold text-[8px] sm:text-[8px]">{sin}</span>
                      {sin > 0 && <span className="text-[6px] sm:text-[8px] text-sin">Pecado</span>}

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Slots da Armadura de Deus */}
        {armorPieces && (
          <div className="mt-1 pt-2 border-t border-gray-700">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto pb-1">
                {Object.entries(armorPieces).map(([key, piece]) => {
                  const getArmorIcon = () => {
                    switch (key) {
                      case 'beltOfTruth': return <Shield size={14} className="sm:w-4 sm:h-4" />;
                      case 'breastplateOfRighteousness': return <Layers size={14} className="sm:w-4 sm:h-4" />;
                      case 'sandalsOfPeace': return <Footprints size={14} className="sm:w-4 sm:h-4" />;
                      case 'shieldOfFaith': return <ShieldCheck size={14} className="sm:w-4 sm:h-4" />;
                      case 'helmetOfSalvation': return <Crown size={14} className="sm:w-4 sm:h-4" />;
                      case 'swordOfSpirit': return <Sword size={14} className="sm:w-4 sm:h-4" />;
                      case 'cloakOfWisdom': return <Heart size={14} className="sm:w-4 sm:h-4" />;
                      default: return <Shield size={14} className="sm:w-4 sm:h-4" />;
                    }
                  };
                  return (
                    <div 
                      key={key}
                      className={`relative flex flex-col items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg border-2 transition-all overflow-hidden ${
                        piece.equipped 
                          ? 'bg-gray-800/50 border-wisdom text-wisdom' 
                          : 'bg-gray-700/30 border-gray-600 text-gray-500'
                      }`}
                    >
                      {/* Barra de integridade de fundo */}
                      {piece.equipped && piece.integrity > 0 && (
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-wisdom/40 transition-all duration-300"
                          style={{ height: `${piece.integrity}%` }}
                        />
                      )}
                      {/* Ícone da armadura */}
                      <div className="relative z-10">
                        {getArmorIcon()}
                      </div>
                      {/* Porcentagem de integridade */}
                      {piece.equipped && (
                        <div className="relative z-10 text-[8px] sm:text-[9px] font-bold text-wisdom mt-0.5">
                          {piece.integrity}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
                <span className="text-[8px] sm:text-xs rounded">Armadura de Deus <span className="text-spiritual">(Efésios 6:10-18)</span></span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;