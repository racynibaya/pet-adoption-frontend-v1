import type { AdminDashboardStats } from '../types'

interface AdminDashboardStatTilesProps {
  stats: AdminDashboardStats
  shelterCount: number
}

export default function AdminDashboardStatTiles({
  stats,
  shelterCount,
}: AdminDashboardStatTilesProps) {
  return (
    <section
      className='admin-tiles a-section'
      style={{ ['--i' as string]: 2 }}
      aria-label='Network at a glance'
    >
      <article className='admin-tile'>
        <span className='admin-tile-label'>
          <span className='admin-tile-dot is-ink' /> In the network
        </span>
        <span className='admin-tile-num'>{stats.total}</span>
        <span className='admin-tile-sub'>
          across {shelterCount || 1} shelter{shelterCount === 1 ? '' : 's'}
        </span>
      </article>

      <article className='admin-tile'>
        <span className='admin-tile-label'>
          <span className='admin-tile-dot is-teal' /> Available
        </span>
        <span className='admin-tile-num'>{stats.available}</span>
        <span className='admin-tile-sub'>Open for adoption today</span>
      </article>

      <article className='admin-tile'>
        <span className='admin-tile-label'>
          <span className='admin-tile-dot' /> In review
        </span>
        <span className='admin-tile-num'>{stats.pending}</span>
        <span className='admin-tile-sub'>
          {stats.pendingApps} pending application{stats.pendingApps === 1 ? '' : 's'}
        </span>
      </article>

      <article className='admin-tile'>
        <span className='admin-tile-label'>
          <span className='admin-tile-dot is-rose' /> Placed
        </span>
        <span className='admin-tile-num'>{stats.adopted}</span>
        <span className='admin-tile-sub'>Found their family</span>
      </article>

      <article className='admin-tile admin-tile-rate'>
        <span className='admin-tile-label'>
          <span className='admin-tile-dot' /> Adoption rate
        </span>
        <span className='admin-tile-num'>{stats.rate}%</span>
        <div className='admin-tile-rate-bar' aria-hidden>
          <span style={{ width: `${Math.min(100, stats.rate)}%` }} />
        </div>
      </article>
    </section>
  )
}
