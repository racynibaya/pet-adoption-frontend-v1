import { useState } from 'react';
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useStaffAuth } from '@/context/useStaffAuth';
import { useStaffScopedPets } from '@/context/selectors';
import { LayoutGrid, PawPrint, Heart, LogOut, House, Menu, ArrowUpRight } from 'lucide-react';
import '@/styles/staff.css';

const NAV = [
  { to: '/staff', end: true, icon: <LayoutGrid size={17} strokeWidth={2} />, label: 'Dashboard' },
  { to: '/staff/pets', end: false, icon: <PawPrint size={17} strokeWidth={2} />, label: 'Pets' },
  {
    to: '/staff/adoptions',
    end: false,
    icon: <Heart size={17} fill='currentColor' strokeWidth={2} />,
    label: 'Adoptions',
  },
];

export default function StaffLayout() {
  const { isAuthenticated, staffUser, logout } = useStaffAuth();
  const visiblePets = useStaffScopedPets();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  if (!isAuthenticated) return <Navigate to='/staff/login' replace />;

  function handleLogout() {
    logout();
    navigate('/staff/login', { replace: true });
  }

  const currentLabel =
    NAV.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)))
      ?.label ?? 'Staff';

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ── Sidebar ── */}
      <nav
        className={`staff-sidebar${sidebarOpen ? ' open' : ''}`}
        style={{
          width: 232,
          flexShrink: 0,
          background: '#162424',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 50,
          overflowY: 'auto',
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: '22px 18px 18px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, var(--rausch) 0%, var(--rausch-active) 100%)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                <ellipse cx='6' cy='9' rx='2' ry='2.8' fill='white' />
                <ellipse cx='11' cy='6.5' rx='1.8' ry='2.4' fill='white' />
                <ellipse cx='16' cy='7.5' rx='1.8' ry='2.4' fill='white' />
                <ellipse cx='19' cy='11' rx='1.8' ry='2.4' fill='white' />
                <path
                  d='M12.5 11c-3.3 0-6.5 2.5-6.5 5.5 0 1.7 1.3 3 3 3 1 0 1.8-.4 2.6-.7.6-.2 1.2-.4 1.9-.4s1.3.2 1.9.4c.8.3 1.6.7 2.6.7 1.7 0 3-1.3 3-3 0-3-3.2-5.5-6.5-5.5Z'
                  fill='white'
                />
              </svg>
            </div>
            <div>
              <div
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 14.5,
                  lineHeight: 1.15,
                  fontFamily: 'var(--font-display)',
                }}
              >
                KodaNest
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.32)',
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  marginTop: 1,
                }}
              >
                Staff Portal
              </div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, padding: '10px 10px' }}>
          <div
            style={{
              marginBottom: 4,
              padding: '8px 8px 4px',
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.22)',
            }}
          >
            Menu
          </div>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `staff-nav-item${isActive ? ' active' : ''}`
              }
            >
              <span style={{ flexShrink: 0, opacity: 0.8 }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* User section */}
        <div
          style={{
            padding: '12px 14px 22px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                background: 'linear-gradient(135deg, var(--rausch), var(--rausch-active))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              {staffUser?.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: 13,
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {staffUser?.name}
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: 11.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {staffUser?.role}
              </div>
              {staffUser?.role === 'STAFF' && staffUser.shelterIds.length > 0 && (() => {
                const shelterId = staffUser.shelterIds[0]
                const shelterName =
                  visiblePets.find((p) => p.shelterId === shelterId)?.shelterName ??
                  `Shelter #${shelterId}`
                return (
                  <div
                    style={{
                      marginTop: 5,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '3px 8px 3px 6px',
                      background: 'rgba(232,146,60,0.12)',
                      border: '1px solid rgba(232,146,60,0.24)',
                      borderRadius: 6,
                      maxWidth: '100%',
                    }}
                  >
                    <House size={10} color='var(--rausch)' strokeWidth={2.2} aria-hidden />
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        color: 'rgba(255,210,140,0.82)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {shelterName}
                    </span>
                  </div>
                )
              })()}
            </div>
          </div>
          {staffUser?.role === 'ADMIN' && (
            <Link
              to='/admin'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 6,
                padding: '8px 12px',
                marginBottom: 8,
                background: 'rgba(232,146,60,0.10)',
                border: '1px solid rgba(232,146,60,0.22)',
                borderRadius: 9,
                color: 'rgba(255,221,170,0.92)',
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'background 0.14s, color 0.14s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  'rgba(232,146,60,0.18)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  'rgba(232,146,60,0.10)';
                (e.currentTarget as HTMLAnchorElement).style.color =
                  'rgba(255,221,170,0.92)';
              }}
            >
              Admin view
              <ArrowUpRight size={14} aria-hidden style={{ opacity: 0.7 }} />
            </Link>
          )}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 9,
              color: 'rgba(255,255,255,0.45)',
              cursor: 'pointer',
              fontSize: 12.5,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'background 0.14s, color 0.14s',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'rgba(255,255,255,0.09)';
              (e.currentTarget as HTMLButtonElement).style.color =
                'rgba(255,255,255,0.65)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLButtonElement).style.color =
                'rgba(255,255,255,0.45)';
            }}
          >
            <LogOut size={15} strokeWidth={2} />
            Sign out
          </button>
        </div>
      </nav>

      {/* Mobile backdrop */}
      <div
        className={`staff-sidebar-backdrop${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden='true'
      />

      {/* ── Main area ── */}
      <div
        className='staff-main'
        style={{
          marginLeft: 232,
          flex: 1,
          minWidth: 0,
          background: '#f5efde',
          minHeight: '100vh',
        }}
      >
        {/* Mobile topbar */}
        <div className='staff-mobile-topbar'>
          <button
            className='staff-mobile-topbar-toggle'
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <Menu size={18} strokeWidth={2} />
          </button>
          <span className='staff-mobile-topbar-brand'>{currentLabel}</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
