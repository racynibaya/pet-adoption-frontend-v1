import { Check, X } from 'lucide-react'

interface PetDetailCareChipProps {
  label: string
  active: boolean
}

export default function PetDetailCareChip({ label, active }: PetDetailCareChipProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 600,
        padding: '6px 14px',
        borderRadius: 30,
        background: active ? '#e6f4f0' : 'var(--soft)',
        color: active ? 'var(--color-teal-500)' : 'var(--muted)',
        border: `1.5px solid ${active ? 'var(--color-teal-200)' : 'var(--hairline-soft)'}`,
      }}
    >
      {active ? <Check size={15} strokeWidth={2.5} /> : <X size={15} strokeWidth={2.5} />}
      {label}
    </span>
  )
}
