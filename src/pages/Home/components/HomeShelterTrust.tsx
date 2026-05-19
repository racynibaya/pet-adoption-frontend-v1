import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import {
  TrustSmallPaws,
  TrustPhotoPerson,
  TrustPhotoCat,
  CheckBadgeIcon,
} from '../assets';
import { TRUST_POINTS } from '../data';

export default function HomeShelterTrust() {
  return (
    <section className='section-tight'>
      <div className='r-grid-2 gap-16 items-center home-trust-grid'>
        <div className='relative home-trust-photos' aria-hidden='true'>
          <TrustSmallPaws />
          <TrustPhotoPerson />
          <TrustPhotoCat />
        </div>

        <div>
          <Eyebrow>Trusted shelters</Eyebrow>
          <h2 style={{ marginTop: 14 }}>
            Adopt from shelters
            <br />
            you can actually
            <br />
            trust
          </h2>
          <p className='mt-16 muted' style={{ maxWidth: 460 }}>
            Every shelter on KodaNest is verified and accountable. Shelter staff
            review each adoption application personally — no algorithm decides
            the right home for a pet.
          </p>
          <ul className='mt-6 flex flex-col gap-3.5'>
            {TRUST_POINTS.map((point) => (
              <li
                key={point}
                className='flex gap-3 items-start list-none text-(--ink-2) text-[15px]'
              >
                <CheckBadgeIcon />
                {point}
              </li>
            ))}
          </ul>
          <Link className='btn btn-primary mt-32' to='/shelters'>
            Browse shelters →
          </Link>
        </div>
      </div>
    </section>
  );
}
