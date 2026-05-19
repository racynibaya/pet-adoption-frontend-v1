import { Link } from 'react-router-dom'

export default function AdminDashboardActions() {
  return (
    <article className='bento-card bento-actions a-section' style={{ ['--i' as string]: 6 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Shortcuts
      </div>
      <h3 className='bento-h'>Jump to</h3>
      <Link to='/staff/pets/add' className='bento-action-btn primary'>
        Add a pet →
      </Link>
      <Link to='/staff/adoptions' className='bento-action-btn ghost'>
        Open adoptions
      </Link>
    </article>
  )
}
