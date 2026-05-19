interface StaffDashboardAdoptionBadgeProps {
  status: string
}

const STATUS_CLASS: Record<string, string> = {
  PENDING: 's-badge-pending',
  APPROVED: 's-badge-approved',
  REJECTED: 's-badge-rejected',
}

export default function StaffDashboardAdoptionBadge({ status }: StaffDashboardAdoptionBadgeProps) {
  return <span className={`s-badge ${STATUS_CLASS[status] ?? ''}`}>{status}</span>
}
