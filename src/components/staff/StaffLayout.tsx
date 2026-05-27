import { useState } from 'react';
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useStaff } from '@/context/useStaff';
import '@/styles/staff.css';

function IconGrid() {
  return (
    <svg width='17' height='17' viewBox='0 0 24 24' fill='none'>
      <rect
        x='3'
        y='3'
        width='8'
        height='8'
        rx='2'
        fill='currentColor'
        opacity='0.9'
      />
      <rect
        x='13'
        y='3'
        width='8'
        height='8'
        rx='2'
        fill='currentColor'
        opacity='0.9'
      />
      <rect
        x='3'
        y='13'
        width='8'
        height='8'
        rx='2'
        fill='currentColor'
        opacity='0.9'
      />
      <rect
        x='13'
        y='13'
        width='8'
        height='8'
        rx='2'
        fill='currentColor'
        opacity='0.9'
      />
    </svg>
  );
}

function IconPaw() {
  return (
    <svg width='17' height='17' viewBox='0 0 24 24' fill='none'>
      <ellipse cx='6' cy='9' rx='2' ry='2.8' fill='currentColor' />
      <ellipse cx='11' cy='6.5' rx='1.8' ry='2.4' fill='currentColor' />
      <ellipse cx='16' cy='7.5' rx='1.8' ry='2.4' fill='currentColor' />
      <ellipse cx='19' cy='11' rx='1.8' ry='2.4' fill='currentColor' />
      <path
        d='M12.5 11c-3.3 0-6.5 2.5-6.5 5.5 0 1.7 1.3 3 3 3 1 0 1.8-.4 2.6-.7.6-.2 1.2-.4 1.9-.4s1.3.2 1.9.4c.8.3 1.6.7 2.6.7 1.7 0 3-1.3 3-3 0-3-3.2-5.5-6.5-5.5Z'
        fill='currentColor'
      />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width='17' height='17' viewBox='0 0 24 24' fill='none'>
      <path
        d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
        fill='currentColor'
      />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none'>
      <path
        d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <polyline
        points='16 17 21 12 16 7'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <line
        x1='21'
        y1='12'
        x2='9'
        y2='12'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
}

const NAV = [
  { to: '/staff', end: true, icon: <IconGrid />, label: 'Dashboard' },
  { to: '/staff/pets', end: false, icon: <IconPaw />, label: 'Pets' },
  {
    to: '/staff/adoptions',
    end: false,
    icon: <IconHeart />,
    label: 'Adoptions',
  },
];

export default function StaffLayout() {
  const { isAuthenticated, staffUser, visiblePets, logout } = useStaff();
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
                background: 'linear-gradient(135deg, #E8923C 0%, #CB7730 100%)',
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
                background: 'linear-gradient(135deg, #E8923C, #CB7730)',
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
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M3 10.5L12 3l9 7.5V21H3V10.5Z"
                        fill="rgba(232,146,60,0.25)"
                        stroke="#E8923C"
                        strokeWidth="2.2"
                        strokeLinejoin="round"
                      />
                    </svg>
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
              <span aria-hidden style={{ opacity: 0.7 }}>
                ↗
              </span>
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
            <IconLogout />
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
          background: '#f5f2ec',
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
            <svg width='18' height='18' viewBox='0 0 20 20' fill='none'>
              <path
                d='M3 5 H17 M3 10 H17 M3 15 H17'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </button>
          <span className='staff-mobile-topbar-brand'>{currentLabel}</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
