import type { HomeType } from '@/services/api'

export interface FormState {
  message: string
  homeType: HomeType | ''
  hasYard: boolean | null
  yardFenced: boolean | null
  ownsHome: boolean | null
  landlordAllowsPets: boolean | null
  householdSize: string
  hasChildren: boolean | null
  hasPreviousPetExperience: boolean | null
  yearsOfPetExperience: string
  hoursAwayPerDay: string
  hasOtherPetsNow: boolean | null
  reasonForAdopting: string
  hasBackupCarePlan: boolean | null
  awareOfMonthlyCosts: boolean | null
}

export type FormFieldErrors = Partial<Record<keyof FormState, string>>
