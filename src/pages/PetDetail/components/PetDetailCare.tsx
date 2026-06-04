import PetDetailCareChip from './PetDetailCareChip'

interface PetDetailCareProps {
  vaccinated: boolean
  neutered: boolean
  houseTrained: boolean
}

export default function PetDetailCare({ vaccinated, neutered, houseTrained }: PetDetailCareProps) {
  if (!vaccinated && !neutered && !houseTrained) return null
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
        Care &amp; Health
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <PetDetailCareChip label='Vaccinated' active={vaccinated} />
        <PetDetailCareChip label='Neutered / Spayed' active={neutered} />
        <PetDetailCareChip label='House Trained' active={houseTrained} />
      </div>
    </div>
  )
}
