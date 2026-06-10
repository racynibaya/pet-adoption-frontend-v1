import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { apiGetPets, type PetFilterParams } from '@/services/api'
import { apiPetToPetCard } from '@/data/adapters'
import { PAGE_SIZE } from '@/pages/Services/constants/services.constants'
import { queryKeys } from './keys'

export function usePetsQuery(page: number, filters: PetFilterParams) {
  return useQuery({
    queryKey: queryKeys.pets.list(page, filters),
    queryFn: () => apiGetPets(page, PAGE_SIZE, filters),
    select: (res) => ({
      pets: res.data.map(apiPetToPetCard),
      totalPages: res.pagination.totalPages,
      totalPets: res.pagination.total,
    }),
    // v5 replaces keepPreviousData: true — keeps the last page's data
    // visible while the next page/filter result loads.
    placeholderData: keepPreviousData,
  })
}
