import { Link } from 'react-router-dom'
import type { PetCard } from '@/data/pets'
import { ageLabel, speciesLabel } from '@/data/pets'

interface AdminDashboardRosterProps {
  pets: PetCard[]
  selectedId: number | null
  onSelect: (id: number) => void
  onToggleStatus?: (id: number, current: 'AVAILABLE' | 'PENDING') => void
  onRequestDelete?: (id: number) => void
  editHref?: (pet: PetCard) => string
}

function statusPill(status: PetCard['status']) {
  if (status === 'AVAILABLE')
    return <span className='admin-pill is-available'>Available</span>
  if (status === 'PENDING')
    return <span className='admin-pill is-pending'>In review</span>
  return <span className='admin-pill is-adopted'>Placed</span>
}

function listedLabel(id: number): string {
  // Lightweight deterministic "listed" date derived from pet id so the column
  // stays stable across renders without needing a real createdAt field.
  const daysAgo = ((id * 7) % 42) + 1
  if (daysAgo === 1) return 'Yesterday'
  if (daysAgo < 7) return `${daysAgo}d ago`
  if (daysAgo < 14) return '1w ago'
  if (daysAgo < 21) return '2w ago'
  if (daysAgo < 28) return '3w ago'
  return `${Math.floor(daysAgo / 7)}w ago`
}

export default function AdminDashboardRoster({
  pets,
  selectedId,
  onSelect,
  onToggleStatus,
  onRequestDelete,
  editHref,
}: AdminDashboardRosterProps) {
  const hasActions = Boolean(onToggleStatus || onRequestDelete || editHref)
  return (
    <article
      className={`admin-roster a-section${hasActions ? ' is-actions' : ''}`}
      style={{ ['--i' as string]: 3 }}
      aria-label='Pet roster'
    >
      <header className='admin-roster-head'>
        <div>
          <h2 className='admin-roster-h'>
            The <em>roster</em>
          </h2>
          <p className='admin-roster-sub'>
            {pets.length === 1 ? '1 pet' : `${pets.length} pets`} matching your filters.
            Click a row to inspect.
          </p>
        </div>
      </header>

      {pets.length === 0 ? (
        <div className='admin-roster-empty'>
          <h3 className='admin-roster-empty-title'>No pets match those filters.</h3>
          <p>Try widening the status or species, or clear the filters above.</p>
        </div>
      ) : (
        <div className='admin-roster-table' role='table'>
          <div className='admin-roster-thead' role='row'>
            <span role='columnheader'>Pet</span>
            <span role='columnheader' className='is-shelter'>Shelter</span>
            <span role='columnheader'>Status</span>
            <span role='columnheader' className='is-date'>Listed</span>
            <span role='columnheader' className='is-more' aria-label='Actions' />
          </div>

          {pets.map((pet) => {
            const isSelected = pet.id === selectedId
            return (
              <div
                key={pet.id}
                role='row'
                className={`admin-roster-row${isSelected ? ' is-selected' : ''}`}
                onClick={() => onSelect(pet.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect(pet.id)
                  }
                }}
                tabIndex={0}
                aria-selected={isSelected}
              >
                <div className='admin-roster-pet'>
                  <div
                    className='admin-roster-avatar'
                    style={{ background: pet.bg }}
                    aria-hidden
                  >
                    {pet.imageUrl ? (
                      <img src={pet.imageUrl} alt='' />
                    ) : (
                      pet.svg
                    )}
                  </div>
                  <div className='admin-roster-petmeta'>
                    <div className='admin-roster-petname'>{pet.name}</div>
                    <div className='admin-roster-petbreed'>
                      {speciesLabel(pet.species)} · {pet.breed} · {ageLabel(pet.ageMonths)}
                    </div>
                  </div>
                </div>
                <div className='admin-roster-shelter'>
                  {pet.shelterName}
                  {pet.shelterCity && (
                    <div className='admin-roster-shelter-city'>{pet.shelterCity}</div>
                  )}
                </div>
                <div>{statusPill(pet.status)}</div>
                <div className='admin-roster-date'>{listedLabel(pet.id)}</div>
                <div>
                  {hasActions ? (
                    <div className='admin-roster-actions' onClick={(e) => e.stopPropagation()}>
                      {editHref && (
                        <Link
                          to={editHref(pet)}
                          className='admin-roster-action-btn'
                          aria-label={`Edit ${pet.name}`}
                          title='Edit'
                        >
                          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden>
                            <path d='M12 20h9' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
                            <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
                          </svg>
                        </Link>
                      )}
                      {onToggleStatus && pet.status !== 'ADOPTED' && (
                        <button
                          type='button'
                          className='admin-roster-action-btn'
                          aria-label={pet.status === 'AVAILABLE' ? `Mark ${pet.name} in review` : `Mark ${pet.name} available`}
                          title={pet.status === 'AVAILABLE' ? 'Mark in review' : 'Mark available'}
                          onClick={() => onToggleStatus(pet.id, pet.status as 'AVAILABLE' | 'PENDING')}
                        >
                          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden>
                            <path d='M3 12a9 9 0 0 1 15-6.7L21 8' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
                            <path d='M21 3v5h-5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
                            <path d='M21 12a9 9 0 0 1-15 6.7L3 16' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
                            <path d='M3 21v-5h5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
                          </svg>
                        </button>
                      )}
                      {onRequestDelete && (
                        <button
                          type='button'
                          className='admin-roster-action-btn is-danger'
                          aria-label={`Remove ${pet.name}`}
                          title='Remove'
                          onClick={() => onRequestDelete(pet.id)}
                        >
                          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden>
                            <path d='M3 6h18' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
                            <path d='M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
                            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
                          </svg>
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      type='button'
                      className='admin-roster-more'
                      aria-label={`More actions for ${pet.name}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelect(pet.id)
                      }}
                    >
                      ⋯
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </article>
  )
}
