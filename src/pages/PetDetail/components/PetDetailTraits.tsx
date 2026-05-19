interface PetDetailTraitsProps {
  traits: string[]
}

export default function PetDetailTraits({ traits }: PetDetailTraitsProps) {
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
        Personality
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {traits.map((trait) => (
          <span
            key={trait}
            style={{
              fontSize: 13,
              fontWeight: 600,
              padding: '7px 16px',
              borderRadius: 30,
              background: 'var(--canvas)',
              color: 'var(--ink-2)',
              border: '1.5px solid var(--hairline)',
              letterSpacing: '0.01em',
            }}
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  )
}
