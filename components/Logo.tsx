
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-40 h-40',
    lg: 'w-64 h-64'
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className={`relative ${sizeMap[size]} group cursor-none`}>
        {/* Iridescent Aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-emerald-500/20 rounded-full blur-[80px] animate-pulse"></div>
        
        {/* Geometric Core */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(14,165,233,0.5)]">
            <defs>
              <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            
            {/* Rotating Neural Lattice */}
            <g className="animate-[spin_20s_linear_infinite] origin-center">
              <circle cx="100" cy="100" r="80" fill="none" stroke="url(#coreGrad)" strokeWidth="0.5" strokeDasharray="10 20" />
              <path d="M100 20 L100 180 M20 100 L180 100" stroke="url(#coreGrad)" strokeWidth="0.5" opacity="0.3" />
            </g>

            {/* The "ERA" Brain-Arrow Abstraction */}
            <g className="origin-center">
              {/* Left Brain Hemisphere (Nodes) */}
              <path d="M100 40 C60 40 40 70 40 100 C40 130 60 160 100 160" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" />
              <circle cx="45" cy="80" r="3" fill="#0ea5e9" className="animate-pulse" />
              <circle cx="55" cy="120" r="3" fill="#0ea5e9" />
              
              {/* The Kinetic Arrow (Truth Vector) */}
              <path 
                d="M50 160 Q 90 90 160 40" 
                fill="none" 
                stroke="#fff" 
                strokeWidth="8" 
                strokeLinecap="round" 
                className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              />
              <path d="M140 40 L160 40 L160 60" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
            </g>

            {/* Central Singularity Point */}
            <circle cx="100" cy="95" r="4" fill="#fff" className="animate-ping" />
          </svg>
        </div>
      </div>

      <div className="text-center mt-4">
        <h1 className="font-orbitron font-black text-6xl md:text-8xl tracking-[0.2em] text-white italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          ERA
        </h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-[1px] w-12 bg-sky-500"></div>
          <span className="text-[10px] font-bold tracking-[0.8em] text-sky-400 uppercase">Intelligence Solutions</span>
          <div className="h-[1px] w-12 bg-sky-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
