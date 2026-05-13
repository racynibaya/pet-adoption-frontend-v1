import { useEffect } from 'react'
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStaff } from '@/context/useStaff'
import '@/styles/admin.css'

function IconCompass() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
      <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.8' />
      <path d='M16 8l-2.5 5.5L8 16l2.5-5.5L16 8z' fill='currentColor' />
    </svg>
  )
}
function IconBuildings() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
      <path d='M3 21V9l5-3 5 3v12' stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round' />
      <path d='M13 21V13l4-2 4 2v8' stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round' />
      <path d='M6 13h2M6 17h2M16 16h2' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
    </svg>
  )
}
function IconPaw() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
      <ellipse cx='6' cy='9' rx='1.8' ry='2.4' fill='currentColor' />
      <ellipse cx='10.5' cy='6.8' rx='1.6' ry='2.1' fill='currentColor' />
      <ellipse cx='15.5' cy='7.5' rx='1.6' ry='2.1' fill='currentColor' />
      <ellipse cx='18' cy='10.5' rx='1.6' ry='2.1' fill='currentColor' />
      <path d='M12 11c-3 0-5.8 2.2-5.8 5 0 1.5 1.2 2.7 2.7 2.7 1.4 0 2-.8 3.1-.8 1.1 0 1.7.8 3.1.8 1.5 0 2.7-1.2 2.7-2.7 0-2.8-2.8-5-5.8-5z' fill='currentColor' />
    </svg>
  )
}
function IconHeart() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
      <path d='M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z' fill='currentColor' />
    </svg>
  )
}
function IconSignOut() {
  return (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
      <polyline points='16 17 21 12 16 7' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
      <line x1='21' y1='12' x2='9' y2='12' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
    </svg>
  )
}

const ADMIN_NAV = [
  { to: '/admin', end: true, icon: <IconCompass />, label: 'Command Center' },
  { to: '/admin/shelters', end: false, icon: <IconBuildings />, label: 'Shelters' },
]

const STAFF_BRIDGE = [
  { to: '/staff/pets', icon: <IconPaw />, label: 'Pets' },
  { to: '/staff/adoptions', icon: <IconHeart />, label: 'Adoptions' },
]

export default function AdminLayout() {
  const { isAuthenticated, staffUser, logout } = useStaff()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.key])

  if (!isAuthenticated) return <Navigate to='/staff/login' replace />
  if (staffUser?.role !== 'ADMIN') return <Navigate to='/staff' replace />

  async function handleLogout() {
    await logout()
    navigate('/staff/login', { replace: true })
  }

  return (
    <div className='admin-portal'>
      <aside className='admin-sidebar' aria-label='Admin navigation'>
        <div className='admin-brand'>
          <div className='admin-brand-mark' aria-hidden>
            <div className='admin-brand-mark-inner'>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                <ellipse cx='6' cy='9' rx='2' ry='2.8' fill='#f5efde' />
                <ellipse cx='11' cy='6.5' rx='1.8' ry='2.4' fill='#f5efde' />
                <ellipse cx='16' cy='7.5' rx='1.8' ry='2.4' fill='#f5efde' />
                <ellipse cx='19' cy='11' rx='1.8' ry='2.4' fill='#f5efde' />
                <path d='M12.5 11c-3.3 0-6.5 2.5-6.5 5.5 0 1.7 1.3 3 3 3 1 0 1.8-.4 2.6-.7.6-.2 1.2-.4 1.9-.4s1.3.2 1.9.4c.8.3 1.6.7 2.6.7 1.7 0 3-1.3 3-3 0-3-3.2-5.5-6.5-5.5Z' fill='#f5efde' />
              </svg>
            </div>
          </div>
          <div className='admin-brand-text'>
            <span className='admin-brand-name'>KodaNest</span>
            <span className='admin-brand-kicker'>Admin · Command</span>
          </div>
        </div>

        <nav className='admin-nav'>
          <div className='admin-nav-section'>Oversight</div>
          {ADMIN_NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-item${isActive ? ' active' : ''}`}
            >
              <span className='a-nav-icon'>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className='admin-nav-section'>Staff tools</div>
          {STAFF_BRIDGE.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className='admin-nav-item admin-nav-external'
            >
              <span className='a-nav-icon'>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className='admin-user-block'>
          <div className='admin-user-row'>
            <div className='admin-user-orb' aria-hidden>{staffUser.initials}</div>
            <div className='admin-user-meta'>
              <div className='admin-user-name'>{staffUser.name}</div>
              <div className='admin-user-role'>{staffUser.role}</div>
            </div>
          </div>
          <button
            type='button'
            onClick={handleLogout}
            className='admin-signout'
          >
            <IconSignOut />
            Sign out
          </button>
        </div>
      </aside>

      <main className='admin-main'>
        <div key={location.key} className='admin-portal-enter'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
