import type { SpeciesFilter } from '@/data/pets'

export const SPECIES_FILTERS: SpeciesFilter[] = ['ALL', 'DOG', 'CAT', 'RABBIT', 'BIRD', 'OTHER']

export const SPECIES_FILTER_LABELS: Record<SpeciesFilter, string> = {
  ALL: 'All',
  DOG: 'Dogs',
  CAT: 'Cats',
  RABBIT: 'Rabbits',
  BIRD: 'Birds',
  OTHER: 'Other',
}
