import type { AdoptionRequest } from '@/context/useStaff';
import type { StatusFilter } from '../types';
import { FILTERS, STATUS_META } from '../data';

interface StaffAdoptionsToolbarProps {
  search: string;
  filter: StatusFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: StatusFilter) => void;
}

export default function StaffAdoptionsToolbar({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: StaffAdoptionsToolbarProps) {
  return (
    <section className='staff-chips' aria-label='Filter applications'>
      <label className='staff-topbar-search' style={{ width: 280 }}>
        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' aria-hidden>
          <circle cx='11' cy='11' r='7' stroke='currentColor' strokeWidth='1.7' />
          <path d='m20 20-3.5-3.5' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' />
        </svg>
        <input
          type='search'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Search applicant, pet, or email…'
          aria-label='Search applications'
        />
      </label>

      <span className='staff-chips-divider' aria-hidden />

      <div className='staff-chips-group' role='group' aria-label='Status'>
        <span className='staff-chips-label'>Status</span>
        {FILTERS.map((f) => (
          <button
            key={f}
            type='button'
            className={`staff-chip${filter === f ? ' is-active' : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {f === 'All'
              ? 'All'
              : STATUS_META[f as AdoptionRequest['status']].plain}
          </button>
        ))}
      </div>
    </section>
  );
}
