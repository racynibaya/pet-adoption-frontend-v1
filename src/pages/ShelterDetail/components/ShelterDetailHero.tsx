import type { ReactNode } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import type { ShelterDetailModel } from '../types';

interface ShelterDetailHeroProps {
  shelter: ShelterDetailModel;
  city: string;
  province: string;
}

function getInitials(name: string): string {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => /[A-Za-z]/.test(w[0] ?? ''))
    .map((w) => w[0]!.toUpperCase());
  if (letters.length === 0) return '·';
  if (letters.length === 1) return letters[0]!;
  return (letters[0]! + letters[letters.length - 1]!).slice(0, 2);
}

function HeroMonogram({ name }: { name: string }) {
  const initials = getInitials(name);
  return (
    <div
      aria-hidden='true'
      className='relative w-full h-full flex items-center justify-center'
      style={{
        background: `
          radial-gradient(ellipse 55% 60% at 30% 30%, rgba(232,146,60,0.32) 0%, transparent 60%),
          radial-gradient(ellipse 55% 60% at 75% 75%, rgba(29,117,117,0.22) 0%, transparent 60%),
          linear-gradient(150deg, #FDFAF4 0%, #F0E2BE 100%)
        `,
      }}
    >
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-50'
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(28,44,44,0.10) 1px, transparent 1.5px)',
          backgroundSize: '14px 14px',
        }}
      />
      <span
        aria-hidden='true'
        className='absolute rounded-full border'
        style={{
          width: '70%',
          aspectRatio: '1 / 1',
          borderColor: 'rgba(28,44,44,0.12)',
          borderWidth: '1px',
        }}
      />
      <span
        aria-hidden='true'
        className='absolute rounded-full border'
        style={{
          width: '52%',
          aspectRatio: '1 / 1',
          borderColor: 'rgba(232,146,60,0.40)',
          borderStyle: 'dashed',
          borderWidth: '1px',
        }}
      />
      <span
        className='relative text-(--ink) select-none'
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(72px, 14vw, 132px)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        {initials}
      </span>
      <span className='absolute bottom-5 left-5 text-[10px] tracking-[0.25em] uppercase font-bold text-(--muted)'>
        Verified · KodaNest
      </span>
    </div>
  );
}

function HeroIllustration({ bg, svg }: { bg: string; svg: ReactNode }) {
  return (
    <div
      className='w-full h-full flex items-center justify-center'
      style={{ background: bg }}
    >
      <div style={{ transform: 'scale(1.8)' }}>{svg}</div>
    </div>
  );
}

function HeroPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className='w-full h-full object-cover'
      loading='eager'
    />
  );
}

export default function ShelterDetailHero({
  shelter,
  city,
  province,
}: ShelterDetailHeroProps) {
  const region = [city, province].filter(Boolean).join(', ');

  const hasIllustration = shelter.bg && shelter.svg;
  const hasPhoto = !!shelter.imageUrl;

  return (
    <section
      className='section relative overflow-hidden rounded-3xl grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-8 md:gap-10 items-center'
      style={{
        padding: '40px 32px',
        background: `
          radial-gradient(ellipse 58% 54% at 82% 14%, rgba(29,117,117,0.15) 0%, transparent 53%),
          radial-gradient(ellipse 48% 52% at 18% 86%, rgba(232,146,60,0.18) 0%, transparent 54%),
          linear-gradient(156deg, #FDFAF4 0%, #F0E8D0 100%)
        `,
      }}
    >
      <div
        className='rounded-3xl overflow-hidden border border-(--hairline-soft) transition-transform duration-500 ease-out hover:scale-[1.02]'
        style={{
          aspectRatio: '4 / 3',
          boxShadow:
            '0 12px 48px rgba(28,44,44,0.10), 0 2px 12px rgba(28,44,44,0.06)',
        }}
      >
        {hasPhoto ? (
          <HeroPhoto src={shelter.imageUrl!} alt={shelter.name} />
        ) : hasIllustration ? (
          <HeroIllustration bg={shelter.bg!} svg={shelter.svg!} />
        ) : (
          <HeroMonogram name={shelter.name} />
        )}
      </div>

      <div>
        <div className='flex items-center gap-3'>
          <span
            aria-hidden='true'
            className='block h-px w-12 rounded-full'
            style={{ background: 'var(--rausch)' }}
          />
          <Eyebrow>Verified shelter</Eyebrow>
        </div>
        <h1
          className='mt-4 text-[34px] sm:text-[44px] md:text-[56px] leading-[1.04]'
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {shelter.name}
        </h1>
        {region && (
          <div className='mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--hairline-soft) bg-white/70 backdrop-blur-sm'>
            <span aria-hidden='true' className='text-[14px]'>
              📍
            </span>
            <span className='text-[13px] font-semibold tracking-wide text-(--ink-2)'>
              {region}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
