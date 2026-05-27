import type { AdoptionRequest } from '@/context/useStaff'
import type { ApiShelter } from '@/services/api'

export type AdoptionStatusFilter = 'ALL' | AdoptionRequest['status']
export type AdoptionShelterFilter = 'ALL' | number

const STATUS_OPTIONS: { value: AdoptionStatusFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'REVIEWING', label: 'Reviewing' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

interface AdminAdoptionsToolbarProps {
  search: string
  status: AdoptionStatusFilter
  shelterId: AdoptionShelterFilter
  shelters: ApiShelter[]
  activeCount: number
  resultCount: number
  totalCount: number
  setSearch: (v: string) => void
  setStatus: (v: AdoptionStatusFilter) => void
  setShelterId: (v: AdoptionShelterFilter) => void
  clearAll: () => void
}

export default function AdminAdoptionsToolbar({
  search,
  status,
  shelterId,
  shelters,
  activeCount,
  resultCount,
  totalCount,
  setSearch,
  setStatus,
  setShelterId,
  clearAll,
}: AdminAdoptionsToolbarProps) {
  return (
    <section
      className='admin-filter-bar a-section'
      style={{ ['--i' as string]: 0.5 }}
      aria-label='Refine adoption queue'
    >
      <div className='admin-filter-head'>
        <div className='admin-filter-eyebrow'>
          <span className='dot' /> Filter the queue
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search applicant, pet, or email…'
            aria-label='Search applications'
          />
        </label>

        <div className='admin-filter-select-wrap'>
          <span className='admin-filter-select-label'>Shelter</span>
          <select
            className='admin-filter-select'
            value={shelterId === 'ALL' ? 'ALL' : String(shelterId)}
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
      </div>

      <div className='admin-filter-group'>
        <span className='admin-filter-group-label'>Status</span>
        <div className='admin-filter-pills'>
          {STATUS_OPTIONS.map((o) => (
            <button
              key={o.value}
              type='button'
              className={`admin-filter-pill${status === o.value ? ' is-active' : ''}`}
              onClick={() => setStatus(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
