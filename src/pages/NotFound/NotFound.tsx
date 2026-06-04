import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Eyebrow from '@/components/ui/Eyebrow';
import { LostPup, PawTrail } from './assets';

export default function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    if (typeof console !== 'undefined') {
      console.warn(
        `[404] Unknown route: ${location.pathname}${location.search}`,
      );
    }
  }, [location.pathname, location.search]);

  return (
    <section
      className='hero-bg  relative overflow-hidden text-center h-dvh flex flex-col justify-center'
      style={{ padding: '88px 32px 96px' }}
    >
      {/* Decorative paw trails */}
      <div
        aria-hidden
        className='pointer-events-none absolute'
        style={{ top: 24, left: -40 }}
      >
        <PawTrail rotate={-8} opacity={0.45} />
      </div>
      <div
        aria-hidden
        className='pointer-events-none absolute'
        style={{ bottom: 36, right: -60 }}
      >
        <PawTrail rotate={14} opacity={0.4} />
      </div>

      <div className='relative mx-auto' style={{ maxWidth: 720, zIndex: 1 }}>
        <Eyebrow style={{ justifyContent: 'center' }}>Lost the trail?</Eyebrow>

        {/* 404 typography — the middle 0 is replaced with the lost pup */}
        <div
          className='flex items-center justify-center mt-8 select-none'
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: 'var(--ink)',
          }}
        >
          <span
            className='not-found-digit'
            style={{ fontSize: 'clamp(96px, 18vw, 200px)' }}
          >
            4
          </span>
          <span
            className='not-found-pup mx-2'
            aria-hidden
            style={{
              width: 'clamp(120px, 22vw, 240px)',
              height: 'clamp(120px, 22vw, 240px)',
              filter: 'drop-shadow(0 18px 28px rgba(18, 52, 64, 0.18))',
            }}
          >
            <LostPup />
          </span>
          <span
            className='not-found-digit'
            style={{ fontSize: 'clamp(96px, 18vw, 200px)' }}
          >
            4
          </span>
        </div>

        <h1
          className='mt-8'
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            lineHeight: 1.12,
            letterSpacing: '-0.012em',
          }}
        >
          This page wandered off.
        </h1>

        <p
          className='mx-auto'
          style={{
            marginTop: 16,
            maxWidth: 520,
            fontSize: 17,
            color: 'var(--ink-2)',
            lineHeight: 1.6,
          }}
        >
          Our pup sniffed every corner but couldn’t find what you’re looking
          for. Don’t worry — the rest of the kennel is just a click away.
        </p>

        {/* Show the bad path so the user understands what happened */}
        <div
          className='inline-flex items-center mx-auto mt-6'
          style={{
            gap: 10,
            padding: '8px 16px',
            borderRadius: 999,
            background: 'rgba(255, 255, 255, 0.55)',
            border: '1px solid var(--hairline)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            fontSize: 13,
            color: 'var(--ink-2)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: 'var(--rausch)',
              flexShrink: 0,
            }}
          />
          <span style={{ fontWeight: 600, color: 'var(--ink)' }}>
            You tried:
          </span>
          <code
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: 12.5,
              color: 'var(--rausch-active)',
              maxWidth: 320,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {location.pathname}
          </code>
        </div>

        {/* CTAs */}
        <div className='hero-cta-row flex items-center justify-center gap-3 mt-10'>
          <Link to='/' className='btn btn-primary btn-lg inline-flex items-center gap-2'>
            <ArrowLeft size={16} /> Take me home
          </Link>
          <Link to='/pets' className='btn btn-outline btn-lg'>
            Browse all pets
          </Link>
        </div>
      </div>

      {/* Local styles for hover effects — kept inline-scoped so we don't
          touch the shared global stylesheet for this single page. */}
      <style>{`
        .not-found-card:hover {
          transform: translateY(-3px);
          border-color: var(--rausch);
          background: #fff;
          box-shadow: 0 12px 28px -16px rgba(232, 146, 60, 0.45);
          text-decoration: none;
        }
        .not-found-card:hover .not-found-card-arrow {
          transform: translateX(4px);
        }
        .not-found-pup {
          animation: notFoundPupBob 4.2s ease-in-out infinite;
        }
        @keyframes notFoundPupBob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .not-found-pup { animation: none; }
          .not-found-card { animation: none !important; }
        }
        @media (max-width: 640px) {
          .not-found-digit { font-size: clamp(72px, 22vw, 120px) !important; }
        }
      `}</style>
    </section>
  );
}
