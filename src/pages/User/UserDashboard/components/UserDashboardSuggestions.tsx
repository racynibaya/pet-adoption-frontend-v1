import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { PetCard } from '@/data/pets'
import UserDashboardPetCard from './UserDashboardPetCard'

interface UserDashboardSuggestionsProps {
  suggestions: PetCard[]
}

export default function UserDashboardSuggestions({ suggestions }: UserDashboardSuggestionsProps) {
  return (
    <section className='u-section' style={{ ['--i' as string]: 4, marginTop: 48 }}>
      <header className='u-section-head'>
        <div>
          <div className='u-section-num'>03 — For you</div>
          <h2 className='u-section-title'>A few you might love</h2>
        </div>
        <div className='u-section-aside'>
          <Link to='/pets' className='inline-flex items-center gap-1'>See more <ArrowRight size={13} /></Link>
        </div>
      </header>

      {suggestions.length === 0 ? (
        <div className='user-empty'>
          <div className='user-empty-title'>Nothing new just yet</div>
          <p style={{ margin: 0 }}>
            Check back soon — new pets arrive at shelters every week.
          </p>
        </div>
      ) : (
        <div className='user-pet-grid'>
          {suggestions.map((p) => (
            <UserDashboardPetCard key={p.id} pet={p} />
          ))}
        </div>
      )}
    </section>
  )
}
