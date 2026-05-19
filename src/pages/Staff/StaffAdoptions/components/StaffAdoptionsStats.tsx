import type { AdoptionRequest } from '@/context/useStaff'
import { STAT_STATUSES } from '../data'

interface StaffAdoptionsStatsProps {
  adoptions: AdoptionRequest[]
}

function statColor(status: AdoptionRequest['status']): string {
  if (status === 'APPROVED') return '#1D7575'
  if (status === 'REVIEWING') return '#3a73c2'
  if (status === 'PENDING') return '#a05818'
  return '#c0304d'
}

export default function StaffAdoptionsStats({ adoptions }: StaffAdoptionsStatsProps) {
  return (
    <div className='staff-adoptions-stats' style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
      {STAT_STATUSES.map(s => (
        <div key={s} className="staff-stat" style={{ padding: '14px 16px' }}>
          <div className="staff-stat-num" style={{ fontSize: 22, color: statColor(s) }}>
            {adoptions.filter(a => a.status === s).length}
          </div>
          <div className="staff-stat-label" style={{ fontSize: 11, textTransform: 'capitalize' }}>
            {s.toLowerCase()}
          </div>
        </div>
      ))}
    </div>
  )
}
