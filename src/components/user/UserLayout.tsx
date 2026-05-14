import { useEffect } from 'react'
import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdopter } from '@/context/useUser'
import PawIcon from '@/icons/PawIcon'
import '@/styles/user.css'

export default function UserLayout() {
  const { isAuthenticated, adopter, signOut } = useAdopter()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.key])

  if (!isAuthenticated || !adopter) {
    return <Navigate to='/' replace />
  }

  async function handleSignOut() {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className='user-portal'>
      <div className='user-topbar'>
        <Link to='/' className='user-topbar-brand' aria-label='Back to KodaNest'>
          <PawIcon width={22} height={22} />
          <span className='user-topbar-brand-text'>KodaNest</span>
        </Link>
        <div className='user-topbar-actions'>
          <Link to='/pets' className='user-btn user-btn-ghost'>Browse pets</Link>
          <button
            type='button'
            onClick={handleSignOut}
            className='user-btn user-btn-ghost'
          >
            Sign out
          </button>
        </div>
      </div>

      <div key={location.key} className='user-portal-enter'>
        <Outlet />
      </div>
    </div>
  )
}
