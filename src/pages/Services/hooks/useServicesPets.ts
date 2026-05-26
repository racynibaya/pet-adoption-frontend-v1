import { useEffect, useState } from 'react';
import { apiGetPets } from '@/services/api';
import { apiPetToPetCard } from '@/context/StaffContext';
import type {
  PetCard,
  SpeciesFilter,
  GenderFilter,
  SizeFilter,
} from '@/data/pets';
import type { BackendSpecies, BackendGender, BackendSize } from '@/services/api';
import { PAGE_SIZE } from '../constants/services.constants';

export function useServicesPets() {
  const [activeSpecies, setActiveSpeciesState] = useState<SpeciesFilter>('ALL');
  const [activeGender, setActiveGenderState] = useState<GenderFilter>('ANY');
  const [activeSize, setActiveSizeState] = useState<SizeFilter>('ANY');
  const [pets, setPets] = useState<PetCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPets, setTotalPets] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-in-effect pattern; matches React docs example
    setLoading(true);

    const filters = {
      ...(activeSpecies !== 'ALL' && { species: activeSpecies as BackendSpecies }),
      ...(activeGender !== 'ANY' && { gender: activeGender as BackendGender }),
      ...(activeSize !== 'ANY' && { size: activeSize as BackendSize }),
    };

    apiGetPets(currentPage, PAGE_SIZE, filters)
      .then((res) => {
        if (cancelled) return;

        setPets(res.data.map(apiPetToPetCard));
        setTotalPages(res.pagination.totalPages);
        setTotalPets(res.pagination.total);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load pets', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentPage, activeSpecies, activeGender, activeSize]);

  function setActiveSpecies(value: SpeciesFilter) {
    setActiveSpeciesState(value);
    setCurrentPage(1);
  }

  function setActiveGender(value: GenderFilter) {
    setActiveGenderState(value);
    setCurrentPage(1);
  }

  function setActiveSize(value: SizeFilter) {
    setActiveSizeState(value);
    setCurrentPage(1);
  }

  function clearFilters() {
    setActiveSpeciesState('ALL');
    setActiveGenderState('ANY');
    setActiveSizeState('ANY');
    setCurrentPage(1);
  }

  return {
    activeSpecies,
    activeGender,
    activeSize,
    setActiveSpecies,
    setActiveGender,
    setActiveSize,
    pets,
    filtered: pets,
    currentPage,
    totalPages,
    totalPets,
    loading,
    setCurrentPage,
    clearFilters,
  };
}
