import React, { useState } from 'react';
import { 
  User, Package, Heart, Sparkles, LogOut, 
  CheckCircle2, Clock, Truck, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

interface AccountPageProps {
  onNavigate: (path: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const { 
    user, isAuthenticated, login, loginWithGoogle, 
    signup, logout, orders, savedQuizResult, savedCustomRoutine 
  } = useAuth();
  const { wishlistCount } = useWishlist();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'ritual'>('orders');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (authMode === 'login') {
      await login(email, name || 'Margaux Delacroix');
    } else {
      await signup(name, email);
    }
    setIsLoading(false);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    await loginWithGoogle();
    setIsLoading(false);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-16 sm:py-24 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-[#F4EFE6] border border-[#E8E2D8] p-8 sm:p-10 rounded-xs shadow-sm">
            
            <div className="text-center mb-8">
              <span className="font-serif text-3xl tracking-[0.25em] font-light text-[#1C1917] block">
                VERA
              </span>
              <p className="font-editorial italic text-lg text-[#C5A880] mt-1">
                Client Sanctuary
              </p>
              <p className="text-xs font-sans text-[#78716C] mt-2">
                Access your personalized skin diagnosis, saved circadian rituals, and order history.
              </p>
            </div>

            {/* Auth Mode Toggle */}
            <div className="flex border-b border-[#E8E2D8] mb-6">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 pb-3 text-xs font-sans tracking-widest-editorial uppercase transition-colors cursor-pointer ${
                  authMode === 'login'
                    ? 'border-b-2 border-[#1C1917] text-[#1C1917] font-medium'
                    : 'text-[#78716C]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 pb-3 text-xs font-sans tracking-widest-editorial uppercase transition-colors cursor-pointer ${
                  authMode === 'signup'
                    ? 'border-b-2 border-[#1C1917] text-[#1C1917] font-medium'
                    : 'text-[#78716C]'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider-editorial text-[#57534E] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider-editorial text-[#57534E] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="client@vera-sanctuary.com"
                  className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider-editorial text-[#57534E] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs focus:outline-hidden focus:border-[#1C1917]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors cursor-pointer shadow-sm"
              >
                {isLoading ? 'Verifying Credentials...' : authMode === 'login' ? 'Enter Sanctuary' : 'Create Account'}
              </button>

              <div className="relative py-2 flex items-center justify-center">
                <span className="w-full h-[1px] bg-[#E8E2D8] absolute" />
                <span className="relative bg-[#F4EFE6] px-3 text-[10px] font-sans tracking-widest-editorial uppercase text-[#A8A29E]">
                  Or
                </span>
              </div>

              {/* Google Auth Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-2.5 border border-[#D5CCC0] bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 text-xs font-sans tracking-wider-editorial uppercase text-[#1C1917] flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sanctuary Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-8 border-b border-[#E8E2D8] mb-10">
          <div>
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-1">
              CLIENT SANCTUARY
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1917]">
              Welcome, {user.name}
            </h1>
            <p className="text-xs font-sans text-[#78716C] mt-1">{user.email}</p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <button
              onClick={() => onNavigate('/wishlist')}
              className="px-4 py-2 border border-[#E8E2D8] bg-[#F4EFE6] text-xs font-sans tracking-wider-editorial uppercase text-[#1C1917] hover:border-[#1C1917] transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Wishlist ({wishlistCount})</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 border border-[#E8E2D8] bg-[#FAF7F2] text-xs font-sans tracking-wider-editorial uppercase text-[#78716C] hover:text-[#1C1917] transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E2D8] mb-8 space-x-5 sm:space-x-8 text-[11px] sm:text-xs font-sans tracking-wider sm:tracking-widest-editorial uppercase overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'orders' ? 'border-b-2 border-[#1C1917] text-[#1C1917] font-medium' : 'text-[#78716C]'
            }`}
          >
            Order Acquisitions ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('ritual')}
            className={`pb-3 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'ritual' ? 'border-b-2 border-[#1C1917] text-[#1C1917] font-medium' : 'text-[#78716C]'
            }`}
          >
            Personal Prescribed Ritual
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'profile' ? 'border-b-2 border-[#1C1917] text-[#1C1917] font-medium' : 'text-[#78716C]'
            }`}
          >
            Skin Profile
          </button>
        </div>

        {/* Orders Tab Content */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs">
                <Package className="w-8 h-8 text-[#A8A29E] mx-auto mb-2" />
                <h3 className="font-serif text-xl text-[#1C1917]">No order acquisitions yet</h3>
                <p className="text-xs font-sans text-[#78716C] mt-1 mb-4">
                  When you acquire VERA formulas, their laboratory tracking will appear here.
                </p>
                <button
                  onClick={() => onNavigate('/shop')}
                  className="px-6 py-2.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase"
                >
                  Explore Dispensary
                </button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E2D8] gap-2">
                    <div>
                      <span className="font-mono text-sm font-medium text-[#1C1917] block">
                        Order #{order.id}
                      </span>
                      <span className="text-xs font-sans text-[#78716C]">
                        Placed on {order.date}  •  Paid via {order.paymentMethod}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#FAF7F2] border border-[#E8E2D8] rounded-full text-xs font-sans text-[#1C1917] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7D8876]" />
                        <span>Status: {order.status}</span>
                      </span>
                      <span className="font-sans font-medium text-sm text-[#1C1917] ml-2">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-sans text-[#57534E]">
                    <span>Shipping Destination: {order.customer.address}, {order.customer.city}</span>
                    <span className="text-[#1C1917] underline cursor-pointer">
                      Track Packaging Dispatch
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Personal Prescribed Ritual Tab */}
        {activeTab === 'ritual' && (
          <div className="space-y-8">
            {savedQuizResult ? (
              <div className="bg-[#F4EFE6] border border-[#E8E2D8] p-8 rounded-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                  <div>
                    <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#C5A880] block">
                      Diagnostic Prescription
                    </span>
                    <h3 className="font-serif text-2xl text-[#1C1917]">
                      Your {savedQuizResult.answer.skinType} Skin Ritual
                    </h3>
                    <p className="text-xs font-sans text-[#78716C] mt-0.5">
                      Targeting: {savedQuizResult.answer.primaryConcern}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('/quiz')}
                    className="text-xs font-sans uppercase tracking-wider-editorial text-[#1C1917] underline"
                  >
                    Retake Skin Quiz
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {savedQuizResult.routine.map(p => (
                    <div
                      key={p.id}
                      onClick={() => onNavigate(`/product/${p.slug}`)}
                      className="p-4 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs cursor-pointer hover:border-[#1C1917] transition-colors"
                    >
                      <img src={p.images[0]} alt={p.name} className="aspect-square object-cover rounded-xs mb-2" />
                      <h4 className="font-serif text-base text-[#1C1917] font-medium">{p.name}</h4>
                      <span className="text-xs font-sans text-[#78716C]">${p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs">
                <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto mb-2" />
                <h3 className="font-serif text-2xl text-[#1C1917] mb-2">
                  No diagnostic ritual completed yet
                </h3>
                <p className="text-xs font-sans text-[#78716C] max-w-sm mx-auto mb-6">
                  Complete the 5-question skin diagnosis to formulate your personalized circadian routine.
                </p>
                <button
                  onClick={() => onNavigate('/quiz')}
                  className="px-6 py-2.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase"
                >
                  Take Skin Diagnostic Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* Profile Details Tab */}
        {activeTab === 'profile' && (
          <div className="bg-[#F4EFE6] border border-[#E8E2D8] p-8 rounded-xs max-w-2xl space-y-6">
            <h3 className="font-serif text-2xl text-[#1C1917] pb-3 border-b border-[#E8E2D8]">
              Sanctuary Profile &amp; Preferences
            </h3>
            
            <div className="space-y-4 text-xs font-sans">
              <div>
                <span className="text-[#78716C] block uppercase tracking-wider-editorial text-[10px]">Client Name</span>
                <span className="font-serif text-lg text-[#1C1917]">{user.name}</span>
              </div>
              <div>
                <span className="text-[#78716C] block uppercase tracking-wider-editorial text-[10px]">Email Address</span>
                <span className="font-mono text-sm text-[#1C1917]">{user.email}</span>
              </div>
              <div>
                <span className="text-[#78716C] block uppercase tracking-wider-editorial text-[10px]">Diagnosed Skin Constitution</span>
                <span className="text-[#1C1917]">{user.skinType || 'Combination'}</span>
              </div>
              <div>
                <span className="text-[#78716C] block uppercase tracking-wider-editorial text-[10px]">Environmental Defense Priority</span>
                <span className="text-[#1C1917]">Dullness &amp; Barrier Maintenance</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
