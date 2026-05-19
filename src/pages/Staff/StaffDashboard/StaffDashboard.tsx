import { useStaff } from '@/context/useStaff'
import {
  StaffDashboardHeader,
  StaffDashboardStats,
  StaffDashboardRecent,
  StaffDashboardPets,
} from './components'

export default function StaffDashboard() {
  const { staffUser, visiblePets, adoptions } = useStaff()

  const available = visiblePets.filter((p) => p.status === 'AVAILABLE').length
  const pending = visiblePets.filter((p) => p.status === 'PENDING').length
  const pendingAdoptions = adoptions.filter((a) => a.status === 'PENDING').length
  const shelters = [...new Set(visiblePets.map((p) => p.shelterId))].length

  const recentAdoptions = [...adoptions]
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, 5)

  const recentPets = [...visiblePets].slice(-4).reverse()

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <StaffDashboardHeader firstName={staffUser?.name?.split(' ')[0]} />

      <div className='staff-page-body' style={{ padding: '28px 32px' }}>
        <StaffDashboardStats
          totalPets={visiblePets.length}
          available={available}
          pending={pending}
          pendingAdoptions={pendingAdoptions}
          shelters={shelters}
        />

        <div
          className='staff-dashboard-grid'
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            gap: 20,
            alignItems: 'start',
          }}
        >
          <StaffDashboardRecent adoptions={recentAdoptions} />
          <StaffDashboardPets pets={recentPets} />
        </div>
      </div>
    </div>
  )
}
