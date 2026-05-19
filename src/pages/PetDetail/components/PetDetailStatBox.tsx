interface PetDetailStatBoxProps {
  label: string
  value: string
}

export default function PetDetailStatBox({ label, value }: PetDetailStatBoxProps) {
  return (
    <div
      style={{
        padding: '14px 18px',
        borderRadius: 14,
        background: 'var(--soft)',
        border: '1.5px solid var(--hairline-soft)',
        minWidth: 0,
      }}
    >
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
        {value}
      </p>
    </div>
  )
}
