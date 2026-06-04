import type { ReactNode } from 'react'
import type { BackendRegion } from '@/services/api'

export interface ShelterDetailModel {
  id: number
  name: string
  addressLine: string
  city: string
  province: string
  region: BackendRegion
  contactEmail: string
  phoneNumber: string
  description: string
  bg: string | null
  svg: ReactNode | null
  imageUrl: string | null
}
