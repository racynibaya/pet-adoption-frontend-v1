import type { Species, Gender, Size } from '@/data/pets'

export interface FormState {
  name: string
  species: Species
  breed: string
  ageMonths: string
  gender: Gender
  size: Size
  status: 'AVAILABLE' | 'PENDING' | 'ADOPTED'
  shelterId: string
  description: string
}

export type FormFieldErrors = Partial<Record<keyof FormState, string>>
