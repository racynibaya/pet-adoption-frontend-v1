import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PawIcon from '@/icons/PawIcon';
import CartIcon from '@/icons/CartIcon';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/pets', label: 'Browse Pets' },
  { to: '/shelters', label: 'Shelters' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            aria-label='Cart'
            onClick={() => {
              console.log('Add to cart');
            }}
          >
            <CartIcon />
            <span className='dot' />
          </button>
          <button className='btn btn-outline btn-sm nav-login'>
            Login or Sign up
          </button>
          <button
            className='nav-hamburger'
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path
                  d='M4 4 L16 16 M16 4 L4 16'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            ) : (
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path
                  d='M3 5 H17 M3 10 H17 M3 15 H17'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            )}
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
          <button className='btn btn-primary' style={{ marginTop: 12 }}>
            Login or Sign up
          </button>
        </nav>
      )}
    </header>
  );
}
