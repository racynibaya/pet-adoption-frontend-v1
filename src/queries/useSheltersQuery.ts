import { useQuery } from '@tanstack/react-query'
import { apiGetShelters } from '@/services/api'
import { queryKeys } from './keys'

// Caches ApiShelter[] directly (no pagination needed by the context) so
// cache writes from add/update mutations stay trivial.
export function useSheltersQuery() {
  return useQuery({
    queryKey: queryKeys.shelters.all,
    // limit 100 so this single cached query is a superset for every consumer
    // (context list, shelter detail/pets pages, admin, donate picker).
    queryFn: async () => (await apiGetShelters(1, 100)).data,
  })
}
