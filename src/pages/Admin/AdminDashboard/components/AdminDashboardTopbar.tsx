import { Search } from 'lucide-react'

interface AdminDashboardTopbarProps {
  firstName: string
  initials: string | undefined
  date: string
  time: string
  search: string
  onSearch: (v: string) => void
}

export default function AdminDashboardTopbar({
  firstName,
  initials,
  date,
  time,
  search,
  onSearch,
}: AdminDashboardTopbarProps) {
  return (
    <header className='admin-topbar a-section' style={{ ['--i' as string]: 0 }}>
      <div className='admin-topbar-title'>
        <span className='admin-topbar-eyebrow'>
          <span className='pulse-dot' aria-hidden />
          Command Center
        </span>
        <h1 className='admin-topbar-name'>
          Good day, <em>{firstName}</em>
        </h1>
      </div>

      <span className='admin-topbar-spacer' />

      <label className='admin-topbar-search'>
        <Search size={15} strokeWidth={1.7} aria-hidden />
        <input
          type='search'
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder='Search pets, breeds, shelters…'
          aria-label='Quick search'
        />
        <kbd>⌘K</kbd>
      </label>

      <div className='admin-topbar-clock' aria-live='polite'>
        <span>{date}</span>
        <span className='admin-topbar-clock-now'>{time}</span>
      </div>

      <div className='admin-topbar-orb' aria-hidden>
        <span>{initials ?? 'A'}</span>
      </div>
    </header>
  )
}
