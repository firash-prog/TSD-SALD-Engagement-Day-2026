import React from 'react';
import { ItemData } from '../types';
import { Leaf, Maximize2 } from 'lucide-react';

interface ItemCardProps {
  item: ItemData;
  onClick?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group h-full flex flex-col relative bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out border border-white/40 will-change-transform cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        {/* Darkens image slightly, fades out on hover */}
        <div className="absolute inset-0 bg-oasis-blue/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
        
        {/* Image scales up smoothly on hover */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        <div className="absolute top-4 right-4 z-20 bg-oasis-sand/90 backdrop-blur text-oasis-blue p-2 rounded-full shadow-sm">
           <Leaf size={16} />
        </div>

        {/* Expand Indicator on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Maximize2 size={24} strokeWidth={1.5} />
            </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-bold text-oasis-blue mb-3 tracking-wide group-hover:text-oasis-gold transition-colors duration-300">
          {item.name}
        </h3>
        <p className="text-oasis-blueLight text-sm md:text-base leading-relaxed opacity-90 flex-grow whitespace-pre-line">
          {item.description}
        </p>
      </div>
      
      {/* Decorative gradient line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-oasis-sand via-oasis-gold to-oasis-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};