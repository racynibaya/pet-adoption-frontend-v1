import { createContext, useContext } from 'react';
import type { PetCard } from '@/data/pets';

export interface FavoritesContextType {
  saved: string[];
  savedPets: PetCard[];
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  saved: [],
  savedPets: [],
  toggle: () => {},
  isSaved: () => false,
  drawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);
