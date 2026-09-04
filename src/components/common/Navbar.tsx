import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'SHOP', path: '/shop' },
    { label: 'SKIN', path: '/shop/Skin' },
    { label: 'BODY', path: '/shop/Body' },
    { label: 'RITUALS', path: '/routine' },
    { label: 'QUIZ', path: '/quiz' },
    { label: 'JOURNAL', path: '/journal' },
    { label: 'ABOUT', path: '/about' }
  ];

  const isHome = currentPath === '/' || currentPath === '';

  return (
    <>
      {/* Top Navigation — Floats Directly On Video on Hero with No Bar */}
      <header
        className={`z-40 transition-all duration-300 w-full ${
          isHome
            ? 'absolute top-0 inset-x-0 bg-transparent border-none py-4 sm:py-5.5'
            : 'sticky top-0 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D8] py-2.5 sm:py-3 shadow-xs'
        }`}
      >
        <div className="max-w-[1540px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="flex items-center justify-between relative">
            
            {/* Left: Authentic Bottle Monogram (Exact 1:1 Match from Bottle) */}
            <div className="flex items-center shrink-0 z-10">
              <button
                onClick={() => onNavigate('/')}
                className="group inline-flex items-center justify-center cursor-pointer p-0 m-0 transition-transform duration-300 hover:scale-[1.03]"
                title="VERA Skincare"
                aria-label="VERA Home"
              >
                <img
                  src="/images/vera-exact-logo.png"
                  alt="VERA Monogram"
                  className="h-8 sm:h-9 w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-80"
                />
              </button>
            </div>

            {/* Center: All Section Links Perfectly Aligned in Center */}
            <nav 
              className="hidden lg:flex items-center justify-center space-x-6 xl:space-x-8 absolute inset-x-0 mx-auto pointer-events-none" 
              aria-label="Main Navigation"
            >
              <div className="flex items-center space-x-6 xl:space-x-8 pointer-events-auto">
                {navLinks.map(link => {
                  const isActive = currentPath === link.path;
                  return (
                    <button
                      key={link.path}
                      onClick={() => onNavigate(link.path)}
                      className={`text-[11px] xl:text-[11.5px] font-sans tracking-widest-editorial transition-colors duration-200 relative py-1 cursor-pointer font-semibold text-black hover:opacity-75 ${
                        isActive ? 'opacity-100' : 'opacity-90'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Right: Action Icons & Mobile Menu Button */}
            <div className="flex items-center space-x-3 sm:space-x-5 shrink-0 z-10">
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                className="p-1 text-black hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Search"
                title="Search (Cmd+K)"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
              </button>

              {/* Wishlist Link - visible on sm and up, accessible via drawer on mobile */}
              <button
                onClick={() => onNavigate('/wishlist')}
                className="hidden sm:inline-flex p-1 text-black hover:opacity-70 transition-opacity relative cursor-pointer"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-[#FAF7F2] text-[9px] font-sans font-medium rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Account Link - visible on sm and up, accessible via drawer on mobile */}
              <button
                onClick={() => onNavigate('/account')}
                className="hidden sm:inline-flex p-1 text-black hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Account Profile"
                title="Account"
              >
                <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="p-1 text-black hover:opacity-70 transition-opacity relative cursor-pointer"
                aria-label="Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-[#FAF7F2] text-[9px] font-sans font-medium rounded-full flex items-center justify-center">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Button */}
              <div className="flex lg:hidden items-center pl-0.5">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-1.5 text-black hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="w-5 h-5 stroke-[2]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('/');
              }}
              className="inline-flex items-center cursor-pointer"
            >
              <img
                src="/images/vera-exact-logo.png"
                alt="VERA Monogram"
                className="h-9 w-auto object-contain select-none"
              />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#1C1917] hover:text-[#78716C] transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="py-8 space-y-5">
            {navLinks.map((link, idx) => (
              <button
                key={link.path}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate(link.path);
                }}
                className="block w-full text-left font-serif text-2xl sm:text-3xl tracking-wide text-[#1C1917] hover:text-[#C5A880] transition-colors duration-200"
              >
                <span className="text-xs font-sans tracking-widest-editorial text-[#A8A29E] mr-3">
                  0{idx + 1}
                </span>
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#E8E2D8] space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('/wishlist');
                }}
                className="flex items-center justify-between w-full text-sm font-sans tracking-wider-editorial uppercase text-[#57534E] hover:text-[#1C1917]"
              >
                <span className="flex items-center gap-3">
                  <Heart className="w-4 h-4" />
                  <span>Saved Wishlist</span>
                </span>
                {wishlistCount > 0 && (
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('/account');
                }}
                className="flex items-center gap-3 text-sm font-sans tracking-wider-editorial uppercase text-[#57534E] hover:text-[#1C1917]"
              >
                <User className="w-4 h-4" />
                <span>Client Account &amp; Rituals</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('/admin');
                }}
                className="flex items-center gap-3 text-sm font-sans tracking-wider-editorial uppercase text-[#78716C] hover:text-[#1C1917]"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Laboratory Admin Dashboard</span>
              </button>
            </div>
          </div>

          {/* Editorial Campaign Card inside Mobile Menu */}
          <div className="mt-auto pt-6 border-t border-[#E8E2D8]">
            <div className="relative rounded-sm overflow-hidden bg-[#F4EFE6] p-4 flex items-center gap-4">
              <img
                src="/images/products/renewal-serum.jpg"
                alt="VERA Ritual"
                className="w-16 h-20 object-cover rounded-xs"
              />
              <div>
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
                  Current Campaign
                </span>
                <p className="font-serif text-base text-[#1C1917] mt-0.5">
                  The Cellular Revival Edit
                </p>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('/shop');
                  }}
                  className="text-xs font-sans uppercase tracking-wider-editorial text-[#1C1917] underline mt-1 block"
                >
                  Explore Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
