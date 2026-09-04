import React, { useState } from 'react';
import { Heart, Plus, Check, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      onClick={() => onNavigate(`/product/${product.slug}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="VIEW"
      className="group cursor-pointer flex flex-col justify-between bg-transparent select-none transition-all duration-300 relative"
    >
      {/* Top Image Vessel */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#F4EFE6] border border-[#E8E2D8] mb-4">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.bestseller && (
            <span className="px-2.5 py-1 bg-[#1C1917] text-[#FAF7F2] text-[9px] font-sans tracking-widest-editorial uppercase rounded-xs">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[#FAF7F2] text-[#1C1917] border border-[#E8E2D8] text-[9px] font-sans tracking-widest-editorial uppercase rounded-xs">
              New Batch
            </span>
          )}
        </div>

        {/* Wishlist Icon Button */}
        <button
          onClick={handleWishlist}
          aria-label="Save to Wishlist"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#FAF7F2]/80 backdrop-blur-xs border border-[#E8E2D8] text-[#1C1917] hover:text-[#C5A880] transition-colors"
        >
          <Heart
            className={`w-4 h-4 stroke-[1.5] transition-all ${
              isFavorited ? 'fill-[#C5A880] text-[#C5A880]' : 'text-[#1C1917]'
            }`}
          />
        </button>

        {/* Product Images with subtle cross-fade and 2% zoom */}
        <div className="w-full h-full relative">
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-0 scale-102' : 'opacity-100 scale-100'
            }`}
          />
          <img
            src={secondaryImage}
            alt={`${product.name} view`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-102' : 'opacity-0 scale-100'
            }`}
          />
        </div>

        {/* Quick Add Overlay Bar */}
        <div
          className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#1C1917]/70 via-[#1C1917]/40 to-transparent transition-all duration-300 flex items-center justify-center ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#FAF7F2]/90 text-[#1C1917] text-xs font-sans tracking-widest-editorial uppercase font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#7D8876]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-sans tracking-wider-editorial uppercase text-[#78716C] mb-1">
            <span>{product.category}</span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#C5A880] text-[#C5A880]" />
              <span className="font-mono text-[#1C1917]">{product.rating.toFixed(1)}</span>
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-[#1C1917] font-normal leading-snug group-hover:text-[#C5A880] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs font-sans text-[#78716C] line-clamp-1 mt-1">
            {product.subtitle}
          </p>
        </div>

        <div className="pt-3 mt-2 border-t border-[#E8E2D8] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-sm font-semibold text-[#1C1917]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-[#A8A29E] line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <span className="text-[11px] font-sans text-[#78716C]">
            {product.size}
          </span>
        </div>
      </div>
    </div>
  );
};
