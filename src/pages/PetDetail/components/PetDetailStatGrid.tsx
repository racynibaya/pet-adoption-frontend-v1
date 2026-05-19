import PetDetailStatBox from './PetDetailStatBox'

interface PetDetailStatGridProps {
  age: string
  size: string
  gender: string
  species: string
}

export default function PetDetailStatGrid({ age, size, gender, species }: PetDetailStatGridProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 10 }}>
      <PetDetailStatBox label='Age' value={age} />
      <PetDetailStatBox label='Size' value={size} />
      <PetDetailStatBox label='Gender' value={gender} />
      <PetDetailStatBox label='Species' value={species} />
    </div>
  )
}
