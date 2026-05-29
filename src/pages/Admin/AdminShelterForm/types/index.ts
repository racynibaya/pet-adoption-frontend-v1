export interface FormState {
  name: string
  description: string
  address: string
  contactEmail: string
  phoneNumber: string
}

export type FormFieldErrors = Partial<Record<keyof FormState | 'image', string>>
