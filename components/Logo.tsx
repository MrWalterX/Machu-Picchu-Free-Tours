
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'standard' | 'inverted' | 'white';
  showText?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

const Logo: React.FC<LogoProps> = ({ 
  className = "h-10", 
  variant = 'standard',
  showText = false,
  orientation = 'horizontal'
}) => {
  const getColors = () => {
    switch (variant) {
      case 'inverted':
        return { primary: '#FFFFFF', secondary: '#FFAF04', text: '#FFFFFF' };
      case 'white':
        return { primary: '#FFFFFF', secondary: '#FFFFFF', text: '#FFFFFF' };
      default:
        return { primary: '#011A52', secondary: '#FFAF04', text: '#011A52' };
    }
  };

  const colors = getColors();

  const IconSVG = () => (
    <svg 
      className="h-full aspect-square" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main Peak (Representing Machu Picchu) */}
      <path 
        d="M15 80L50 20L85 80H15Z" 
        fill={colors.primary} 
      />
      {/* Accent Peak (Representing Huayna Picchu / Path) */}
      <path 
        d="M45 80L70 38L95 80H45Z" 
        fill={colors.secondary} 
      />
      {/* Stylized geometric sun element */}
      <circle cx="50" cy="20" r="4" fill={colors.secondary} />
    </svg>
  );

  if (!showText) {
    return (
      <div className={className} aria-label="Machu Picchu Free Tours Logo">
        <IconSVG />
      </div>
    );
  }

  // Horizontal version with text
  if (orientation === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className} font-['Quicksand']`}>
        <IconSVG />
        <div className="flex flex-col justify-center">
          <span 
            className="text-lg font-bold leading-none tracking-tight whitespace-nowrap uppercase" 
            style={{ color: colors.text }}
          >
            Machu Picchu
          </span>
          <span 
            className="text-[10px] font-black leading-none tracking-[0.2em] mt-0.5 uppercase" 
            style={{ color: colors.secondary }}
          >
            Free Tours
          </span>
        </div>
      </div>
    );
  }

  // Vertical version with text (stacked)
  return (
    <div className={`flex flex-col items-center gap-2 ${className} font-['Quicksand'] text-center`}>
      <div className="w-16 h-16">
        <IconSVG />
      </div>
      <div>
        <span 
          className="block text-xl font-bold leading-none tracking-tight uppercase" 
          style={{ color: colors.text }}
        >
          Machu Picchu
        </span>
        <span 
          className="block text-xs font-black leading-none tracking-[0.3em] mt-1 uppercase" 
          style={{ color: colors.secondary }}
        >
          Free Tours
        </span>
      </div>
    </div>
  );
};

export default Logo;
