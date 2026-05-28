import type { CSSProperties } from 'react'
import type { Species, Gender, Size } from '@/data/pets'
import type { FormState } from '../types'

export const SPECIES_OPTIONS: Species[] = ['DOG', 'CAT', 'RABBIT', 'BIRD', 'OTHER']
export const GENDER_OPTIONS: Gender[] = ['MALE', 'FEMALE']
export const SIZE_OPTIONS: Size[] = ['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE']

export const EMPTY_FORM: FormState = {
  name: '',
  species: 'DOG',
  breed: '',
  ageMonths: '',
  gender: 'MALE',
  size: 'MEDIUM',
  status: 'AVAILABLE',
  shelterId: '',
  description: '',
}

export const STATUS_OPTIONS = [
  { value: 'AVAILABLE', label: '● Available', color: '#1D7575', bg: '#e2f2ee' },
  { value: 'PENDING',   label: '◌ Pending',   color: '#a05818', bg: '#fef1e1' },
  { value: 'ADOPTED',   label: '✓ Adopted',   color: '#5a5a9e', bg: '#eeeef8' },
] as const

export const BASE_INPUT_STYLE: CSSProperties = {
  width: '100%',
  height: 44,
  padding: '0 13px',
  border: '1px solid rgba(28, 44, 44, 0.13)',
  borderRadius: 11,
  fontSize: 13.5,
  color: 'var(--ink)',
  background: '#fffefa',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-body)',
  transition: 'border-color 0.14s',
}

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const MAX_IMAGES = 10
