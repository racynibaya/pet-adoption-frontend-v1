import { ArrowUpRight } from 'lucide-react';
import Eyebrow from '@/components/ui/Eyebrow';
import { REGIONS } from '@/pages/UseCases/data/regions';
import type { ShelterDetailModel } from '../types';

interface ShelterDetailLocationProps {
  shelter: ShelterDetailModel;
}

interface AddressRowProps {
  label: string;
  value: string;
}

function AddressRow({ label, value }: AddressRowProps) {
  if (!value) return null;
  return (
    <div className='flex flex-col gap-1 py-3 border-b border-(--hairline-soft) last:border-b-0'>
      <span className='text-11 tracking-widest uppercase text-(--muted) font-bold'>
        {label}
      </span>
      <span className='text-15 text-(--ink)'>{value}</span>
    </div>
  );
}

export default function ShelterDetailLocation({
  shelter,
}: ShelterDetailLocationProps) {
  const fullAddress = [shelter.addressLine, shelter.city, shelter.province]
    .filter(Boolean)
    .join(', ');
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  const regionDisplay = REGIONS[shelter.region]?.display ?? shelter.region;

  return (
    <section className='section' style={{ padding: '28px 0' }}>
      <div className='flex items-center gap-3 mb-5'>
        <span
          aria-hidden='true'
          className='block h-px w-12 rounded-full'
          style={{ background: 'var(--rausch)' }}
        />
        <Eyebrow>Where to find us</Eyebrow>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-5 items-stretch'>
        <div
          className='rounded-3xl border border-(--hairline-soft) p-6 md:p-7'
          style={{ background: 'var(--soft)' }}
        >
          <h2
            className='text-22 sm:text-26 leading-tight mb-3'
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Visit us in person
          </h2>
          <div className='flex flex-col'>
            <AddressRow label='Street' value={shelter.addressLine} />
            <AddressRow label='City' value={shelter.city} />
            <AddressRow label='Province' value={shelter.province} />
            <AddressRow label='Region' value={regionDisplay} />
          </div>
        </div>

        <a
          href={mapsHref}
          target='_blank'
          rel='noopener noreferrer'
          className='group relative rounded-3xl overflow-hidden no-underline flex flex-col justify-between p-6 md:p-7 transition-transform duration-300 ease-out hover:scale-[1.01]'
          style={{
            background: `
              radial-gradient(ellipse 60% 70% at 100% 0%, rgba(232,146,60,0.22) 0%, transparent 55%),
              radial-gradient(ellipse 55% 60% at 0% 100%, rgba(29,117,117,0.18) 0%, transparent 55%),
              linear-gradient(150deg, var(--ink) 0%, #2a3f3f 100%)
            `,
            minHeight: '200px',
          }}
        >
          <div
            aria-hidden='true'
            className='absolute inset-0 opacity-30 pointer-events-none'
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent 0 22px, rgba(255,255,255,0.04) 22px 24px)`,
            }}
          />
          <div className='relative'>
            <span
              className='inline-block text-11 tracking-widest uppercase font-bold'
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Directions
            </span>
            <h3
              className='mt-2 text-22 sm:text-26 leading-tight'
              style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
            >
              Open in Google Maps
            </h3>
            <p
              className='mt-2 text-13 max-w-100'
              style={{ color: 'rgba(255,255,255,0.62)' }}
            >
              Get turn-by-turn directions from wherever you are.
            </p>
          </div>
          <div
            className='relative inline-flex items-center gap-2 text-14 font-semibold mt-4 transition-transform duration-300 group-hover:translate-x-1'
            style={{ color: '#fff' }}
          >
            <ArrowUpRight size={18} aria-hidden='true' />
            <span>Launch Maps</span>
          </div>
        </a>
      </div>
    </section>
  );
}
