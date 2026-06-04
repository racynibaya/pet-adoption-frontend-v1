import type { BackendRegion } from '@/services/api'

export interface FormState {
  name: string
  description: string
  addressLine: string
  city: string
  province: string
  region: BackendRegion
  contactEmail: string
  phoneNumber: string
}

export type FormFieldErrors = Partial<Record<keyof FormState | 'image', string>>
