import React, { useState, useEffect } from 'react';
import { Camera, Save, Edit, X, Shuffle } from 'lucide-react';
import { avatarBackgrounds } from '../components/AvatarBackgrounds';
import { safeLocalStorage } from '../utils/storage';

interface PlayerProfile {
  name: string;
  status: 'solteiro' | 'casado';
  bibleVersion: string;
  avatar: string;
  email?: string;
  bio?: string;
}

interface AvatarCustomization {
  style: string;
  seed: string;
  // Avataaars customization options
  accessoriesType?: string;
  clotheColor?: string;
  clotheType?: string;
  eyeType?: string;
  eyebrowType?: string;
  facialHairColor?: string;
  facialHairType?: string;
  hairColor?: string;
  hatColor?: string;
  mouthType?: string;
  skinColor?: string;
  topType?: string;

}

interface ProfilePageProps {
  onAvatarUpdate?: (avatarUrl: string) => void;
  onStatusUpdate?: (status: 'solteiro' | 'casado') => void;
  onBackgroundUpdate?: (background: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onAvatarUpdate, onStatusUpdate, onBackgroundUpdate }) => {
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    try {
      const savedProfile = safeLocalStorage.getItem('christon-profile');
      if (savedProfile) {
        return JSON.parse(savedProfile);
      }
    } catch (error) {
      console.warn('Failed to load profile from localStorage:', error);
    }
    
    return {
      name: 'Matheus Bonotto',
      status: 'solteiro',
      bibleVersion: 'NVI',
      avatar: '',
      email: '',
      bio: ''
    };
  });


  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const [allowManualSeedEdit, setAllowManualSeedEdit] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedBackground, setSelectedBackground] = useState(() => {
    return safeLocalStorage.getItem('christon-avatar-background') || 'spiritual1';
  });


  
  const [avatarCustomization, setAvatarCustomization] = useState<AvatarCustomization>(() => {
    try {
      const savedCustomization = safeLocalStorage.getItem('christon-avatar-customization');
      if (savedCustomization) {
        return JSON.parse(savedCustomization);
      }
    } catch (error) {
      console.warn('Failed to load avatar customization:', error);
    }
    
    return {
      style: 'avataaars',
      seed: 'matheus-bonotto',
      // Avataaars defaults
      accessoriesType: 'Blank',
      clotheColor: '262e33',
      clotheType: 'ShirtCrewNeck',
      eyeType: 'Default',
      eyebrowType: 'Default',
      facialHairColor: 'Brown',
      facialHairType: 'Blank',
      hairColor: 'BrownDark',
      mouthType: 'Default',
      skinColor: 'Light',
      topType: 'ShortHairShortFlat'
    };
  });

  // Debounce para preview do avatar - atualiza apenas após 300ms sem mudanças
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPreviewUrl(generateAvatarUrl(avatarCustomization));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [avatarCustomization]);

  // Opções de personalização para Avataaars
  const avataaarsOptions = {
    accessoriesType: [
      { value: 'Blank', label: 'Nenhum' },
      { value: 'Kurt', label: 'Kurt' },
      { value: 'Prescription01', label: 'Óculos Receita 1' },
      { value: 'Prescription02', label: 'Óculos Receita 2' },
      { value: 'Round', label: 'Óculos Redondo' },
      { value: 'Sunglasses', label: 'Óculos de Sol' },
      { value: 'Wayfarers', label: 'Óculos Wayfarers' }
    ],
    topType: [
      { value: 'NoHair', label: 'Careca' },
      { value: 'Eyepatch', label: 'Tapa-olho' },
      { value: 'Hat', label: 'Chapéu' },
      { value: 'Hijab', label: 'Hijab' },
      { value: 'Turban', label: 'Turbante' },
      { value: 'WinterHat1', label: 'Gorro de Inverno 1' },
      { value: 'WinterHat2', label: 'Gorro de Inverno 2' },
      { value: 'WinterHat3', label: 'Gorro de Inverno 3' },
      { value: 'WinterHat4', label: 'Gorro de Inverno 4' },
      { value: 'LongHairBigHair', label: 'Cabelo Longo Volumoso' },
      { value: 'LongHairBob', label: 'Bob Longo' },
      { value: 'LongHairCurly', label: 'Cabelo Longo Cacheado' },
      { value: 'LongHairCurvy', label: 'Cabelo Longo Ondulado' },
      { value: 'LongHairDreads', label: 'Dreads Longos' },
      { value: 'LongHairFrida', label: 'Estilo Frida' },
      { value: 'LongHairFro', label: 'Afro Longo' },
      { value: 'LongHairFroBand', label: 'Afro com Faixa' },
      { value: 'LongHairNotTooLong', label: 'Cabelo Médio' },
      { value: 'LongHairShavedSides', label: 'Longo com Laterais Raspadas' },
      { value: 'LongHairMiaWallace', label: 'Estilo Mia Wallace' },
      { value: 'LongHairStraight', label: 'Cabelo Longo Liso' },
      { value: 'LongHairStraight2', label: 'Cabelo Longo Liso 2' },
      { value: 'LongHairStraightStrand', label: 'Liso com Mecha' },
      { value: 'ShortHairDreads01', label: 'Dreads Curtos 1' },
      { value: 'ShortHairDreads02', label: 'Dreads Curtos 2' },
      { value: 'ShortHairFrizzle', label: 'Cabelo Curto Crespo' },
      { value: 'ShortHairShaggyMullet', label: 'Mullet Desalinhado' },
      { value: 'ShortHairShortCurly', label: 'Curto Cacheado' },
      { value: 'ShortHairShortFlat', label: 'Curto Liso' },
      { value: 'ShortHairShortRound', label: 'Curto Arredondado' },
      { value: 'ShortHairShortWaved', label: 'Curto Ondulado' },
      { value: 'ShortHairSides', label: 'Curto nas Laterais' },
      { value: 'ShortHairTheCaesar', label: 'Corte César' },
      { value: 'ShortHairTheCaesarSidePart', label: 'César com Risca' }
    ],
    hairColor: [
      { value: 'Auburn', label: 'Castanho Avermelhado', color: '#A55728' },
      { value: 'Black', label: 'Preto', color: '#2C1B18' },
      { value: 'Blonde', label: 'Loiro', color: '#B58143' },
      { value: 'BlondeGolden', label: 'Loiro Dourado', color: '#D6B370' },
      { value: 'Brown', label: 'Castanho', color: '#724133' },
      { value: 'BrownDark', label: 'Castanho Escuro', color: '#4A312C' },
      { value: 'PastelPink', label: 'Rosa Pastel', color: '#F59797' },
      { value: 'Platinum', label: 'Platinado', color: '#ECDCBF' },
      { value: 'Red', label: 'Vermelho', color: '#C93305' },
      { value: 'SilverGray', label: 'Cinza Prateado', color: '#E8E1E1' }
    ],
    skinColor: [
      { value: 'Tanned', label: 'Bronzeado', color: '#FD9841' },
      { value: 'Yellow', label: 'Amarelo', color: '#F8D25C' },
      { value: 'Pale', label: 'Pálido', color: '#FDBCB4' },
      { value: 'Light', label: 'Claro', color: '#EDB98A' },
      { value: 'Brown', label: 'Moreno', color: '#D08B5B' },
      { value: 'DarkBrown', label: 'Moreno Escuro', color: '#AE5D29' },
      { value: 'Black', label: 'Negro', color: '#614335' }
    ],
    eyeType: [
      { value: 'Close', label: 'Fechado' },
      { value: 'Cry', label: 'Chorando' },
      { value: 'Default', label: 'Padrão' },
      { value: 'Dizzy', label: 'Tonto' },
      { value: 'EyeRoll', label: 'Revirando' },
      { value: 'Happy', label: 'Feliz' },
      { value: 'Hearts', label: 'Corações' },
      { value: 'Side', label: 'Lateral' },
      { value: 'Squint', label: 'Semicerrado' },
      { value: 'Surprised', label: 'Surpreso' },
      { value: 'Wink', label: 'Piscando' },
      { value: 'WinkWacky', label: 'Piscada Maluca' }
    ],
    eyebrowType: [
      { value: 'Angry', label: 'Bravo' },
      { value: 'AngryNatural', label: 'Bravo Natural' },
      { value: 'Default', label: 'Padrão' },
      { value: 'DefaultNatural', label: 'Padrão Natural' },
      { value: 'FlatNatural', label: 'Liso Natural' },
      { value: 'RaisedExcited', label: 'Empolgado' },
      { value: 'RaisedExcitedNatural', label: 'Empolgado Natural' },
      { value: 'SadConcerned', label: 'Triste' },
      { value: 'SadConcernedNatural', label: 'Triste Natural' },
      { value: 'UnibrowNatural', label: 'Monocelha' },
      { value: 'UpDown', label: 'Para Cima e Para Baixo' },
      { value: 'UpDownNatural', label: 'Para Cima e Para Baixo Natural' }
    ],
    mouthType: [
      { value: 'Concerned', label: 'Preocupado' },
      { value: 'Default', label: 'Padrão' },
      { value: 'Disbelief', label: 'Incrédulo' },
      { value: 'Eating', label: 'Comendo' },
      { value: 'Grimace', label: 'Careta' },
      { value: 'Sad', label: 'Triste' },
      { value: 'ScreamOpen', label: 'Gritando' },
      { value: 'Serious', label: 'Sério' },
      { value: 'Smile', label: 'Sorrindo' },
      { value: 'Tongue', label: 'Língua de Fora' },
      { value: 'Twinkle', label: 'Brilhando' },
      { value: 'Vomit', label: 'Vomitando' }
    ],
    clotheType: [
      { value: 'BlazerShirt', label: 'Blazer com Camisa' },
      { value: 'BlazerSweater', label: 'Blazer com Suéter' },
      { value: 'CollarSweater', label: 'Suéter com Gola' },
      { value: 'GraphicShirt', label: 'Camisa com Estampa' },
      { value: 'Hoodie', label: 'Moletom' },
      { value: 'Overall', label: 'Macacão' },
      { value: 'ShirtCrewNeck', label: 'Camisa Gola Careca' },
      { value: 'ShirtScoopNeck', label: 'Camisa Decote' },
      { value: 'ShirtVNeck', label: 'Camisa Gola V' }
    ],
    clotheColor: [
      { value: 'Black', label: 'Preto', color: '#262E33' },
      { value: 'Blue01', label: 'Azul Claro', color: '#65C9FF' },
      { value: 'Blue02', label: 'Azul Médio', color: '#5199E4' },
      { value: 'Blue03', label: 'Azul Escuro', color: '#25557C' },
      { value: 'Gray01', label: 'Cinza Claro', color: '#E6E6E6' },
      { value: 'Gray02', label: 'Cinza Médio', color: '#929598' },
      { value: 'Heather', label: 'Mescla', color: '#3C4F5C' },
      { value: 'PastelBlue', label: 'Azul Pastel', color: '#B1E2FF' },
      { value: 'PastelGreen', label: 'Verde Pastel', color: '#A7FFC4' },
      { value: 'PastelOrange', label: 'Laranja Pastel', color: '#FFEAA7' },
      { value: 'PastelRed', label: 'Vermelho Pastel', color: '#FFAFB9' },
      { value: 'PastelYellow', label: 'Amarelo Pastel', color: '#FFFFB1' },
      { value: 'Pink', label: 'Rosa', color: '#FF488E' },
      { value: 'Red', label: 'Vermelho', color: '#FF5722' },
      { value: 'White', label: 'Branco', color: '#FFFFFF' }
    ],

  };

  const bibleVersions = [
    { value: 'NVI', label: 'Nova Versão Internacional' },
    { value: 'ARC', label: 'Almeida Revista e Corrigida' },
    { value: 'ARA', label: 'Almeida Revista e Atualizada' },
    { value: 'NTLH', label: 'Nova Tradução na Linguagem de Hoje' },
    { value: 'NVT', label: 'Nova Versão Transformadora' }
  ];

  const generateAvatarUrl = (customization: AvatarCustomization) => {
    const params = new URLSearchParams();
    
    // Sempre usar fundo transparente
    params.append('avatarStyle', 'Transparent');
    
    // Parâmetros de personalização usando os nomes corretos da API avataaars.io
    if (customization.topType) params.append('topType', customization.topType);
    if (customization.accessoriesType) params.append('accessoriesType', customization.accessoriesType);
    if (customization.hairColor) params.append('hairColor', customization.hairColor);
    if (customization.facialHairType) params.append('facialHairType', customization.facialHairType);
    if (customization.clotheType) params.append('clotheType', customization.clotheType);
    if (customization.clotheColor) params.append('clotheColor', customization.clotheColor);
    if (customization.eyeType) params.append('eyeType', customization.eyeType);
    if (customization.eyebrowType) params.append('eyebrowType', customization.eyebrowType);
    if (customization.mouthType) params.append('mouthType', customization.mouthType);
    if (customization.skinColor) params.append('skinColor', customization.skinColor);
    
    return `https://avataaars.io/?${params.toString()}`;
  };

  const updateAvatar = () => {
    const newAvatarUrl = generateAvatarUrl(avatarCustomization);
    setProfile(prev => ({
      ...prev,
      avatar: newAvatarUrl
    }));
    // Notifica o componente pai sobre a mudança
    if (onAvatarUpdate) {
      onAvatarUpdate(newAvatarUrl);
    }
  };

  // Funções removidas - não são mais necessárias

  // Função para gerar SID baseada nas características
  const generateSeedFromFeatures = (customization: AvatarCustomization) => {
    const features = [
      customization.topType || 'ShortHairShortFlat',
      customization.hairColor || 'BrownDark',
      customization.skinColor || 'Light',
      customization.eyeType || 'Default',
      customization.eyebrowType || 'Default',
      customization.mouthType || 'Default',
      customization.clotheType || 'ShirtCrewNeck',
      customization.clotheColor || 'Gray01',
      customization.accessoriesType || 'Blank',
      customization.facialHairType || 'Blank'
    ];
    
    // Criar uma string única baseada nas características
    const featureString = features.join('-');
    
    // Gerar um hash simples da string
    let hash = 0;
    for (let i = 0; i < featureString.length; i++) {
      const char = featureString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Converter para string hexadecimal
    return `avatar-${Math.abs(hash).toString(36)}`;
  };

  const handleCustomizationChange = (key: keyof AvatarCustomization, value: string) => {
    setAvatarCustomization(prev => {
      const newCustomization = {
        ...prev,
        [key]: value
      };
      
      // Se não estiver editando manualmente a seed, gerar automaticamente
      if (key !== 'seed' && !allowManualSeedEdit) {
        newCustomization.seed = generateSeedFromFeatures(newCustomization);
      }
      
      return newCustomization;
    });
  };

  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(2, 15);
    setAvatarCustomization(prev => ({
      ...prev,
      seed: randomSeed
    }));
  };

  const saveAvatarCustomization = () => {
    try {
      // Salvar customização no localStorage
      safeLocalStorage.setItem('christon-avatar-customization', JSON.stringify(avatarCustomization));
      safeLocalStorage.setItem('christon-avatar-background', selectedBackground);
    } catch (error) {
      console.warn('Failed to save avatar customization:', error);
    }
    
    updateAvatar();
    setShowAvatarEditor(false);
  };

  const cancelAvatarEdit = () => {
    // Resetar para a última customização salva
    try {
      const savedCustomization = safeLocalStorage.getItem('christon-avatar-customization');
      if (savedCustomization) {
        setAvatarCustomization(JSON.parse(savedCustomization));
      }
    } catch (error) {
      console.warn('Failed to restore avatar customization:', error);
    }
    
    setShowAvatarEditor(false);
  };

  const handleSaveProfile = () => {
    try {
      // Salvar no localStorage
      safeLocalStorage.setItem('christon-profile', JSON.stringify(profile));
      
      // Notificar mudança de status se houver callback
      if (onStatusUpdate) {
        onStatusUpdate(profile.status);
      }
      
      console.log('Perfil salvo:', profile);
      setIsEditing(false);
    } catch (error) {
      console.warn('Failed to save profile:', error);
      setIsEditing(false);
    }
  };

  React.useEffect(() => {
    // Gerar avatar inicial
    updateAvatar();
  }, [avatarCustomization]);

  React.useEffect(() => {
    // Gerar avatar inicial na primeira renderização
    setProfile(prev => ({
      ...prev,
      avatar: generateAvatarUrl(avatarCustomization)
    }));
  }, []);

  // Salvar fundo selecionado automaticamente
  React.useEffect(() => {
    console.log('Background changed to:', selectedBackground);
    safeLocalStorage.setItem('christon-avatar-background', selectedBackground);
    if (onBackgroundUpdate) {
      onBackgroundUpdate(selectedBackground);
    }
  }, [selectedBackground, onBackgroundUpdate]);

  // Componente para controle deslizante/seletor
  const CustomControl: React.FC<{
    label: string;
    value: string;
    options: Array<{ value: string; label: string; color?: string }>;
    onChange: (value: string) => void;
    type?: 'select' | 'color' | 'visual';
  }> = ({ label, value, options, onChange, type = 'visual' }) => {
    const currentIndex = options.findIndex(option => option.value === value);
    const currentOption = options[currentIndex] || options[0];

    if (type === 'color') {
      const handlePrevious = () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        onChange(options[newIndex].value);
      };

      const handleNext = () => {
        const newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        onChange(options[newIndex].value);
      };

      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
          
          {/* Controles de navegação para cores */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border">
            {/* Botão Anterior */}
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm border hover:bg-gray-50 transition-colors"
              title="Cor anterior"
            >
              <span className="text-lg font-bold text-spiritual">‹</span>
            </button>

            {/* Preview da cor atual */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-full border-3 border-spiritual shadow-md"
                style={{ backgroundColor: currentOption.color || '#ccc' }}
                title={currentOption.label}
              />
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">
                  {currentOption.label}
                </div>
                <div className="text-xs text-gray-500">
                  {currentIndex + 1} de {options.length}
                </div>
              </div>
            </div>

            {/* Botão Próximo */}
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm border hover:bg-gray-50 transition-colors"
              title="Próxima cor"
            >
              <span className="text-lg font-bold text-spiritual">›</span>
            </button>
          </div>

          {/* Indicador visual de posição */}
          <div className="flex justify-center space-x-1">
            {options.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onChange(options[idx].value)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex 
                    ? 'bg-spiritual' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Ir para ${options[idx].label}`}
              />
            ))}
          </div>
        </div>
      );
    }

    if (type === 'visual') {
      const handlePrevious = () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        onChange(options[newIndex].value);
      };

      const handleNext = () => {
        const newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        onChange(options[newIndex].value);
      };

      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
          
          {/* Controles de navegação com botões */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border">
            {/* Botão Anterior */}
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm border hover:bg-gray-50 transition-colors"
              title="Anterior"
            >
              <span className="text-lg font-bold text-spiritual">‹</span>
            </button>

            {/* Nome da opção atual */}
            <div className="flex-1 text-center px-4">
              <div className="text-sm font-medium text-gray-900">
                {currentOption.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {currentIndex + 1} de {options.length}
              </div>
            </div>

            {/* Botão Próximo */}
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm border hover:bg-gray-50 transition-colors"
              title="Próximo"
            >
              <span className="text-lg font-bold text-spiritual">›</span>
            </button>
          </div>

          {/* Indicador visual de posição */}
          <div className="flex justify-center space-x-1">
            {options.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onChange(options[idx].value)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex 
                    ? 'bg-spiritual' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Ir para ${options[idx].label}`}
              />
            ))}
          </div>
        </div>
      );
    }

    // Fallback para select tradicional
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual focus:border-spiritual text-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // Função removida - não precisamos mais de preview individual para evitar muitas requisições à API

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-display text-2xl font-bold text-dark mb-2">
          Meu Perfil Espiritual
        </h1>
        <p className="text-gray-600">
          Personalize sua jornada de fé
        </p>
      </div>

      {/* Avatar Section */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Avatar Espiritual</h2>
        
        {/* Avatar Display - Sempre exibir apenas o avatar centralizado */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-spiritual shadow-lg relative">
              {/* Fundo SVG */}
              <div className="absolute inset-0">
                {avatarBackgrounds.find(bg => bg.id === selectedBackground)?.svg}
              </div>
              
              {/* Avatar sobre o fundo */}
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover relative z-10"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center relative z-10">
                  <Camera size={32} className="text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Ícone de Editar (substituindo o refresh) */}
            <button
              onClick={() => setShowAvatarEditor(true)}
              className="absolute -bottom-2 -right-2 bg-spiritual text-white p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
              title="Editar Avatar"
            >
              <Edit size={16} />
            </button>
          </div>

          {/* Nome e Nível */}
          <div className="text-center">
            <h3 className="font-display text-xl font-bold text-dark">{profile.name}</h3>
            <p className="text-sm text-gray-600">Nível 3 • Guerreiro da Fé</p>
          </div>
        </div>

        {/* Modal/Tela de Personalização */}
        {showAvatarEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header do Modal */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Personalizar Avatar</h3>
                  <button
                    onClick={cancelAvatarEdit}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Preview do Avatar fixo no topo */}
                <div className="sticky top-4 z-10 bg-white rounded-lg shadow-lg border p-4 mb-6">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-spiritual shadow-lg mx-auto relative">
                      {/* Fundo SVG */}
                      <div className="absolute inset-0">
                        {avatarBackgrounds.find(bg => bg.id === selectedBackground)?.svg}
                      </div>
                      
                      {/* Avatar transparente sobre o fundo */}
                      {previewUrl ? (
                        <img 
                          src={previewUrl} 
                          alt="Preview do Avatar" 
                          className="w-full h-full object-cover relative z-10"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center relative z-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-spiritual"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2 font-medium">
                      {previewUrl ? '👁️ Preview em Tempo Real' : 'Carregando preview...'}
                    </p>
                  </div>
                </div>

                {/* Controles de Personalização */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Cabelo */}
                  <CustomControl
                    label="Tipo de Cabelo"
                    value={avatarCustomization.topType || 'ShortHairShortFlat'}
                    options={avataaarsOptions.topType}
                    onChange={(value) => handleCustomizationChange('topType', value)}
                    type="visual"
                  />

                  <CustomControl
                    label="Cor do Cabelo"
                    value={avatarCustomization.hairColor || 'BrownDark'}
                    options={avataaarsOptions.hairColor}
                    onChange={(value) => handleCustomizationChange('hairColor', value)}
                    type="color"
                  />

                  {/* Pele */}
                  <CustomControl
                    label="Cor da Pele"
                    value={avatarCustomization.skinColor || 'Light'}
                    options={avataaarsOptions.skinColor}
                    onChange={(value) => handleCustomizationChange('skinColor', value)}
                    type="color"
                  />

                  {/* Olhos */}
                  <CustomControl
                    label="Expressão dos Olhos"
                    value={avatarCustomization.eyeType || 'Default'}
                    options={avataaarsOptions.eyeType}
                    onChange={(value) => handleCustomizationChange('eyeType', value)}
                    type="visual"
                  />

                  {/* Sobrancelhas */}
                  <CustomControl
                    label="Sobrancelhas"
                    value={avatarCustomization.eyebrowType || 'Default'}
                    options={avataaarsOptions.eyebrowType}
                    onChange={(value) => handleCustomizationChange('eyebrowType', value)}
                    type="visual"
                  />

                  {/* Boca */}
                  <CustomControl
                    label="Expressão da Boca"
                    value={avatarCustomization.mouthType || 'Default'}
                    options={avataaarsOptions.mouthType}
                    onChange={(value) => handleCustomizationChange('mouthType', value)}
                    type="visual"
                  />

                  {/* Roupas */}
                  <CustomControl
                    label="Tipo de Roupa"
                    value={avatarCustomization.clotheType || 'ShirtCrewNeck'}
                    options={avataaarsOptions.clotheType}
                    onChange={(value) => handleCustomizationChange('clotheType', value)}
                    type="visual"
                  />

                  <CustomControl
                    label="Cor da Roupa"
                    value={avatarCustomization.clotheColor || '262e33'}
                    options={avataaarsOptions.clotheColor}
                    onChange={(value) => handleCustomizationChange('clotheColor', value)}
                    type="color"
                  />

                  {/* Acessórios */}
                  <CustomControl
                    label="Acessórios"
                    value={avatarCustomization.accessoriesType || 'Blank'}
                    options={avataaarsOptions.accessoriesType}
                    onChange={(value) => handleCustomizationChange('accessoriesType', value)}
                    type="visual"
                  />

                  {/* Barba */}
                  <CustomControl
                    label="Barba"
                    value={avatarCustomization.facialHairType || 'Blank'}
                    options={[
                      { value: 'Blank', label: 'Sem Barba' },
                      { value: 'BeardMedium', label: 'Barba Média' },
                      { value: 'BeardLight', label: 'Barba Clara' },
                      { value: 'BeardMajestic', label: 'Barba Majestosa' },
                      { value: 'MoustacheFancy', label: 'Bigode Chique' },
                      { value: 'MoustacheMagnum', label: 'Bigode Magnum' }
                    ]}
                    onChange={(value) => handleCustomizationChange('facialHairType', value)}
                    type="visual"
                  />


                </div>

                {/* Seleção de Fundos */}
                <div className="border-t pt-6 mb-6">
                  <h3 className="text-lg font-semibold text-spiritual mb-4 flex items-center">
                    <span className="mr-2">🎨</span>
                    Fundo do Avatar
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {avatarBackgrounds.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setSelectedBackground(bg.id)}
                        className={`relative p-3 rounded-lg border-2 transition-all ${
                          selectedBackground === bg.id 
                            ? 'border-spiritual bg-spiritual/5 shadow-md' 
                            : 'border-gray-200 hover:border-spiritual/50'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2">
                          {bg.svg}
                        </div>
                        <p className="text-xs font-medium text-center">{bg.name}</p>
                        {selectedBackground === bg.id && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-spiritual rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campo SID do Personagem */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <input
                      type="checkbox"
                      id="allowSeedEdit"
                      checked={allowManualSeedEdit}
                      onChange={(e) => setAllowManualSeedEdit(e.target.checked)}
                      className="rounded border-gray-300 text-spiritual focus:ring-spiritual"
                    />
                    <label htmlFor="allowSeedEdit" className="text-sm font-medium text-gray-700">
                      Editar SID manualmente
                    </label>
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={avatarCustomization.seed}
                      onChange={(e) => handleCustomizationChange('seed', e.target.value)}
                      disabled={!allowManualSeedEdit}
                      placeholder="ID único do personagem..."
                      className={`flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual focus:border-spiritual ${
                        !allowManualSeedEdit ? 'bg-gray-100 text-gray-500' : ''
                      }`}
                    />
                    <button
                      onClick={generateRandomAvatar}
                      className="btn-spiritual flex items-center space-x-2"
                      title="Gerar SID aleatório"
                    >
                      <Shuffle size={16} />
                      <span>Aleatório</span>
                    </button>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex space-x-3">
                  <button
                    onClick={cancelAvatarEdit}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveAvatarCustomization}
                    className="flex-1 btn-victory flex items-center justify-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Salvar Alterações</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Information */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Informações Pessoais</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-spiritual hover:text-opacity-80"
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </div>

        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Espiritual
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual focus:border-spiritual"
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded-lg">{profile.name}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Civil
            </label>
            {isEditing ? (
              <select
                value={profile.status}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  status: e.target.value as 'solteiro' | 'casado' 
                }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual focus:border-spiritual"
              >
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a)</option>
              </select>
            ) : (
              <p className="p-2 bg-gray-50 rounded-lg capitalize">{profile.status}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (opcional)
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="seu@email.com"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual focus:border-spiritual"
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded-lg">{profile.email || 'Não informado'}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biografia Espiritual
            </label>
            {isEditing ? (
              <textarea
                value={profile.bio || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Compartilhe um pouco sobre sua jornada de fé..."
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual focus:border-spiritual resize-none"
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded-lg min-h-[60px]">
                {profile.bio || 'Nenhuma biografia adicionada ainda.'}
              </p>
            )}
          </div>

          {/* Versão da Bíblia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Versão da Bíblia Preferida
            </label>
            {isEditing ? (
              <select
                value={profile.bibleVersion}
                onChange={(e) => setProfile(prev => ({ ...prev, bibleVersion: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual focus:border-spiritual"
              >
                {bibleVersions.map((version) => (
                  <option key={version.value} value={version.value}>
                    {version.label}
                  </option>
                ))}
              </select>
            ) : (
              <p className="p-2 bg-gray-50 rounded-lg">
                {bibleVersions.find(v => v.value === profile.bibleVersion)?.label}
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="btn-victory flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Salvar Alterações</span>
            </button>
          </div>
        )}
      </div>

      {/* Spiritual Stats */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Estatísticas Espirituais</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-spiritual/10 rounded-lg">
            <div className="text-2xl font-bold text-spiritual">450</div>
            <div className="text-sm text-gray-600">Sabedoria</div>
          </div>
          
          <div className="text-center p-3 bg-victory/10 rounded-lg">
            <div className="text-2xl font-bold text-victory">7</div>
            <div className="text-sm text-gray-600">Ofensiva</div>
          </div>
          
          <div className="text-center p-3 bg-wisdom/10 rounded-lg">
            <div className="text-2xl font-bold text-wisdom">3</div>
            <div className="text-sm text-gray-600">Nível</div>
          </div>
          
          <div className="text-center p-3 bg-sin/10 rounded-lg">
            <div className="text-2xl font-bold text-sin">2</div>
            <div className="text-sm text-gray-600">Pecado</div>
          </div>
        </div>
      </div>

      {/* Verse of Inspiration */}
      <div className="card bg-gradient-to-r from-spiritual/5 to-victory/5 border border-spiritual/20">
        <h3 className="font-semibold text-spiritual mb-2">Versículo de Inspiração</h3>
        <blockquote className="italic text-gray-700 mb-2">
          "Portanto, se alguém está em Cristo, é nova criação. As coisas antigas já passaram; eis que surgiram coisas novas!"
        </blockquote>
        <cite className="text-sm text-gray-600">- 2 Coríntios 5:17</cite>
      </div>
    </div>
  );
};

export default ProfilePage;