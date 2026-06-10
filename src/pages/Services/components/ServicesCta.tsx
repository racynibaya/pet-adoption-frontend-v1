import { Link } from 'react-router-dom'

export default function ServicesCta() {
  return (
    <section className='section-tight'>
      <div className='cream-band'>
        <div className='grid gap-8 items-center md:grid-cols-[1.5fr_1fr]'>
          <div>
            <h2 className='text-40'>Ready to apply?</h2>
            <p className='mt-12 muted'>
              Create an account, complete your adopter profile, and submit an
              application to the shelter of your choice. A real shelter staff
              member reviews every request.
            </p>
          </div>
          <div className='text-right'>
            <Link to='/contact' className='btn btn-primary btn-lg'>
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
