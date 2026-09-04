import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] pt-20 pb-12 border-t border-[#2E2A26] relative overflow-hidden">
      
      {/* Background luxury watermarking */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] font-serif text-[18vw] leading-none whitespace-nowrap">
        VERA LAB
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Manifesto Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2E2A26]">
          
          <div className="lg:col-span-5">
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
              The Intention Dispatch
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-light leading-tight mb-4">
              A little beauty in your inbox.
            </h3>
            <p className="text-sm font-sans text-[#A8A29E] max-w-md leading-relaxed">
              Receive private invitations to limited-batch laboratory drops, circadian skin essays, and formulation masterclasses.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            {isSubscribed ? (
              <div className="bg-[#262320] border border-[#3E3832] p-5 rounded-xs flex items-center gap-3 text-sm text-[#FAF7F2]">
                <CheckCircle2 className="w-5 h-5 text-[#7D8876]" />
                <div>
                  <p className="font-serif text-base">You are on the VERA private ledger.</p>
                  <p className="text-xs font-sans text-[#A8A29E]">
                    Your introductory ritual code <strong className="text-[#C5A880]">VERA15</strong> is active for your first order.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    required
                    className="flex-1 bg-[#262320] border border-[#3E3832] px-5 py-3.5 text-xs font-sans tracking-wider-editorial uppercase text-[#FAF7F2] placeholder:text-[#78716C] rounded-xs focus:outline-hidden focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#FAF7F2] text-[#1C1917] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#E8E0D5] transition-colors rounded-xs flex items-center justify-center gap-2 group cursor-pointer shrink-0"
                  >
                    <span>Join VERA</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
                <p className="text-[11px] font-sans text-[#78716C]">
                  By joining, you consent to our privacy terms. You may withdraw authorization at any moment.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation & Information Columns */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 border-b border-[#2E2A26]">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="font-serif text-3xl tracking-[0.25em] font-light text-[#FAF7F2] block text-left"
            >
              VERA
            </button>
            <p className="font-editorial italic text-xl text-[#C5A880]">
              Skin, reimagined.
            </p>
            <p className="text-xs font-sans text-[#A8A29E] max-w-sm leading-relaxed">
              Clinical biomimetic skincare developed in Zurich. Synthesizing pharmaceutical rigor, regenerative botanicals, and conscious packaging.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-sans text-[#78716C]">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-[#7D8876]" />
                100% Cruelty-Free
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                FSC Recycled Glass
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-sans tracking-widest-editorial uppercase text-[#FAF7F2] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-[#A8A29E]">
              <li>
                <button onClick={() => onNavigate('/shop')} className="hover:text-[#FAF7F2] transition-colors">
                  Shop All Formulas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/shop/Skin')} className="hover:text-[#FAF7F2] transition-colors">
                  Skin Essentials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/shop/Body')} className="hover:text-[#FAF7F2] transition-colors">
                  Body Care
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/routine')} className="hover:text-[#FAF7F2] transition-colors">
                  Routine Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/quiz')} className="hover:text-[#FAF7F2] transition-colors text-[#C5A880]">
                  Skin Diagnostic Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial & Care */}
          <div>
            <h4 className="text-xs font-sans tracking-widest-editorial uppercase text-[#FAF7F2] mb-4">
              Editorial &amp; House
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-[#A8A29E]">
              <li>
                <button onClick={() => onNavigate('/journal')} className="hover:text-[#FAF7F2] transition-colors">
                  The VERA Journal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[#FAF7F2] transition-colors">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/account')} className="hover:text-[#FAF7F2] transition-colors">
                  Client Sanctuary
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/admin')} className="hover:text-[#FAF7F2] transition-colors">
                  Laboratory Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Sanctuary */}
          <div>
            <h4 className="text-xs font-sans tracking-widest-editorial uppercase text-[#FAF7F2] mb-4">
              Concierge
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-[#A8A29E]">
              <li>
                <span className="hover:text-[#FAF7F2] cursor-pointer">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-[#FAF7F2] cursor-pointer">
                  30-Day Ritual Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-[#FAF7F2] cursor-pointer">
                  Recycling Return Initiative
                </span>
              </li>
              <li>
                <span className="hover:text-[#FAF7F2] cursor-pointer">
                  Contact Skincare Concierge
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-sans text-[#78716C] gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} VERA BEAUTÉ LABORATOIRE. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="hover:text-[#A8A29E] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#A8A29E] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#A8A29E] cursor-pointer">Accessibility</span>
            <span className="hover:text-[#A8A29E] cursor-pointer">Formulation Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
