import type { CSSProperties } from 'react'

export type PetStatus = 'AVAILABLE' | 'PENDING' | 'ADOPTED'

interface PetStatusBadgeProps {
  status: PetStatus
  /** `bordered` adds a 1.5px tinted outline (used on the PetDetail gallery). */
  variant?: 'flat' | 'bordered'
  className?: string
  style?: CSSProperties
}

const STATUS_STYLE: Record<
  PetStatus,
  { bg: string; fg: string; border: string; label: string }
> = {
  AVAILABLE: { bg: '#e6f4f0', fg: '#1D7575', border: '#99D0D9', label: 'Available' },
  PENDING: { bg: '#fff3d9', fg: '#a87d12', border: '#FAC878', label: 'Pending' },
  ADOPTED: { bg: '#eeeef8', fg: '#5a5a9e', border: '#c0c0e0', label: 'Adopted' },
}

export default function PetStatusBadge({
  status,
  variant = 'flat',
  className,
  style,
}: PetStatusBadgeProps) {
  const s = STATUS_STYLE[status]
  const bordered = variant === 'bordered'
  return (
    <span
      className={className}
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        padding: bordered ? '4px 12px' : '3px 10px',
        borderRadius: 20,
        background: s.bg,
        color: s.fg,
        border: bordered ? `1.5px solid ${s.border}` : undefined,
        ...style,
      }}
    >
      {s.label}
    </span>
  )
}
