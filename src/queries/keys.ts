import type { PetFilterParams } from '@/services/api'

// Central query-key factory. Keep all keys here so invalidations and cache
// edits reference the exact same arrays the queries register under.
export const queryKeys = {
  pets: {
    all: ['pets', 'all'] as const,
    list: (page: number, filters: PetFilterParams) =>
      ['pets', 'list', page, filters] as const,
    detail: (id: number) => ['pets', 'detail', id] as const,
  },
  shelters: {
    all: ['shelters', 'all'] as const,
  },
} as const
