import { useEffect, useState, type ReactNode } from 'react'
import { apiCreatePet, apiGetAllPets, ApiError } from '@/services/api'
import { apiPetToPetCard } from '@/data/adapters'
import type { PetCard } from '@/data/pets'
import { useStaffAuth } from './useStaffAuth'
import { PetsContext } from './usePets'

export function PetsProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useStaffAuth()

  const [pets, setPets] = useState<PetCard[]>([])
  const [petsLoaded, setPetsLoaded] = useState(false)
  const [petsError, setPetsError] = useState<string | null>(null)

  // Pets list is shared between the public site and the staff/admin portal.
  // Fetch on mount regardless of auth so anonymous and adopter visitors see
  // real data; refetch when auth flips so a freshly-authenticated session
  // pulls the latest.
  useEffect(() => {
    let cancelled = false
    apiGetAllPets()
      .then((all) => {
        if (cancelled) return
        setPets(all.map(apiPetToPetCard))
        setPetsError(null)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        console.error('Failed to load pets', err)
        setPetsError(
          err instanceof ApiError
            ? err.message
            : 'Could not load pets. Please try again later.',
        )
      })
      .finally(() => {
        if (!cancelled) setPetsLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [isAuthenticated])

  async function addPet(formData: FormData): Promise<void> {
    const res = await apiCreatePet(formData)
    setPets((prev) => [...prev, apiPetToPetCard(res.data)])
  }

  function updatePet(
    id: number,
    updates: Partial<Omit<PetCard, 'id' | 'svg' | 'bg' | 'color'>>,
  ) {
    setPets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    )
  }

  function deletePet(id: number) {
    setPets((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <PetsContext.Provider
      value={{ pets, petsLoaded, petsError, addPet, updatePet, deletePet }}
    >
      {children}
    </PetsContext.Provider>
  )
}
