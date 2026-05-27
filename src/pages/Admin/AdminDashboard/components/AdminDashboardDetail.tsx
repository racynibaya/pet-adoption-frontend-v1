import { Link } from 'react-router-dom'
import type { PetCard } from '@/data/pets'
import { ageLabel, genderLabel, sizeLabel, speciesLabel } from '@/data/pets'
import type { AdoptionRequest } from '@/context/useStaff'

interface AdminDashboardDetailProps {
  pet: PetCard | null
  shelterCity: string
  applications: AdoptionRequest[]
}

function statusPill(status: PetCard['status']) {
  if (status === 'AVAILABLE')
    return <span className='admin-pill is-available'>Available</span>
  if (status === 'PENDING')
    return <span className='admin-pill is-pending'>In review</span>
  return <span className='admin-pill is-adopted'>Placed</span>
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || 'AP'
}

function whenLabel(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime()
  const day = 24 * 60 * 60 * 1000
  if (diff < day) return 'today'
  if (diff < 2 * day) return 'yesterday'
  const days = Math.floor(diff / day)
  if (days < 7) return `${days}d ago`
  return `${Math.floor(days / 7)}w ago`
}

export default function AdminDashboardDetail({
  pet,
  shelterCity,
  applications,
}: AdminDashboardDetailProps) {
  if (!pet) {
    return (
      <aside className='admin-detail a-section' style={{ ['--i' as string]: 4 }}>
        <div className='admin-detail-topline'>
          <span className='admin-detail-eyebrow'>Pet detail</span>
          <span className='admin-detail-id'>—</span>
        </div>
        <div className='admin-detail-empty'>
          <h3 className='admin-detail-empty-h'>Nothing selected</h3>
          <p>Pick a pet from the roster to see their full profile here.</p>
        </div>
      </aside>
    )
  }

  const attributes: { label: string; on: boolean }[] = [
    { label: 'Vaccinated', on: pet.vaccinated },
    { label: 'Neutered', on: pet.neutered },
    { label: 'House-trained', on: pet.houseTrained },
    { label: 'Microchipped', on: pet.vaccinated },
  ]

  const recent = applications.slice(0, 3)

  return (
    <aside
      className='admin-detail a-section'
      style={{ ['--i' as string]: 4 }}
      aria-label={`${pet.name} detail`}
    >
      <div className='admin-detail-topline'>
        <span className='admin-detail-eyebrow'>Pet profile</span>
        <span className='admin-detail-id'>
          #{String(pet.id).padStart(6, '0')}
        </span>
      </div>

      <div className='admin-detail-portrait' aria-hidden>
        <div
          className='admin-detail-portrait-inner'
          style={{ background: pet.bg }}
        >
          {pet.imageUrl ? <img src={pet.imageUrl} alt='' /> : pet.svg}
        </div>
      </div>

      <div>
        <h3 className='admin-detail-name'>{pet.name}</h3>
        <p className='admin-detail-breed'>
          {speciesLabel(pet.species)} · {pet.breed} · {ageLabel(pet.ageMonths)} · {genderLabel(pet.gender)} · {sizeLabel(pet.size)}
        </p>
        {shelterCity && (
          <p className='admin-detail-breed' style={{ marginTop: 2, color: 'var(--a-amber-deep)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10.5 }}>
            {pet.shelterName} · {shelterCity}
          </p>
        )}
        <div className='admin-detail-pill-wrap'>{statusPill(pet.status)}</div>
      </div>

      <div className='admin-detail-actions' role='group' aria-label='Quick actions'>
        <Link to={`/pets/${pet.id}`} className='admin-detail-action' title='View public profile' aria-label='View public profile'>
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
            <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
            <path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z' stroke='currentColor' strokeWidth='1.6' />
          </svg>
        </Link>
        <Link to={`/shelters/${pet.shelterId}`} className='admin-detail-action' title='Shelter page' aria-label='Shelter page'>
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
            <path d='M3 21V9l9-6 9 6v12' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
            <path d='M9 21v-6h6v6' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
          </svg>
        </Link>
        <Link to='/admin/adoptions' className='admin-detail-action' title='Adoption queue' aria-label='Adoption queue'>
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
            <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' stroke='currentColor' strokeWidth='1.6' />
          </svg>
        </Link>
        <Link to='/admin/pets' className='admin-detail-action' title='Edit pet record' aria-label='Edit pet record'>
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
            <path d='M12 20h9' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
            <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
          </svg>
        </Link>
      </div>

      <div className='admin-detail-section'>
        <div className='admin-detail-section-head'>
          <span className='admin-detail-section-h'>Care record</span>
          <span className='admin-detail-section-meta'>
            {attributes.filter((a) => a.on).length}/{attributes.length}
          </span>
        </div>
        <div className='admin-detail-attrs'>
          {attributes.map((a) => (
            <div
              key={a.label}
              className={`admin-detail-attr${a.on ? '' : ' is-off'}`}
            >
              <span className='admin-detail-attr-tick' aria-hidden>
                {a.on ? '✓' : '·'}
              </span>
              {a.label}
            </div>
          ))}
        </div>
      </div>

      <div className='admin-detail-section'>
        <div className='admin-detail-section-head'>
          <span className='admin-detail-section-h'>Recent applications</span>
          <span className='admin-detail-section-meta'>{applications.length}</span>
        </div>
        {recent.length === 0 ? (
          <div className='admin-detail-apps-empty'>
            No families have applied yet.
          </div>
        ) : (
          <div className='admin-detail-apps'>
            {recent.map((a) => (
              <div key={a.id} className='admin-detail-app'>
                <span className='admin-detail-app-orb' aria-hidden>
                  {initialsOf(a.applicantName)}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className='admin-detail-app-name'>{a.applicantName}</div>
                  <div className='admin-detail-app-when'>
                    Applied {whenLabel(a.submittedAt)} · {a.status.toLowerCase()}
                  </div>
                </div>
                <Link
                  to='/admin/adoptions'
                  className='admin-roster-more'
                  aria-label={`Open ${a.applicantName}'s application`}
                  title='Open application'
                >
                  →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='admin-detail-foot'>
        <Link to={`/pets/${pet.id}`} className='admin-detail-btn ghost'>
          Public view
        </Link>
        <Link to='/admin/pets' className='admin-detail-btn primary'>
          Manage pet →
        </Link>
      </div>

    </aside>
  )
}
