import { useState, useEffect, type ReactNode } from 'react';
import { FavoritesContext } from './useFavorites';
import { apiGetPet, ApiError } from '@/services/api';
import { apiPetToPetCard } from './StaffContext';
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

  useEffect(() => {
    if (saved.length === 0) {
      setSavedPets([]);
      return;
    }

    let cancelled = false;

    Promise.all(
      saved.map((id) =>
        apiGetPet(Number(id))
          .then((res) => ({ ok: true as const, pet: apiPetToPetCard(res.data) }))
          .catch((err: unknown) => ({ ok: false as const, id, err })),
      ),
    ).then((results) => {
      if (cancelled) return;
      const validPets: PetCard[] = [];
      const missingIds: string[] = [];
      for (const r of results) {
        if (r.ok) {
          validPets.push(r.pet);
        } else if (r.err instanceof ApiError && r.err.status === 404) {
          missingIds.push(r.id);
        } else {
          console.error('Failed to load saved pet', r.id, r.err);
        }
      }
      setSavedPets(validPets);
      if (missingIds.length > 0) {
        setSaved((prev) => prev.filter((id) => !missingIds.includes(id)));
      }
    });

    return () => {
      cancelled = true;
    };
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
