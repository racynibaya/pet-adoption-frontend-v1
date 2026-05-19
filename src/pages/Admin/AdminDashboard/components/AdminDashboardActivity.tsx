import type { Activity } from '../types'

interface AdminDashboardActivityProps {
  activity: Activity[]
}

export default function AdminDashboardActivity({ activity }: AdminDashboardActivityProps) {
  return (
    <article className='bento-card bento-activity a-section' style={{ ['--i' as string]: 5 }}>
      <div className='bento-eyebrow'>
        <span className='dot' style={{ background: 'var(--a-teal)' }} /> Recent activity
      </div>
      <h3 className='bento-h'>Across the network</h3>
      {activity.length === 0 ? (
        <p className='bento-sub'>Nothing to report yet.</p>
      ) : (
        <ul>
          {activity.map(ev => (
            <li key={ev.id}>
              <span className={`bento-activity-dot${ev.tone === 'teal' ? ' is-teal' : ev.tone === 'rose' ? ' is-rose' : ''}`} />
              <span className='bento-activity-text'>
                <strong>{ev.actor}</strong> {ev.verb} <strong>{ev.subject}</strong>
              </span>
              <span className='bento-activity-time'>{ev.time}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
