import { useStaff } from '@/context/useStaff'
import {
  UseCasesHero,
  UseCasesShelterGrid,
  UseCasesHowItWorks,
  UseCasesCta,
} from './components'

export { SHELTERS } from './data'
export type { Shelter } from './types'

export default function SheltersPage() {
  const { pets } = useStaff()
  const countFor = (shelterId: number) =>
    pets.filter(p => p.shelterId === shelterId && p.status === 'AVAILABLE').length

  return (
    <>
      <UseCasesHero />
      <UseCasesShelterGrid countFor={countFor} />
      <UseCasesHowItWorks />
      <UseCasesCta />
    </>
  )
}
