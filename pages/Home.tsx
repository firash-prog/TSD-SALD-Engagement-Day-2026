import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ItemCard } from '../components/ItemCard';
import { Hero } from '../components/Hero';
import { ItemModal } from '../components/ItemModal';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ItemData } from '../types';

export const Home: React.FC = () => {
  const { items } = useData();
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);

  return (
    <main className="min-h-screen bg-oasis-sand pb-20 overflow-x-hidden selection:bg-oasis-gold selection:text-white">
      <nav className="absolute top-0 right-0 p-6 z-50">
        <Link 
            to="/admin" 
            className="group flex items-center gap-2 text-oasis-blue/40 hover:text-oasis-blue transition-all duration-300 text-xs font-semibold uppercase tracking-wider bg-white/30 hover:bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md"
        >
            <Lock size={14} className="group-hover:scale-110 transition-transform" />
            <span>Admin Access</span>
        </Link>
      </nav>

      <Hero />

      <section className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl -mt-8 md:-mt-12">
        {/* Soft gradient backdrop for the grid to pop against the sand background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[140%] h-[120%] bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-[50%]" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ItemCard 
                item={item} 
                onClick={() => setSelectedItem(item)}
              />
            </div>
          ))}
        </div>
      </section>
      
      {/* Expanded Modal */}
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      <footer className="mt-32 border-t border-oasis-blue/10 py-16 text-center text-oasis-blue/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-oasis-gold/5 skew-y-3 transform origin-bottom-right pointer-events-none" />
        <div className="relative z-10">
            <h3 className="font-serif text-xl italic mb-4 text-oasis-blue">TSD SALD 2026</h3>
            <p className="text-xs md:text-sm font-light tracking-[0.2em] uppercase opacity-70">&copy; The Collective Oasis Proposal</p>
        </div>
      </footer>
    </main>
  );
};