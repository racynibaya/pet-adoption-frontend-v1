interface AdminDashboardHeaderProps {
  firstName: string | undefined
  date: string
  time: string
}

export default function AdminDashboardHeader({ firstName, date, time }: AdminDashboardHeaderProps) {
  return (
    <header className='admin-topline a-section' style={{ ['--i' as string]: 0 }}>
      <div>
        <div className='admin-eyebrow'>Welcome, {firstName ?? 'Admin'}</div>
        <h1 className='admin-title'>The platform, at a glance.</h1>
        <p className='admin-subtitle'>
          Cross-shelter pulse for every pet, application, and partner shelter in
          the KodaNest network — updated live as the network breathes.
        </p>
      </div>
      <div className='admin-clock' aria-live='polite'>
        <span>{date}</span>
        <span className='admin-clock-now'>{time}</span>
      </div>
    </header>
  )
}
