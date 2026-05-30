import type { AggregatedShelter } from '../types'

interface AdminSheltersListProps {
  shelters: AggregatedShelter[]
  activeId: number | null
  onSelect: (id: number) => void
}

export default function AdminSheltersList({ shelters, activeId, onSelect }: AdminSheltersListProps) {
  return (
    <article
      className='admin-roster a-section'
      style={{ ['--i' as string]: 3 }}
      aria-label='Shelter roster'
    >
      <header className='admin-roster-head'>
        <div>
          <h2 className='admin-roster-h'>
            The <em>shelters</em>
          </h2>
          <p className='admin-roster-sub'>
            {shelters.length === 1 ? '1 shelter' : `${shelters.length} shelters`} on the network.
            Click a row to inspect.
          </p>
        </div>
      </header>

      {shelters.length === 0 ? (
        <div className='admin-roster-empty'>
          <h3 className='admin-roster-empty-title'>No shelters yet.</h3>
          <p>When shelters join the network, they'll appear here.</p>
        </div>
      ) : (
        <div className='shelter-roster-list'>
          {shelters.map((s) => {
            const isActive = activeId === s.id
            return (
              <button
                key={s.id}
                type='button'
                className={`shelter-list-item${isActive ? ' is-active' : ''}`}
                onClick={() => onSelect(s.id)}
                aria-selected={isActive}
              >
                <div style={{ minWidth: 0 }}>
                  <div className='shelter-list-name'>{s.name}</div>
                  {s.city && <div className='shelter-list-city'>{s.city}</div>}
                </div>
                <span className='shelter-list-count'>{s.pets.total}</span>
              </button>
            )
          })}
        </div>
      )}
    </article>
  )
}
