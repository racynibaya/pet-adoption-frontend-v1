import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PawIcon from '@/icons/PawIcon';
import { Heart, Menu, X } from 'lucide-react';
import AuthModal from '@/components/ui/AuthModal';
import { useFavorites } from '@/context/useFavorites';
import { useAdopter } from '@/context/useUser';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/pets', label: 'Browse Pets' },
  { to: '/shelters', label: 'Shelters' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/donate', label: 'Donate' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { saved, openDrawer } = useFavorites();
  const { isAuthenticated, adopter } = useAdopter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={scrolled ? 'nav nav-scrolled' : 'nav'}>
      <div className='nav-inner'>
        <Link to='/' className='logo' aria-label='KodaNest home'>
          <span className='logo-mark'>
            <PawIcon />
          </span>
          KodaNest
        </Link>

        <nav className='nav-links'>
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={pathname === to ? 'active' : ''}>
              {label}
            </Link>
          ))}
        </nav>

        <div className='nav-right'>
          <button
            className='nav-cart'
            aria-label={saved.length > 0 ? `Saved pets (${saved.length})` : 'Saved pets'}
            onClick={openDrawer}
          >
            <Heart size={18} fill={saved.length > 0 ? 'currentColor' : 'none'} strokeWidth={2} />
            {saved.length > 0 && (
              <span className='nav-saved-count'>{saved.length}</span>
            )}
          </button>
          <Link to='/donate' className='btn btn-primary btn-sm nav-donate'>
            Donate
          </Link>
          {isAuthenticated && adopter ? (
            <Link
              to='/users/me'
              className='nav-account'
              aria-label={`Open ${adopter.firstName || 'your'} dashboard`}
            >
              <span className='nav-account-orb' aria-hidden>{adopter.initials || 'KN'}</span>
              <span className='nav-account-name'>{adopter.firstName || 'Account'}</span>
            </Link>
          ) : (
            <button
              className='btn btn-outline btn-sm nav-login'
              onClick={() => { setAuthMode('signin'); setAuthOpen(true); }}
            >
              <span className='nav-login-long'>Login or Sign up</span>
              <span className='nav-login-short'>Sign in</span>
            </button>
          )}
          <button
            className='nav-hamburger'
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className='nav-mobile-menu'>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={pathname === to ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated && adopter ? (
            <Link
              to='/users/me'
              className='btn btn-primary'
              style={{ marginTop: 12 }}
              onClick={() => setMenuOpen(false)}
            >
              Open my dashboard
            </Link>
          ) : (
            <button
              className='btn btn-primary'
              style={{ marginTop: 12 }}
              onClick={() => { setAuthMode('signin'); setAuthOpen(true); setMenuOpen(false); }}
            >
              Login or Sign up
            </button>
          )}
        </nav>
      )}

      <AuthModal
        isOpen={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onModeChange={setAuthMode}
      />
    </header>
  );
}
