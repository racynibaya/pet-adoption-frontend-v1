import { useState, useEffect, type ReactNode } from 'react';
import { useQueries } from '@tanstack/react-query';
import { FavoritesContext } from './useFavorites';
import { apiGetPet, ApiError } from '@/services/api';
import { apiPetToPetCard } from '@/data/adapters';
import type { PetCard } from '@/data/pets';
import { queryKeys } from '@/queries/keys';

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

  // One cached query per saved id. Toggling a pet only adds/removes its own
  // query — the rest stay cached, so we never re-fetch the whole set.
  const petQueries = useQueries({
    queries: saved.map((id) => ({
      queryKey: queryKeys.pets.detail(Number(id)),
      queryFn: () =>
        apiGetPet(Number(id)).then((res) => apiPetToPetCard(res.data)),
    })),
  });

  const savedPets = petQueries
    .map((q) => q.data)
    .filter((p): p is PetCard => Boolean(p));

  // Drop saved ids the backend no longer has (404), mirroring the old cleanup.
  useEffect(() => {
    const missing = saved.filter((_id, i) => {
      const err = petQueries[i]?.error;
      return err instanceof ApiError && err.status === 404;
    });
    if (missing.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- prune ids the backend 404'd; self-resolves once removed
      setSaved((prev) => prev.filter((id) => !missing.includes(id)));
    }
    // petQueries is a fresh array each render; we only act when a 404 appears,
    // which self-resolves once the id is removed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petQueries]);

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
    <FavoritesContext.Provider value={{ saved, savedPets, toggle, isSaved, drawerOpen, openDrawer, closeDrawer }}>
      {children}
    </FavoritesContext.Provider>
  );
}
