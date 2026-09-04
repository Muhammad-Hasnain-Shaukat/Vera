import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Leaf, Award, HeartHandshake, Droplets, FlaskConical, Sun, Compass } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-20">
      
      {/* 1. Hero Narrative Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pb-12 sm:pb-16 border-b border-[#E8E2D8]">
        <span className="text-[10px] sm:text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block font-medium">
          THE HOUSE OF VERA • ZURICH &amp; PARIS
        </span>
        <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-light text-[#1C1917] tracking-tight leading-[1.05] sm:leading-[0.98]">
          Formulating with
          <br />
          <span className="font-editorial italic font-normal text-[#C5A880]">uncompromising intention</span>.
        </h1>
        <p className="text-sm sm:text-lg font-sans text-[#57534E] max-w-2xl mx-auto leading-relaxed">
          Founded in Zurich, VERA began not in a corporate cosmetics marketing boardroom, but inside an advanced biomolecular laboratory investigating epidermal water transport and lipid barrier failure.
        </p>
      </div>

      {/* 2. Chapter 1: The Zurich Genesis */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12 sm:my-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          <div className="lg:col-span-6 aspect-4/5 overflow-hidden bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs shadow-sm">
            <img
              src="/images/about/genesis-lab.jpg"
              alt="VERA Zurich Laboratory Research"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/hero-bg.jpg'; }}
            />
          </div>

          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] font-medium">
                CHAPTER 01 • THE GENESIS
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-light leading-snug">
              "We asked: what if skincare operated like cellular architecture?"
            </h2>

            <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
              Modern life subjects human skin to unprecedented stress: artificial blue-light emissions, airborne micro-particulates, dry recirculated climate air, and chronic digital fatigue. 
            </p>

            <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
              Traditional cosmetics responded by adding harsher peeling acids and heavier occlusive petroleum waxes. We took the opposite path: supplying the exact physiological lipid ratios (3:1:1 Ceramides, Cholesterol, and Free Fatty Acids) that human cells naturally synthesize to self-heal.
            </p>

            <div className="pt-4 border-t border-[#E8E2D8] grid grid-cols-3 gap-3 sm:gap-6 text-xs font-sans text-[#1C1917]">
              <div>
                <span className="font-serif text-xl sm:text-2xl font-light text-[#C5A880] block">2,800+</span>
                <span className="text-[10px] sm:text-xs text-[#78716C] block mt-0.5">Banned Compounds</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-light text-[#C5A880] block">100%</span>
                <span className="text-[10px] sm:text-xs text-[#78716C] block mt-0.5">Vegan &amp; Clean</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-light text-[#C5A880] block">92%</span>
                <span className="text-[10px] sm:text-xs text-[#78716C] block mt-0.5">Inert Glass Vessels</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Chapter 2: The Alpine Botanical Sourcing & Cold Extraction */}
      <section className="bg-[#F4EFE6] py-14 sm:py-24 border-y border-[#E8E2D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-5 sm:space-y-6">
              <span className="text-[10px] sm:text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] font-medium block">
                CHAPTER 02 • THE HARVEST &amp; EXTRACTION
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-light leading-snug">
                Sub-Zero Supercritical CO2: Preserving the Vital Spark
              </h2>

              <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
                Conventional botanical processing relies on petrochemical solvents or high-heat distillation that irreparably denatures antioxidant polyphenol rings. 
              </p>

              <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
                VERA extracts its cold-harvested Alpine botanicals using pressurized, supercritical carbon dioxide at a gentle 31°C. The moment the extraction concludes, the carbon dioxide effortlessly returns to vapor, leaving behind nothing but pure, unadulterated plant intelligence.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs">
                  <span className="text-[10px] font-sans tracking-wider-editorial uppercase text-[#C5A880] font-medium block">
                    Alpine Edelweiss
                  </span>
                  <p className="text-[11px] font-sans text-[#78716C] mt-1 leading-snug">
                    Cultivated at 1,500m altitude; develops extreme antioxidant resilience against intense alpine UV.
                  </p>
                </div>
                <div className="p-3.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs">
                  <span className="text-[10px] font-sans tracking-wider-editorial uppercase text-[#C5A880] font-medium block">
                    French Plum Lipids
                  </span>
                  <p className="text-[11px] font-sans text-[#78716C] mt-1 leading-snug">
                    Virgin cold-pressed kernel oil naturally abundant in protective linoleic acid and vitamin E.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 aspect-4/5 overflow-hidden bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs shadow-sm">
              <img
                src="/images/about/botanical-harvest.jpg"
                alt="Swiss Alpine Flora & Botanical Dew"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/hero-bg.jpg'; }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. Chapter 3: Sensorial Texture & Ritual Chemistry */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          <div className="lg:col-span-6 aspect-4/5 overflow-hidden bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs shadow-sm">
            <img
              src="/images/products/cleansing-balm.jpg"
              alt="Tactile Skincare Emulsion Texture on Travertine"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/hero-bg.jpg'; }}
            />
          </div>

          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <span className="text-[10px] sm:text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] font-medium block">
              CHAPTER 03 • THE TACTILE SENSATION
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-light leading-snug">
              Viscosity Formulated for the Parasympathetic System
            </h2>

            <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
              We reject the industry dogma that clinical efficacy requires unpleasant textures or synthetic perfumes. A ritual must calm the mind as deeply as it restores the stratum corneum.
            </p>

            <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
              Every VERA emulsion is engineered to break at skin temperature (36.5°C), transforming from a cashmere-rich cream into a micro-droplet veil that vanishes into epidermal strata in under twenty seconds.
            </p>

            <div className="p-4 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans text-[#1C1917] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Zero Synthetic Fragrance Policy</span>
              </div>
              <p className="text-[11px] font-sans text-[#78716C] leading-relaxed">
                The delicate scent you experience is the natural botanical signature of cold-pressed German chamomile, steam-distilled blue tansy, and wild frankincense.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Chapter 4: Sustainable Architecture & Ultraviolet Glass */}
      <section className="bg-[#F4EFE6] py-14 sm:py-24 border-y border-[#E8E2D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-5 sm:space-y-6">
              <span className="text-[10px] sm:text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] font-medium block">
                CHAPTER 04 • CIRCULAR ARCHITECTURE
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-light leading-snug">
                Italian Pharmaceutical Glass: The Vessel of Permanence
              </h2>

              <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
                Clear plastic and standard soda-lime glass allow sunlight wavelengths to penetrate and decompose fragile antioxidants within weeks of opening.
              </p>

              <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
                VERA houses every batch in heavyweight, custom-blown pharmaceutical glass made in Northern Italy. This glass completely filters the visible spectrum while permitting beneficial violet rays, naturally extending cellular potency without synthetic parabens.
              </p>

              <ul className="space-y-2 text-xs font-sans text-[#57534E] pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>Weighted glass pedestals designed for permanent bathroom counter architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>Solid aluminum collars with 100% recyclable mono-material pipettes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>Complimentary laboratory return &amp; autoclave sanitization initiative</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 aspect-4/5 overflow-hidden bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs shadow-sm">
              <img
                src="/images/products/renewal-serum.jpg"
                alt="Architectural Luxury Glass Packaging"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/products/ritual-set.jpg'; }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 6. Scientific Board & Founders */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-24">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2 font-medium">
            THE MINDS BEHIND VERA
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1917]">
            The Clinical Board
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-sans text-[#78716C]">
            Combining doctoral biochemistry, clinical dermatology, and sustainable packaging design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Member 1 */}
          <div className="bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs overflow-hidden group">
            <div className="aspect-square overflow-hidden bg-[#FAF7F2]">
              <img
                src="/images/about/board-1.jpg"
                alt="Dr. Elena Vance"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/products/ritual-set.jpg'; }}
              />
            </div>
            <div className="p-5 space-y-1.5">
              <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#C5A880] block">
                Chief Scientific Officer
              </span>
              <h3 className="font-serif text-xl text-[#1C1917]">
                Dr. Elena Vance, Ph.D.
              </h3>
              <p className="text-xs font-sans text-[#78716C] leading-relaxed pt-1">
                Former Senior Researcher in Epidermal Physiology at ETH Zurich. 14 peer-reviewed patents in ceramide liposomal encapsulation.
              </p>
            </div>
          </div>

          {/* Member 2 */}
          <div className="bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs overflow-hidden group">
            <div className="aspect-square overflow-hidden bg-[#FAF7F2]">
              <img
                src="/images/about/board-2.jpg"
                alt="Julian Thorne"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/products/renewal-serum.jpg'; }}
              />
            </div>
            <div className="p-5 space-y-1.5">
              <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#C5A880] block">
                Director of Botanical Extraction
              </span>
              <h3 className="font-serif text-xl text-[#1C1917]">
                Julian Thorne
              </h3>
              <p className="text-xs font-sans text-[#78716C] leading-relaxed pt-1">
                Pioneered industrial supercritical CO2 botanical fractioning in Lausanne. Passionate advocate for organic regenerative farming.
              </p>
            </div>
          </div>

          {/* Member 3 */}
          <div className="bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs overflow-hidden group">
            <div className="aspect-square overflow-hidden bg-[#FAF7F2]">
              <img
                src="/images/about/board-3.jpg"
                alt="Margaux Delacroix"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/products/cleansing-balm.jpg'; }}
              />
            </div>
            <div className="p-5 space-y-1.5">
              <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#C5A880] block">
                Creative Director &amp; Rituals
              </span>
              <h3 className="font-serif text-xl text-[#1C1917]">
                Margaux Delacroix
              </h3>
              <p className="text-xs font-sans text-[#78716C] leading-relaxed pt-1">
                Parisian aesthetician and architectural designer. Guides sensory texture viscosity, olfactive signatures, and ergonomic vessel design.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. The 4 Core Tenets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 border-t border-[#E8E2D8]">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2 font-medium">
            CERTIFIED FORMULATION STANDARDS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1C1917]">
            Our Four Purity Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#1C1917]" />
            <h3 className="font-serif text-xl text-[#1C1917]">Biomimetic Affinity</h3>
            <p className="text-xs font-sans text-[#57534E] leading-relaxed">
              We exclusively use ingredients whose molecular geometry the human stratum corneum recognizes and utilizes directly.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-3">
            <Leaf className="w-6 h-6 text-[#7D8876]" />
            <h3 className="font-serif text-xl text-[#1C1917]">Cold Supercritical CO2</h3>
            <p className="text-xs font-sans text-[#57534E] leading-relaxed">
              Botanical oils are extracted without petroleum hexane or thermal degradation, keeping antioxidants bio-intact.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-3">
            <Award className="w-6 h-6 text-[#C5A880]" />
            <h3 className="font-serif text-xl text-[#1C1917]">Clinical Cohort Proof</h3>
            <p className="text-xs font-sans text-[#57534E] leading-relaxed">
              Every claims metric on our bottles is substantiated by independent dermatological studies on living skin.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#1C1917]" />
            <h3 className="font-serif text-xl text-[#1C1917]">Circular Packaging</h3>
            <p className="text-xs font-sans text-[#57534E] leading-relaxed">
              UV-shielded heavy glass and aluminum dropper collars designed for multiple refills and complete recycling.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CTA Bottom Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 text-center">
        <div className="p-6 sm:p-14 bg-[#1C1917] text-[#FAF7F2] rounded-xs space-y-6">
          <h2 className="font-serif text-2xl sm:text-4xl font-light">
            Experience the VERA Difference
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#A8A29E] max-w-md mx-auto leading-relaxed">
            Discover a slower, more intentional ritual formulated for visible cellular resilience and deep epidermal harmony.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/shop')}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-[#FAF7F2] text-[#1C1917] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#E8E0D5] transition-colors inline-flex items-center justify-center gap-2 rounded-xs font-medium cursor-pointer"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('/quiz')}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 border border-[#3E3832] text-[#FAF7F2] hover:bg-[#FAF7F2]/10 text-xs font-sans tracking-widest-editorial uppercase transition-colors inline-flex items-center justify-center gap-2 rounded-xs font-medium cursor-pointer"
            >
              <span>Take Diagnostic Quiz</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

