import type { ReactNode } from 'react'

export interface Shelter {
  id: number
  name: string
  description: string
  address: string
  contactEmail: string
  phoneNumber: string
  petCount: number
  bg: string
  svg: ReactNode
}

export interface HowItWorksStep {
  step: string
  title: string
  desc: string
}
