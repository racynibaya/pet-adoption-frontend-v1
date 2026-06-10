import { type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  apiCreateShelter,
  apiUpdateShelter,
  type ApiShelter,
} from '@/services/api'
import { useSheltersQuery } from '@/queries/useSheltersQuery'
import { queryKeys } from '@/queries/keys'
import { SheltersContext } from './useShelters'

export function SheltersProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const { data: shelters = [], isFetched: sheltersLoaded } = useSheltersQuery()

  async function addShelter(formData: FormData): Promise<ApiShelter> {
    const res = await apiCreateShelter(formData)
    queryClient.setQueryData<ApiShelter[]>(queryKeys.shelters.all, (old = []) => [
      ...old,
      res.data,
    ])
    return res.data
  }

  async function updateShelter(
    id: number,
    formData: FormData,
  ): Promise<ApiShelter> {
    const res = await apiUpdateShelter(id, formData)
    queryClient.setQueryData<ApiShelter[]>(queryKeys.shelters.all, (old = []) =>
      old.map((s) => (s.id === id ? res.data : s)),
    )
    return res.data
  }

  return (
    <SheltersContext.Provider
      value={{ shelters, sheltersLoaded, addShelter, updateShelter }}
    >
      {children}
    </SheltersContext.Provider>
  )
}
