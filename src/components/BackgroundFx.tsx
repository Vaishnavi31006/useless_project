import React from 'react';

export const BackgroundFx: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient gradient orbs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-violet/15 blur-[120px] animate-pulse-glow" 
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-brand-cyan/10 blur-[130px] animate-pulse-glow" 
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />
      <div 
        className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-brand-pink/10 blur-[140px] animate-pulse-glow" 
        style={{ animationDuration: '9s', animationDelay: '4s' }}
      />

      {/* Cyber mesh grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Film grain texture */}
      <div className="absolute inset-0 bg-noise opacity-70 mix-blend-overlay" />
    </div>
  );
};
