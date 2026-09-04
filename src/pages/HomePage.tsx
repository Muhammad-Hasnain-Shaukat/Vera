import React from 'react';
import { Hero } from '../components/home/Hero';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Hero onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
    </div>
  );
};
