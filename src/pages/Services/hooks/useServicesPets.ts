import { useState } from 'react';
import type {
  SpeciesFilter,
  GenderFilter,
  SizeFilter,
} from '@/data/pets';
import type { BackendSpecies, BackendGender, BackendSize } from '@/services/api';
import { usePetsQuery } from '@/queries/usePetsQuery';

export function useServicesPets() {
  const [activeSpecies, setActiveSpeciesState] = useState<SpeciesFilter>('ALL');
  const [activeGender, setActiveGenderState] = useState<GenderFilter>('ANY');
  const [activeSize, setActiveSizeState] = useState<SizeFilter>('ANY');
  const [currentPage, setCurrentPage] = useState(1);

  const filters = {
    ...(activeSpecies !== 'ALL' && { species: activeSpecies as BackendSpecies }),
    ...(activeGender !== 'ANY' && { gender: activeGender as BackendGender }),
    ...(activeSize !== 'ANY' && { size: activeSize as BackendSize }),
  };

  const { data, isPending } = usePetsQuery(currentPage, filters);
  const pets = data?.pets ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalPets = data?.totalPets ?? 0;
  const loading = isPending;

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
