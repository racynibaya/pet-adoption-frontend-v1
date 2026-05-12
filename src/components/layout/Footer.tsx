import { useState } from 'react';
import { Link } from 'react-router-dom';
import PawIcon from '@/icons/PawIcon';

const KODANEST_LINKS = [
  { label: 'About us', to: '/about' },
  { label: 'Browse Pets', to: '/pets' },
  { label: 'Shelters', to: '/shelters' },
  { label: 'Contact', to: '/contact' },
];

const SUPPORT_LINKS = [
  { label: 'Help center', to: '/contact' },
  { label: 'Pet emergency', to: '/contact' },
  { label: 'Adoption guide', to: '/about' },
  { label: 'Anti-discrimination', to: '/about' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className='footer'>
      <div className='wrap'>
        <div className='footer-top'>
          <div>
            <Link to='/' className='logo' style={{ color: '#fff' }}>
              <span
                className='logo-mark'
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderColor: 'rgba(255,255,255,0.12)',
                }}
              >
                <PawIcon />
              </span>
              <span style={{ color: '#fff' }}>KodaNest</span>
            </Link>
            <p
              style={{
                color: '#c8cbd6',
                marginTop: 16,
                fontSize: 14,
                maxWidth: 320,
              }}
            >
              A warm, generous platform for pet adoption. Built for pets and the
              people who love them.
            </p>
            <div className='footer-newsletter'>
              <input
                type='email'
                placeholder='Email for monthly stories'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type='button' onClick={() => setEmail('')}>
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h4>KodaNest</h4>
            <ul>
              {KODANEST_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Support</h4>
            <ul>
              {SUPPORT_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <ul>
              <li>1-800-KODA-NEST</li>
              <li>hello@kodanest.co</li>
              <li>San Agustin · Manila · Siargao</li>
            </ul>
          </div>
        </div>

        <div className='footer-bottom'>
          <span>© 2026 KodaNest, Inc. · A pet adoption marketplace.</span>
          <div style={{ display: 'flex', gap: 18 }}>
            <a href='#'>Terms</a>
            <a href='#'>Privacy</a>
            <a href='#'>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
