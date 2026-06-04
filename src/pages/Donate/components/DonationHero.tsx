import { ArrowRight } from 'lucide-react';
import Eyebrow from '@/components/ui/Eyebrow';
import { PawDeco, HandsHoldingPup } from '../assets';
import { DEFAULT_SELECTED_AMOUNT } from '../constants/donate.constants';

type DonationHeroProps = {
  onSelectImpactTier: (amount: number) => void;
};

export default function DonationHero({
  onSelectImpactTier,
}: DonationHeroProps) {
  return (
    <section
      className='section text-left rounded-3xl relative overflow-hidden'
      style={{
        padding: 'clamp(56px, 7vw, 112px) clamp(28px, 5vw, 80px)',
        background:
          'radial-gradient(ellipse 60% 70% at 88% 12%, rgba(93,181,196,0.35) 0%, transparent 55%),' +
          'radial-gradient(ellipse 70% 60% at 8% 88%, rgba(253,221,176,0.6) 0%, transparent 55%),' +
          'linear-gradient(158deg, #FFF8F0 0%, #FDE9C4 55%, #FCDDE3 100%)',
      }}
    >
      <span
        className='absolute'
        style={{
          top: 56,
          left: 56,
          animation: 'floatY 5s ease-in-out infinite',
        }}
      >
        <PawDeco size={36} opacity={0.5} />
      </span>
      <span
        className='absolute'
        style={{
          top: 110,
          right: 80,
          animation: 'floatY 6s ease-in-out infinite',
          animationDelay: '0.6s',
        }}
      >
        <PawDeco size={28} opacity={0.45} />
      </span>
      <span
        className='absolute'
        style={{
          bottom: 60,
          left: '38%',
          animation: 'floatY 7s ease-in-out infinite',
          animationDelay: '1.2s',
        }}
      >
        <PawDeco size={22} opacity={0.4} />
      </span>

      <div
        className='grid items-center donate-hero-grid'
        style={{ gap: 'clamp(40px, 6vw, 88px)' }}
      >
        <div className='donate-hero-text'>
          <Eyebrow>Give · So they can stay</Eyebrow>
          <h1
            className='mt-8'
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            A bowl. A bed.
            <br />
            <span style={{ color: 'var(--rausch)', fontStyle: 'italic' }}>
              A second
            </span>{' '}
            chance.
          </h1>
          <p
            className='max-w-xl'
            style={{
              marginTop: 28,
              color: 'var(--ink-2)',
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            Every gift becomes something a pet can feel — warmth on the tongue,
            a needle that stops the shivering, a couch they’re finally allowed
            on.
          </p>

          <div
            className='inline-flex items-center gap-3 mt-10 rounded-full'
            style={{
              padding: '12px 22px',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(232, 146, 60, 0.25)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <span
              className='relative flex items-center justify-center'
              style={{ width: 10, height: 10 }}
            >
              <span
                className='absolute inset-0 rounded-full'
                style={{
                  background: '#1D7575',
                  animation: 'fadeIn 1.5s ease-in-out infinite alternate',
                }}
              />
            </span>
            <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>
              <strong style={{ color: 'var(--ink)' }}>₱147,250</strong> raised
              this week ·{' '}
              <strong style={{ color: 'var(--ink)' }}>23 pets</strong> fed today
            </span>
          </div>

          <div className='flex flex-wrap gap-4 mt-10 donate-hero-cta-row'>
            <button
              type='button'
              className='btn btn-primary btn-lg max-sm:w-full inline-flex items-center gap-1.5'
              onClick={() => onSelectImpactTier(DEFAULT_SELECTED_AMOUNT)}
            >
              Send Love <ArrowRight size={16} />
            </button>
            <a
              href='#journey'
              className='btn btn-soft btn-lg max-sm:block max-sm:w-full'
            >
              See the journey
            </a>
          </div>
        </div>

        <div
          className='donate-hero-art'
          style={{
            animation: 'authScaleIn 0.6s var(--ease-spring) both',
            animationDelay: '0.15s',
          }}
        >
          <HandsHoldingPup />
        </div>
      </div>
    </section>
  );
}
