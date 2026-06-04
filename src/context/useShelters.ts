import { createContext, useContext } from 'react'
import type { ApiShelter } from '@/services/api'

export interface SheltersCtx {
  shelters: ApiShelter[]
  sheltersLoaded: boolean
  addShelter: (formData: FormData) => Promise<ApiShelter>
  updateShelter: (id: number, formData: FormData) => Promise<ApiShelter>
}

export const SheltersContext = createContext<SheltersCtx | null>(null)

export function useShelters(): SheltersCtx {
  const ctx = useContext(SheltersContext)
  if (!ctx) throw new Error('useShelters must be used within SheltersProvider')
  return ctx
}
