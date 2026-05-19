import { Link } from 'react-router-dom'

export default function UseCasesCta() {
  return (
    <section className='section-tight'>
      <div className='cta-band'>
        <div>
          <h2>Is your shelter on KodaNest?</h2>
          <p>
            Reach thousands of verified adopters. Get in touch to set up your
            shelter account and start listing pets.
          </p>
        </div>
        <div className='row' style={{ gap: 12, justifyContent: 'flex-end' }}>
          <Link to='/contact' className='btn btn-primary btn-lg'>
            Register your shelter
          </Link>
        </div>
      </div>
    </section>
  )
}
