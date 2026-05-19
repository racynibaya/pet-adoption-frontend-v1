import type { AggregatedShelter } from '../types'

interface AdminSheltersListProps {
  shelters: AggregatedShelter[]
  activeId: number | null
  onSelect: (id: number) => void
}

export default function AdminSheltersList({ shelters, activeId, onSelect }: AdminSheltersListProps) {
  if (shelters.length === 0) {
    return (
      <aside className='shelter-list' aria-label='Shelter list'>
        <div className='shelter-detail-empty' style={{ padding: 32 }}>
          <div className='shelter-detail-empty-title'>No shelters yet</div>
          <p style={{ margin: 0 }}>
            When shelters join the network, they’ll appear here.
          </p>
        </div>
      </aside>
    )
  }

  return (
    <aside className='shelter-list' aria-label='Shelter list'>
      {shelters.map(s => (
        <button
          key={s.id}
          type='button'
          className={`shelter-list-item${activeId === s.id ? ' is-active' : ''}`}
          onClick={() => onSelect(s.id)}
        >
          <div style={{ minWidth: 0 }}>
            <div className='shelter-list-name'>{s.name}</div>
            {s.city && <div className='shelter-list-city'>{s.city}</div>}
          </div>
          <span className='shelter-list-count'>{s.pets.total}</span>
        </button>
      ))}
    </aside>
  )
}
