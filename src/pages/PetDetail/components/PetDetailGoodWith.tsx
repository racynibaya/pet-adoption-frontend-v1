import { Check } from 'lucide-react'

interface PetDetailGoodWithProps {
  items: string[]
}

export default function PetDetailGoodWith({ items }: PetDetailGoodWithProps) {
  if (items.length === 0) return null
  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: 14,
          letterSpacing: '-0.01em',
        }}
      >
        Good With
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((item) => (
          <span
            key={item}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              padding: '7px 16px',
              borderRadius: 30,
              background: '#e6f4f0',
              color: 'var(--color-teal-500)',
              border: '1.5px solid var(--color-teal-200)',
            }}
          >
            <Check size={14} strokeWidth={2.5} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
