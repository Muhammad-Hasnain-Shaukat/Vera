import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setFading(true);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-9999 bg-[#FAF7F2] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <span className="font-serif text-3xl sm:text-4xl tracking-[0.3em] font-light text-[#1C1917] block animate-pulse">
          VERA
        </span>
        <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] mt-2 block">
          Intelligent Formulation
        </span>
        <div className="w-32 h-[1px] bg-[#E8E2D8] mt-6 mx-auto overflow-hidden">
          <div
            className="h-full bg-[#1C1917] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
