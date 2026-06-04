import { createContext, useContext } from 'react'
import type { AdoptionRequest } from '@/data/adoptions'

export type { AdoptionRequest }

export interface AdoptionsCtx {
  adoptions: AdoptionRequest[]
  updateAdoption: (
    id: number,
    status: AdoptionRequest['status'],
    rejectionReason?: string,
  ) => void
}

export const AdoptionsContext = createContext<AdoptionsCtx | null>(null)

export function useAdoptions(): AdoptionsCtx {
  const ctx = useContext(AdoptionsContext)
  if (!ctx)
    throw new Error('useAdoptions must be used within AdoptionsProvider')
  return ctx
}
