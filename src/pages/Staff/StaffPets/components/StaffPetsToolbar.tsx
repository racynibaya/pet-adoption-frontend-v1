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
    <div className='staff-toolbar'>
      <input
        className='staff-search'
        placeholder='Search by name, breed, or shelter…'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {SPECIES_FILTERS.map((s) => (
        <button
          key={s}
          className={`staff-filter-pill${speciesFilter === s ? ' active' : ''}`}
          onClick={() => onSpeciesChange(s)}
        >
          {SPECIES_FILTER_LABELS[s]}
        </button>
      ))}
    </div>
  )
}
