import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { BackendSpecies } from '@/services/api';
import type { Shelter } from '@/data/shelters';
import { REGIONS } from '../data/regions';
import { SPECIES_ICON } from '../assets/svg/species';
import { SPECIES_LABELS, SPECIES_ORDER } from '../data/species';

interface UseCasesShelterCardProps {
  shelter: Shelter;
  availableCount: number;
  speciesCounts: Partial<Record<BackendSpecies, number>>;
  isNew?: boolean;
}

function StatusBadge({ count }: { count: number }) {
  if (count === 0) {
    return (
      <span
        className='inline-flex items-center gap-1.5'
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.04em',
          padding: '3px 10px',
          borderRadius: 20,
          background: 'rgba(255,255,255,0.92)',
          color: '#6c8080',
          border: '1px solid rgba(108,128,128,0.18)',
        }}
      >
        <span
          aria-hidden='true'
          className='inline-block h-1.5 w-1.5 rounded-full bg-(--muted)'
        />
        Between intakes
      </span>
    );
  }
  return (
    <span
      className='inline-flex items-center gap-1.5'
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        padding: '3px 10px',
        borderRadius: 20,
        background: '#e6f4f0',
        color: '#1D7575',
      }}
    >
      <span
        aria-hidden='true'
        className='inline-block h-1.5 w-1.5 rounded-full bg-[#1D7575]'
      />
      {count} {count === 1 ? 'pet' : 'pets'} available
    </span>
  );
}

function SpeciesChip({
  species,
  count,
}: {
  species: BackendSpecies;
  count: number;
}) {
  const Icon = SPECIES_ICON[species];
  const labels = SPECIES_LABELS[species];
  const label = `${count} ${count === 1 ? labels.sing : labels.plur}`;
  return (
    <span
      role='img'
      aria-label={label}
      className='inline-flex items-center justify-center gap-1.5 rounded-md border border-(--hairline-soft) bg-(--canvas) px-2 py-1.5 text-[11px] font-semibold leading-none tracking-tight'
    >
      <Icon aria-hidden='true' className='h-3.5 w-3.5 shrink-0 text-(--rausch)' />
      <span className='tabular-nums text-(--ink)'>{count}</span>
      <span className='text-(--muted) font-medium'>
        {count === 1 ? labels.sing : labels.plur}
      </span>
    </span>
  );
}

export default function UseCasesShelterCard({
  shelter,
  availableCount,
  speciesCounts,
  isNew = false,
}: UseCasesShelterCardProps) {
  const { id, name, city, region: regionId, bg, svg, description } = shelter;
  const region = REGIONS[regionId]?.display ?? regionId;
  const visibleSpecies = SPECIES_ORDER.filter(
    (s) => (speciesCounts[s] ?? 0) > 0,
  );
  const isEmpty = availableCount === 0;

  return (
    <article
      className={`group bg-(--canvas) rounded-[20px] overflow-hidden border border-(--hairline-soft) flex flex-col min-w-0 transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-(--shadow-lift) ${
        isEmpty ? 'opacity-90' : ''
      }`}
    >
      <Link
        to={`/shelters/${id}`}
        className='relative flex items-center justify-center overflow-hidden'
        style={{ aspectRatio: '4 / 3', background: bg, display: 'flex' }}
        tabIndex={-1}
        aria-label={`View details for ${name}`}
      >
        <span className='absolute top-3 left-3 z-2'>
          <StatusBadge count={availableCount} />
        </span>
        {isNew && (
          <span
            className='absolute top-3 right-3 z-2 inline-flex items-center gap-1 rounded-full bg-(--rausch) px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_2px_8px_rgba(232,146,60,0.45)]'
            aria-label='New shelter on KodaNest'
          >
            <span
              aria-hidden='true'
              className='inline-block h-1.5 w-1.5 rounded-full bg-white/95'
            />
            New
          </span>
        )}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.04] [&>svg]:h-full [&>svg]:w-full [&>img]:h-full [&>img]:w-full [&>img]:object-cover ${
            isEmpty ? 'grayscale-[0.35]' : ''
          }`}
        >
          {svg}
        </div>
      </Link>

      <div className='p-5.5 pb-6 flex-1 flex flex-col'>
        <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-(--muted)'>
          {region} · {city}
        </p>
        <Link
          to={`/shelters/${id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3 className='text-[20px] mt-1.5 hover:text-(--rausch) transition-colors duration-150 line-clamp-2'>
            {name}
          </h3>
        </Link>
        {description && (
          <p className='text-[13.5px] text-(--ink-2) mt-2.5 line-clamp-2 leading-relaxed'>
            {description}
          </p>
        )}

        <div className='flex-1' aria-hidden='true' />

        <div className='mt-4 pt-4 border-t border-(--hairline-soft)'>
          {visibleSpecies.length > 0 ? (
            <div className='grid grid-cols-3 auto-rows-fr gap-1.5 min-h-5'>
              {visibleSpecies.map((s) => (
                <SpeciesChip
                  key={s}
                  species={s}
                  count={speciesCounts[s] ?? 0}
                />
              ))}
            </div>
          ) : (
            <p className='text-[12.5px] text-(--muted) leading-relaxed min-h-5'>
              No pets currently listed — the shelter is between intakes.
            </p>
          )}
          <div className='mt-4 flex justify-between items-center gap-2'>
            <Link to={`/shelters/${id}`} className='btn btn-soft btn-sm'>
              View shelter
            </Link>
            {availableCount > 0 ? (
              <Link
                to={`/shelters/${id}/pets`}
                className='btn btn-primary btn-sm inline-flex items-center gap-1'
              >
                See pets <ArrowRight size={13} />
              </Link>
            ) : (
              <Link
                to={`/shelters/${id}#contact`}
                className='btn btn-soft btn-sm'
              >
                Contact shelter
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
