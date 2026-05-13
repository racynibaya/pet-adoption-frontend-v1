import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useStaff } from '@/context/useStaff'

export default function AdminDashboard() {
  const { pets, adoptions, staffUser } = useStaff()

  const stats = useMemo(() => {
    const total = pets.length
    const available = pets.filter(p => p.status === 'AVAILABLE').length
    const pending = pets.filter(p => p.status === 'PENDING').length
    const adopted = pets.filter(p => p.status === 'ADOPTED').length
    const rate = total > 0 ? Math.round((adopted / total) * 100) : 0
    const pendingApps = adoptions.filter(a => a.status === 'PENDING').length
    return { total, available, pending, adopted, rate, pendingApps }
  }, [pets, adoptions])

  const shelters = useMemo(() => {
    const map = new Map<string, { name: string; city: string; count: number }>()
    pets.forEach(p => {
      if (!p.shelterName) return
      const key = p.shelterName
      const cur = map.get(key)
      if (cur) {
        cur.count += 1
      } else {
        map.set(key, { name: p.shelterName, city: p.shelterCity || '', count: 1 })
      }
    })
    return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 4)
  }, [pets])

  const spark = useMemo(() => buildSpark(adoptions.map(a => a.submittedAt)), [adoptions])

  const activity = useMemo(() => buildActivity(pets, adoptions), [pets, adoptions])

  const clock = useMemo(() => {
    const now = new Date()
    return {
      date: now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }),
      time: now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
    }
  }, [])

  return (
    <>
      <header className='admin-topline a-section' style={{ ['--i' as string]: 0 }}>
        <div>
          <div className='admin-eyebrow'>Welcome, {staffUser?.name?.split(' ')[0] ?? 'Admin'}</div>
          <h1 className='admin-title'>The platform, at a glance.</h1>
          <p className='admin-subtitle'>
            Cross-shelter pulse for every pet, application, and partner shelter in
            the KodaNest network — updated live as the network breathes.
          </p>
        </div>
        <div className='admin-clock' aria-live='polite'>
          <span>{clock.date}</span>
          <span className='admin-clock-now'>{clock.time}</span>
        </div>
      </header>

      <div className='admin-bento'>
        {/* Hero pulse */}
        <article className='bento-card bento-hero a-section' style={{ ['--i' as string]: 1 }}>
          <div className='bento-eyebrow'>
            <span className='dot' /> Network pulse
          </div>
          <div className='bento-hero-inner'>
            <div>
              <div className='bento-h-lg'>{stats.total}</div>
              <div className='bento-sub' style={{ marginTop: 4 }}>
                pets across {shelters.length || 1} shelter{shelters.length === 1 ? '' : 's'}
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

        {/* Shelter spotlight */}
        <article className='bento-card bento-shelters a-section' style={{ ['--i' as string]: 2 }}>
          <div className='bento-eyebrow'>
            <span className='dot' /> Shelter spotlight
          </div>
          <h3 className='bento-h'>Top by pet count</h3>
          {shelters.length === 0 ? (
            <p className='bento-sub'>No shelter data yet.</p>
          ) : (
            <ol>
              {shelters.map((s, i) => (
                <li key={s.name} className='bento-shelter-row'>
                  <span className='bento-shelter-rank'>{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ minWidth: 0 }}>
                    <div className='bento-shelter-name'>{s.name}</div>
                    {s.city && <div className='bento-shelter-city'>{s.city}</div>}
                  </div>
                  <span className='bento-shelter-count'>{s.count}</span>
                </li>
              ))}
            </ol>
          )}
          <Link
            to='/admin/shelters'
            className='bento-pending-link'
            style={{ marginTop: 'auto', paddingTop: 14 }}
          >
            Open shelter directory →
          </Link>
        </article>

        {/* Adoption velocity sparkline */}
        <article className='bento-card bento-spark a-section' style={{ ['--i' as string]: 3 }}>
          <div className='bento-eyebrow'>
            <span className='dot' /> Adoption velocity
          </div>
          <h3 className='bento-h'>
            {adoptions.length} application{adoptions.length === 1 ? '' : 's'} in the last weeks
          </h3>
          <p className='bento-sub' style={{ marginTop: 0 }}>
            Daily submissions across all shelters.
          </p>
          <div className='bento-spark-wrap'>
            <Sparkline points={spark.points} max={spark.max} />
          </div>
        </article>

        {/* Pending applications */}
        <Link
          to='/staff/adoptions'
          className='bento-card bento-pending is-link a-section'
          style={{ ['--i' as string]: 4 }}
        >
          <div className='bento-eyebrow'>
            <span className='dot' style={{ background: 'var(--a-rose)' }} /> Awaiting action
          </div>
          <div className='bento-pending-num'>{stats.pendingApps}</div>
          <p className='bento-sub' style={{ marginTop: 6 }}>
            Applications need a first look.
          </p>
          <span className='bento-pending-link' style={{ marginTop: 'auto' }}>
            Review queue →
          </span>
        </Link>

        {/* Recent activity */}
        <article className='bento-card bento-activity a-section' style={{ ['--i' as string]: 5 }}>
          <div className='bento-eyebrow'>
            <span className='dot' style={{ background: 'var(--a-teal)' }} /> Recent activity
          </div>
          <h3 className='bento-h'>Across the network</h3>
          {activity.length === 0 ? (
            <p className='bento-sub'>Nothing to report yet.</p>
          ) : (
            <ul>
              {activity.map(ev => (
                <li key={ev.id}>
                  <span className={`bento-activity-dot${ev.tone === 'teal' ? ' is-teal' : ev.tone === 'rose' ? ' is-rose' : ''}`} />
                  <span className='bento-activity-text'>
                    <strong>{ev.actor}</strong> {ev.verb} <strong>{ev.subject}</strong>
                  </span>
                  <span className='bento-activity-time'>{ev.time}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        {/* Quick actions */}
        <article className='bento-card bento-actions a-section' style={{ ['--i' as string]: 6 }}>
          <div className='bento-eyebrow'>
            <span className='dot' /> Shortcuts
          </div>
          <h3 className='bento-h'>Jump to</h3>
          <Link to='/staff/pets/add' className='bento-action-btn primary'>
            Add a pet →
          </Link>
          <Link to='/staff/adoptions' className='bento-action-btn ghost'>
            Open adoptions
          </Link>
        </article>
      </div>
    </>
  )
}

// ── Sparkline ─────────────────────────────────────────────────────────────
function Sparkline({ points, max }: { points: number[]; max: number }) {
  if (points.length === 0) return null
  const W = 100
  const H = 100
  const n = points.length
  const step = n > 1 ? W / (n - 1) : 0
  const m = max === 0 ? 1 : max
  const coords = points.map((v, i) => {
    const x = i * step
    const y = H - (v / m) * (H - 8) - 4
    return { x, y }
  })
  const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`).join(' ')
  const area = `${path} L ${W} ${H} L 0 ${H} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio='none' aria-hidden>
      <defs>
        <linearGradient id='sparkFill' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#e8923c' stopOpacity='0.32' />
          <stop offset='100%' stopColor='#e8923c' stopOpacity='0' />
        </linearGradient>
      </defs>
      <path d={area} fill='url(#sparkFill)' />
      <path
        d={path}
        fill='none'
        stroke='#e8923c'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        vectorEffect='non-scaling-stroke'
      />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r='1.4' fill='#cb7730' />
      ))}
    </svg>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────
function buildSpark(dates: string[]): { points: number[]; max: number } {
  if (dates.length === 0) return { points: [], max: 0 }
  const counts = new Map<string, number>()
  dates.forEach(d => {
    const key = d.slice(0, 10) // YYYY-MM-DD
    counts.set(key, (counts.get(key) ?? 0) + 1)
  })
  const sorted = [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
  const fillDays = 8
  const last = sorted.slice(-fillDays)
  const points = last.map(([, v]) => v)
  while (points.length < 4) points.unshift(0)
  return { points, max: Math.max(...points, 1) }
}

interface Activity {
  id: string
  actor: string
  verb: string
  subject: string
  time: string
  tone: 'amber' | 'teal' | 'rose'
}

function buildActivity(
  pets: ReturnType<typeof useStaff>['pets'],
  adoptions: ReturnType<typeof useStaff>['adoptions'],
): Activity[] {
  const events: (Activity & { ts: number })[] = []

  adoptions.forEach(a => {
    const ts = new Date(a.submittedAt).getTime()
    const tone: Activity['tone'] = a.status === 'APPROVED' ? 'teal' : a.status === 'REJECTED' ? 'rose' : 'amber'
    const verb = a.status === 'APPROVED' ? 'was approved for' : a.status === 'REJECTED' ? 'was declined for' : 'applied to adopt'
    events.push({
      id: `a-${a.id}`,
      actor: a.applicantName,
      verb,
      subject: a.petName,
      time: relTime(ts),
      tone,
      ts,
    })
  })

  pets.slice(-6).forEach(p => {
    events.push({
      id: `p-${p.id}`,
      actor: p.shelterName || 'A shelter',
      verb: 'listed',
      subject: p.name,
      time: 'recently',
      tone: 'teal',
      ts: Date.now() - p.id * 1000,
    })
  })

  return events
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 6)
    .map(({ ts: _ts, ...rest }) => rest)
}

function relTime(ts: number): string {
  const diff = Date.now() - ts
  const day = 24 * 60 * 60 * 1000
  if (diff < day) return 'today'
  if (diff < 2 * day) return 'yesterday'
  const days = Math.floor(diff / day)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  return `${Math.floor(days / 30)}mo ago`
}
