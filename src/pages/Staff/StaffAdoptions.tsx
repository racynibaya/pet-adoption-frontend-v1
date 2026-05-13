import { useState } from 'react'
import { useStaff, type AdoptionRequest } from '@/context/useStaff'

type StatusFilter = 'All' | AdoptionRequest['status']

const FILTERS: StatusFilter[] = ['All', 'PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'CANCELLED']

const STATUS_META: Record<AdoptionRequest['status'], { cls: string; label: string }> = {
  PENDING:   { cls: 's-badge-pending',   label: '◌ Pending' },
  REVIEWING: { cls: 's-badge-pending',   label: '⏳ Reviewing' },
  APPROVED:  { cls: 's-badge-approved',  label: '✓ Approved' },
  REJECTED:  { cls: 's-badge-rejected',  label: '✕ Rejected' },
  CANCELLED: { cls: 's-badge-rejected',  label: '— Cancelled' },
}

function Badge({ status }: { status: AdoptionRequest['status'] }) {
  const { cls, label } = STATUS_META[status]
  return <span className={`s-badge ${cls}`}>{label}</span>
}

export default function StaffAdoptions() {
  const { adoptions, updateAdoption, pets } = useStaff()
  const [filter, setFilter] = useState<StatusFilter>('All')
  const [search, setSearch] = useState('')

  const filtered = adoptions.filter(a => {
    const matchStatus = filter === 'All' || a.status === filter
    const matchSearch = a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      a.petName.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const pendingCount = adoptions.filter(a => a.status === 'PENDING' || a.status === 'REVIEWING').length

  function getPetForAdoption(petId: number) {
    return pets.find(p => p.id === petId)
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div className="staff-page-header">
        <div>
          <h1 className="staff-page-title">
            Adoptions
            {pendingCount > 0 && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, borderRadius: '50%',
                background: '#D94F68', color: 'white',
                fontSize: 11, fontWeight: 700, marginLeft: 10,
                verticalAlign: 'middle',
              }}>
                {pendingCount}
              </span>
            )}
          </h1>
          <p className="staff-page-sub">{adoptions.length} total applications · {pendingCount} awaiting review</p>
        </div>
      </div>

      <div className='staff-page-body' style={{ padding: '24px 32px' }}>
        {/* Stats row */}
        <div className='staff-adoptions-stats' style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
          {(['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'CANCELLED'] as const).map(s => (
            <div key={s} className="staff-stat" style={{ padding: '14px 16px' }}>
              <div className="staff-stat-num" style={{
                fontSize: 22,
                color: s === 'APPROVED' ? '#1D7575' : s === 'REVIEWING' ? '#3a73c2' : s === 'PENDING' ? '#a05818' : '#c0304d',
              }}>
                {adoptions.filter(a => a.status === s).length}
              </div>
              <div className="staff-stat-label" style={{ fontSize: 11, textTransform: 'capitalize' }}>
                {s.toLowerCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Main card */}
        <div className="staff-card">
          {/* Toolbar */}
          <div className="staff-toolbar">
            <input
              className="staff-search"
              placeholder="Search applicant, pet, or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {FILTERS.map(f => (
              <button
                key={f}
                className={`staff-filter-pill${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'All' ? 'All' : STATUS_META[f as AdoptionRequest['status']].label}
              </button>
            ))}
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
              No applications match your filters.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="staff-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Pet</th>
                    <th>Contact</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(a => {
                    const pet = getPetForAdoption(a.petId)
                    return (
                      <tr key={a.id}>
                        {/* Applicant */}
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 34, height: 34, borderRadius: '50%',
                              background: 'linear-gradient(135deg, #E8923C44, #E8923C22)',
                              border: '1.5px solid #E8923C44',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: '#a05818', fontWeight: 700, fontSize: 12.5, flexShrink: 0,
                            }}>
                              {a.applicantName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.applicantName}</div>
                            </div>
                          </div>
                        </td>

                        {/* Pet */}
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {pet && (
                              <div style={{
                                width: 30, height: 30, borderRadius: 8,
                                background: pet.bg, flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                overflow: 'hidden',
                              }}>
                                <div style={{ transform: 'scale(0.18)', transformOrigin: 'center', width: 200, height: 160, flexShrink: 0 }}>
                                  {pet.svg}
                                </div>
                              </div>
                            )}
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 13 }}>{a.petName}</div>
                              {pet && <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{pet.breed}</div>}
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td>
                          <div style={{ fontSize: 13 }}>{a.email}</div>
                          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{a.phone}</div>
                        </td>

                        {/* Date */}
                        <td style={{ fontSize: 12.5, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                          {new Date(a.submittedAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>

                        {/* Status */}
                        <td><Badge status={a.status} /></td>

                        {/* Actions */}
                        <td>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            {(a.status === 'PENDING' || a.status === 'REVIEWING') && (
                              <>
                                {a.status === 'PENDING' && (
                                  <button onClick={() => updateAdoption(a.id, 'REVIEWING')} className="staff-action-btn staff-btn-edit">
                                    ⏳ Review
                                  </button>
                                )}
                                <button onClick={() => updateAdoption(a.id, 'APPROVED')} className="staff-action-btn staff-btn-approve">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  Approve
                                </button>
                                <button onClick={() => updateAdoption(a.id, 'REJECTED')} className="staff-action-btn staff-btn-reject">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                  </svg>
                                  Reject
                                </button>
                              </>
                            )}
                            {(a.status === 'APPROVED' || a.status === 'REJECTED' || a.status === 'CANCELLED') && (
                              <button
                                onClick={() => updateAdoption(a.id, 'PENDING')}
                                style={{
                                  padding: '6px 12px', borderRadius: 8,
                                  border: '1.5px solid var(--hairline)',
                                  background: 'white', color: 'var(--muted)',
                                  cursor: 'pointer', fontSize: 12,
                                  fontFamily: 'var(--font-body)',
                                  transition: 'border-color 0.13s',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ink)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hairline)' }}
                              >
                                Reopen
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
