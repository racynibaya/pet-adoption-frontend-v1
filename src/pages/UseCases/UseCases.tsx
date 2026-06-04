import { usePets } from '@/context/usePets'
import type { BackendSpecies } from '@/services/api'
import {
  UseCasesHero,
  UseCasesStats,
  UseCasesShelterGrid,
  UseCasesHowItWorks,
  UseCasesCta,
} from './components'

export { SHELTERS, type Shelter } from '@/data/shelters'

export type SpeciesCounts = Partial<Record<BackendSpecies, number>>

export default function SheltersPage() {
  const { pets } = usePets()

  const countFor = (shelterId: number) =>
    pets.filter(p => p.shelterId === shelterId && p.status === 'AVAILABLE').length

  const speciesCountsFor = (shelterId: number): SpeciesCounts => {
    const counts: SpeciesCounts = {}
    for (const p of pets) {
      if (p.shelterId !== shelterId || p.status !== 'AVAILABLE') continue
      counts[p.species] = (counts[p.species] ?? 0) + 1
    }
    return counts
  }

  return (
    <>
      <UseCasesHero />
      <UseCasesStats />
      <UseCasesShelterGrid
        countFor={countFor}
        speciesCountsFor={speciesCountsFor}
      />
      <UseCasesHowItWorks />
      <UseCasesCta />
    </>
  )
}
