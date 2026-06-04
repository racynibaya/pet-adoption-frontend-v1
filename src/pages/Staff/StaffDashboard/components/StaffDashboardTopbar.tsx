import { Search } from 'lucide-react'

interface StaffDashboardTopbarProps {
  firstName: string
  initials: string | undefined
  date: string
  time: string
  search: string
  onSearch: (v: string) => void
}

export default function StaffDashboardTopbar({
  firstName,
  initials,
  date,
  time,
  search,
  onSearch,
}: StaffDashboardTopbarProps) {
  return (
    <header className='staff-topbar sd-section' style={{ ['--i' as string]: 0 }}>
      <div className='staff-topbar-title'>
        <span className='staff-topbar-eyebrow'>
          <span className='pulse-dot' aria-hidden />
          Sanctuary Desk
        </span>
        <h1 className='staff-topbar-name'>
          Good day, <em>{firstName}</em>
        </h1>
      </div>

      <span className='staff-topbar-spacer' />

      <label className='staff-topbar-search'>
        <Search size={15} strokeWidth={1.7} aria-hidden />
        <input
          type='search'
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder='Search pets, breeds…'
          aria-label='Quick search'
        />
        <kbd>⌘K</kbd>
      </label>

      <div className='staff-topbar-clock' aria-live='polite'>
        <span>{date}</span>
        <span className='staff-topbar-clock-now'>{time}</span>
      </div>

      <div className='staff-topbar-orb' aria-hidden>
        <span>{initials ?? 'S'}</span>
      </div>
    </header>
  )
}
