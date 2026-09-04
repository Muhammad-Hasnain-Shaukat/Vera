import React, { useState } from 'react';
import { Play, X, ArrowRight } from 'lucide-react';
import heroBgImage from '../../assets/hero-bg.jpg';

interface HeroProps {
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);

  return (
    <section className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden select-none bg-[#EBE4D8] flex flex-col justify-between">
      
      {/* 1. Responsive Full-Bleed Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Desktop Video (>= md) */}
        <video
          src="/videos/pc3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover object-center"
        />

        {/* Mobile Video (< md) */}
        <video
          src="/videos/mobile.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover object-center"
        />

        {/* Subtle Ambient Contrast Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/60 via-[#FAF7F2]/25 to-transparent md:from-[#FAF7F2]/40 md:via-transparent pointer-events-none" />
      </div>

      {/* Top Ambient Contrast Scrim for Floating Navigation */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#FAF7F2]/50 via-[#FAF7F2]/15 to-transparent pointer-events-none z-10" />

      {/* 2. Unified Master Container: Aligns Content & Bottom on Left Axis */}
      <div className="relative z-20 h-full w-full max-w-[1540px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 flex flex-col justify-between pt-20 sm:pt-28 pb-7 sm:pb-8">

        {/* Mobile View Only: Refined, neat text block filling the upper vacant space with airy spacing */}
        <div className="block sm:hidden pt-2 xs:pt-3 text-left space-y-3.5 xs:space-y-4 max-w-[290px]">
          <span className="text-[9px] font-sans tracking-[0.26em] uppercase text-black font-bold block">
            CLINICALLY CONSCIOUS BEAUTY
          </span>
          <h1 className="font-italiana text-[2.55rem] xs:text-[2.7rem] leading-[0.98] text-black font-normal tracking-tight">
            Skin,
            <br />
            <span className="font-editorial italic font-normal tracking-wide text-black block pt-1.5">
              reimagined.
            </span>
          </h1>
          <p className="text-[11.5px] xs:text-xs font-sans text-black/80 leading-relaxed font-medium pt-1">
            Intelligent skincare formulated for the way your skin lives today.
          </p>
        </div>

        {/* Desktop Middle Stage: Hidden on mobile, full editorial display on desktop */}
        <div className="hidden sm:block my-auto max-w-xl space-y-4 sm:space-y-5 lg:space-y-6 pt-3 pb-3 text-left">
          
          {/* Top Label */}
          <div className="animate-fadeIn">
            <span className="text-[10px] sm:text-[11.5px] font-sans tracking-[0.24em] uppercase text-[#0C0A09] font-bold block drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              CLINICALLY CONSCIOUS BEAUTY
            </span>
          </div>

          {/* Large Stylish High-Fashion Editorial Headline */}
          <div className="space-y-1">
            <h1 className="font-italiana text-5xl sm:text-6xl md:text-7xl lg:text-[5.3rem] xl:text-[5.9rem] font-normal text-[#0C0A09] leading-[0.88] tracking-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              Skin,
              <br />
              <span className="font-editorial italic font-normal tracking-wide text-[#14100D] block pt-1">
                reimagined.
              </span>
            </h1>
          </div>

          {/* Supporting Copy */}
          <div>
            <p className="text-sm sm:text-base font-sans text-[#262422] leading-relaxed max-w-md font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Intelligent skincare formulated
              <br className="hidden sm:block" />
              for the way your skin lives today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('/shop')}
              className="px-7 sm:px-8 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#332F2B] transition-all duration-300 cursor-pointer shadow-md font-semibold hover:-translate-y-0.5"
            >
              SHOP SKINCARE
            </button>

            <button
              onClick={() => onNavigate('/about')}
              className="px-7 sm:px-8 py-3.5 bg-[#FAF7F2]/50 hover:bg-[#1C1917] hover:text-[#FAF7F2] backdrop-blur-xs text-[#1C1917] border border-[#1C1917] text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer font-semibold shadow-xs hover:-translate-y-0.5"
            >
              DISCOVER VERA
            </button>
          </div>

        </div>

        {/* Bottom Elements: In mobile view, Shop Now button on left opposite to ritual symbol on right */}
        <div className="w-full flex items-center justify-between sm:justify-end pt-4 shrink-0 z-20">
          
          {/* Mobile Only: Shop Now Button on Left */}
          <div className="block sm:hidden">
            <button
              onClick={() => onNavigate('/shop')}
              className="px-6 py-3 bg-[#1C1917] text-[#FAF7F2] text-[11px] font-sans tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer shadow-lg font-semibold hover:bg-[#332F2B] active:scale-95 flex items-center gap-2 rounded-xs"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Circular Ritual Badge */}
          <button
            onClick={() => setIsRitualModalOpen(true)}
            data-cursor="PLAY"
            className="group relative w-16 h-16 sm:w-22 sm:h-22 rounded-full border border-[#0C0A09]/30 flex items-center justify-center hover:border-[#0C0A09] transition-all duration-300 cursor-pointer bg-[#FAF7F2]/75 backdrop-blur-md shadow-md"
            title="Experience The Ritual"
          >
            {/* Rotating Circular Text */}
            <svg className="w-full h-full animate-[spin_14s_linear_infinite]" viewBox="0 0 100 100">
              <path
                id="circlePath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                fill="transparent"
              />
              <text className="text-[7.2px] font-sans tracking-[0.26em] uppercase fill-[#0C0A09] font-semibold">
                <textPath href="#circlePath">
                  THE VERA RITUAL • THE VERA RITUAL •
                </textPath>
              </text>
            </svg>

            {/* Center Play Button Circle */}
            <div className="absolute inset-0 m-auto w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-[#FAF7F2] border border-[#0C0A09]/30 group-hover:bg-[#0C0A09] group-hover:border-[#0C0A09] flex items-center justify-center transition-all duration-300 shadow-xs">
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#0C0A09] text-[#0C0A09] group-hover:fill-[#FAF7F2] group-hover:text-[#FAF7F2] ml-0.5 transition-colors" />
            </div>
          </button>

        </div>

      </div>



      {/* Interactive Ritual Video/Demonstration Modal */}
      {isRitualModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0C0A09]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-2xl w-full p-8 rounded-xs border border-[#E8E2D8] shadow-2xl relative">
            <button
              onClick={() => setIsRitualModalOpen(false)}
              className="absolute top-5 right-5 text-[#57534E] hover:text-[#0C0A09] transition-colors"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>

            <div className="space-y-4">
              <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#C5A880] block">
                THE VERA RITUAL EXPERIENCE
              </span>
              <h3 className="font-serif text-3xl text-[#0C0A09]">
                The Tri-Active Core Regimen
              </h3>

              <div className="aspect-16/9 overflow-hidden bg-[#0C0A09] rounded-xs relative flex items-center justify-center">
                <img
                  src={heroBgImage}
                  alt="VERA Ritual Trio"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-[#FAF7F2]">
                  <p className="font-serif text-xl">01 Cleanse • 02 Treat • 03 Hydrate</p>
                  <p className="text-xs font-sans text-[#E8E2D8] mt-1">
                    Formulated with bio-identical ceramides, tri-molecular hyaluronate, and cold-extracted botanicals.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-sans">
                <div className="p-3 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs">
                  <span className="font-serif text-sm font-medium text-[#0C0A09] block">Radiance Cleanser</span>
                  <span className="text-[10px] text-[#78716C]">Step 01 • Prep</span>
                </div>
                <div className="p-3 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs">
                  <span className="font-serif text-sm font-medium text-[#0C0A09] block">Luminous Serum</span>
                  <span className="text-[10px] text-[#78716C]">Step 02 • Treat</span>
                </div>
                <div className="p-3 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs">
                  <span className="font-serif text-sm font-medium text-[#0C0A09] block">Renewal Moisturizer</span>
                  <span className="text-[10px] text-[#78716C]">Step 03 • Seal</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setIsRitualModalOpen(false);
                    onNavigate('/shop');
                  }}
                  className="px-6 py-3 bg-[#0C0A09] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#2D2A26] transition-colors flex items-center gap-2"
                >
                  <span>Acquire The Trio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
