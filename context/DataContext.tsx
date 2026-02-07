import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ItemData, DataContextType } from '../types';
import { INITIAL_ITEMS } from '../constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 'tsd_oasis_items_v1';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemData[]>(INITIAL_ITEMS);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge stored data with initial structure to ensure all IDs exist
        const merged = INITIAL_ITEMS.map((initItem) => {
          const storedItem = parsed.find((p: ItemData) => p.id === initItem.id);
          return storedItem ? { ...initItem, ...storedItem } : initItem;
        });
        setItems(merged);
      }
    } catch (error) {
      console.error('Failed to load data from storage', error);
    }
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const updateItem = (id: string, data: Partial<ItemData>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
        setItems(INITIAL_ITEMS);
        localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <DataContext.Provider value={{ items, updateItem, resetToDefaults }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
