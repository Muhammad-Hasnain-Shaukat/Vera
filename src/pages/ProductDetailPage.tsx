import React, { useState } from 'react';
import { 
  Heart, Plus, Minus, Check, Star, ShieldCheck, 
  ChevronDown, ChevronUp, Sparkles, ArrowRight, 
  Droplets, Leaf, RotateCcw, Share2, Maximize2, X 
} from 'lucide-react';
import { initialProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';


interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const product = initialProducts.find(p => p.slug === slug) || initialProducts[0];
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);

  // Accordion states
  const [openSection, setOpenSection] = useState<'why' | 'ingredients' | 'how' | 'packaging' | null>('why');

  // New review form modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSubmitted(false);
      setReviewAuthor('');
      setReviewTitle('');
      setReviewComment('');
    }, 2000);
  };

  const pairedProducts = initialProducts.filter(p => product.pairsWith?.includes(p.slug));

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-16">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center space-x-2 text-xs font-sans tracking-wider-editorial uppercase text-[#78716C]">
          <button onClick={() => onNavigate('/')} className="hover:text-[#1C1917]">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('/shop')} className="hover:text-[#1C1917]">Dispensary</button>
          <span>/</span>
          <button onClick={() => onNavigate(`/shop/${product.category}`)} className="hover:text-[#1C1917]">{product.category}</button>
          <span>/</span>
          <span className="text-[#1C1917] font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Main PDP Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Gallery (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Viewport with Zoom and Fullscreen */}
            <div className="relative aspect-4/5 overflow-hidden bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs group">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-crosshair"
              />

              {/* Fullscreen Expansion Trigger */}
              <button
                onClick={() => setIsFullscreenImage(true)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#FAF7F2]/85 backdrop-blur-xs border border-[#E8E2D8] text-[#1C1917] hover:bg-[#FAF7F2] transition-colors"
                title="View Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Floating Formulation Badge */}
              <div className="absolute bottom-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xs border border-[#E8E2D8] text-[10px] font-sans tracking-widest-editorial uppercase text-[#57534E]">
                <span>Batch Lab 01  •  Swiss Bio-Identical</span>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square overflow-hidden bg-[#F4EFE6] border transition-all duration-200 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#1C1917] ring-1 ring-[#1C1917]'
                      : 'border-[#E8E2D8] hover:border-[#A8A29E] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Right Product Buy Box & Formulation Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center justify-between text-xs font-sans tracking-widest-editorial uppercase text-[#78716C] mb-2">
                <span>{product.category}  •  {product.size}</span>
                <span className="text-[#7D8876] font-medium">In Stock &amp; Ready to Dispatch</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1917] leading-tight">
                {product.name}
              </h1>

              <p className="font-editorial italic text-xl sm:text-2xl text-[#78716C] mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Star Ratings & Clinical Review Link */}
            <div className="flex items-center gap-3 pb-4 border-b border-[#E8E2D8]">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                ))}
              </div>
              <span className="text-xs font-sans text-[#57534E]">
                <strong className="text-[#1C1917] font-medium">{product.rating.toFixed(2)}</strong> ({product.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-sans font-medium text-[#1C1917]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-sans text-[#A8A29E] line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs font-sans text-[#78716C]">
                4 interest-free payments of ${(product.price / 4).toFixed(2)} with Klarna
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm font-sans text-[#57534E] leading-relaxed">
              {product.description}
            </p>

            {/* Key Clinical Actives Pills */}
            <div className="p-4 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-2">
              <span className="text-[11px] font-sans tracking-wider-editorial uppercase text-[#1C1917] block font-medium">
                Primary Bio-Identical Actives:
              </span>
              <ul className="space-y-1 text-xs font-sans text-[#57534E]">
                {product.keyActives.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C5A880]">•</span>
                    <span>
                      <strong className="text-[#1C1917]">{act.name}</strong>: {act.purpose}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Bag Actions */}
            <div className="space-y-4 pt-4 border-t border-[#E8E2D8]">
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2.5 sm:gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-[#1C1917]/30 bg-[#FAF7F2] rounded-xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 sm:px-4 text-xs font-mono text-[#1C1917] font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Wishlist Button (mobile only beside quantity) */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-3 border border-[#1C1917]/30 bg-[#FAF7F2] hover:bg-[#F4EFE6] rounded-xs text-[#1C1917] hover:text-[#C5A880] transition-colors cursor-pointer sm:hidden"
                    title="Save to Wishlist"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 stroke-[1.5] ${
                        isFavorited ? 'fill-[#C5A880] text-[#C5A880]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  data-cursor="ADD"
                  className="flex-1 py-3.5 bg-[#1C1917] text-[#FAF7F2] hover:bg-[#38332E] text-[11px] sm:text-xs font-sans tracking-widest-editorial uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm text-center"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[#7D8876]" />
                      <span>Added to Ritual Bag</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button (desktop only) */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="hidden sm:block p-3.5 border border-[#1C1917]/30 bg-[#FAF7F2] hover:bg-[#F4EFE6] rounded-xs text-[#1C1917] hover:text-[#C5A880] transition-colors cursor-pointer"
                  title="Save to Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 stroke-[1.5] ${
                      isFavorited ? 'fill-[#C5A880] text-[#C5A880]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Guarantees */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-sans text-[#78716C]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7D8876]" />
                  30-Day Ritual Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  Complimentary 2-Day Delivery $100+
                </span>
              </div>

            </div>

            {/* Editorial Tabbed Accordions */}
            <div className="pt-8 border-t border-[#E8E2D8] space-y-3">
              
              {/* Accordion 1: Why You'll Love It */}
              <div className="border border-[#E8E2D8] rounded-xs bg-[#FAF7F2]">
                <button
                  onClick={() => setOpenSection(openSection === 'why' ? null : 'why')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-sans tracking-widest-editorial uppercase text-[#1C1917] font-medium cursor-pointer"
                >
                  <span>Why You'll Love It &amp; Clinical Data</span>
                  {openSection === 'why' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'why' && (
                  <div className="px-4 pb-4 text-xs font-sans text-[#57534E] space-y-3 border-t border-[#E8E2D8] pt-3">
                    <p className="leading-relaxed">
                      Engineered for high-stress epidermal barriers. Clinically documented to strengthen lipid integrity while providing weightless, non-comedogenic moisture.
                    </p>
                    {product.clinicalResults && (
                      <div className="space-y-1.5 bg-[#F4EFE6] p-3 rounded-xs">
                        <span className="text-[10px] font-sans tracking-wider-editorial uppercase text-[#78716C] block">
                          Independent Clinical Cohort (4-Week Study):
                        </span>
                        {product.clinicalResults.map((res, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-[#1C1917]">
                            <Check className="w-3.5 h-3.5 text-[#7D8876] shrink-0 mt-0.5" />
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: How to Use / The Ritual */}
              <div className="border border-[#E8E2D8] rounded-xs bg-[#FAF7F2]">
                <button
                  onClick={() => setOpenSection(openSection === 'how' ? null : 'how')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-sans tracking-widest-editorial uppercase text-[#1C1917] font-medium cursor-pointer"
                >
                  <span>The Ritual &amp; Application Protocol</span>
                  {openSection === 'how' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'how' && (
                  <div className="px-4 pb-4 text-xs font-sans text-[#57534E] space-y-2.5 border-t border-[#E8E2D8] pt-3">
                    <div>
                      <span className="text-[#1C1917] font-medium">Routine Step: </span>
                      <span>{product.ritual.step} ({product.ritual.timing})</span>
                    </div>
                    <div>
                      <span className="text-[#1C1917] font-medium">Application Method: </span>
                      <p className="mt-1 leading-relaxed">{product.ritual.howToUse}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E2D8]/60 text-[11px]">
                      <div>
                        <span className="text-[#78716C] block">Sensory Texture:</span>
                        <span className="text-[#1C1917]">{product.ritual.texture}</span>
                      </div>
                      <div>
                        <span className="text-[#78716C] block">Aromatic Note:</span>
                        <span className="text-[#1C1917]">{product.ritual.scent}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Full INCI Disclosure */}
              <div className="border border-[#E8E2D8] rounded-xs bg-[#FAF7F2]">
                <button
                  onClick={() => setOpenSection(openSection === 'ingredients' ? null : 'ingredients')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-sans tracking-widest-editorial uppercase text-[#1C1917] font-medium cursor-pointer"
                >
                  <span>Full Transparent Ingredients (INCI)</span>
                  {openSection === 'ingredients' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'ingredients' && (
                  <div className="px-4 pb-4 text-[11px] font-mono text-[#57534E] leading-relaxed border-t border-[#E8E2D8] pt-3">
                    <p>{product.fullIngredients}</p>
                    <p className="mt-2 text-[10px] font-sans text-[#78716C]">
                      Free of parabens, phthalates, synthetic colorants, sulfates, PEGs, silicones, and microplastics.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Sustainable Packaging */}
              <div className="border border-[#E8E2D8] rounded-xs bg-[#FAF7F2]">
                <button
                  onClick={() => setOpenSection(openSection === 'packaging' ? null : 'packaging')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-sans tracking-widest-editorial uppercase text-[#1C1917] font-medium cursor-pointer"
                >
                  <span>Conscious Packaging &amp; Recycling</span>
                  {openSection === 'packaging' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'packaging' && (
                  <div className="px-4 pb-4 text-xs font-sans text-[#57534E] space-y-2 border-t border-[#E8E2D8] pt-3">
                    <p className="leading-relaxed">
                      Packaged in 100% recyclable amber UV glass to preserve botanical actives without synthetic chemical preservatives. Outer carton made from FSC-certified post-consumer paper.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Complete Your Ritual / Harmonious Pairings */}
        {pairedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#E8E2D8]">
            <div className="mb-10 text-center max-w-xl mx-auto">
              <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-1">
                SYNERGISTIC RITUAL
              </span>
              <h2 className="font-serif text-3xl font-light text-[#1C1917]">
                Harmonious Pairings
              </h2>
              <p className="text-xs font-sans text-[#78716C] mt-2">
                Formulas coordinated to amplify cellular uptake and reinforce barrier resilience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {pairedProducts.map(paired => (
                <ProductCard
                  key={paired.id}
                  product={paired}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}

        {/* Real Customer Reviews Section */}
        <div className="mt-24 pt-16 border-t border-[#E8E2D8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
                CLIENT VERIFICATIONS
              </span>
              <h2 className="font-serif text-3xl font-light text-[#1C1917]">
                Customer Evaluations
              </h2>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="mt-4 md:mt-0 px-6 py-2.5 bg-[#FAF7F2] border border-[#1C1917] text-xs font-sans tracking-widest-editorial uppercase text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2] transition-colors"
            >
              Write An Evaluation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                ))}
              </div>
              <h4 className="font-serif text-lg text-[#1C1917]">
                "Transformation within 72 hours."
              </h4>
              <p className="text-xs font-sans text-[#57534E] leading-relaxed">
                I was skeptical about another serum claiming barrier repair, but this eliminated all tightness and surface flaking after 3 days. It wears beautifully under SPF.
              </p>
              <div className="pt-2 text-[11px] font-sans text-[#78716C] flex items-center justify-between border-t border-[#E8E2D8]">
                <span>Corinne V. (Zurich) • Verified Client</span>
                <span>Skin: Sensitive</span>
              </div>
            </div>

            <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                ))}
              </div>
              <h4 className="font-serif text-lg text-[#1C1917]">
                "The texture is pure luxury."
              </h4>
              <p className="text-xs font-sans text-[#57534E] leading-relaxed">
                Zero synthetic fragrance, yet smells wonderfully clean and botanically fresh. My complexion has a luminous cushion that lasts all day.
              </p>
              <div className="pt-2 text-[11px] font-sans text-[#78716C] flex items-center justify-between border-t border-[#E8E2D8]">
                <span>Amelia H. (London) • Verified Client</span>
                <span>Skin: Dry / Dehydrated</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1C1917]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-lg w-full p-8 rounded-xs border border-[#E8E2D8] shadow-2xl relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-[#78716C] hover:text-[#1C1917]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-1">
              Share Your Experience
            </span>
            <h3 className="font-serif text-2xl text-[#1C1917] mb-4">
              Review {product.name}
            </h3>

            {reviewSubmitted ? (
              <div className="text-center py-8">
                <Check className="w-8 h-8 text-[#7D8876] mx-auto mb-2" />
                <p className="font-serif text-xl text-[#1C1917]">Thank you for your review.</p>
                <p className="text-xs font-sans text-[#78716C] mt-1">
                  Your evaluation will appear upon laboratory verification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewRating
                              ? 'fill-[#C5A880] text-[#C5A880]'
                              : 'text-[#D5CCC0]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={e => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3 py-2 text-xs font-sans bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewTitle}
                    onChange={e => setReviewTitle(e.target.value)}
                    placeholder="e.g. Noticeable firmness within days"
                    className="w-full px-3 py-2 text-xs font-sans bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                    Your Thoughts
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder="Describe sensory texture, skin improvements, and your ritual..."
                    className="w-full px-3 py-2 text-xs font-sans bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors"
                >
                  Submit Evaluation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      {isFullscreenImage && (
        <div
          className="fixed inset-0 z-999 bg-[#1C1917]/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsFullscreenImage(false)}
        >
          <button
            onClick={() => setIsFullscreenImage(false)}
            className="absolute top-6 right-6 text-[#FAF7F2] p-2 hover:text-[#C5A880]"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={product.images[activeImageIndex]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

    </div>
  );
};
