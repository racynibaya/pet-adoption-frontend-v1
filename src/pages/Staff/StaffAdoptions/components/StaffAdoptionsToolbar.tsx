import type { AdoptionRequest } from '@/context/useStaff'
import type { StatusFilter } from '../types'
import { FILTERS, STATUS_META } from '../data'

interface StaffAdoptionsToolbarProps {
  search: string
  filter: StatusFilter
  onSearchChange: (value: string) => void
  onFilterChange: (filter: StatusFilter) => void
}

export default function StaffAdoptionsToolbar({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: StaffAdoptionsToolbarProps) {
  return (
    <div className="staff-toolbar">
      <input
        className="staff-search"
        placeholder="Search applicant, pet, or email…"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
      {FILTERS.map(f => (
        <button
          key={f}
          className={`staff-filter-pill${filter === f ? ' active' : ''}`}
          onClick={() => onFilterChange(f)}
        >
          {f === 'All' ? 'All' : STATUS_META[f as AdoptionRequest['status']].label}
        </button>
      ))}
    </div>
  )
}
