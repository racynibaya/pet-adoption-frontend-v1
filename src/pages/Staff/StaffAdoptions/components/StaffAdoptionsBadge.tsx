import type { AdoptionRequest } from '@/context/useStaff'
import { STATUS_META } from '../data'

interface StaffAdoptionsBadgeProps {
  status: AdoptionRequest['status']
}

export default function StaffAdoptionsBadge({ status }: StaffAdoptionsBadgeProps) {
  const meta = STATUS_META[status]
  return <span className={`staff-pill ${meta.pillVariant}`}>{meta.plain}</span>
}
