import React, { useEffect } from 'react';
import { ItemData } from '../types';
import { X, Leaf } from 'lucide-react';

interface ItemModalProps {
  item: ItemData | null;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  // Handle Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (item) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-oasis-blue/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-oasis-sandLight w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white backdrop-blur rounded-full text-oasis-blue transition-colors shadow-sm"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-oasis-blue/5">
           <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
           />
           {/* Mobile gradient overlay for text readability if needed */}
           <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent md:hidden pointer-events-none" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white/60 relative flex flex-col">
          <div className="flex items-center gap-2 text-oasis-gold mb-4 uppercase tracking-widest text-xs font-bold">
            <Leaf size={14} />
            <span>Event Detail</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-oasis-blue mb-6 leading-tight">
            {item.name}
          </h2>
          
          <div className="h-1 w-20 bg-oasis-gold mb-8 rounded-full" />
          
          <div className="prose prose-lg text-oasis-blueLight text-lg leading-relaxed whitespace-pre-line mb-8">
            {item.description}
          </div>

          {/* Sub Items Grid (e.g. for Games Area) */}
          {item.subItems && item.subItems.length > 0 && (
            <div className="mt-4 mb-8">
                <h3 className="font-serif text-xl text-oasis-blue mb-4 border-b border-oasis-gold/30 pb-2 inline-block">Activities</h3>
                <div className="grid grid-cols-2 gap-4">
                    {item.subItems.map((sub) => (
                        <div key={sub.id} className="group">
                            <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-sm relative">
                                <img src={sub.image} alt={sub.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                            <p className="text-sm font-bold text-oasis-blue text-center">{sub.name}</p>
                        </div>
                    ))}
                </div>
            </div>
          )}

          <div className="mt-auto pt-12 flex justify-between items-center text-sm text-oasis-blue/50">
             <span className="font-serif italic">The Collective Oasis</span>
             <span className="tracking-widest uppercase text-xs">TSD SALD 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};