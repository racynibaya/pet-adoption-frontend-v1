import { useState, useEffect, type ReactNode } from 'react';
import { FavoritesContext } from './useFavorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('koda-saved') ?? '[]');
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('koda-saved', JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    if (drawerOpen) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${sw}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [drawerOpen]);

  const toggle = (id: string) =>
    setSaved(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  const isSaved = (id: string) => saved.includes(id);
  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <FavoritesContext.Provider value={{ saved, toggle, isSaved, drawerOpen, openDrawer, closeDrawer }}>
      {children}
    </FavoritesContext.Provider>
  );
}
