import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';
import HeartIcon from '@/icons/HeartIcon';
import { useFavorites } from '@/context/useFavorites';
import { apiGetPets } from '@/services/api';
import { apiPetToPetCard } from '@/context/StaffContext';
import {
  ageLabel,
  speciesFilterLabel,
  genderFilterLabel,
  sizeFilterLabel,
  speciesLabel,
  genderLabel,
  type PetCard,
  type SpeciesFilter,
  type GenderFilter,
  type SizeFilter,
} from '@/data/pets';

const SPECIES_FILTERS: SpeciesFilter[] = [
  'ALL',
  'DOG',
  'CAT',
  'RABBIT',
  'BIRD',
  'OTHER',
];
const GENDER_FILTERS: GenderFilter[] = ['ANY', 'MALE', 'FEMALE'];
const SIZE_FILTERS: SizeFilter[] = [
  'ANY',
  'SMALL',
  'MEDIUM',
  'LARGE',
  'EXTRA_LARGE',
];

const PAGE_SIZE = 9;

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

export default function PetsPage() {
  const [activeSpecies, setActiveSpecies] = useState<SpeciesFilter>('ALL');
  const [activeGender, setActiveGender] = useState<GenderFilter>('ANY');
  const [activeSize, setActiveSize] = useState<SizeFilter>('ANY');
  const [pets, setPets] = useState<PetCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPets, setTotalPets] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toggle, isSaved } = useFavorites();

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-in-effect pattern; matches React docs example
    setLoading(true);
    apiGetPets(currentPage, PAGE_SIZE)
      .then((res) => {
        if (cancelled) return;
        setPets(res.data.map(apiPetToPetCard));
        setTotalPages(res.pagination.totalPages);
        setTotalPets(res.pagination.total);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load pets', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  const filtered = pets.filter((p) => {
    if (activeSpecies !== 'ALL' && p.species !== activeSpecies) return false;
    if (activeGender !== 'ANY' && p.gender !== activeGender) return false;
    if (activeSize !== 'ANY' && p.size !== activeSize) return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section
        className='relative overflow-hidden rounded-[28px] mt-6 p-6 md:p-[72px_64px] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 items-center'
        style={{
          background: `
            radial-gradient(ellipse 62% 52% at 88% 22%, rgba(29,117,117,0.15) 0%, transparent 54%),
            radial-gradient(ellipse 48% 58% at 12% 80%, rgba(232,146,60,0.18) 0%, transparent 53%),
            linear-gradient(160deg, #FDFAF4 0%, #F0E8D0 100%)
          `,
        }}
      >
        <div>
          <Eyebrow>Browse pets</Eyebrow>
          <h1 className='mt-4 text-[30px] sm:text-[40px] md:text-[64px] leading-[1.04]'>
            Find your perfect
            <br />
            companion
          </h1>
          <p className='text-(--ink-2) mt-4.5 max-w-120 text-[17px]'>
            Every pet listed here is available for adoption from a verified
            shelter. Filter by species, size, and gender to find the match
            that's right for your home.
          </p>
          <div className='flex flex-wrap gap-2.5 mt-8'>
            {SPECIES_FILTERS.map((s) => (
              <span
                key={s}
                className={`chip${activeSpecies === s ? ' active' : ''}`}
                onClick={() => setActiveSpecies(s)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveSpecies(s)}
              >
                {speciesFilterLabel(s)}
              </span>
            ))}
          </div>
        </div>

        <div className='hero-side-illu relative h-90'>
          {/* Cat bubble */}
          <span
            className='absolute w-24 h-24 rounded-full overflow-hidden border-4 border-white top-15 right-[40%]'
            style={{ boxShadow: '0 12px 32px rgba(18,52,64,0.14)' }}
          >
            <svg viewBox='0 0 100 100' width='100%' height='100%'>
              <rect width='100' height='100' fill='#cfe6f7' />
              <ellipse cx='50' cy='58' rx='30' ry='24' fill='#e8a878' />
              <polygon points='22,38 30,20 38,40' fill='#c98a5c' />
              <polygon points='62,40 70,20 78,38' fill='#c98a5c' />
              <circle cx='42' cy='56' r='2.2' fill='#1d2235' />
              <circle cx='58' cy='56' r='2.2' fill='#1d2235' />
              <ellipse cx='50' cy='64' rx='3' ry='2' fill='#1d2235' />
            </svg>
          </span>
          {/* Dog bubble */}
          <span
            className='absolute w-20 h-20 rounded-full overflow-hidden border-4 border-white bottom-17.5 right-15'
            style={{ boxShadow: '0 12px 32px rgba(18,52,64,0.14)' }}
          >
            <svg viewBox='0 0 100 100' width='100%' height='100%'>
              <rect width='100' height='100' fill='#ffe9b8' />
              <polygon points='20,40 28,18 40,38' fill='#5a5853' />
              <polygon points='60,38 72,18 80,40' fill='#5a5853' />
              <ellipse cx='50' cy='58' rx='28' ry='24' fill='#7d7872' />
              <ellipse cx='42' cy='54' rx='3' ry='2.6' fill='#1d2235' />
              <ellipse cx='58' cy='54' rx='3' ry='2.6' fill='#1d2235' />
            </svg>
          </span>
          <svg
            viewBox='0 0 400 360'
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <ellipse
              cx='200'
              cy='320'
              rx='160'
              ry='14'
              fill='#000'
              opacity='0.06'
            />
            <rect
              x='60'
              y='180'
              width='280'
              height='140'
              rx='14'
              fill='#fff'
              stroke='#1d2235'
              strokeWidth='2'
            />
            <rect x='60' y='180' width='280' height='20' fill='#E8923C' />
            <rect
              x='170'
              y='170'
              width='60'
              height='14'
              rx='6'
              fill='#1d2235'
            />
            <circle cx='200' cy='250' r='36' fill='#ffe9b8' />
            <ellipse cx='200' cy='268' rx='26' ry='18' fill='#e8a878' />
            <polygon points='168,236 174,208 194,238' fill='#a87d62' />
            <polygon points='206,238 226,208 232,236' fill='#a87d62' />
            <circle cx='186' cy='246' r='2.4' fill='#1d2235' />
            <circle cx='214' cy='246' r='2.4' fill='#1d2235' />
            <g fill='#d97757' opacity='0.7' transform='translate(280 60)'>
              <ellipse
                cx='6'
                cy='14'
                rx='3'
                ry='5'
                transform='rotate(-15 6 14)'
              />
              <ellipse cx='14' cy='8' rx='2.4' ry='4' />
              <ellipse
                cx='22'
                cy='10'
                rx='2.4'
                ry='4'
                transform='rotate(15 22 10)'
              />
              <ellipse cx='14' cy='20' rx='4.4' ry='6.4' />
            </g>
          </svg>
        </div>
      </section>

      {/* Secondary filters */}
      <section style={{ padding: '30px 0' }}>
        <div className='max-w-295 mx-auto flex flex-wrap gap-4 items-center'>
          <div className='flex gap-2 items-center flex-wrap'>
            <span className='text-[13px] font-semibold text-(--ink-2)'>
              Gender:
            </span>
            {GENDER_FILTERS.map((g) => (
              <span
                key={g}
                className={`chip${activeGender === g ? ' active' : ''}`}
                style={{ fontSize: 13 }}
                onClick={() => setActiveGender(g)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveGender(g)}
              >
                {genderFilterLabel(g)}
              </span>
            ))}
          </div>
          <div className='flex gap-2 items-center flex-wrap'>
            <span className='text-[13px] font-semibold text-(--ink-2)'>
              Size:
            </span>
            {SIZE_FILTERS.map((s) => (
              <span
                key={s}
                className={`chip${activeSize === s ? ' active' : ''}`}
                style={{ fontSize: 13 }}
                onClick={() => setActiveSize(s)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveSize(s)}
              >
                {sizeFilterLabel(s)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pet listings */}
      <section className='section'>
        <SectionHead
          heading={
            loading && pets.length === 0
              ? 'Finding pets…'
              : totalPets > 0
                ? `${totalPets} pets available`
                : 'No pets match your filters'
          }
          subheading='Each pet is listed by a verified shelter. Click a listing to view full details and start your adoption application.'
        />
        {filtered.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
            {filtered.map(
              ({
                id,
                name,
                species,
                breed,
                ageMonths,
                gender,
                size,
                status,
                shelterName,
                bg,
                svg,
                imageUrl,
              }) => (
                <article
                  key={id}
                  className='group bg-(--canvas) rounded-[20px] overflow-hidden border border-(--hairline-soft) flex flex-col min-w-0 transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-(--shadow-lift)'
                >
                  <Link
                    to={`/pets/${id}`}
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
                        isSaved(String(id))
                          ? 'text-[#e0465a] bg-[#fff0f2]'
                          : 'text-(--muted) bg-white/90'
                      }`}
                      style={{ boxShadow: '0 2px 8px rgba(18,52,64,0.14)' }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggle(String(id));
                      }}
                      aria-label={
                        isSaved(String(id)) ? 'Remove from saved' : 'Save pet'
                      }
                    >
                      <HeartIcon
                        width={16}
                        height={16}
                        filled={isSaved(String(id))}
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
                      to={`/pets/${id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h3 className='text-[20px] hover:text-(--rausch) transition-colors duration-150'>
                        {name}
                      </h3>
                    </Link>
                    <p
                      className='text-(--muted) text-[14px] mt-1.5 flex-1'
                      style={{ marginBottom: 4 }}
                    >
                      {breed} · {speciesLabel(species)} · {genderLabel(gender)}
                    </p>
                    <p
                      className='text-[13px] text-(--ink-2)'
                      style={{ marginBottom: 4 }}
                    >
                      Age: {ageLabel(ageMonths)} · Size: {size}
                    </p>
                    <p className='text-[13px] text-(--ink-2)'>{shelterName}</p>
                    <div className='mt-4.5 pt-4 border-t border-(--hairline-soft) flex justify-between items-center'>
                      <Link to={`/pets/${id}`} className='btn btn-soft btn-sm'>
                        View details
                      </Link>
                      <Link
                        to={`/pets/${id}/apply`}
                        className='btn btn-primary btn-sm'
                      >
                        Apply to adopt →
                      </Link>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        ) : (
          <div className='text-center py-12 text-(--ink-2)'>
            <p>
              No pets match your current filters. Try adjusting your selection.
            </p>
            <button
              className='btn btn-soft mt-16'
              onClick={() => {
                setActiveSpecies('ALL');
                setActiveGender('ANY');
                setActiveSize('ANY');
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className='mt-14 flex justify-center'>
            <nav
              aria-label='Pets pagination'
              className='inline-flex items-center gap-3 sm:gap-4 rounded-full border border-(--hairline-soft) bg-(--canvas) pl-2 pr-2 py-2 sm:pl-3 sm:pr-3'
              style={{
                boxShadow:
                  '0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 26px rgba(18,52,64,0.08)',
              }}
            >
              <button
                className='btn btn-soft btn-sm'
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || loading}
                aria-label='Previous page'
              >
                <span aria-hidden='true' className='mr-1'>
                  ←
                </span>
                Prev
              </button>

              <div className='flex items-baseline gap-1.5 px-3 sm:px-4 min-w-25 justify-center'>
                <span
                  className='text-[26px] sm:text-[30px] leading-none text-(--ink)'
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {currentPage}
                </span>
                <span
                  className='text-[11px] tracking-[0.18em] uppercase text-(--muted)'
                  style={{ fontWeight: 600 }}
                >
                  of {totalPages}
                </span>
              </div>

              <button
                className='btn btn-primary btn-sm'
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages || loading}
                aria-label='Next page'
              >
                Next
                <span aria-hidden='true' className='ml-1'>
                  →
                </span>
              </button>
            </nav>
          </div>
        )}
      </section>

      {/* CTA band */}
      <section className='section-tight'>
        <div className='cream-band'>
          <div className='grid gap-8 items-center md:grid-cols-[1.5fr_1fr]'>
            <div>
              <h2 className='text-[40px]'>Ready to apply?</h2>
              <p className='mt-12 muted'>
                Create an account, complete your adopter profile, and submit an
                application to the shelter of your choice. A real shelter staff
                member reviews every request.
              </p>
            </div>
            <div className='text-right'>
              <Link to='/contact' className='btn btn-primary btn-lg'>
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
