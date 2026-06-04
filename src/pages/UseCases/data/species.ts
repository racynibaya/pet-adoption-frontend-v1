import type { BackendSpecies } from '@/services/api'

export const SPECIES_LABELS: Record<
  BackendSpecies,
  { sing: string; plur: string }
> = {
  DOG: { sing: 'dog', plur: 'dogs' },
  CAT: { sing: 'cat', plur: 'cats' },
  RABBIT: { sing: 'rabbit', plur: 'rabbits' },
  BIRD: { sing: 'bird', plur: 'birds' },
  OTHER: { sing: 'other', plur: 'others' },
}

export const SPECIES_ORDER: BackendSpecies[] = [
  'DOG',
  'CAT',
  'RABBIT',
  'BIRD',
  'OTHER',
]
