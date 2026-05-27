import { useMemo, useState } from 'react'
import type { PetCard, Species, Gender, Size } from '@/data/pets'
import type { AdoptionRequest } from '@/context/useStaff'

export type StatusFilter = 'ALL' | 'AVAILABLE' | 'PENDING' | 'ADOPTED'
export type SpeciesFilter = 'ALL' | Species
export type GenderFilter = 'ANY' | Gender
export type SizeFilter = 'ANY' | Size
export type ShelterFilter = 'ALL' | number

export interface AdminFiltersState {
  search: string
  shelterId: ShelterFilter
  status: StatusFilter
  species: SpeciesFilter
  gender: GenderFilter
  size: SizeFilter
}

export interface UseAdminFiltersResult {
  filters: AdminFiltersState
  setSearch: (v: string) => void
  setShelterId: (v: ShelterFilter) => void
  setStatus: (v: StatusFilter) => void
  setSpecies: (v: SpeciesFilter) => void
  setGender: (v: GenderFilter) => void
  setSize: (v: SizeFilter) => void
  clearAll: () => void
  activeCount: number
  filteredPets: PetCard[]
  filteredAdoptions: AdoptionRequest[]
}

const INITIAL: AdminFiltersState = {
  search: '',
  shelterId: 'ALL',
  status: 'ALL',
  species: 'ALL',
  gender: 'ANY',
  size: 'ANY',
}

export function useAdminFilters(
  pets: PetCard[],
  adoptions: AdoptionRequest[],
): UseAdminFiltersResult {
  const [search, setSearch] = useState(INITIAL.search)
  const [shelterId, setShelterId] = useState<ShelterFilter>(INITIAL.shelterId)
  const [status, setStatus] = useState<StatusFilter>(INITIAL.status)
  const [species, setSpecies] = useState<SpeciesFilter>(INITIAL.species)
  const [gender, setGender] = useState<GenderFilter>(INITIAL.gender)
  const [size, setSize] = useState<SizeFilter>(INITIAL.size)

  const filteredPets = useMemo(() => {
    const q = search.trim().toLowerCase()
    return pets.filter((p) => {
      if (shelterId !== 'ALL' && p.shelterId !== shelterId) return false
      if (status !== 'ALL' && p.status !== status) return false
      if (species !== 'ALL' && p.species !== species) return false
      if (gender !== 'ANY' && p.gender !== gender) return false
      if (size !== 'ANY' && p.size !== size) return false
      if (q.length > 0) {
        const hay = `${p.name} ${p.breed} ${p.shelterName}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [pets, search, shelterId, status, species, gender, size])

  const filteredAdoptions = useMemo(() => {
    const allowedPetIds = new Set(filteredPets.map((p) => p.id))
    return adoptions.filter((a) => allowedPetIds.has(a.petId))
  }, [adoptions, filteredPets])

  const activeCount =
    (search.trim().length > 0 ? 1 : 0) +
    (shelterId !== 'ALL' ? 1 : 0) +
    (status !== 'ALL' ? 1 : 0) +
    (species !== 'ALL' ? 1 : 0) +
    (gender !== 'ANY' ? 1 : 0) +
    (size !== 'ANY' ? 1 : 0)

  const clearAll = () => {
    setSearch(INITIAL.search)
    setShelterId(INITIAL.shelterId)
    setStatus(INITIAL.status)
    setSpecies(INITIAL.species)
    setGender(INITIAL.gender)
    setSize(INITIAL.size)
  }

  return {
    filters: { search, shelterId, status, species, gender, size },
    setSearch,
    setShelterId,
    setStatus,
    setSpecies,
    setGender,
    setSize,
    clearAll,
    activeCount,
    filteredPets,
    filteredAdoptions,
  }
}
