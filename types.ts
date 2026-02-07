export interface SubItem {
  id: string;
  name: string;
  image: string;
}

export interface ItemData {
  id: string;
  name: string;
  description: string;
  image: string; // URL or Base64
  subItems?: SubItem[];
}

export interface DataContextType {
  items: ItemData[];
  updateItem: (id: string, data: Partial<ItemData>) => void;
  resetToDefaults: () => void;
}