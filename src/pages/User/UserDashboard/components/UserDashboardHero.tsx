interface UserDashboardHeroProps {
  greeting: string
  firstName: string
  lastName: string | undefined
  fullName: string
  email: string
  initials: string
  isVerified: boolean
  joinedLabel: string
  savedCount: number
  journeyStep: string
  journeyPct: number
}

export default function UserDashboardHero({
  greeting,
  firstName,
  fullName,
  email,
  initials,
  isVerified,
  joinedLabel,
  savedCount,
  journeyStep,
  journeyPct,
}: UserDashboardHeroProps) {
  return (
    <section className='u-section user-hero' style={{ ['--i' as string]: 0 }}>
      <div>
        <div className='user-hero-eyebrow'>{greeting}, friend</div>
        <h1 className='user-hero-title'>
          Welcome back, <em>{firstName || 'there'}</em>.
        </h1>
        <p className='user-hero-lede'>
          Your adoption journey is a story still being written. Below is where
          you left off — the pets you’ve saved, the steps you’ve taken, and a
          few new faces we think you should meet.
        </p>
        <div className='user-hero-meta'>
          <span>Member since {joinedLabel}</span>
          <span className='dot' aria-hidden />
          <span>{savedCount} saved {savedCount === 1 ? 'pet' : 'pets'}</span>
          <span className='dot' aria-hidden />
          <span>{email}</span>
        </div>
      </div>

      <div className='user-hero-side'>
        <div className='user-avatar-tile'>
          <div className='user-avatar-orb' aria-hidden>
            <div className='user-avatar-orb-inner'>{initials || 'KN'}</div>
          </div>
          <div className='user-avatar-meta'>
            <div className='user-avatar-name'>{fullName || email}</div>
            <div className='user-avatar-email'>{email}</div>
          </div>
          <span className={isVerified ? 'user-verified' : 'user-verified pending'}>
            {isVerified ? 'Verified' : 'Verify'}
          </span>
        </div>

        <div className='user-journey'>
          <div className='user-journey-label'>Adoption journey</div>
          <div className='user-journey-step'>{journeyStep}</div>
          <div className='user-journey-bar' aria-hidden>
            <div className='user-journey-bar-fill' style={{ width: `${journeyPct}%` }} />
          </div>
        </div>
      </div>
    </section>
  )
}
