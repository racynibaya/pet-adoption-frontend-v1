import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';

export default function DonationOtherWays() {
  return (
    <section
      className='section-tight rounded-3xl text-center mb-5'
      style={{
        padding: 'clamp(56px, 7vw, 96px) clamp(28px, 5vw, 72px)',
        background: 'var(--ink)',
        color: '#fff',
      }}
    >
      <Eyebrow style={{ color: 'var(--cream-2)', justifyContent: 'center' }}>
        Not today?
      </Eyebrow>
      <h2
        className='mt-6'
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 40px)',
          color: '#fff',
          lineHeight: 1.2,
        }}
      >
        You don’t have to give money to give a damn.
      </h2>
      <p
        className='mx-auto mt-6'
        style={{
          maxWidth: 540,
          color: '#c8cbd6',
          fontSize: 16,
          lineHeight: 1.65,
        }}
      >
        Foster a pet between homes, volunteer at a shelter, or just share one of
        these faces with someone who might be ready.
      </p>
      <div className='flex gap-4 justify-center mt-10 flex-wrap'>
        <Link
          to='/pets'
          className='btn'
          style={{
            background: 'var(--cream)',
            color: 'var(--ink)',
            borderColor: 'var(--cream)',
          }}
        >
          Browse pets
        </Link>
        <Link
          to='/contact'
          className='btn btn-outline'
          style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
        >
          Volunteer with us
        </Link>
      </div>
    </section>
  );
}
