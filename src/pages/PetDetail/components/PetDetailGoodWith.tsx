interface PetDetailGoodWithProps {
  items: string[]
}

export default function PetDetailGoodWith({ items }: PetDetailGoodWithProps) {
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
              color: '#1D7575',
              border: '1.5px solid #99D0D9',
            }}
          >
            <span style={{ fontSize: 14 }}>✓</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
