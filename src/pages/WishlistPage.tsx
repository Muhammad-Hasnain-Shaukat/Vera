import React from 'react';
import { Heart, Plus, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/product/ProductCard';

interface WishlistPageProps {
  onNavigate: (path: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAll = () => {
    wishlist.forEach(p => addToCart(p, 1));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-8 border-b border-[#E8E2D8] mb-12">
          <div>
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
              CLIENT RESERVES
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1C1917]">
              Saved Rituals ({wishlist.length})
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-sans text-[#78716C]">
              Your private collection of desired cellular formulations.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleAddAll}
              className="mt-4 sm:mt-0 px-6 py-3 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add All to Bag</span>
            </button>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-[#A8A29E]" />
            </div>
            <h2 className="font-serif text-2xl text-[#1C1917] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs font-sans text-[#78716C] max-w-sm mx-auto mb-8">
              Explore our laboratory formulations and click the heart icon on any product to save it to your client sanctuary.
            </p>
            <button
              onClick={() => onNavigate('/shop')}
              className="px-8 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors"
            >
              Discover Formulations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {wishlist.map(product => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} onNavigate={onNavigate} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
