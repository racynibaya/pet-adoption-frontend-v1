import type { ApiShelter } from '@/services/api'
import type {
  AdminFiltersState,
  ShelterFilter,
  StatusFilter,
  SpeciesFilter,
} from '../hooks/useAdminFilters'

export type SortKey = 'RECENT' | 'PRESSURE' | 'NAME'

interface AdminDashboardChipStripProps {
  filters: AdminFiltersState
  shelters: ApiShelter[]
  sort: SortKey
  activeCount: number
  resultCount: number
  totalCount: number
  onStatus: (v: StatusFilter) => void
  onSpecies: (v: SpeciesFilter) => void
  onShelter: (v: ShelterFilter) => void
  onSort: (v: SortKey) => void
  onClear: () => void
}

const STATUS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'PENDING', label: 'In review' },
  { value: 'ADOPTED', label: 'Placed' },
]

const SPECIES: { value: SpeciesFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'DOG', label: 'Dogs' },
  { value: 'CAT', label: 'Cats' },
  { value: 'RABBIT', label: 'Rabbits' },
  { value: 'BIRD', label: 'Birds' },
]

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'RECENT', label: 'Sort: Recently listed' },
  { value: 'PRESSURE', label: 'Sort: Adoption pressure' },
  { value: 'NAME', label: 'Sort: A → Z' },
]

export default function AdminDashboardChipStrip({
  filters,
  shelters,
  sort,
  activeCount,
  resultCount,
  totalCount,
  onStatus,
  onSpecies,
  onShelter,
  onSort,
  onClear,
}: AdminDashboardChipStripProps) {
  return (
    <section
      className='admin-chips a-section'
      style={{ ['--i' as string]: 1 }}
      aria-label='Filter network'
    >
      <div className='admin-chips-group' role='group' aria-label='Status'>
        <span className='admin-chips-label'>Status</span>
        {STATUS.map((o) => (
          <button
            key={o.value}
            type='button'
            className={`admin-chip${filters.status === o.value ? ' is-active' : ''}`}
            onClick={() => onStatus(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <span className='admin-chips-divider' aria-hidden />

      <div className='admin-chips-group' role='group' aria-label='Species'>
        <span className='admin-chips-label'>Species</span>
        {SPECIES.map((o) => (
          <button
            key={o.value}
            type='button'
            className={`admin-chip${filters.species === o.value ? ' is-active' : ''}`}
            onClick={() => onSpecies(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <span className='admin-chips-divider' aria-hidden />

      <select
        className='admin-chips-select'
        value={filters.shelterId === 'ALL' ? 'ALL' : String(filters.shelterId)}
        onChange={(e) => {
          const v = e.target.value
          onShelter(v === 'ALL' ? 'ALL' : Number(v))
        }}
        aria-label='Filter by shelter'
      >
        <option value='ALL'>All shelters</option>
        {shelters.map((s) => (
          <option key={s.id} value={String(s.id)}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        className='admin-chips-select'
        value={sort}
        onChange={(e) => onSort(e.target.value as SortKey)}
        aria-label='Sort'
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {activeCount > 0 ? (
        <button type='button' className='admin-chips-clear' onClick={onClear}>
          Clear · {activeCount}
        </button>
      ) : (
        <span className='admin-chips-meta' aria-live='polite'>
          <span className='admin-chips-meta-num'>{resultCount}</span>
          <span className='admin-chips-meta-of'>of {totalCount}</span>
        </span>
      )}
    </section>
  )
}
