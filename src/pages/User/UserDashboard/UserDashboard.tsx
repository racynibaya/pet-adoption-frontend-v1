import { useAdopter } from '@/context/useUser'
import { useFavorites } from '@/context/useFavorites'
import { usePets } from '@/context/usePets'
import {
  UserDashboardHero,
  UserDashboardStats,
  UserDashboardSaved,
  UserDashboardJourney,
  UserDashboardSuggestions,
  UserDashboardProfile,
} from './components'
import { greetingFor, formatJoined } from './utils/format'

export default function UserDashboard() {
  const { adopter } = useAdopter()
  const { saved, savedPets } = useFavorites()
  const { pets } = usePets()

  if (!adopter) return null

  const savedIds = new Set(saved)
  const suggestions = pets
    .filter((p) => p.status === 'AVAILABLE' && !savedIds.has(String(p.id)))
    .slice(0, 4)

  const greeting = greetingFor(new Date().getHours())
  const journeyStep = savedPets.length === 0 ? 'Discovering' : 'Shortlisting'
  const journeyPct = savedPets.length === 0 ? 12 : Math.min(70, 25 + savedPets.length * 8)
  const joinedLabel = formatJoined(adopter.joinedAt)

  return (
    <div className='user-shell'>
      <UserDashboardHero
        greeting={greeting}
        firstName={adopter.firstName || ''}
        lastName={undefined}
        fullName={adopter.name || ''}
        email={adopter.email}
        initials={adopter.initials || ''}
        isVerified={adopter.isVerified}
        joinedLabel={joinedLabel}
        savedCount={savedPets.length}
        journeyStep={journeyStep}
        journeyPct={journeyPct}
      />
      <UserDashboardStats savedCount={savedPets.length} suggestionsCount={suggestions.length} />
      <UserDashboardSaved savedPets={savedPets} />
      <UserDashboardJourney savedCount={savedPets.length} />
      <UserDashboardSuggestions suggestions={suggestions} />
      <UserDashboardProfile
        fullName={adopter.name || ''}
        email={adopter.email}
        phoneNumber={adopter.phoneNumber}
        address={adopter.address}
      />
    </div>
  )
}
