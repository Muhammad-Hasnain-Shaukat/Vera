import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Star } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';

export const SocialProof: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex(prev => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#F4EFE6] border-b border-[#E8E2D8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
            VOICES OF THE RITUAL
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1C1917]">
            Real skin experiences.
          </h2>
        </div>

        {/* Testimonial Stage */}
        <div className="bg-[#FAF7F2] border border-[#E8E2D8] p-8 sm:p-14 rounded-xs shadow-xs relative">
          
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
            ))}
          </div>

          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1917] text-center leading-relaxed max-w-3xl mx-auto italic">
            "{current.quote}"
          </blockquote>

          <div className="mt-8 pt-6 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-medium text-[#1C1917]">
                <span>{current.author}</span>
                <span className="text-[#78716C]">•</span>
                <span title="Verified Client">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8876]" />
                </span>
              </div>
              <span className="text-[11px] text-[#78716C] block mt-0.5">
                Skin Profile: {current.skinType}
              </span>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-[10px] uppercase tracking-wider-editorial text-[#A8A29E] block">
                Ritual Used:
              </span>
              <span className="font-serif text-sm text-[#1C1917]">
                {current.productPurchased}
              </span>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="p-2 rounded-full border border-[#E8E2D8] bg-[#FAF7F2] text-[#1C1917] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    i === currentIndex ? 'w-6 bg-[#1C1917]' : 'w-1.5 bg-[#D5CCC0]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="p-2 rounded-full border border-[#E8E2D8] bg-[#FAF7F2] text-[#1C1917] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
