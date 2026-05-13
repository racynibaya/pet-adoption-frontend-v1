import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGetShelters, type ApiShelter } from '@/services/api'
import { useStaff } from '@/context/useStaff'

interface AggregatedShelter {
  id: number
  name: string
  city: string
  address: string
  contactEmail: string
  phoneNumber: string
  pets: { total: number; available: number; pending: number; adopted: number }
}

export default function AdminShelters() {
  const { pets } = useStaff()
  const [remote, setRemote] = useState<ApiShelter[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    apiGetShelters()
      .then(res => { if (!cancelled) setRemote(res.data) })
      .catch(() => { if (!cancelled) setLoadError(true) })
    return () => { cancelled = true }
  }, [])

  const shelters: AggregatedShelter[] = useMemo(() => {
    if (remote && remote.length > 0) {
      return remote.map(s => ({
        id: s.id,
        name: s.name,
        city: parseCity(s.address),
        address: s.address,
        contactEmail: s.contactEmail,
        phoneNumber: s.phoneNumber,
        pets: countPets(pets, s.id, s.name),
      }))
    }
    // Fallback: synthesize shelters from pets' embedded shelterName
    const map = new Map<string, AggregatedShelter>()
    pets.forEach(p => {
      if (!p.shelterName) return
      const key = `${p.shelterId}|${p.shelterName}`
      const existing = map.get(key)
      if (existing) {
        existing.pets.total += 1
        if (p.status === 'AVAILABLE') existing.pets.available += 1
        else if (p.status === 'PENDING') existing.pets.pending += 1
        else existing.pets.adopted += 1
      } else {
        map.set(key, {
          id: p.shelterId,
          name: p.shelterName,
          city: p.shelterCity || '',
          address: p.shelterCity || '',
          contactEmail: '',
          phoneNumber: '',
          pets: {
            total: 1,
            available: p.status === 'AVAILABLE' ? 1 : 0,
            pending: p.status === 'PENDING' ? 1 : 0,
            adopted: p.status === 'ADOPTED' ? 1 : 0,
          },
        })
      }
    })
    return [...map.values()].sort((a, b) => b.pets.total - a.pets.total)
  }, [remote, pets])

  useEffect(() => {
    if (selectedId === null && shelters.length > 0) {
      setSelectedId(shelters[0].id)
    }
  }, [shelters, selectedId])

  const selected = shelters.find(s => s.id === selectedId) ?? shelters[0] ?? null

  return (
    <>
      <header className='admin-topline a-section' style={{ ['--i' as string]: 0 }}>
        <div>
          <div className='admin-eyebrow'>Directory</div>
          <h1 className='admin-title'>Partner shelters.</h1>
          <p className='admin-subtitle'>
            Every shelter currently homing pets on KodaNest. Pick a shelter on
            the left to see its contact info and live roster by status.
          </p>
        </div>
        <div className='admin-clock'>
          <span>{shelters.length} shelter{shelters.length === 1 ? '' : 's'}</span>
          <span className='admin-clock-now'>
            {loadError ? 'offline · mock' : remote ? 'live' : 'syncing…'}
          </span>
        </div>
      </header>

      <div className='admin-shelters a-section' style={{ ['--i' as string]: 1 }}>
        <aside className='shelter-list' aria-label='Shelter list'>
          {shelters.length === 0 ? (
            <div className='shelter-detail-empty' style={{ padding: 32 }}>
              <div className='shelter-detail-empty-title'>No shelters yet</div>
              <p style={{ margin: 0 }}>
                When shelters join the network, they’ll appear here.
              </p>
            </div>
          ) : (
            shelters.map(s => (
              <button
                key={s.id}
                type='button'
                className={`shelter-list-item${selected?.id === s.id ? ' is-active' : ''}`}
                onClick={() => setSelectedId(s.id)}
              >
                <div style={{ minWidth: 0 }}>
                  <div className='shelter-list-name'>{s.name}</div>
                  {s.city && <div className='shelter-list-city'>{s.city}</div>}
                </div>
                <span className='shelter-list-count'>{s.pets.total}</span>
              </button>
            ))
          )}
        </aside>

        <section className='shelter-detail'>
          {!selected ? (
            <div className='shelter-detail-empty'>
              <div className='shelter-detail-empty-title'>Pick a shelter</div>
              <p style={{ margin: 0 }}>Their roster and contact info will appear here.</p>
            </div>
          ) : (
            <>
              <div className='shelter-detail-head'>
                <div>
                  {selected.city && <div className='shelter-detail-city'>{selected.city}</div>}
                  <h2 className='shelter-detail-name'>{selected.name}</h2>
                </div>
                <Link to='/staff/pets' className='bento-action-btn ghost'>
                  View pets in staff →
                </Link>
              </div>

              <div className='shelter-detail-grid'>
                <div className='shelter-detail-block'>
                  <span className='shelter-detail-label'>Address</span>
                  <span className='shelter-detail-value'>{selected.address || '—'}</span>
                </div>
                <div className='shelter-detail-block'>
                  <span className='shelter-detail-label'>Email</span>
                  <span className='shelter-detail-value'>{selected.contactEmail || '—'}</span>
                </div>
                <div className='shelter-detail-block'>
                  <span className='shelter-detail-label'>Phone</span>
                  <span className='shelter-detail-value'>{selected.phoneNumber || '—'}</span>
                </div>
                <div className='shelter-detail-block'>
                  <span className='shelter-detail-label'>Shelter ID</span>
                  <span className='shelter-detail-value'>#{selected.id}</span>
                </div>
              </div>

              <div>
                <div className='bento-eyebrow' style={{ margin: '0 0 12px' }}>
                  <span className='dot' /> Pet roster
                </div>
                <div className='shelter-pet-roster'>
                  <div className='shelter-pet-stat' style={{ borderLeft: '3px solid var(--a-teal)' }}>
                    <span className='shelter-pet-stat-num'>{selected.pets.available}</span>
                    <span className='shelter-pet-stat-label'>Available</span>
                  </div>
                  <div className='shelter-pet-stat' style={{ borderLeft: '3px solid var(--a-amber)' }}>
                    <span className='shelter-pet-stat-num'>{selected.pets.pending}</span>
                    <span className='shelter-pet-stat-label'>Pending</span>
                  </div>
                  <div className='shelter-pet-stat' style={{ borderLeft: '3px solid var(--a-teal-deep)' }}>
                    <span className='shelter-pet-stat-num'>{selected.pets.adopted}</span>
                    <span className='shelter-pet-stat-label'>Adopted</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  )
}

function parseCity(address: string): string {
  if (!address) return ''
  return address.split(',')[0]?.trim() ?? ''
}

function countPets(
  pets: ReturnType<typeof useStaff>['pets'],
  shelterId: number,
  shelterName: string,
) {
  let total = 0, available = 0, pending = 0, adopted = 0
  for (const p of pets) {
    const match = p.shelterId === shelterId || (shelterName && p.shelterName === shelterName)
    if (!match) continue
    total += 1
    if (p.status === 'AVAILABLE') available += 1
    else if (p.status === 'PENDING') pending += 1
    else adopted += 1
  }
  return { total, available, pending, adopted }
}
