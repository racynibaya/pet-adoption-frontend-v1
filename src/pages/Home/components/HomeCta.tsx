import { Link } from 'react-router-dom';
import CtaBand from '@/components/shared/CtaBand';

export default function HomeCta() {
  return (
    <CtaBand
      heading={
        <>
          Ready to find your
          <br />
          new family member?
        </>
      }
      description='Browse adoptable pets from verified shelters near you. Create an account and submit your first application in minutes.'
    >
      <Link to='/pets' className='btn btn-primary btn-lg'>
        Browse pets
      </Link>
      <Link
        to='/contact'
        className='btn btn-lg'
        style={{ background: '#fff', color: 'var(--ink)' }}
      >
        Talk to us
      </Link>
    </CtaBand>
  );
}
