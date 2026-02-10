import React, { useState, useEffect, useRef } from 'react';
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
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Apply subtle parallax only on larger screens to preserve mobile layout integrity
      if (gridRef.current && window.innerWidth >= 768) {
        const scrolled = window.scrollY;
        // Moves the grid slightly upwards relative to its natural position as you scroll down.
        // This creates a sensation of depth, moving at a different pace than the background video.
        // Factor 0.08 is subtle enough to not break layout but noticeable for the feel.
        gridRef.current.style.transform = `translate3d(0, -${scrolled * 0.08}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <section
        ref={gridRef}
        className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl -mt-8 md:-mt-12 will-change-transform"
      >
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

      <footer className="mt-32 border-t border-oasis-blue/10 py-16 text-center text-oasis-blue/60 relative overflow-hidden z-10 bg-oasis-sand">
        <div className="absolute inset-0 bg-oasis-gold/5 skew-y-3 transform origin-bottom-right pointer-events-none" />
        <div className="relative z-10">
          <h3 className="font-serif text-xl italic mb-4 text-oasis-blue">TSD SALD 2026</h3>
          <p className="text-xs md:text-sm font-light tracking-[0.2em] uppercase opacity-70">&copy; The Collective Oasis | TSD SALD 2026</p>
        </div>
      </footer>
    </main>
  );
};