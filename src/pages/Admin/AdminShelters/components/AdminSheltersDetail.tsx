import { Link } from 'react-router-dom'
import type { AggregatedShelter } from '../types'

interface AdminSheltersDetailProps {
  selected: AggregatedShelter | null
  canEdit: boolean
}

export default function AdminSheltersDetail({ selected, canEdit }: AdminSheltersDetailProps) {
  if (!selected) {
    return (
      <section className='shelter-detail'>
        <div className='shelter-detail-empty'>
          <div className='shelter-detail-empty-title'>Pick a shelter</div>
          <p style={{ margin: 0 }}>Their roster and contact info will appear here.</p>
        </div>
      </section>
    )
  }

  return (
    <section className='shelter-detail'>
      <div className='shelter-detail-head'>
        <div>
          {selected.city && <div className='shelter-detail-city'>{selected.city}</div>}
          <h2 className='shelter-detail-name'>{selected.name}</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {canEdit && (
            <Link to={`/admin/shelters/${selected.id}/edit`} className='bento-action-btn ghost'>
              Edit shelter →
            </Link>
          )}
          <Link to='/staff/pets' className='bento-action-btn ghost'>
            View pets in staff →
          </Link>
        </div>
      </div>

      <div className='shelter-detail-grid'>
        <div className='shelter-detail-block'>
          <span className='shelter-detail-label'>Address</span>
          <span className='shelter-detail-value'>{selected.address || '—'}</span>
        </div>
        <div className='shelter-detail-block'>
          <span className='shelter-detail-label'>Email</span>
          <span className='shelter-detail-value'>{selected.contactEmail || '—'}</span>
        </div>
        <div className='shelter-detail-block'>
          <span className='shelter-detail-label'>Phone</span>
          <span className='shelter-detail-value'>{selected.phoneNumber || '—'}</span>
        </div>
        <div className='shelter-detail-block'>
          <span className='shelter-detail-label'>Shelter ID</span>
          <span className='shelter-detail-value'>#{selected.id}</span>
        </div>
      </div>

      <div>
        <div className='bento-eyebrow' style={{ margin: '0 0 12px' }}>
          <span className='dot' /> Pet roster
        </div>
        <div className='shelter-pet-roster'>
          <div className='shelter-pet-stat' style={{ borderLeft: '3px solid var(--a-teal)' }}>
            <span className='shelter-pet-stat-num'>{selected.pets.available}</span>
            <span className='shelter-pet-stat-label'>Available</span>
          </div>
          <div className='shelter-pet-stat' style={{ borderLeft: '3px solid var(--a-amber)' }}>
            <span className='shelter-pet-stat-num'>{selected.pets.pending}</span>
            <span className='shelter-pet-stat-label'>Pending</span>
          </div>
          <div className='shelter-pet-stat' style={{ borderLeft: '3px solid var(--a-teal-deep)' }}>
            <span className='shelter-pet-stat-num'>{selected.pets.adopted}</span>
            <span className='shelter-pet-stat-label'>Adopted</span>
          </div>
        </div>
      </div>
    </section>
  )
}
