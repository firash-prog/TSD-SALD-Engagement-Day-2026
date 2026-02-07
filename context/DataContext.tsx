import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ItemData, DataContextType } from '../types';
import { INITIAL_ITEMS } from '../constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

// Database Configuration
const DB_NAME = 'TSDOasisDB';
const DB_VERSION = 1;
const STORE_NAME = 'items';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemData[]>(INITIAL_ITEMS);

  // Initialize and Load DB on Mount
  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Database error:", (event.target as any).error);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      loadItems(db);
    };
  }, []);

  const loadItems = (db: IDBDatabase) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const storedItems = (event.target as IDBRequest).result as ItemData[];
      
      if (storedItems && storedItems.length > 0) {
        // Merge stored data with initial structure
        // This ensures we keep user edits (like new images) while maintaining the app's structure
        const merged = INITIAL_ITEMS.map((initItem) => {
          const storedItem = storedItems.find((p) => p.id === initItem.id);
          // If stored item exists, use its data (images/desc), otherwise use default
          return storedItem ? { ...initItem, ...storedItem } : initItem;
        });
        setItems(merged);
      } else {
        // First time load: populate DB with defaults
        const initTx = db.transaction([STORE_NAME], "readwrite");
        const initStore = initTx.objectStore(STORE_NAME);
        INITIAL_ITEMS.forEach(item => initStore.add(item));
        setItems(INITIAL_ITEMS);
      }
    };
  };

  const saveItemToDB = (item: ItemData) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = (event) => {
       const db = (event.target as IDBOpenDBRequest).result;
       const transaction = db.transaction([STORE_NAME], "readwrite");
       const objectStore = transaction.objectStore(STORE_NAME);
       objectStore.put(item);
    };
  };

  const updateItem = (id: string, data: Partial<ItemData>) => {
    setItems((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...data };
          // Persist to IndexedDB
          saveItemToDB(updated);
          return updated;
        }
        return item;
      })
    );
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const tx = db.transaction([STORE_NAME], "readwrite");
            const store = tx.objectStore(STORE_NAME);
            
            // Clear all data
            store.clear();
            
            // Reload defaults immediately
            INITIAL_ITEMS.forEach(item => store.add(item));
            setItems(INITIAL_ITEMS);
        };
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