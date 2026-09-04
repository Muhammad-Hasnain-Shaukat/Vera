import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device supports touch only
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor]');
      if (interactiveEl) {
        const text = interactiveEl.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        const isClickable = target.closest('button, a, input, [role="button"]');
        if (isClickable) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out will-change-transform flex items-center justify-center"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {cursorText ? (
        <div className="w-16 h-16 rounded-full bg-[#1C1917]/85 backdrop-blur-xs text-[#FAF7F2] flex items-center justify-center text-[9px] font-sans tracking-widest-editorial uppercase transition-all duration-200 shadow-md">
          {cursorText}
        </div>
      ) : isHovered ? (
        <div className="w-9 h-9 rounded-full border border-[#1C1917]/50 bg-[#C5A880]/15 transition-all duration-200" />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full bg-[#1C1917]/70 transition-all duration-150" />
      )}
    </div>
  );
};
