import type { AdminDashboardStats } from '../types'

interface AdminDashboardHeroProps {
  stats: AdminDashboardStats
  shelterCount: number
}

export default function AdminDashboardHero({ stats, shelterCount }: AdminDashboardHeroProps) {
  return (
    <article className='bento-card bento-hero a-section' style={{ ['--i' as string]: 1 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Network pulse
      </div>
      <div className='bento-hero-inner'>
        <div>
          <div className='bento-h-lg'>{stats.total}</div>
          <div className='bento-sub' style={{ marginTop: 4 }}>
            pets across {shelterCount || 1} shelter{shelterCount === 1 ? '' : 's'}
          </div>
          <div className='bento-hero-stats'>
            <div>
              <div className='bento-hero-stat-label'>Available</div>
              <div className='bento-hero-stat-value'>{stats.available}</div>
              <div className='bento-hero-stat-delta'>Ready to meet</div>
            </div>
            <div>
              <div className='bento-hero-stat-label'>In review</div>
              <div className='bento-hero-stat-value'>{stats.pending}</div>
              <div className='bento-hero-stat-delta'>With families</div>
            </div>
            <div>
              <div className='bento-hero-stat-label'>Placed</div>
              <div className='bento-hero-stat-value'>{stats.adopted}</div>
              <div className='bento-hero-stat-delta'>Home found</div>
            </div>
          </div>
        </div>
        <div
          className='bento-ring'
          style={{ ['--pct' as string]: String(stats.rate) }}
          role='img'
          aria-label={`Adoption rate ${stats.rate}%`}
        >
          <div className='bento-ring-text'>
            <div className='bento-ring-num'>{stats.rate}%</div>
            <div className='bento-ring-label'>Adopted</div>
          </div>
        </div>
      </div>
    </article>
  )
}
