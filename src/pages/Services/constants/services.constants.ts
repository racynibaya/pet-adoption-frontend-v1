import type { SpeciesFilter, GenderFilter, SizeFilter } from '@/data/pets';

export const SPECIES_FILTERS: SpeciesFilter[] = [
  'ALL',
  'DOG',
  'CAT',
  'RABBIT',
  'BIRD',
  'OTHER',
];
export const GENDER_FILTERS: GenderFilter[] = ['ANY', 'MALE', 'FEMALE'];
export const SIZE_FILTERS: SizeFilter[] = [
  'ANY',
  'SMALL',
  'MEDIUM',
  'LARGE',
  'EXTRA_LARGE',
];

export const PAGE_SIZE = 9;
