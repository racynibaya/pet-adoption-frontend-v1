import { Link } from 'react-router-dom'
import { useStaff } from '@/context/useStaff'
import { ageLabel } from '@/data/pets'

function StatCard({ num, label, accent }: { num: number; label: string; accent: string }) {
  return (
    <div className="staff-stat">
      <div className="staff-stat-num" style={{ color: accent }}>{num}</div>
      <div className="staff-stat-label">{label}</div>
    </div>
  )
}

function AdoptionBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: 's-badge-pending',
    APPROVED: 's-badge-approved',
    REJECTED: 's-badge-rejected',
  }
  return <span className={`s-badge ${map[status] ?? ''}`}>{status}</span>
}

export default function StaffDashboard() {
  const { staffUser, pets, adoptions } = useStaff()

  const available = pets.filter(p => p.status === 'AVAILABLE').length
  const pending = pets.filter(p => p.status === 'PENDING').length
  const pendingAdoptions = adoptions.filter(a => a.status === 'PENDING').length
  const shelters = [...new Set(pets.map(p => p.shelterId))].length

  const recentAdoptions = [...adoptions]
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, 5)

  const recentPets = [...pets].slice(-4).reverse()

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Page header */}
      <div className="staff-page-header">
        <div>
          <h1 className="staff-page-title">
            Good day, {staffUser?.name?.split(' ')[0]} 👋
          </h1>
          <p className="staff-page-sub">Here's what's happening at your shelter today.</p>
        </div>
        <Link
          to="/staff/pets/add"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '10px 20px',
            background: '#E8923C', color: 'white',
            borderRadius: 11, fontWeight: 600, fontSize: 13.5,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(232,146,60,0.3)',
            transition: 'background 0.14s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#CB7730' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#E8923C' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Add Pet
        </Link>
      </div>

      <div className='staff-page-body' style={{ padding: '28px 32px' }}>
        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 14,
          marginBottom: 28,
        }}>
          <StatCard num={pets.length} label="Total Pets" accent="var(--ink)" />
          <StatCard num={available} label="Available" accent="#1D7575" />
          <StatCard num={pending} label="Pending Adoption" accent="#a05818" />
          <StatCard num={pendingAdoptions} label="Open Applications" accent="#D94F68" />
          <StatCard num={shelters} label="Shelters" accent="#3a73c2" />
        </div>

        <div className='staff-dashboard-grid' style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }}>
          {/* Recent adoption applications */}
          <div className="staff-card">
            <div className="staff-card-header">
              <h3 className="staff-card-title">Recent Applications</h3>
              <Link
                to="/staff/adoptions"
                style={{ fontSize: 12.5, color: '#E8923C', textDecoration: 'none', fontWeight: 500 }}
              >
                View all →
              </Link>
            </div>
            <div className='staff-table-wrap'>
            <table className="staff-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Pet</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAdoptions.map(a => (
                  <tr key={a.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.applicantName}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{a.email}</div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{a.petName}</td>
                    <td style={{ color: 'var(--muted)', fontSize: 12.5 }}>
                      {new Date(a.submittedAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                    </td>
                    <td><AdoptionBadge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Recently added pets */}
          <div className="staff-card">
            <div className="staff-card-header">
              <h3 className="staff-card-title">Pets in Shelter</h3>
              <Link
                to="/staff/pets"
                style={{ fontSize: 12.5, color: '#E8923C', textDecoration: 'none', fontWeight: 500 }}
              >
                Manage →
              </Link>
            </div>
            <div style={{ padding: '8px 0' }}>
              {recentPets.map(pet => (
                <div
                  key={pet.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 20px',
                    borderBottom: '1px solid var(--hairline-soft)',
                  }}
                >
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: 12,
                    background: pet.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}>
                    <div style={{ transform: 'scale(0.24)', transformOrigin: 'center', width: 200, height: 160, flexShrink: 0 }}>
                      {pet.svg}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--ink)' }}>{pet.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>
                      {pet.breed} · {ageLabel(pet.ageMonths)}
                    </div>
                  </div>
                  <span className={`s-badge ${pet.status === 'AVAILABLE' ? 's-badge-available' : 's-badge-pending'}`}>
                    {pet.status === 'AVAILABLE' ? 'Available' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
