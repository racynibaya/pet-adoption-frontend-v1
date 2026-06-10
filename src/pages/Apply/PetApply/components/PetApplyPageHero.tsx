interface PetApplyPageHeroProps {
  petName: string
}

export default function PetApplyPageHero({ petName }: PetApplyPageHeroProps) {
  return (
    <header style={{ marginBottom: 32 }}>
      <p
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-teal-500)',
          margin: '0 0 14px',
        }}
      >
        A letter to the shelter
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(34px, 5.5vw, 56px)',
          fontWeight: 700,
          color: 'var(--ink)',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          margin: 0,
        }}
      >
        Apply to adopt{' '}
        <span style={{ fontStyle: 'italic', color: '#a05818' }}>{petName}</span>
      </h1>
      <p
        style={{
          fontSize: 16,
          color: 'var(--muted)',
          margin: '18px 0 0',
          lineHeight: 1.65,
          maxWidth: 520,
        }}
      >
        Real shelter staff read every application. Take your time — honest
        answers are what help us picture {petName} in your home.
      </p>
    </header>
  )
}
