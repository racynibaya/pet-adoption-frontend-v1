interface PetDetailAboutProps {
  name: string
  description: string
}

export default function PetDetailAbout({ name, description }: PetDetailAboutProps) {
  return (
    <div
      style={{
        padding: '24px 26px',
        borderRadius: 20,
        background: `linear-gradient(135deg, var(--cream) 0%, var(--canvas) 100%)`,
        border: '1.5px solid var(--hairline-soft)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: 12,
          letterSpacing: '-0.01em',
        }}
      >
        About {name}
      </h2>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.72, margin: 0 }}>
        {description}
      </p>
    </div>
  )
}
