import { Link } from 'react-router-dom'

export default function AdminShelterFormAccessDenied() {
  return (
    <div className='asf-page'>
      <header className='asf-head a-section' style={{ ['--i' as string]: 0 }}>
        <div>
          <div className='asf-head-crumb'>
            <Link to='/admin/shelters'>Shelters</Link>
            <span className='asf-head-crumb-sep'>›</span>
            <span>Access restricted</span>
          </div>
          <div className='asf-head-eyebrow'>
            <span className='dot' aria-hidden />
            Restricted
          </div>
          <h1 className='asf-head-title'>Admins only</h1>
        </div>
      </header>

      <section className='bento-card a-section' style={{ ['--i' as string]: 1 }}>
        <div className='asf-notice'>
          <div className='asf-notice-eyebrow'>Permission required</div>
          <h2 className='asf-notice-title'>This action is for administrators</h2>
          <p className='asf-notice-body'>
            Creating and editing partner shelters is reserved for admins. If you
            need access, ask another administrator to update your role.
          </p>
          <div className='asf-notice-actions'>
            <Link to='/admin/shelters' className='bento-action-btn primary'>
              Back to shelters
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
