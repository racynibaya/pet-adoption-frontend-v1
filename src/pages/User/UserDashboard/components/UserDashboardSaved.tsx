import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { PetCard } from '@/data/pets'
import UserDashboardPetCard from './UserDashboardPetCard'

interface UserDashboardSavedProps {
  savedPets: PetCard[]
}

export default function UserDashboardSaved({ savedPets }: UserDashboardSavedProps) {
  return (
    <section className='u-section' style={{ ['--i' as string]: 2, marginTop: 48 }}>
      <header className='u-section-head'>
        <div>
          <div className='u-section-num'>01 — Saved</div>
          <h2 className='u-section-title'>The ones who caught your eye</h2>
        </div>
        <div className='u-section-aside'>
          <Link to='/pets' className='inline-flex items-center gap-1'>Browse all pets <ArrowRight size={13} /></Link>
        </div>
      </header>

      {savedPets.length === 0 ? (
        <div className='user-empty'>
          <div className='user-empty-title'>No saved pets yet</div>
          <p style={{ margin: 0 }}>
            Tap the heart on any pet to keep them here for later.
          </p>
          <Link to='/pets' className='user-empty-cta'>
            Start browsing
          </Link>
        </div>
      ) : (
        <div className='user-pet-grid'>
          {savedPets.map((p) => (
            <UserDashboardPetCard key={p.id} pet={p} />
          ))}
        </div>
      )}
    </section>
  )
}
