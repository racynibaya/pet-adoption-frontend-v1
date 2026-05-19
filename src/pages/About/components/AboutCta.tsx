import { Link } from 'react-router-dom'

export default function AboutCta() {
  return (
    <section className='section-tight'>
      <div className='cta-band'>
        <div>
          <h2>Want to work with us?</h2>
          <p>
            We're hiring counselors, vets, and engineers in San Agustin HQ.
            Bring your pet to the interview.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <Link to='/contact' className='btn btn-primary btn-lg'>
            Open roles
          </Link>
        </div>
      </div>
    </section>
  )
}
