import type { AdoptionRequest } from '@/context/useStaff'
import { STATUS_META } from '../data'

interface StaffAdoptionsBadgeProps {
  status: AdoptionRequest['status']
}

export default function StaffAdoptionsBadge({ status }: StaffAdoptionsBadgeProps) {
  const { cls, label } = STATUS_META[status]
  return <span className={`s-badge ${cls}`}>{label}</span>
}
