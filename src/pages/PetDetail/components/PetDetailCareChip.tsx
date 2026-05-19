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
        color: active ? '#1D7575' : 'var(--muted)',
        border: `1.5px solid ${active ? '#99D0D9' : 'var(--hairline-soft)'}`,
      }}
    >
      <span style={{ fontSize: 15 }}>{active ? '✓' : '✗'}</span>
      {label}
    </span>
  )
}
