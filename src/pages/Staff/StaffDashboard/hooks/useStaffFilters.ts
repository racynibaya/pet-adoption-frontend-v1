import { useMemo, useState } from 'react'
import type { PetCard, Species } from '@/data/pets'
import type { AdoptionRequest } from '@/context/useAdoptions'

export type StatusFilter = 'ALL' | 'AVAILABLE' | 'PENDING' | 'ADOPTED'
export type SpeciesFilter = 'ALL' | Species

export interface StaffFiltersState {
  search: string
  status: StatusFilter
  species: SpeciesFilter
}

export interface UseStaffFiltersResult {
  filters: StaffFiltersState
  setSearch: (v: string) => void
  setStatus: (v: StatusFilter) => void
  setSpecies: (v: SpeciesFilter) => void
  clearAll: () => void
  activeCount: number
  filteredPets: PetCard[]
  filteredAdoptions: AdoptionRequest[]
}

const INITIAL: StaffFiltersState = {
  search: '',
  status: 'ALL',
  species: 'ALL',
}

export function useStaffFilters(
  pets: PetCard[],
  adoptions: AdoptionRequest[],
): UseStaffFiltersResult {
  const [search, setSearch] = useState(INITIAL.search)
  const [status, setStatus] = useState<StatusFilter>(INITIAL.status)
  const [species, setSpecies] = useState<SpeciesFilter>(INITIAL.species)

  const filteredPets = useMemo(() => {
    const q = search.trim().toLowerCase()
    return pets.filter((p) => {
      if (status !== 'ALL' && p.status !== status) return false
      if (species !== 'ALL' && p.species !== species) return false
      if (q.length > 0) {
        const hay = `${p.name} ${p.breed} ${p.shelterName}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [pets, search, status, species])

  const filteredAdoptions = useMemo(() => {
    const allowedPetIds = new Set(filteredPets.map((p) => p.id))
    return adoptions.filter((a) => allowedPetIds.has(a.petId))
  }, [adoptions, filteredPets])

  const activeCount =
    (search.trim().length > 0 ? 1 : 0) +
    (status !== 'ALL' ? 1 : 0) +
    (species !== 'ALL' ? 1 : 0)

  const clearAll = () => {
    setSearch(INITIAL.search)
    setStatus(INITIAL.status)
    setSpecies(INITIAL.species)
  }

  return {
    filters: { search, status, species },
    setSearch,
    setStatus,
    setSpecies,
    clearAll,
    activeCount,
    filteredPets,
    filteredAdoptions,
  }
}
