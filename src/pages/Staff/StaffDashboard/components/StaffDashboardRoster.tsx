import type { PetCard } from '@/data/pets'
import { ageLabel, speciesLabel } from '@/data/pets'

interface StaffDashboardRosterProps {
  pets: PetCard[]
  selectedId: number | null
  onSelect: (id: number) => void
}

function statusPill(status: PetCard['status']) {
  if (status === 'AVAILABLE')
    return <span className='staff-pill is-available'>Available</span>
  if (status === 'PENDING')
    return <span className='staff-pill is-pending'>In review</span>
  return <span className='staff-pill is-adopted'>Placed</span>
}

function listedLabel(id: number): string {
  const daysAgo = ((id * 7) % 42) + 1
  if (daysAgo === 1) return 'Yesterday'
  if (daysAgo < 7) return `${daysAgo}d ago`
  if (daysAgo < 14) return '1w ago'
  if (daysAgo < 21) return '2w ago'
  if (daysAgo < 28) return '3w ago'
  return `${Math.floor(daysAgo / 7)}w ago`
}

export default function StaffDashboardRoster({
  pets,
  selectedId,
  onSelect,
}: StaffDashboardRosterProps) {
  return (
    <article
      className='staff-roster sd-section'
      style={{ ['--i' as string]: 3 }}
      aria-label='Pet roster'
    >
      <header className='staff-roster-head'>
        <div>
          <h2 className='staff-roster-h'>
            Your <em>roster</em>
          </h2>
          <p className='staff-roster-sub'>
            {pets.length === 1 ? '1 pet' : `${pets.length} pets`} matching your filters.
            Click a row to inspect.
          </p>
        </div>
      </header>

      {pets.length === 0 ? (
        <div className='staff-roster-empty'>
          <h3 className='staff-roster-empty-title'>No pets match those filters.</h3>
          <p>Try widening the status or species, or clear the filters above.</p>
        </div>
      ) : (
        <div className='staff-roster-table' role='table'>
          <div className='staff-roster-thead' role='row'>
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
                className={`staff-roster-row${isSelected ? ' is-selected' : ''}`}
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
                <div className='staff-roster-pet'>
                  <div
                    className='staff-roster-avatar'
                    style={{ background: pet.bg }}
                    aria-hidden
                  >
                    {pet.imageUrl ? (
                      <img src={pet.imageUrl} alt='' />
                    ) : (
                      pet.svg
                    )}
                  </div>
                  <div className='staff-roster-petmeta'>
                    <div className='staff-roster-petname'>{pet.name}</div>
                    <div className='staff-roster-petbreed'>
                      {speciesLabel(pet.species)} · {pet.breed} · {ageLabel(pet.ageMonths)}
                    </div>
                  </div>
                </div>
                <div className='staff-roster-shelter'>
                  {pet.shelterName}
                  {pet.shelterCity && (
                    <div className='staff-roster-shelter-city'>{pet.shelterCity}</div>
                  )}
                </div>
                <div>{statusPill(pet.status)}</div>
                <div className='staff-roster-date'>{listedLabel(pet.id)}</div>
                <div className='staff-roster-more-cell'>
                  <button
                    type='button'
                    className='staff-roster-more'
                    aria-label={`More actions for ${pet.name}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelect(pet.id)
                    }}
                  >
                    ⋯
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </article>
  )
}
