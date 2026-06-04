import { useEffect } from 'react'
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStaffAuth } from '@/context/useStaffAuth'
import { Compass, Building2, PawPrint, Heart, LogOut } from 'lucide-react'
import '@/styles/staff.css'
import '@/styles/admin.css'

const ADMIN_NAV = [
  { to: '/admin', end: true, icon: <Compass size={16} strokeWidth={1.8} />, label: 'Command Center' },
  { to: '/admin/pets', end: false, icon: <PawPrint size={16} strokeWidth={1.8} />, label: 'Pets' },
  { to: '/admin/adoptions', end: false, icon: <Heart size={16} fill='currentColor' strokeWidth={1.8} />, label: 'Adoptions' },
  { to: '/admin/shelters', end: false, icon: <Building2 size={16} strokeWidth={1.8} />, label: 'Shelters' },
]

export default function AdminLayout() {
  const { isAuthenticated, staffUser, logout } = useStaffAuth()
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
            <LogOut size={14} strokeWidth={1.8} />
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
