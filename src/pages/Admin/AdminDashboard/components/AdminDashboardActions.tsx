import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function AdminDashboardActions() {
  return (
    <article className='bento-card bento-actions a-section' style={{ ['--i' as string]: 6 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Shortcuts
      </div>
      <h3 className='bento-h'>Jump to</h3>
      <Link to='/admin/pets' className='bento-action-btn primary inline-flex items-center gap-1.5'>
        Manage pets <ArrowRight size={14} />
      </Link>
      <Link to='/admin/adoptions' className='bento-action-btn ghost'>
        Open adoptions
      </Link>
    </article>
  )
}
