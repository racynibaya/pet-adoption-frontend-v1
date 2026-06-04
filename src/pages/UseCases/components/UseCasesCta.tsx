import { Link } from 'react-router-dom'
import CtaBand from '@/components/shared/CtaBand'

export default function UseCasesCta() {
  return (
    <CtaBand
      heading={
        <>
          Is your shelter
          <br />
          on KodaNest?
        </>
      }
      description='Reach thousands of verified adopters. Get in touch to set up your shelter account and start listing pets.'
    >
      <Link to='/contact' className='btn btn-primary btn-lg'>
        Register your shelter
      </Link>
      <Link
        to='/about'
        className='btn btn-lg'
        style={{ background: '#fff', color: 'var(--ink)' }}
      >
        Learn more
      </Link>
    </CtaBand>
  )
}
