import { useMemo } from 'react'
import type { ApiShelter } from '@/services/api'
import type { PetCard } from '@/data/pets'
import { usePets } from './usePets'
import { useShelters } from './useShelters'
import { useStaffAuth } from './useStaffAuth'

/**
 * Pets the current staff user is allowed to see/manage.
 *  - ADMIN: all pets
 *  - STAFF: pets only for the shelter(s) they belong to
 *  - Anonymous: all pets (used by the public site)
 */
export function useStaffScopedPets(): PetCard[] {
  const { pets } = usePets()
  const { staffUser } = useStaffAuth()
  return useMemo(() => {
    if (!staffUser) return pets
    if (staffUser.role === 'ADMIN') return pets
    if (staffUser.shelterIds.length === 0) return []
    return pets.filter((p) => staffUser.shelterIds.includes(p.shelterId))
  }, [pets, staffUser])
}

/** Shelters the current staff user is allowed to see/manage (same rules). */
export function useStaffScopedShelters(): ApiShelter[] {
  const { shelters } = useShelters()
  const { staffUser } = useStaffAuth()
  return useMemo(() => {
    if (!staffUser) return shelters
    if (staffUser.role === 'ADMIN') return shelters
    if (staffUser.shelterIds.length === 0) return []
    return shelters.filter((s) => staffUser.shelterIds.includes(s.id))
  }, [shelters, staffUser])
}
