import { useState, type ReactNode } from 'react'
import { MOCK_ADOPTIONS, type AdoptionRequest } from '@/data/adoptions'
import { AdoptionsContext } from './useAdoptions'

export function AdoptionsProvider({ children }: { children: ReactNode }) {
  const [adoptions, setAdoptions] = useState<AdoptionRequest[]>(MOCK_ADOPTIONS)

  function updateAdoption(
    id: number,
    status: AdoptionRequest['status'],
    rejectionReason?: string,
  ) {
    setAdoptions((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              ...(rejectionReason !== undefined && { rejectionReason }),
            }
          : a,
      ),
    )
  }

  return (
    <AdoptionsContext.Provider value={{ adoptions, updateAdoption }}>
      {children}
    </AdoptionsContext.Provider>
  )
}
