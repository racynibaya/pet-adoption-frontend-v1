interface UserDashboardJourneyProps {
  savedCount: number
}

export default function UserDashboardJourney({ savedCount }: UserDashboardJourneyProps) {
  return (
    <section className='u-section' style={{ ['--i' as string]: 3, marginTop: 48 }}>
      <header className='u-section-head'>
        <div>
          <div className='u-section-num'>02 — Journey</div>
          <h2 className='u-section-title'>Where you are right now</h2>
        </div>
        <div className='u-section-aside'>
          A guided path from first click to first meet.
        </div>
      </header>

      <div className='user-timeline'>
        <div>
          <h3 className='user-timeline-head'>
            {savedCount === 0
              ? 'Start by saving a few favorites.'
              : 'You’re ready to take the next step.'}
          </h3>
          <p className='user-timeline-body'>
            Most adoptions begin with a short conversation. When you’re ready,
            open a pet’s page and submit an application — the shelter will
            reach out within a few days.
          </p>
        </div>

        <ol className='user-steps' aria-label='Adoption steps'>
          <li className={`user-step ${savedCount > 0 ? 'is-done' : 'is-active'}`}>
            <span className='user-step-dot'>{savedCount > 0 ? '✓' : '1'}</span>
            <div>
              <div className='user-step-title'>Save pets you love</div>
              <div className='user-step-meta'>{savedCount} saved so far</div>
            </div>
          </li>
          <li className={`user-step ${savedCount > 0 ? 'is-active' : ''}`}>
            <span className='user-step-dot'>2</span>
            <div>
              <div className='user-step-title'>Submit an application</div>
              <div className='user-step-meta'>Takes about 5 minutes</div>
            </div>
          </li>
          <li className='user-step'>
            <span className='user-step-dot'>3</span>
            <div>
              <div className='user-step-title'>Meet & welcome home</div>
              <div className='user-step-meta'>Coordinated with the shelter</div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}
