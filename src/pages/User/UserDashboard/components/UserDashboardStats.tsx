interface UserDashboardStatsProps {
  savedCount: number
  suggestionsCount: number
}

export default function UserDashboardStats({ savedCount, suggestionsCount }: UserDashboardStatsProps) {
  return (
    <section className='u-section user-stats' style={{ ['--i' as string]: 1 }}>
      <article className='user-stat' style={{ ['--accent' as string]: 'var(--u-amber)' }}>
        <div className='user-stat-label'>Saved</div>
        <div className='user-stat-value'>{savedCount}</div>
        <div className='user-stat-note'>Pets you’d love to meet</div>
      </article>
      <article className='user-stat' style={{ ['--accent' as string]: 'var(--u-teal)' }}>
        <div className='user-stat-label'>Applications</div>
        <div className='user-stat-value'>0</div>
        <div className='user-stat-note'>None submitted yet</div>
      </article>
      <article className='user-stat' style={{ ['--accent' as string]: 'var(--u-rose)' }}>
        <div className='user-stat-label'>Matches nearby</div>
        <div className='user-stat-value'>{suggestionsCount}</div>
        <div className='user-stat-note'>Available in shelters near you</div>
      </article>
    </section>
  )
}
