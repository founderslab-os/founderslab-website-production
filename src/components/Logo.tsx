import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  taglineText?: string;
  customLogoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  showTagline = true,
  taglineText = 'BUILD ENTERPRISE • BUILD NATION',
  customLogoUrl,
  size = 'md'
}) => {
  const isDark = variant === 'dark';

  // Brand colors
  const primaryOrange = '#F57C00';
  const secondaryGold = '#FFB74D';
  const navyColor = isDark ? '#FFFFFF' : '#0B2E6B';
  const sublineColor = isDark ? '#94A3B8' : '#475569';

  // Sizing map for height
  const heightClasses = {
    sm: 'h-8 md:h-9',
    md: 'h-10 md:h-12',
    lg: 'h-12 md:h-14',
    xl: 'h-16 md:h-20'
  };

  if (customLogoUrl) {
    const responsiveSizes = {
      sm: 'h-10 md:h-12',
      md: 'h-12 sm:h-14 md:h-16 lg:h-20',
      lg: 'h-16 sm:h-20 md:h-24 lg:h-28',
      xl: 'h-20 sm:h-24 md:h-28 lg:h-32'
    };

    return (
      <img
        src={customLogoUrl}
        alt="FoundersLab Logo"
        className={`${responsiveSizes[size]} w-auto max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] object-contain transition-all duration-300 ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        viewBox="0 0 540 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightClasses[size]} w-auto object-contain select-none`}
        aria-label="FoundersLab - Campus Incubation & Accelerator"
      >
        <defs>
          {/* Vibrant Orange-Gold Gradient for Emblem */}
          <linearGradient id="fl-orange-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF9800" />
            <stop offset="50%" stopColor="#F57C00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>

          {/* Deep Navy Gradient for Dark Accent */}
          <linearGradient id="fl-navy-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? '#FFFFFF' : '#0B2E6B'} />
            <stop offset="100%" stopColor={isDark ? '#E2E8F0' : '#1565C0'} />
          </linearGradient>

          {/* Soft Glow filter */}
          <filter id="fl-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F57C00" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* ================= EMBLEM MARK ================= */}
        <g transform="translate(10, 10)">
          {/* Outer Rounded Shield Frame */}
          <rect
            x="2"
            y="2"
            width="96"
            height="96"
            rx="24"
            fill={isDark ? 'rgba(255,255,255,0.08)' : '#F8FAFC'}
            stroke="url(#fl-orange-grad)"
            strokeWidth="3.5"
          />

          {/* Inner Accent Corner Dots */}
          <circle cx="20" cy="20" r="3" fill="url(#fl-orange-grad)" />
          <circle cx="80" cy="20" r="3" fill="url(#fl-orange-grad)" />
          <circle cx="20" cy="80" r="3" fill="url(#fl-orange-grad)" />
          <circle cx="80" cy="80" r="3" fill="url(#fl-orange-grad)" />

          {/* 'F' Stylized Geometric Flame/Bar Monogram */}
          <path
            d="M 30 26 H 74 C 77.3 26 80 28.7 80 32 V 36 C 80 39.3 77.3 42 74 42 H 44 V 50 H 68 C 71.3 50 74 52.7 74 56 V 60 C 74 63.3 71.3 66 68 66 H 44 V 74 C 44 77.3 41.3 80 38 80 H 34 C 30.7 80 28 77.3 28 74 V 32 C 28 28.7 30.7 26 34 26 Z"
            fill="url(#fl-orange-grad)"
            filter="url(#fl-glow)"
          />

          {/* 'L' Interlocking Lower Accent */}
          <path
            d="M 52 50 H 60 C 63.3 50 66 52.7 66 56 V 68 H 74 C 77.3 68 80 70.7 80 74 V 76 C 80 79.3 77.3 82 74 82 H 52 C 48.7 82 46 79.3 46 76 V 56 C 46 52.7 48.7 50 52 50 Z"
            fill="url(#fl-navy-grad)"
          />

          {/* Innovation Rocket Dot */}
          <circle cx="70" cy="34" r="4.5" fill="#FFD54F" />
        </g>

        {/* ================= WORDMARK ================= */}
        {/* "Founders" */}
        <text
          x="124"
          y="68"
          fill="url(#fl-orange-grad)"
          fontFamily="Plus Jakarta Sans, Montserrat, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="54"
          letterSpacing="-0.02em"
        >
          Founders
        </text>

        {/* "Lab" */}
        <text
          x="385"
          y="68"
          fill="url(#fl-navy-grad)"
          fontFamily="Plus Jakarta Sans, Montserrat, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="54"
          letterSpacing="-0.02em"
        >
          Lab
        </text>

        {showTagline && (
          <>
            {/* Top Accent Divider */}
            <line
              x1="125"
              y1="78"
              x2="520"
              y2="78"
              stroke={sublineColor}
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />

            {/* Tagline */}
            <text
              x="125"
              y="97"
              fill={sublineColor}
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight="800"
              fontSize="14.5"
              letterSpacing="0.2em"
            >
              {taglineText}
            </text>

            {/* Bottom Accent Divider */}
            <line
              x1="125"
              y1="106"
              x2="520"
              y2="106"
              stroke={sublineColor}
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
          </>
        )}
      </svg>
    </div>
  );
};

