import ShelterDetailStatTile from './ShelterDetailStatTile'

interface ShelterDetailStatsProps {
  availableCount: number
  totalCount: number
  city: string
}

export default function ShelterDetailStats({ availableCount, totalCount, city }: ShelterDetailStatsProps) {
  return (
    <section
      className='section grid grid-cols-1 sm:grid-cols-3 gap-3'
      style={{ padding: '8px 0 20px' }}
    >
      <ShelterDetailStatTile label='Available now' value={String(availableCount)} />
      <ShelterDetailStatTile label='In our care' value={String(totalCount)} />
      <ShelterDetailStatTile label='Location' value={city} />
    </section>
  )
}
