import React from 'react';

export interface AvatarBackground {
  id: string;
  name: string;
  svg: React.ReactNode;
}

export const avatarBackgrounds: AvatarBackground[] = [
  {
    id: 'spiritual1',
    name: 'Cruz Dourada',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="spiritual1-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="url(#spiritual1-bg)" />
        <path d="M100 30 L100 170 M60 100 L140 100" stroke="white" strokeWidth="8" opacity="0.3" />
      </svg>
    )
  },
  {
    id: 'spiritual2', 
    name: 'Céu Azul',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="spiritual2-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#4682B4" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#spiritual2-bg)" />
        <circle cx="40" cy="40" r="3" fill="white" opacity="0.8" />
        <circle cx="160" cy="60" r="2" fill="white" opacity="0.6" />
        <circle cx="80" cy="30" r="2.5" fill="white" opacity="0.7" />
      </svg>
    )
  },
  {
    id: 'spiritual3',
    name: 'Fogo Santo',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="spiritual3-bg" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#FF6347" />
            <stop offset="50%" stopColor="#FF4500" />
            <stop offset="100%" stopColor="#8B0000" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="url(#spiritual3-bg)" />
        <path d="M100 170 Q70 140 80 110 Q90 120 100 100 Q110 120 120 110 Q130 140 100 170" 
              fill="orange" opacity="0.4" />
      </svg>
    )
  },
  {
    id: 'spiritual4',
    name: 'Floresta da Paz',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="spiritual4-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#98FB98" />
            <stop offset="100%" stopColor="#228B22" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#spiritual4-bg)" />
        <circle cx="60" cy="150" r="20" fill="#32CD32" opacity="0.6" />
        <circle cx="140" cy="160" r="25" fill="#228B22" opacity="0.5" />
        <circle cx="100" cy="140" r="18" fill="#90EE90" opacity="0.7" />
      </svg>
    )
  },
  {
    id: 'spiritual5',
    name: 'Luz Divina',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="spiritual5-bg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFACD" />
            <stop offset="100%" stopColor="#F0E68C" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="url(#spiritual5-bg)" />
        <path d="M100 40 L105 60 L125 65 L110 80 L115 100 L100 90 L85 100 L90 80 L75 65 L95 60 Z" 
              fill="white" opacity="0.6" />
      </svg>
    )
  },
  {
    id: 'spiritual6',
    name: 'Águas Vivas',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="spiritual6-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00CED1" />
            <stop offset="100%" stopColor="#008B8B" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#spiritual6-bg)" />
        <path d="M20 120 Q60 100 100 120 Q140 140 180 120" stroke="white" strokeWidth="3" 
              fill="none" opacity="0.5" />
        <path d="M30 150 Q70 130 110 150 Q150 170 190 150" stroke="white" strokeWidth="2" 
              fill="none" opacity="0.4" />
      </svg>
    )
  },
  {
    id: 'spiritual7',
    name: 'Rocha Firme',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="spiritual7-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A0522D" />
            <stop offset="100%" stopColor="#8B4513" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#spiritual7-bg)" />
        <polygon points="100,50 130,120 70,120" fill="#D2691E" opacity="0.4" />
        <polygon points="80,130 120,130 110,170 90,170" fill="#CD853F" opacity="0.5" />
      </svg>
    )
  },
  {
    id: 'spiritual8',
    name: 'Reino Celestial',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="spiritual8-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9370DB" />
            <stop offset="100%" stopColor="#4B0082" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="url(#spiritual8-bg)" />
        <circle cx="50" cy="50" r="2" fill="white" opacity="0.9" />
        <circle cx="150" cy="40" r="1.5" fill="white" opacity="0.8" />
        <circle cx="120" cy="70" r="2.5" fill="white" opacity="0.9" />
        <circle cx="80" cy="130" r="1" fill="white" opacity="0.7" />
        <circle cx="160" cy="120" r="2" fill="white" opacity="0.8" />
      </svg>
    )
  }
];

export const getAvatarBackground = (backgroundId: string): AvatarBackground | undefined => {
  return avatarBackgrounds.find(bg => bg.id === backgroundId);
};

interface AvatarWithBackgroundProps {
  avatarUrl?: string;
  backgroundId?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fallbackIcon?: React.ReactNode;
}

const AvatarWithBackground: React.FC<AvatarWithBackgroundProps> = ({ 
  avatarUrl, 
  backgroundId = 'spiritual1', 
  className = '',
  size = 'md',
  fallbackIcon
}) => {
  const background = getAvatarBackground(backgroundId);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden relative ${className}`}>
      {/* Fundo SVG */}
      {background && (
        <div className="absolute inset-0">
          {background.svg}
        </div>
      )}
      
      {/* Avatar transparente sobre o fundo */}
      {avatarUrl ? (
        <img 
          src={avatarUrl} 
          alt="Avatar" 
          className="w-full h-full object-cover relative z-10"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center relative z-10">
          {fallbackIcon}
        </div>
      )}
    </div>
  );
};

export default AvatarWithBackground;