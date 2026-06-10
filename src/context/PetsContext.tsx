import { type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiCreatePet, apiGetAllPets } from '@/services/api'
import { getErrorMessage } from '@/services/getErrorMessage'
import { apiPetToPetCard } from '@/data/adapters'
import type { PetCard } from '@/data/pets'
import { queryKeys } from '@/queries/keys'
import { useStaffAuth } from './useStaffAuth'
import { PetsContext } from './usePets'

export function PetsProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useStaffAuth()
  const queryClient = useQueryClient()

  // Pets list is shared between the public site and the staff/admin portal.
  // Keyed by auth so a freshly-authenticated session refetches (staff/admin
  // may see pets the public list omits). The same key is reused for cache
  // writes from add/update/delete.
  const petsKey = [...queryKeys.pets.all, isAuthenticated] as const

  const {
    data: pets = [],
    isFetched: petsLoaded,
    error,
  } = useQuery({
    queryKey: petsKey,
    queryFn: async () => (await apiGetAllPets()).map(apiPetToPetCard),
  })

  const petsError = error
    ? getErrorMessage(error, 'Could not load pets. Please try again later.')
    : null

  async function addPet(formData: FormData): Promise<void> {
    const res = await apiCreatePet(formData)
    queryClient.setQueryData<PetCard[]>(petsKey, (old = []) => [
      ...old,
      apiPetToPetCard(res.data),
    ])
  }

  function updatePet(
    id: number,
    updates: Partial<Omit<PetCard, 'id' | 'svg' | 'bg' | 'color'>>,
  ) {
    queryClient.setQueryData<PetCard[]>(petsKey, (old = []) =>
      old.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    )
    // Keep the per-pet detail cache (read by PetDetail/PetApply/Favorites) in
    // sync. Only patch an existing entry — don't fabricate one if unfetched.
    queryClient.setQueryData<PetCard>(queryKeys.pets.detail(id), (old) =>
      old ? { ...old, ...updates } : old,
    )
  }

  function deletePet(id: number) {
    queryClient.setQueryData<PetCard[]>(petsKey, (old = []) =>
      old.filter((p) => p.id !== id),
    )
    // Drop the stale detail entry so the detail page refetches (and 404s away)
    // instead of showing a deleted pet within staleTime.
    queryClient.removeQueries({ queryKey: queryKeys.pets.detail(id) })
  }

  return (
    <PetsContext.Provider
      value={{ pets, petsLoaded, petsError, addPet, updatePet, deletePet }}
    >
      {children}
    </PetsContext.Provider>
  )
}
