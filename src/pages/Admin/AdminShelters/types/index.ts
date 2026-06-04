import type { BackendRegion } from '@/services/api'

export interface AggregatedShelter {
  id: number
  name: string
  addressLine: string
  city: string
  province: string
  region: BackendRegion
  contactEmail: string
  phoneNumber: string
  pets: { total: number; available: number; pending: number; adopted: number }
}
