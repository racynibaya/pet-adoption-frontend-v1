import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import HeartIcon from '@/icons/HeartIcon';
import { useFavorites } from '@/context/useFavorites';
import { useStaff } from '@/context/useStaff';
import { apiGetShelters, type ApiShelter } from '@/services/api';
import { SHELTERS } from '@/pages/UseCases/UseCases';
import { ageLabel, genderLabel, speciesLabel, type PetCard } from '@/data/pets';

function StatusBadge({
  status,
}: {
  status: 'AVAILABLE' | 'PENDING' | 'ADOPTED';
}) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        padding: '3px 10px',
        borderRadius: 20,
        background:
          status === 'AVAILABLE'
            ? '#e6f4f0'
            : status === 'PENDING'
              ? '#fff3d9'
              : '#eeeef8',
        color:
          status === 'AVAILABLE'
            ? '#1D7575'
            : status === 'PENDING'
              ? '#a87d12'
              : '#5a5a9e',
      }}
    >
      {status === 'AVAILABLE'
        ? 'Available'
        : status === 'PENDING'
          ? 'Pending'
          : 'Adopted'}
    </span>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-2xl border border-(--hairline-soft) bg-(--canvas) p-5'>
      <p className='text-[11px] font-bold tracking-[0.14em] uppercase text-(--muted) mb-1.5'>
        {label}
      </p>
      <p
        className='text-[22px] text-(--ink) leading-tight'
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {value}
      </p>
    </div>
  );
}

const GENERIC_BG = '#fde2cf';

function GenericShelterSvg() {
  return (
    <svg viewBox='0 0 200 140' width='200' height='140'>
      <rect width='200' height='140' fill={GENERIC_BG} />
      <path
        d='M40 110 L100 50 L160 110 Z'
        fill='#e8a878'
        stroke='#a87d62'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <rect x='84' y='84' width='32' height='26' fill='#a87d62' />
      <circle cx='100' cy='96' r='3' fill='#1d2235' />
    </svg>
  );
}

export default function ShelterDetail() {
  const { id } = useParams<{ id: string }>();
  const shelterId = Number(id);
  const { pets } = useStaff();
  const { toggle, isSaved } = useFavorites();

  const mockShelter = SHELTERS.find((s) => s.id === shelterId);
  const [apiShelter, setApiShelter] = useState<ApiShelter | null>(null);
  const [apiDone, setApiDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    apiGetShelters(1, 100)
      .then((res) => {
        if (cancelled) return;
        const found = res.data.find((s) => s.id === shelterId) ?? null;
        setApiShelter(found);
      })
      .catch(() => {
        // backend down — mock fallback still works
      })
      .finally(() => {
        if (!cancelled) setApiDone(true);
      });
    return () => {
      cancelled = true;
    };
  }, [shelterId]);

  const hasAny = apiShelter || mockShelter;
  if (!hasAny && apiDone) return <Navigate to='/shelters' replace />;

  const shelter = hasAny
    ? {
        id: shelterId,
        name: apiShelter?.name ?? mockShelter?.name ?? '',
        address: apiShelter?.address ?? mockShelter?.address ?? '',
        contactEmail:
          apiShelter?.contactEmail ?? mockShelter?.contactEmail ?? '',
        phoneNumber: apiShelter?.phoneNumber ?? mockShelter?.phoneNumber ?? '',
        description: mockShelter?.description ?? '',
        bg: mockShelter?.bg ?? GENERIC_BG,
        svg: mockShelter?.svg ?? <GenericShelterSvg />,
      }
    : null;

  if (!shelter) {
    return (
      <div className='py-24 text-center text-(--muted)'>Loading shelter…</div>
    );
  }

  const shelterPets: PetCard[] = pets.filter((p) => p.shelterId === shelterId);
  const availablePets = shelterPets.filter((p) => p.status === 'AVAILABLE');
  const city =
    shelter.address.split(',').slice(-2, -1)[0]?.trim() ||
    shelter.address.split(',')[0]?.trim() ||
    '—';

  return (
    <div className='pb-20'>
      {/* Breadcrumb */}
      <nav className='flex items-center gap-2 pt-6 pb-5 text-[13px] text-(--muted)'>
        <Link
          to='/shelters'
          className='inline-flex items-center gap-1.5 text-(--muted) hover:text-(--ink) transition-colors font-semibold no-underline'
        >
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
            <path
              d='M9 11L5 7l4-4'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          All shelters
        </Link>
        <span className='opacity-40'>/</span>
        <span className='text-(--ink) font-semibold truncate'>
          {shelter.name}
        </span>
      </nav>

      {/* Hero */}
      <section
        className='section relative overflow-hidden rounded-[28px] p-6 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 items-center'
        style={{
          background: `
            radial-gradient(ellipse 58% 54% at 82% 14%, rgba(29,117,117,0.15) 0%, transparent 53%),
            radial-gradient(ellipse 48% 52% at 18% 86%, rgba(232,146,60,0.18) 0%, transparent 54%),
            linear-gradient(156deg, #FDFAF4 0%, #F0E8D0 100%)
          `,
        }}
      >
        <div
          className='rounded-3xl overflow-hidden border border-(--hairline-soft) flex items-center justify-center transition-transform duration-500 ease-out hover:scale-[1.02]'
          style={{
            background: shelter.bg,
            aspectRatio: '4 / 3',
            boxShadow:
              '0 12px 48px rgba(28,44,44,0.10), 0 2px 12px rgba(28,44,44,0.06)',
          }}
        >
          <div style={{ transform: 'scale(1.8)' }}>{shelter.svg}</div>
        </div>

        <div>
          <Eyebrow>Verified shelter</Eyebrow>
          <h1
            className='mt-4 text-[34px] sm:text-[44px] md:text-[56px] leading-[1.04]'
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {shelter.name}
          </h1>
          {shelter.description && (
            <p className='text-(--ink-2) mt-5 max-w-150 text-[16px] leading-relaxed'>
              {shelter.description}
            </p>
          )}
          <div className='mt-7 flex flex-col gap-2.5 text-[14px] text-(--ink-2)'>
            <span className='flex items-start gap-2.5'>
              <span aria-hidden='true'>📍</span>
              <span>{shelter.address}</span>
            </span>
            <a
              href={`mailto:${shelter.contactEmail}`}
              className='flex items-start gap-2.5 text-(--ink-2) no-underline hover:text-(--rausch) transition-colors'
            >
              <span aria-hidden='true'>✉️</span>
              <span>{shelter.contactEmail}</span>
            </a>
            <a
              href={`tel:${shelter.phoneNumber.replace(/\s+/g, '')}`}
              className='flex items-start gap-2.5 text-(--ink-2) no-underline hover:text-(--rausch) transition-colors'
            >
              <span aria-hidden='true'>📞</span>
              <span>{shelter.phoneNumber}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className='section grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <StatTile label='Available now' value={String(availablePets.length)} />
        <StatTile label='In our care' value={String(shelterPets.length)} />
        <StatTile label='Location' value={city} />
      </section>

      {/* Pets grid */}
      <section className='section'>
        <div className='flex flex-wrap items-end justify-between gap-4 mb-8'>
          <div>
            <h2
              className='text-[28px] sm:text-[34px] leading-tight'
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Meet our pets
            </h2>
            <p className='text-(--muted) text-[15px] mt-2 max-w-150'>
              Every animal here is cared for by the {shelter.name} team. Click a
              pet to view their full story and start an application.
            </p>
          </div>
          <span
            className='text-[12px] font-bold px-3 py-1 rounded-full'
            style={{ background: '#e6f4f0', color: '#1D7575' }}
          >
            {availablePets.length} available
          </span>
        </div>

        {shelterPets.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
            {shelterPets.map(
              ({
                id: petId,
                name,
                species,
                breed,
                ageMonths,
                gender,
                size,
                status,
                bg,
                svg,
                imageUrl,
              }) => (
                <article
                  key={petId}
                  className='group bg-(--canvas) rounded-[20px] overflow-hidden border border-(--hairline-soft) flex flex-col min-w-0 transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-(--shadow-lift)'
                >
                  <Link
                    to={`/pets/${petId}`}
                    className='relative flex items-center justify-center overflow-hidden'
                    style={{
                      aspectRatio: '4 / 3',
                      background: bg,
                      display: 'flex',
                    }}
                    tabIndex={-1}
                    aria-label={`View details for ${name}`}
                  >
                    <span className='absolute top-3 left-3 z-2'>
                      <StatusBadge status={status} />
                    </span>
                    <button
                      className={`absolute top-3 right-3 z-3 w-9 h-9 rounded-full border-0 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-[transform,color,background,box-shadow] duration-150 ease-out hover:scale-[1.14] active:scale-[0.88] ${
                        isSaved(String(petId))
                          ? 'text-[#e0465a] bg-[#fff0f2]'
                          : 'text-(--muted) bg-white/90'
                      }`}
                      style={{ boxShadow: '0 2px 8px rgba(18,52,64,0.14)' }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggle(String(petId));
                      }}
                      aria-label={
                        isSaved(String(petId))
                          ? 'Remove from saved'
                          : 'Save pet'
                      }
                    >
                      <HeartIcon
                        width={16}
                        height={16}
                        filled={isSaved(String(petId))}
                      />
                    </button>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={name}
                        loading='lazy'
                        className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]'
                      />
                    ) : (
                      <div className='transition-transform duration-300 ease-out group-hover:scale-[1.06] max-w-full h-auto'>
                        {svg}
                      </div>
                    )}
                  </Link>
                  <div className='p-5.5 pb-6 flex-1 flex flex-col'>
                    <Link
                      to={`/pets/${petId}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h3 className='text-[20px] hover:text-(--rausch) transition-colors duration-150'>
                        {name}
                      </h3>
                    </Link>
                    <p className='text-(--muted) text-[14px] mt-1.5 flex-1'>
                      {breed} · {speciesLabel(species)} · {genderLabel(gender)}
                    </p>
                    <p className='text-[13px] text-(--ink-2) mt-1'>
                      Age: {ageLabel(ageMonths)} · Size: {size}
                    </p>
                    <div className='mt-4.5 pt-4 border-t border-(--hairline-soft) flex justify-between items-center'>
                      <Link
                        to={`/pets/${petId}`}
                        className='btn btn-soft btn-sm'
                      >
                        View details
                      </Link>
                      <Link to='/contact' className='btn btn-primary btn-sm'>
                        Apply to adopt →
                      </Link>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        ) : (
          <div
            className='rounded-2xl border border-(--hairline-soft) p-10 text-center'
            style={{ background: 'var(--soft)' }}
          >
            <p
              className='text-[18px] text-(--ink) mb-2'
              style={{ fontFamily: 'var(--font-display)' }}
            >
              No pets listed right now
            </p>
            <p className='text-(--muted) text-[14px]'>
              {shelter.name} doesn't have any pets in the system yet. Check back
              soon — new arrivals show up here as soon as the shelter lists
              them.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className='section-tight'>
        <div
          className='rounded-3xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6'
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 100% 0%, rgba(29,117,117,0.12) 0%, transparent 55%),
              radial-gradient(ellipse 50% 60% at 0% 100%, rgba(232,146,60,0.14) 0%, transparent 55%),
              linear-gradient(135deg, #1C2C2C 0%, #2a3f3f 100%)
            `,
          }}
        >
          <div>
            <h3
              className='text-[22px] sm:text-[26px] leading-tight'
              style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
            >
              Ready to meet them?
            </h3>
            <p
              className='text-[14px] mt-2 max-w-150'
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Reach out to {shelter.name} directly or submit an application
              through KodaNest. A real staff member reviews every request.
            </p>
          </div>
          <Link to='/contact' className='btn btn-primary btn-lg'>
            Apply to adopt →
          </Link>
        </div>
      </section>
    </div>
  );
}
