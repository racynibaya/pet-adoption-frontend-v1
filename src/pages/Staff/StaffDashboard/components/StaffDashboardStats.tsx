import StaffDashboardStatCard from './StaffDashboardStatCard'

interface StaffDashboardStatsProps {
  totalPets: number
  available: number
  pending: number
  pendingAdoptions: number
  shelters: number
}

export default function StaffDashboardStats({
  totalPets,
  available,
  pending,
  pendingAdoptions,
  shelters,
}: StaffDashboardStatsProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 14,
        marginBottom: 28,
      }}
    >
      <StaffDashboardStatCard num={totalPets} label='Total Pets' accent='var(--ink)' />
      <StaffDashboardStatCard num={available} label='Available' accent='var(--color-teal-500)' />
      <StaffDashboardStatCard num={pending} label='Pending Adoption' accent='#a05818' />
      <StaffDashboardStatCard num={pendingAdoptions} label='Open Applications' accent='var(--color-rose-500)' />
      <StaffDashboardStatCard num={shelters} label='Shelters' accent='#3a73c2' />
    </div>
  )
}
