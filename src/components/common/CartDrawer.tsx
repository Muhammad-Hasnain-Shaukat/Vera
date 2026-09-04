import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { initialProducts } from '../../data/products';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    remainingForFreeShipping,
    promoCode,
    discountAmount,
    shippingFee,
    total,
    applyPromoCode,
    removePromoCode,
    addToCart
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success?: boolean; message?: string }>({});

  if (!isCartOpen) return null;

  // Recommended pairing product not already in cart
  const recommendedProduct = initialProducts.find(
    p => !cart.some(item => item.product.id === p.id)
  ) || initialProducts[0];

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1C1917]/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-[#E8E2D8]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D8] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-light tracking-wide text-[#1C1917]">
                Your Ritual Bag
              </h2>
              <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#78716C]">
                {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Selected
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#57534E] hover:text-[#1C1917] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Bar */}
          <div className="px-6 py-3.5 bg-[#F4EFE6] border-b border-[#E8E2D8]">
            <div className="flex items-center justify-between text-xs font-sans mb-1.5">
              <span className="text-[#57534E]">
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#1C1917] font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    Complimentary carbon-neutral delivery unlocked!
                  </span>
                ) : (
                  <span>
                    You are <strong className="text-[#1C1917] font-medium">${remainingForFreeShipping.toFixed(0)}</strong> away from complimentary delivery.
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono text-[#78716C]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1 bg-[#E8E2D8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1C1917] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE6] border border-[#E8E2D8] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-[#A8A29E]" />
                </div>
                <h3 className="font-serif text-xl text-[#1C1917] mb-1">Your ritual bag is empty</h3>
                <p className="text-xs font-sans text-[#78716C] max-w-xs mx-auto mb-6">
                  Discover intelligently formulated skincare designed to bring balance and vitality to your skin.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    onNavigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans uppercase tracking-widest-editorial hover:bg-[#38332E] transition-colors"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.product.id} className="flex gap-4 pb-6 border-b border-[#E8E2D8]/80">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xs border border-[#E8E2D8] bg-[#F4EFE6] flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base text-[#1C1917] font-medium leading-tight">
                          {item.product.name}
                        </h4>
                        <span className="font-sans text-sm text-[#1C1917] font-medium ml-2">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                      <p className="text-[11px] font-sans text-[#78716C] mt-0.5">
                        {item.product.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E8E2D8] rounded-xs bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-[#57534E] hover:text-[#1C1917] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono text-[#1C1917]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-[#57534E] hover:text-[#1C1917] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[11px] font-sans tracking-wider-editorial uppercase text-[#A8A29E] hover:text-[#1C1917] transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Quick Add Pairing Recommendation (Only if cart not empty) */}
            {cart.length > 0 && recommendedProduct && (
              <div className="mt-6 pt-4 border-t border-[#E8E2D8] bg-[#F4EFE6]/60 p-4 rounded-xs">
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block mb-2">
                  Harmonious Pairing Recommendation
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={recommendedProduct.images[0]}
                    alt={recommendedProduct.name}
                    className="w-12 h-14 object-cover rounded-xs border border-[#E8E2D8]"
                  />
                  <div className="flex-1">
                    <p className="font-serif text-sm text-[#1C1917] font-medium leading-tight">
                      {recommendedProduct.name}
                    </p>
                    <span className="text-xs font-sans text-[#78716C]">
                      ${recommendedProduct.price}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(recommendedProduct, 1)}
                    className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#1C1917] hover:text-[#FAF7F2] text-[#1C1917] border border-[#D5CCC0] text-[10px] font-sans tracking-wider-editorial uppercase transition-all duration-200"
                  >
                    + Add
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D8] bg-[#FAF7F2] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    placeholder="Ritual code (e.g. VERA15)"
                    className="w-full pl-9 pr-3 py-2 text-xs font-sans border border-[#E8E2D8] rounded-xs bg-[#F4EFE6] text-[#1C1917] uppercase placeholder:normal-case placeholder:text-[#A8A29E] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-wider-editorial uppercase hover:bg-[#38332E] transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoFeedback.message && (
                <p className={`text-[11px] font-sans ${promoFeedback.success ? 'text-[#7D8876]' : 'text-[#A25050]'}`}>
                  {promoFeedback.message}
                </p>
              )}

              {promoCode && (
                <div className="flex items-center justify-between text-xs text-[#7D8876] bg-[#7D8876]/10 px-3 py-1.5 rounded-xs">
                  <span>Code '{promoCode}' active</span>
                  <button onClick={removePromoCode} className="text-[#1C1917] underline text-[10px]">
                    Remove
                  </button>
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs font-sans text-[#57534E] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1C1917] font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#7D8876]">
                    <span>Intention Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Climate-Neutral Delivery</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#1C1917] pt-2 border-t border-[#E8E2D8]">
                  <span className="font-serif text-base">Estimated Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  closeCart();
                  onNavigate('/checkout');
                }}
                className="w-full py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-sans text-[#78716C]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7D8876]" />
                <span>Secure 256-Bit Encrypted Checkout &amp; 30-Day Ritual Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
