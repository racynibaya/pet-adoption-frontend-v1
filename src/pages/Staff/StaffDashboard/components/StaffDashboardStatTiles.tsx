export interface StaffDashboardStats {
  total: number
  available: number
  pending: number
  adopted: number
  rate: number
  pendingApps: number
}

interface StaffDashboardStatTilesProps {
  stats: StaffDashboardStats
  shelterName: string
}

export default function StaffDashboardStatTiles({
  stats,
  shelterName,
}: StaffDashboardStatTilesProps) {
  const shelterLabel = shelterName.length > 0 ? shelterName : 'your shelter'

  return (
    <section
      className='staff-tiles sd-section'
      style={{ ['--i' as string]: 2 }}
      aria-label='Your shelter at a glance'
    >
      <article className='staff-tile'>
        <span className='staff-tile-label'>
          <span className='staff-tile-dot is-ink' /> In your shelter
        </span>
        <span className='staff-tile-num'>{stats.total}</span>
        <span className='staff-tile-sub'>{shelterLabel}</span>
      </article>

      <article className='staff-tile'>
        <span className='staff-tile-label'>
          <span className='staff-tile-dot is-teal' /> Available
        </span>
        <span className='staff-tile-num'>{stats.available}</span>
        <span className='staff-tile-sub'>Open for adoption today</span>
      </article>

      <article className='staff-tile'>
        <span className='staff-tile-label'>
          <span className='staff-tile-dot' /> In review
        </span>
        <span className='staff-tile-num'>{stats.pending}</span>
        <span className='staff-tile-sub'>
          {stats.pendingApps} pending application{stats.pendingApps === 1 ? '' : 's'}
        </span>
      </article>

      <article className='staff-tile'>
        <span className='staff-tile-label'>
          <span className='staff-tile-dot is-rose' /> Placed
        </span>
        <span className='staff-tile-num'>{stats.adopted}</span>
        <span className='staff-tile-sub'>Found their family</span>
      </article>

      <article className='staff-tile staff-tile-rate'>
        <span className='staff-tile-label'>
          <span className='staff-tile-dot' /> Adoption rate
        </span>
        <span className='staff-tile-num'>{stats.rate}%</span>
        <div className='staff-tile-rate-bar' aria-hidden>
          <span style={{ width: `${Math.min(100, stats.rate)}%` }} />
        </div>
      </article>
    </section>
  )
}
