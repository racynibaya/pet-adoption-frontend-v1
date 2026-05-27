import type {
  StaffFiltersState,
  StatusFilter,
  SpeciesFilter,
} from '../hooks/useStaffFilters'

export type SortKey = 'RECENT' | 'PRESSURE' | 'NAME'

interface StaffDashboardChipStripProps {
  filters: StaffFiltersState
  sort: SortKey
  activeCount: number
  resultCount: number
  totalCount: number
  onStatus: (v: StatusFilter) => void
  onSpecies: (v: SpeciesFilter) => void
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

export default function StaffDashboardChipStrip({
  filters,
  sort,
  activeCount,
  resultCount,
  totalCount,
  onStatus,
  onSpecies,
  onSort,
  onClear,
}: StaffDashboardChipStripProps) {
  return (
    <section
      className='staff-chips sd-section'
      style={{ ['--i' as string]: 1 }}
      aria-label='Filter your shelter'
    >
      <div className='staff-chips-group' role='group' aria-label='Status'>
        <span className='staff-chips-label'>Status</span>
        {STATUS.map((o) => (
          <button
            key={o.value}
            type='button'
            className={`staff-chip${filters.status === o.value ? ' is-active' : ''}`}
            onClick={() => onStatus(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <span className='staff-chips-divider' aria-hidden />

      <div className='staff-chips-group' role='group' aria-label='Species'>
        <span className='staff-chips-label'>Species</span>
        {SPECIES.map((o) => (
          <button
            key={o.value}
            type='button'
            className={`staff-chip${filters.species === o.value ? ' is-active' : ''}`}
            onClick={() => onSpecies(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <span className='staff-chips-divider' aria-hidden />

      <select
        className='staff-chips-select'
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
        <button type='button' className='staff-chips-clear' onClick={onClear}>
          Clear · {activeCount}
        </button>
      ) : (
        <span className='staff-chips-meta' aria-live='polite'>
          <span className='staff-chips-meta-num'>{resultCount}</span>
          <span className='staff-chips-meta-of'>of {totalCount}</span>
        </span>
      )}
    </section>
  )
}
