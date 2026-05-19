import { Link } from 'react-router-dom'

interface AdminDashboardPendingProps {
  pendingApps: number
}

export default function AdminDashboardPending({ pendingApps }: AdminDashboardPendingProps) {
  return (
    <Link
      to='/staff/adoptions'
      className='bento-card bento-pending is-link a-section'
      style={{ ['--i' as string]: 4 }}
    >
      <div className='bento-eyebrow'>
        <span className='dot' style={{ background: 'var(--a-rose)' }} /> Awaiting action
      </div>
      <div className='bento-pending-num'>{pendingApps}</div>
      <p className='bento-sub' style={{ marginTop: 6 }}>
        Applications need a first look.
      </p>
      <span className='bento-pending-link' style={{ marginTop: 'auto' }}>
        Review queue →
      </span>
    </Link>
  )
}
