interface StaffDashboardStatCardProps {
  num: number
  label: string
  accent: string
}

export default function StaffDashboardStatCard({ num, label, accent }: StaffDashboardStatCardProps) {
  return (
    <div className='staff-stat'>
      <div className='staff-stat-num' style={{ color: accent }}>
        {num}
      </div>
      <div className='staff-stat-label'>{label}</div>
    </div>
  )
}
