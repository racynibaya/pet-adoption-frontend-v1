import { useEffect, useState, type ReactNode } from 'react'
import {
  apiCreateShelter,
  apiGetShelters,
  apiUpdateShelter,
  type ApiShelter,
} from '@/services/api'
import { SheltersContext } from './useShelters'

export function SheltersProvider({ children }: { children: ReactNode }) {
  const [shelters, setShelters] = useState<ApiShelter[]>([])
  const [sheltersLoaded, setSheltersLoaded] = useState(false)

  useEffect(() => {
    apiGetShelters()
      .then((res) => {
        setShelters(res.data)
      })
      .catch((err) => {
        console.error('Failed to load shelters', err)
      })
      .finally(() => {
        setSheltersLoaded(true)
      })
  }, [])

  async function addShelter(formData: FormData): Promise<ApiShelter> {
    const res = await apiCreateShelter(formData)
    setShelters((prev) => [...prev, res.data])
    return res.data
  }

  async function updateShelter(
    id: number,
    formData: FormData,
  ): Promise<ApiShelter> {
    const res = await apiUpdateShelter(id, formData)
    setShelters((prev) => prev.map((s) => (s.id === id ? res.data : s)))
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
