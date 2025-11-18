import { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import ActionsPage from './pages/ActionsPage';
import ItemsPage from './pages/ItemsPage';
import { safeLocalStorage } from './utils/storage';
import EnhancedMissionsPage from './pages/EnhancedMissionsPage';
import ProfilePage from './pages/ProfilePage';
import AchievementsPage from './pages/AchievementsPage';
import StudiesPage from './pages/StudiesPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import TutorialPage from './pages/TutorialPage';
import { inventoryManager } from './utils/inventoryManager';

// Import dos dados JSON (simulação)
import playerData from './data/player.json';

function App() {
  const [activeTab, setActiveTab] = useState('missoes');
  const [playerAvatar, setPlayerAvatar] = useState<string>(() => {
    return safeLocalStorage.getItem('christon-avatar') || '';
  });

  const [avatarBackground, setAvatarBackground] = useState<string>(() => {
    return safeLocalStorage.getItem('christon-avatar-background') || 'spiritual1';
  });

  const [armorPieces, setArmorPieces] = useState(() => inventoryManager.getArmorForHUD());
  const [playerSin, setPlayerSin] = useState(0);

  // Carregar pecado e stats do jogador
  useEffect(() => {
    try {
      let profile = safeLocalStorage.getItem('christon-profile');
      
      // Se não existe perfil, criar um
      if (!profile) {
        console.log('📝 Criando perfil inicial...');
        const initialProfile = {
          ...playerData,
          sin: playerData.sin || 0
        };
        safeLocalStorage.setItem('christon-profile', JSON.stringify(initialProfile));
        setPlayerSin(initialProfile.sin);
      } else {
        const data = JSON.parse(profile);
        console.log('👤 Pecado carregado do perfil:', data.sin);
        setPlayerSin(data.sin || 0);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      setPlayerSin(playerData.sin || 0);
    }
  }, [activeTab]);

  // Função para atualizar o avatar globalmente
  const updatePlayerAvatar = (newAvatar: string) => {
    setPlayerAvatar(newAvatar);
    safeLocalStorage.setItem('christon-avatar', newAvatar);
  };

  // Função para atualizar o fundo do avatar globalmente
  const updateAvatarBackground = (newBackground: string) => {
    setAvatarBackground(newBackground);
    safeLocalStorage.setItem('christon-avatar-background', newBackground);
  };

  // Função para atualizar o status civil
  const updatePlayerStatus = (newStatus: 'solteiro' | 'casado') => {
    try {
      const savedProfile = safeLocalStorage.getItem('christon-profile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        profile.status = newStatus;
        safeLocalStorage.setItem('christon-profile', JSON.stringify(profile));
      }
    } catch (error) {
      console.warn('Failed to update player status:', error);
    }
  };

  // Função para gerar avatar padrão
  const generateDefaultAvatar = () => {
    const defaultParams = new URLSearchParams();
    defaultParams.append('avatarStyle', 'Transparent');
    defaultParams.append('topType', 'ShortHairShortFlat');
    defaultParams.append('accessoriesType', 'Blank');
    defaultParams.append('hairColor', 'BrownDark');
    defaultParams.append('facialHairType', 'Blank');
    defaultParams.append('clotheType', 'ShirtCrewNeck');
    defaultParams.append('clotheColor', 'Gray01');
    defaultParams.append('eyeType', 'Default');
    defaultParams.append('eyebrowType', 'Default');
    defaultParams.append('mouthType', 'Default');
    defaultParams.append('skinColor', 'Light');
    
    return `https://avataaars.io/?${defaultParams.toString()}`;
  };

  // Gerar avatar automaticamente se não existir
  useEffect(() => {
    if (!playerAvatar) {
      const defaultAvatar = generateDefaultAvatar();
      updatePlayerAvatar(defaultAvatar);
    }
  }, [playerAvatar]);

  // Atualizar armadura quando mudar de tab
  useEffect(() => {
    setArmorPieces(inventoryManager.getArmorForHUD());
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'missoes':
        return <EnhancedMissionsPage />;
      case 'inventario':
        return <ItemsPage />;
      case 'perfil':
        return <ProfilePage 
          onAvatarUpdate={updatePlayerAvatar} 
          onStatusUpdate={updatePlayerStatus}
          onBackgroundUpdate={updateAvatarBackground}
        />;
      case 'estudos':
        return <StudiesPage onBack={() => setActiveTab('missoes')} />;
      case 'conquistas':
        return <AchievementsPage onBack={() => setActiveTab('missoes')} />;
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'tutorial':
        return <TutorialPage />;
      case 'inicio':
        return <ActionsPage />;
      default:
        return <EnhancedMissionsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <Header
        playerName={playerData.name}
        spiritLevel={playerData.spiritLevel}
        wisdom={playerData.wisdom}
        streak={playerData.streak}
        avatarUrl={playerAvatar}
        avatarBackground={avatarBackground}
        sin={playerSin}
        onNavigate={setActiveTab}
        armorPieces={armorPieces}
      />
      
      <div className="flex-1 overflow-y-auto pb-20">
        {renderContent()}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-[100]">
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}

export default App;