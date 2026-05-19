import { Link } from 'react-router-dom'
import type { ShelterRow } from '../types'

interface AdminDashboardSheltersProps {
  shelters: ShelterRow[]
}

export default function AdminDashboardShelters({ shelters }: AdminDashboardSheltersProps) {
  return (
    <article className='bento-card bento-shelters a-section' style={{ ['--i' as string]: 2 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Shelter spotlight
      </div>
      <h3 className='bento-h'>Top by pet count</h3>
      {shelters.length === 0 ? (
        <p className='bento-sub'>No shelter data yet.</p>
      ) : (
        <ol>
          {shelters.map((s, i) => (
            <li key={s.name} className='bento-shelter-row'>
              <span className='bento-shelter-rank'>{String(i + 1).padStart(2, '0')}</span>
              <div style={{ minWidth: 0 }}>
                <div className='bento-shelter-name'>{s.name}</div>
                {s.city && <div className='bento-shelter-city'>{s.city}</div>}
              </div>
              <span className='bento-shelter-count'>{s.count}</span>
            </li>
          ))}
        </ol>
      )}
      <Link
        to='/admin/shelters'
        className='bento-pending-link'
        style={{ marginTop: 'auto', paddingTop: 14 }}
      >
        Open shelter directory →
      </Link>
    </article>
  )
}
