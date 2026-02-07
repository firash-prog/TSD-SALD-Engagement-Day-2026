import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ItemData, SubItem } from '../types';
import { Link } from 'react-router-dom';
import { Save, Upload, ArrowLeft, Unlock, RefreshCcw, Image as ImageIcon } from 'lucide-react';

export const Admin: React.FC = () => {
  const { items, updateItem, resetToDefaults } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2255') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/60">
          <div className="flex justify-center mb-6 text-oasis-blue">
            <Unlock size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-center text-oasis-blue mb-2">Admin Access</h2>
          <p className="text-center text-oasis-blueLight mb-8 text-sm">Please enter the security pin to manage the proposal.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter PIN (2255)"
                className="w-full p-4 rounded-xl bg-white border border-oasis-blue/10 focus:border-oasis-gold focus:ring-2 focus:ring-oasis-gold/20 outline-none transition-all text-center text-2xl tracking-widest text-oasis-blue placeholder:text-sm placeholder:tracking-normal"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-oasis-blue text-oasis-sand py-4 rounded-xl font-bold hover:bg-oasis-blueLight transition-colors shadow-lg"
            >
              Unlock Dashboard
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-oasis-blue/50 hover:text-oasis-blue underline decoration-1 underline-offset-4">
              Return to Public View
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oasis-sandLight">
      <header className="bg-oasis-blue text-oasis-sand py-6 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-serif font-bold tracking-wide">Admin Dashboard</h1>
          </div>
          <button 
            onClick={resetToDefaults}
            className="flex items-center gap-2 text-xs opacity-60 hover:opacity-100 transition-opacity"
            title="Reset all content to original defaults"
          >
            <RefreshCcw size={14} />
            Reset Data
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-5xl py-12 space-y-8">
        {items.map((item) => (
          <AdminItemRow key={item.id} item={item} updateItem={updateItem} />
        ))}
      </main>
    </div>
  );
};

interface AdminItemRowProps {
  item: ItemData;
  updateItem: (id: string, data: Partial<ItemData>) => void;
}

// Sub-component for individual item editing
const AdminItemRow: React.FC<AdminItemRowProps> = ({ 
  item, 
  updateItem 
}) => {
  const [desc, setDesc] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [subItems, setSubItems] = useState<SubItem[]>(item.subItems || []);
  const [isDirty, setIsDirty] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Sync state if external item data changes (e.g. Reset)
  useEffect(() => {
    setDesc(item.description);
    setImage(item.image);
    setSubItems(item.subItems || []);
    setIsDirty(false);
    setStatus('idle');
  }, [item]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
          alert("File is too large. Please select an image under 2MB.");
          return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsDirty(true);
        setStatus('idle');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubItemImageUpload = (subId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
          alert("File is too large. Please select an image under 2MB.");
          return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSubItems(prev => prev.map(sub => 
            sub.id === subId ? { ...sub, image: reader.result as string } : sub
        ));
        setIsDirty(true);
        setStatus('idle');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setStatus('saving');
    // Simulate network delay for UX
    setTimeout(() => {
      updateItem(item.id, { description: desc, image, subItems });
      setIsDirty(false);
      setStatus('saved');
      
      // Reset saved status after a moment
      setTimeout(() => setStatus('idle'), 2000);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-oasis-blue/5 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Image Section */}
        <div className="w-full md:w-1/3 space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-inner group">
            <img src={image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-oasis-blue/20 rounded-xl cursor-pointer hover:bg-oasis-blue/5 hover:border-oasis-blue/40 transition-colors text-oasis-blue font-medium text-sm">
            <Upload size={16} />
            <span>Change Cover Photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
        </div>

        {/* Main Text Section */}
        <div className="w-full md:w-2/3 flex flex-col">
            <h3 className="text-2xl font-serif font-bold text-oasis-blue mb-4">{item.name}</h3>
            
            <div className="flex-grow space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-oasis-blue/40">Description</label>
                <textarea
                value={desc}
                onChange={(e) => {
                    setDesc(e.target.value);
                    setIsDirty(true);
                    setStatus('idle');
                }}
                className="w-full h-32 p-4 rounded-xl bg-oasis-sand/20 border border-transparent focus:bg-white focus:border-oasis-gold focus:ring-2 focus:ring-oasis-gold/20 outline-none transition-all text-oasis-blueLight resize-none"
                />
            </div>
        </div>
      </div>

      {/* Sub Items Editor Section */}
      {subItems.length > 0 && (
          <div className="border-t border-oasis-blue/5 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-oasis-blue/60 mb-4 flex items-center gap-2">
                  <ImageIcon size={14} />
                  Manage Activity Photos
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {subItems.map((sub) => (
                      <div key={sub.id} className="space-y-2">
                          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-sm group">
                              <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                              {/* Hover overlay for upload hint */}
                              <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                  <Upload size={20} className="text-white mb-1" />
                                  <span className="text-white text-xs font-bold">Edit</span>
                                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSubItemImageUpload(sub.id, e)} />
                              </label>
                          </div>
                          <p className="text-xs font-bold text-center text-oasis-blue truncate" title={sub.name}>{sub.name}</p>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* Footer Action Bar */}
      <div className="flex justify-end items-center gap-4 pt-2">
           {status === 'saved' && (
               <span className="text-green-600 text-sm font-semibold animate-pulse">Changes Saved!</span>
           )}
           <button
            onClick={handleSave}
            disabled={!isDirty && status !== 'saving'}
            className={`
                flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-md
                ${isDirty 
                    ? 'bg-oasis-blue text-white hover:bg-oasis-blueLight hover:shadow-lg transform hover:-translate-y-0.5' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
            `}
           >
            <Save size={18} />
            {status === 'saving' ? 'Saving...' : 'Save Changes'}
           </button>
        </div>
    </div>
  );
};