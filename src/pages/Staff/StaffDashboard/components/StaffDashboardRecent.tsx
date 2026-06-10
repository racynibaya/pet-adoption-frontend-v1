import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { AdoptionRequest } from '@/context/useAdoptions'
import StaffDashboardAdoptionBadge from './StaffDashboardAdoptionBadge'

interface StaffDashboardRecentProps {
  adoptions: AdoptionRequest[]
}

export default function StaffDashboardRecent({ adoptions }: StaffDashboardRecentProps) {
  return (
    <div className='staff-card'>
      <div className='staff-card-header'>
        <h3 className='staff-card-title'>Recent Applications</h3>
        <Link
          to='/staff/adoptions'
          style={{ fontSize: 12.5, color: 'var(--rausch)', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4 }}
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>
      <div className='staff-table-wrap'>
        <table className='staff-table'>
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Pet</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map((a) => (
              <tr key={a.id}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.applicantName}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{a.email}</div>
                </td>
                <td style={{ fontWeight: 500 }}>{a.petName}</td>
                <td style={{ color: 'var(--muted)', fontSize: 12.5 }}>
                  {new Date(a.submittedAt).toLocaleDateString('en-PH', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td>
                  <StaffDashboardAdoptionBadge status={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
