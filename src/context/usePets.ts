import { createContext, useContext } from 'react'
import type { PetCard } from '@/data/pets'

export interface PetsCtx {
  pets: PetCard[]
  petsLoaded: boolean
  petsError: string | null
  addPet: (formData: FormData) => Promise<void>
  updatePet: (
    id: number,
    updates: Partial<Omit<PetCard, 'id' | 'svg' | 'bg' | 'color'>>,
  ) => void
  deletePet: (id: number) => void
}

export const PetsContext = createContext<PetsCtx | null>(null)

export function usePets(): PetsCtx {
  const ctx = useContext(PetsContext)
  if (!ctx) throw new Error('usePets must be used within PetsProvider')
  return ctx
}
