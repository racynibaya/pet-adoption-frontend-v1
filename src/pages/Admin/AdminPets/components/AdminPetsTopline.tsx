import { Link } from 'react-router-dom';

interface AdminPetsToplineProps {
  firstName: string;
  initials: string | undefined;
  date: string;
  time: string;
  search: string;
  onSearch: (v: string) => void;
}

export default function AdminPetsTopline({
  firstName,
  initials,
  date,
  time,
  search,
  onSearch,
}: AdminPetsToplineProps) {
  return (
    <header className='admin-topbar a-section' style={{ ['--i' as string]: 0 }}>
      <div className='admin-topbar-title'>
        <span className='admin-topbar-eyebrow'>
          <span className='pulse-dot' aria-hidden />
          Pet Roster
        </span>
        <h1 className='admin-topbar-name'>
          Manage pets, <em>{firstName}</em>
        </h1>
      </div>

      <span className='admin-topbar-spacer' />

      <label className='admin-topbar-search'>
        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' aria-hidden>
          <circle
            cx='11'
            cy='11'
            r='7'
            stroke='currentColor'
            strokeWidth='1.7'
          />
          <path
            d='m20 20-3.5-3.5'
            stroke='currentColor'
            strokeWidth='1.7'
            strokeLinecap='round'
          />
        </svg>
        <input
          type='search'
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder='Search pets, breeds, shelters…'
          aria-label='Quick search'
        />
        <kbd>⌘K</kbd>
      </label>

      <Link to='/admin/pets/add' className='bento-action-btn primary'>
        New pet
      </Link>

      <div className='admin-topbar-clock' aria-live='polite'>
        <span>{date}</span>
        <span className='admin-topbar-clock-now'>{time}</span>
      </div>

      <div className='admin-topbar-orb' aria-hidden>
        <span>{initials ?? 'A'}</span>
      </div>
    </header>
  );
}
