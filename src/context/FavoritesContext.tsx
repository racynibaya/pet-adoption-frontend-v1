import { useState, useEffect, type ReactNode } from 'react';
import { FavoritesContext } from './useFavorites';
import { apiGetPet, ApiError } from '@/services/api';
import { apiPetToPetCard } from '@/data/adapters';
import type { PetCard } from '@/data/pets';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('koda-saved') ?? '[]');
    } catch {
      return [];
    }
  });
  const [savedPets, setSavedPets] = useState<PetCard[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('koda-saved', JSON.stringify(saved));
  }, [saved]);

  // Reconcile savedPets with saved: drop pets that are no longer saved, fetch
  // only the IDs that haven't been loaded yet. Toggling one pet must not
  // re-fetch all saved pets.
  useEffect(() => {
    if (saved.length === 0) {
      setSavedPets([]);
      return;
    }

    const savedSet = new Set(saved);
    setSavedPets((prev) => prev.filter((p) => savedSet.has(String(p.id))));

    const loadedIds = new Set(savedPets.map((p) => String(p.id)));
    const idsToFetch = saved.filter((id) => !loadedIds.has(id));
    if (idsToFetch.length === 0) return;

    let cancelled = false;
    Promise.all(
      idsToFetch.map((id) =>
        apiGetPet(Number(id))
          .then((res) => ({ ok: true as const, pet: apiPetToPetCard(res.data) }))
          .catch((err: unknown) => ({ ok: false as const, id, err })),
      ),
    ).then((results) => {
      if (cancelled) return;
      const newPets: PetCard[] = [];
      const missingIds: string[] = [];
      for (const r of results) {
        if (r.ok) {
          newPets.push(r.pet);
        } else if (r.err instanceof ApiError && r.err.status === 404) {
          missingIds.push(r.id);
        } else {
          console.error('Failed to load saved pet', r.id, r.err);
        }
      }
      if (newPets.length > 0) {
        setSavedPets((prev) => [...prev, ...newPets]);
      }
      if (missingIds.length > 0) {
        setSaved((prev) => prev.filter((id) => !missingIds.includes(id)));
      }
    });

    return () => {
      cancelled = true;
    };
    // savedPets intentionally omitted: we only want this to fire when the
    // saved id list changes, not when we update savedPets ourselves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <FavoritesContext.Provider value={{ saved, savedPets, toggle, isSaved, drawerOpen, openDrawer, closeDrawer }}>
      {children}
    </FavoritesContext.Provider>
  );
}
