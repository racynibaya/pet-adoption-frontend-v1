import type { FormState } from '../types'

export const EMPTY_FORM: FormState = {
  name: '',
  description: '',
  address: '',
  contactEmail: '',
  phoneNumber: '',
}

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024

export const NAME_MIN_LENGTH = 5

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
