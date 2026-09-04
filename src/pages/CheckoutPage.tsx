import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, CheckCircle2, ArrowRight, 
  CreditCard, Sparkles, Tag, ArrowLeft, Truck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { 
    cart, subtotal, shippingFee, discountAmount, 
    total, clearCart, promoCode, applyPromoCode 
  } = useCart();
  const { user, addOrder } = useAuth();

  const [step, setStep] = useState<'details' | 'shipping' | 'payment' | 'confirmation'>('details');

  // Customer & Shipping Form
  const [formData, setFormData] = useState({
    email: user?.email || 'margaux.delacroix@vera-client.com',
    firstName: 'Margaux',
    lastName: 'Delacroix',
    address: '44 Rue de la Paix',
    city: 'Paris',
    state: 'Île-de-France',
    zip: '75002',
    country: 'France',
    shippingSpeed: 'standard' as 'standard' | 'express'
  });

  // Payment Form
  const [cardData, setCardData] = useState({
    number: '4242 •••• •••• 4082',
    expiry: '12/28',
    cvc: '891',
    nameOnCard: 'MARGAUX DELACROIX'
  });

  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutPromo, setCheckoutPromo] = useState('');

  const shippingCost = formData.shippingSpeed === 'express' ? 18 : shippingFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('shipping');
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFillTestCard = () => {
    setCardData({
      number: '4532 8921 4410 7729',
      expiry: '09/29',
      cvc: '382',
      nameOnCard: `${formData.firstName} ${formData.lastName}`.toUpperCase()
    });
  };

  const handleCompletePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate luxury payment gateway latency
    await new Promise(res => setTimeout(res, 1200));

    const newOrder: Order = {
      id: `VERA-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country
      },
      items: [...cart],
      subtotal,
      shipping: shippingCost,
      discount: discountAmount,
      total: grandTotal,
      status: 'Processing',
      paymentMethod: `Credit Card ending in ${cardData.number.slice(-4)}`
    };

    addOrder(newOrder);
    setPlacedOrder(newOrder);
    setIsProcessing(false);
    setStep('confirmation');
    clearCart();

    // Trigger subtle confetti burst
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#1C1917', '#FAF7F2']
      });
    } catch {
      // ignore
    }
  };

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="font-serif text-3xl text-[#1C1917] mb-2">No items to checkout</h1>
          <p className="text-xs font-sans text-[#78716C] mb-6">
            Your ritual bag is currently empty. Please choose your formulas before checking out.
          </p>
          <button
            onClick={() => onNavigate('/shop')}
            className="px-8 py-3 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase"
          >
            Explore The Dispensary
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="pb-8 border-b border-[#E8E2D8] mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-1">
              SECURE ENCRYPTED CHECKOUT
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#1C1917]">
              Complete Your Acquisition
            </h1>
          </div>

          {step !== 'confirmation' && (
            <div className="flex items-center gap-2 text-xs font-sans text-[#78716C]">
              <span className={step === 'details' ? 'text-[#1C1917] font-semibold' : ''}>1. Sanctuary</span>
              <span>→</span>
              <span className={step === 'shipping' ? 'text-[#1C1917] font-semibold' : ''}>2. Delivery</span>
              <span>→</span>
              <span className={step === 'payment' ? 'text-[#1C1917] font-semibold' : ''}>3. Payment</span>
            </div>
          )}
        </div>

        {/* Confirmation Screen */}
        {step === 'confirmation' && placedOrder && (
          <div className="max-w-2xl mx-auto bg-[#F4EFE6] border border-[#E8E2D8] p-8 sm:p-12 rounded-xs text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center mx-auto text-[#7D8876]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block">
              Order Confirmed &amp; Dispatched to Lab
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-light">
              Thank you, {placedOrder.customer.firstName}.
            </h2>

            <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed max-w-md mx-auto">
              Your bespoke ritual package <strong className="text-[#1C1917]">#{placedOrder.id}</strong> is being prepared in temperature-regulated containers in our dispensary.
            </p>

            <div className="p-6 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs text-left space-y-3 text-xs font-sans">
              <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#78716C]">Order Reference</span>
                <span className="font-mono text-[#1C1917] font-medium">{placedOrder.id}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#78716C]">Destination</span>
                <span className="text-[#1C1917]">{placedOrder.customer.address}, {placedOrder.customer.city}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#78716C]">Estimated Delivery</span>
                <span className="text-[#1C1917]">2 – 4 Business Days</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#78716C]">Total Charged</span>
                <span className="font-medium text-[#1C1917] text-sm">${placedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate('/account')}
                className="px-6 py-3 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors"
              >
                View Order in Sanctuary
              </button>
              <button
                onClick={() => onNavigate('/')}
                className="px-6 py-3 border border-[#D5CCC0] bg-[#FAF7F2] text-[#1C1917] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#FAF7F2]/80 transition-colors"
              >
                Return to VERA Home
              </button>
            </div>
          </div>
        )}

        {/* Multi-Step Checkout Form Columns */}
        {step !== 'confirmation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Steps Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#F4EFE6] border border-[#E8E2D8] p-6 sm:p-10 rounded-xs">
              
              {/* Step 1: Client & Shipping Details */}
              {step === 'details' && (
                <form onSubmit={handleDetailsSubmit} className="space-y-6">
                  <div className="pb-4 border-b border-[#E8E2D8]">
                    <h2 className="font-serif text-2xl text-[#1C1917]">1. Client Sanctuary Details</h2>
                    <p className="text-xs font-sans text-[#78716C] mt-0.5">Where shall your ritual be delivered?</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                      Email for Shipment Updates
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={e => setFormData({ ...formData, zip: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-6"
                  >
                    <span>Continue to Delivery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Step 2: Delivery Speed */}
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="pb-4 border-b border-[#E8E2D8] flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl text-[#1C1917]">2. Dispatch Method</h2>
                      <p className="text-xs font-sans text-[#78716C] mt-0.5">Dispatched from Zurich or Paris lab centers</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="text-xs font-sans uppercase text-[#78716C] underline"
                    >
                      Edit Address
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label
                      className={`p-4 rounded-xs border flex items-center justify-between cursor-pointer transition-colors ${
                        formData.shippingSpeed === 'standard'
                          ? 'bg-[#FAF7F2] border-[#1C1917]'
                          : 'bg-[#FAF7F2]/60 border-[#E8E2D8]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={formData.shippingSpeed === 'standard'}
                          onChange={() => setFormData({ ...formData, shippingSpeed: 'standard' })}
                          className="text-[#1C1917]"
                        />
                        <div>
                          <span className="font-serif text-base text-[#1C1917] block font-medium">
                            Standard Climate-Neutral Delivery
                          </span>
                          <span className="text-[11px] font-sans text-[#78716C]">
                            Delivered in 3 – 5 business days via DHL GoGreen
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-sans font-medium text-[#1C1917]">
                        {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                      </span>
                    </label>

                    <label
                      className={`p-4 rounded-xs border flex items-center justify-between cursor-pointer transition-colors ${
                        formData.shippingSpeed === 'express'
                          ? 'bg-[#FAF7F2] border-[#1C1917]'
                          : 'bg-[#FAF7F2]/60 border-[#E8E2D8]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={formData.shippingSpeed === 'express'}
                          onChange={() => setFormData({ ...formData, shippingSpeed: 'express' })}
                          className="text-[#1C1917]"
                        />
                        <div>
                          <span className="font-serif text-base text-[#1C1917] block font-medium">
                            Priority Temperature-Controlled Express
                          </span>
                          <span className="text-[11px] font-sans text-[#78716C]">
                            Guaranteed next-business-day delivery with cold pack
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-sans font-medium text-[#1C1917]">$18.00</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="px-6 py-3.5 border border-[#D5CCC0] text-xs font-sans uppercase tracking-wider-editorial text-[#57534E]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Payment */}
              {step === 'payment' && (
                <form onSubmit={handleCompletePayment} className="space-y-6">
                  <div className="pb-4 border-b border-[#E8E2D8] flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl text-[#1C1917]">3. Payment Method</h2>
                      <p className="text-xs font-sans text-[#78716C] mt-0.5">Encrypted 256-Bit SSL tokenization</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleFillTestCard}
                      className="text-[11px] font-sans uppercase tracking-wider-editorial text-[#C5A880] underline hover:text-[#1C1917]"
                    >
                      Autofill Test Card
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardData.nameOnCard}
                      onChange={e => setCardData({ ...cardData, nameOnCard: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={cardData.number}
                        onChange={e => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardData.expiry}
                        onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-mono bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#57534E] uppercase tracking-wider-editorial mb-1">
                        Security Code (CVC)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardData.cvc}
                        onChange={e => setCardData({ ...cardData, cvc: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-mono bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs flex items-center gap-2 text-[11px] font-sans text-[#78716C]">
                    <Lock className="w-3.5 h-3.5 text-[#7D8876]" />
                    <span>Your transaction is guarded by bank-grade TLS 1.3 protocol.</span>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="px-6 py-3.5 border border-[#D5CCC0] text-xs font-sans uppercase tracking-wider-editorial text-[#57534E]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      {isProcessing ? (
                        <span>Processing Ritual Acquisition...</span>
                      ) : (
                        <span>Authorize Payment — ${grandTotal.toFixed(2)}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* Right Order Summary Column (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#E8E2D8] p-6 sm:p-8 rounded-xs space-y-6">
              <h3 className="font-serif text-xl text-[#1C1917] pb-3 border-b border-[#E8E2D8]">
                Summary ({cart.length} {cart.length === 1 ? 'Formula' : 'Formulas'})
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover rounded-xs border border-[#E8E2D8] bg-[#F4EFE6]"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-sm text-[#1C1917] font-medium leading-tight">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] font-sans text-[#78716C]">
                        Qty: {item.quantity} • {item.product.size}
                      </span>
                    </div>
                    <span className="font-sans text-xs font-medium text-[#1C1917]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-[#E8E2D8] space-y-2 text-xs font-sans text-[#57534E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1C1917]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#7D8876]">
                    <span>Ritual Promo ({promoCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Dispatch &amp; Carbon Offset</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1C1917] pt-3 border-t border-[#E8E2D8]">
                  <span className="font-serif text-lg">Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
