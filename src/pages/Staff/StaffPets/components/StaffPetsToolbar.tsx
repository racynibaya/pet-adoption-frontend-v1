import type { SpeciesFilter } from '@/data/pets'
import { SPECIES_FILTERS, SPECIES_FILTER_LABELS } from '../constants/staffPets.constants'

interface StaffPetsToolbarProps {
  search: string
  speciesFilter: SpeciesFilter
  onSearchChange: (value: string) => void
  onSpeciesChange: (filter: SpeciesFilter) => void
}

export default function StaffPetsToolbar({
  search,
  speciesFilter,
  onSearchChange,
  onSpeciesChange,
}: StaffPetsToolbarProps) {
  return (
    <section className='staff-chips' aria-label='Filter pets'>
      <label className='staff-topbar-search' style={{ width: 260 }}>
        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' aria-hidden>
          <circle cx='11' cy='11' r='7' stroke='currentColor' strokeWidth='1.7' />
          <path d='m20 20-3.5-3.5' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' />
        </svg>
        <input
          type='search'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Search by name, breed, or shelter…'
          aria-label='Search pets'
        />
      </label>

      <span className='staff-chips-divider' aria-hidden />

      <div className='staff-chips-group' role='group' aria-label='Species'>
        <span className='staff-chips-label'>Species</span>
        {SPECIES_FILTERS.map((s) => (
          <button
            key={s}
            type='button'
            className={`staff-chip${speciesFilter === s ? ' is-active' : ''}`}
            onClick={() => onSpeciesChange(s)}
          >
            {SPECIES_FILTER_LABELS[s]}
          </button>
        ))}
      </div>
    </section>
  )
}
