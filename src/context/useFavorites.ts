import { createContext, useContext } from 'react';

export interface FavoritesContextType {
  saved: string[];
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  saved: [],
  toggle: () => {},
  isSaved: () => false,
  drawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);
