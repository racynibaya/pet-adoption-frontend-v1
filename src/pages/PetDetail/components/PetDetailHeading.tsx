interface PetDetailHeadingProps {
  name: string
  breed: string
  species: string
  gender: string
}

export default function PetDetailHeading({ name, breed, species, gender }: PetDetailHeadingProps) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 700,
            color: 'var(--ink)',
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {name}
        </h1>
      </div>
      <p style={{ fontSize: 17, color: 'var(--muted)', marginTop: 8, fontWeight: 500 }}>
        {breed} · {species} · {gender}
      </p>
    </div>
  )
}
