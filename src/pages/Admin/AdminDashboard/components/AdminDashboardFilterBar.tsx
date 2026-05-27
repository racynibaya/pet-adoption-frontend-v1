import { useState } from 'react'
import type { ApiShelter } from '@/services/api'
import type {
  AdminFiltersState,
  ShelterFilter,
  StatusFilter,
  SpeciesFilter,
  GenderFilter,
  SizeFilter,
} from '../hooks/useAdminFilters'

interface AdminDashboardFilterBarProps {
  filters: AdminFiltersState
  shelters: ApiShelter[]
  activeCount: number
  resultCount: number
  totalCount: number
  setSearch: (v: string) => void
  setShelterId: (v: ShelterFilter) => void
  setStatus: (v: StatusFilter) => void
  setSpecies: (v: SpeciesFilter) => void
  setGender: (v: GenderFilter) => void
  setSize: (v: SizeFilter) => void
  clearAll: () => void
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'PENDING', label: 'In review' },
  { value: 'ADOPTED', label: 'Placed' },
]

const SPECIES_OPTIONS: { value: SpeciesFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'DOG', label: 'Dogs' },
  { value: 'CAT', label: 'Cats' },
  { value: 'RABBIT', label: 'Rabbits' },
  { value: 'BIRD', label: 'Birds' },
  { value: 'OTHER', label: 'Other' },
]

const GENDER_OPTIONS: { value: GenderFilter; label: string }[] = [
  { value: 'ANY', label: 'Any' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'MALE', label: 'Male' },
]

const SIZE_OPTIONS: { value: SizeFilter; label: string }[] = [
  { value: 'ANY', label: 'Any' },
  { value: 'SMALL', label: 'Small' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LARGE', label: 'Large' },
  { value: 'EXTRA_LARGE', label: 'Extra large' },
]

export default function AdminDashboardFilterBar({
  filters,
  shelters,
  activeCount,
  resultCount,
  totalCount,
  setSearch,
  setShelterId,
  setStatus,
  setSpecies,
  setGender,
  setSize,
  clearAll,
}: AdminDashboardFilterBarProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      className='admin-filter-bar a-section'
      style={{ ['--i' as string]: 0.5 }}
      aria-label='Refine dashboard'
    >
      <div className='admin-filter-head'>
        <div className='admin-filter-eyebrow'>
          <span className='dot' /> Refine the network
        </div>
        <div className='admin-filter-meta' aria-live='polite'>
          <span className='admin-filter-count'>{resultCount}</span>
          <span className='admin-filter-of'>of {totalCount}</span>
          <span className='admin-filter-rule' aria-hidden='true' />
          <span className='admin-filter-active'>
            {activeCount === 0
              ? 'No filters'
              : `${activeCount} filter${activeCount === 1 ? '' : 's'} active`}
          </span>
          {activeCount > 0 && (
            <button type='button' className='admin-filter-clear' onClick={clearAll}>
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className='admin-filter-row'>
        <label className='admin-filter-search'>
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='11' cy='11' r='7' stroke='currentColor' strokeWidth='1.6' />
            <path d='m20 20-3.5-3.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
          </svg>
          <input
            type='search'
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search name, breed, or shelter…'
            aria-label='Search pets'
          />
        </label>

        <div className='admin-filter-select-wrap'>
          <span className='admin-filter-select-label'>Shelter</span>
          <select
            className='admin-filter-select'
            value={filters.shelterId === 'ALL' ? 'ALL' : String(filters.shelterId)}
            onChange={(e) => {
              const v = e.target.value
              setShelterId(v === 'ALL' ? 'ALL' : Number(v))
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
          <span className='admin-filter-select-caret' aria-hidden='true'>
            ▾
          </span>
        </div>

        <button
          type='button'
          className={`admin-filter-more${expanded ? ' is-open' : ''}`}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls='admin-filter-extras'
        >
          <span>{expanded ? 'Hide facets' : 'More facets'}</span>
          <span className='admin-filter-more-icon' aria-hidden='true'>
            {expanded ? '−' : '+'}
          </span>
        </button>
      </div>

      <div className='admin-filter-group'>
        <span className='admin-filter-group-label'>Status</span>
        <div className='admin-filter-pills'>
          {STATUS_OPTIONS.map((o) => (
            <button
              key={o.value}
              type='button'
              className={`admin-filter-pill${filters.status === o.value ? ' is-active' : ''}`}
              onClick={() => setStatus(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className='admin-filter-group'>
        <span className='admin-filter-group-label'>Species</span>
        <div className='admin-filter-pills'>
          {SPECIES_OPTIONS.map((o) => (
            <button
              key={o.value}
              type='button'
              className={`admin-filter-pill${filters.species === o.value ? ' is-active' : ''}`}
              onClick={() => setSpecies(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {expanded && (
        <div id='admin-filter-extras' className='admin-filter-extras'>
          <div className='admin-filter-group'>
            <span className='admin-filter-group-label'>Gender</span>
            <div className='admin-filter-pills'>
              {GENDER_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type='button'
                  className={`admin-filter-pill${filters.gender === o.value ? ' is-active' : ''}`}
                  onClick={() => setGender(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className='admin-filter-group'>
            <span className='admin-filter-group-label'>Size</span>
            <div className='admin-filter-pills'>
              {SIZE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type='button'
                  className={`admin-filter-pill${filters.size === o.value ? ' is-active' : ''}`}
                  onClick={() => setSize(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
