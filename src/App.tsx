import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchOverlay } from './components/common/SearchOverlay';
import { LoadingScreen } from './components/common/LoadingScreen';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { QuizPage } from './pages/QuizPage';
import { RoutineBuilderPage } from './pages/RoutineBuilderPage';
import { JournalPage } from './pages/JournalPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync route changes with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentPath === '/' || currentPath === '';

  // Router matching logic
  const renderRoute = () => {
    // Exact routes
    if (isHome) {
      return <HomePage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }
    if (currentPath === '/shop') {
      return <ShopPage key="shop-all" onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/shop/')) {
      const category = currentPath.replace('/shop/', '');
      return <ShopPage key={`shop-${category}`} onNavigate={navigate} initialCategory={category as any} />;
    }
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '');
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }
    if (currentPath === '/quiz') {
      return <QuizPage onNavigate={navigate} />;
    }
    if (currentPath === '/routine') {
      return <RoutineBuilderPage onNavigate={navigate} />;
    }
    if (currentPath === '/journal') {
      return <JournalPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '');
      return <ArticleDetailPage slug={slug} onNavigate={navigate} />;
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/wishlist') {
      return <WishlistPage onNavigate={navigate} />;
    }
    if (currentPath === '/checkout') {
      return <CheckoutPage onNavigate={navigate} />;
    }
    if (currentPath === '/account') {
      return <AccountPage onNavigate={navigate} />;
    }
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          {/* Subtle Custom Desktop Cursor */}
          <CustomCursor />

          {/* Initial Editorial Loading Reveal */}
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

          {/* Intelligent Search Overlay */}
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onNavigate={navigate}
          />

          {/* Slide-out Cart Drawer */}
          <CartDrawer onNavigate={navigate} />

          <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] text-[#1C1917] selection:bg-[#E8E0D5] selection:text-[#1C1917]">
            {/* Standard Top Navigation (Consistent throughout all pages) */}
            <Navbar
              currentPath={currentPath}
              onNavigate={navigate}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* Dynamic Page Content */}
            <main className="flex-1 w-full">{renderRoute()}</main>

            {/* Editorial Footer (Shown on inner pages) */}
            {!isHome && <Footer onNavigate={navigate} />}
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
};

export default App;
