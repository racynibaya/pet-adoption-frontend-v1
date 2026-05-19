import type { ReactNode } from 'react'

export interface ShelterDetailModel {
  id: number
  name: string
  address: string
  contactEmail: string
  phoneNumber: string
  description: string
  bg: string
  svg: ReactNode
}
