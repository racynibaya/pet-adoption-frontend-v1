import { useState } from 'react';
import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';
import styles from './Services.module.css';

type Species = 'All' | 'Dogs' | 'Cats' | 'Rabbits' | 'Birds' | 'Other';
type Gender = 'Any' | 'Male' | 'Female';
type Size = 'Any' | 'Small' | 'Medium' | 'Large' | 'Extra Large';

const SPECIES_FILTERS: Species[] = [
  'All',
  'Dogs',
  'Cats',
  'Rabbits',
  'Birds',
  'Other',
];

interface PetCard {
  id: number;
  name: string;
  species: Species;
  breed: string;
  ageMonths: number;
  gender: Gender;
  size: Size;
  status: 'AVAILABLE' | 'PENDING';
  shelterId: number;
  shelterName: string;
  bg: string;
  svg: React.ReactNode;
}

const PET_LISTINGS: PetCard[] = [
  {
    id: 1,
    name: 'Biscuit',
    species: 'Dogs',
    breed: 'Jack Russell Terrier',
    ageMonths: 18,
    gender: 'Male',
    size: 'Small',
    status: 'AVAILABLE',
    shelterId: 1,
    shelterName: 'San Agustin HQ Animal Rescue',
    bg: 'var(--cream)',
    svg: (
      <svg viewBox='0 0 200 160' width='200' height='160'>
        <ellipse cx='100' cy='100' rx='60' ry='44' fill='#a87d62' />
        <ellipse cx='100' cy='92' rx='44' ry='38' fill='#e8a878' />
        <polygon points='62,68 70,40 86,72' fill='#a87d62' />
        <polygon points='114,72 130,40 138,68' fill='#a87d62' />
        <circle cx='86' cy='92' r='3' fill='#1d2235' />
        <circle cx='114' cy='92' r='3' fill='#1d2235' />
        <ellipse cx='100' cy='104' rx='5' ry='3.4' fill='#1d2235' />
        <path
          d='M96 110 Q100 116 104 110'
          stroke='#1d2235'
          strokeWidth='1.6'
          fill='none'
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Cats',
    breed: 'Domestic Shorthair',
    ageMonths: 8,
    gender: 'Female',
    size: 'Small',
    status: 'AVAILABLE',
    shelterId: 2,
    shelterName: 'BGC Cat Sanctuary',
    bg: '#ffe9b8',
    svg: (
      <svg viewBox='0 0 200 160' width='200' height='160'>
        <ellipse cx='100' cy='106' rx='62' ry='40' fill='#827d76' />
        <ellipse cx='100' cy='100' rx='46' ry='36' fill='#cdc6bd' />
        <polygon points='62,72 60,42 80,72' fill='#5a5853' />
        <polygon points='120,72 140,42 138,72' fill='#5a5853' />
        <circle cx='84' cy='98' r='3' fill='#1d2235' />
        <circle cx='116' cy='98' r='3' fill='#1d2235' />
        <ellipse cx='100' cy='112' rx='5' ry='3.4' fill='#1d2235' />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Mochi',
    species: 'Rabbits',
    breed: 'Holland Lop',
    ageMonths: 12,
    gender: 'Male',
    size: 'Small',
    status: 'AVAILABLE',
    shelterId: 1,
    shelterName: 'San Agustin HQ Animal Rescue',
    bg: '#e9f5ee',
    svg: (
      <svg viewBox='0 0 200 160' width='200' height='160'>
        <ellipse cx='100' cy='100' rx='56' ry='42' fill='#fff' />
        <ellipse cx='100' cy='96' rx='40' ry='34' fill='#f3d2b3' />
        <ellipse cx='78' cy='62' rx='8' ry='22' fill='#f3d2b3' />
        <ellipse cx='122' cy='62' rx='8' ry='22' fill='#f3d2b3' />
        <circle cx='88' cy='96' r='3' fill='#1d2235' />
        <circle cx='112' cy='96' r='3' fill='#1d2235' />
        <ellipse cx='100' cy='106' rx='4' ry='2.8' fill='#ff7a8a' />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Rex',
    species: 'Dogs',
    breed: 'German Shepherd',
    ageMonths: 36,
    gender: 'Male',
    size: 'Large',
    status: 'AVAILABLE',
    shelterId: 3,
    shelterName: 'Cebu Paws',
    bg: '#e9eef3',
    svg: (
      <svg viewBox='0 0 200 160' width='200' height='160'>
        <ellipse cx='100' cy='106' rx='62' ry='40' fill='#3a3530' />
        <ellipse cx='100' cy='100' rx='46' ry='36' fill='#5a4a3e' />
        <polygon points='62,72 60,42 80,72' fill='#1d1916' />
        <polygon points='120,72 140,42 138,72' fill='#1d1916' />
        <circle cx='84' cy='98' r='3' fill='#fff' />
        <circle cx='116' cy='98' r='3' fill='#fff' />
        <ellipse cx='100' cy='112' rx='5' ry='3.4' fill='#1d1916' />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Kiwi',
    species: 'Birds',
    breed: 'Conure',
    ageMonths: 24,
    gender: 'Female',
    size: 'Small',
    status: 'PENDING',
    shelterId: 2,
    shelterName: 'BGC Cat Sanctuary',
    bg: '#e5edf6',
    svg: (
      <svg viewBox='0 0 200 160' width='200' height='160'>
        <ellipse cx='100' cy='100' rx='44' ry='50' fill='#3a73c2' />
        <ellipse cx='100' cy='104' rx='32' ry='36' fill='#5a8cb0' />
        <ellipse cx='100' cy='80' rx='22' ry='20' fill='#5fb4d8' />
        <circle cx='92' cy='76' r='3' fill='#1d2235' />
        <circle cx='108' cy='76' r='3' fill='#1d2235' />
        <path
          d='M94 88 Q100 94 106 88'
          stroke='#1d2235'
          strokeWidth='1.4'
          fill='none'
          strokeLinecap='round'
        />
        <polygon points='96,92 100,100 104,92' fill='#ffd166' />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Daisy',
    species: 'Dogs',
    breed: 'Golden Retriever',
    ageMonths: 10,
    gender: 'Female',
    size: 'Large',
    status: 'AVAILABLE',
    shelterId: 3,
    shelterName: 'Cebu Paws',
    bg: '#fff3d9',
    svg: (
      <svg viewBox='0 0 200 160' width='200' height='160'>
        <ellipse cx='100' cy='100' rx='60' ry='44' fill='#e8a878' />
        <ellipse cx='100' cy='92' rx='44' ry='38' fill='#f3d2b3' />
        <polygon points='62,68 70,40 86,72' fill='#c98a5c' />
        <polygon points='114,72 130,40 138,68' fill='#c98a5c' />
        <circle cx='86' cy='92' r='3' fill='#1d2235' />
        <circle cx='114' cy='92' r='3' fill='#1d2235' />
        <ellipse cx='100' cy='104' rx='5' ry='3.4' fill='#1d2235' />
        <path
          d='M92 112 Q100 120 108 112'
          stroke='#1d2235'
          strokeWidth='1.6'
          fill='none'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
];

function ageLabel(months: number): string {
  if (months < 12) return `${months}mo`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem > 0 ? `${years}y ${rem}mo` : `${years}y`;
}

function StatusBadge({ status }: { status: 'AVAILABLE' | 'PENDING' }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        padding: '3px 10px',
        borderRadius: 20,
        background: status === 'AVAILABLE' ? '#e9f5ee' : '#fff3d9',
        color: status === 'AVAILABLE' ? '#3a8c6a' : '#a87d12',
      }}
    >
      {status === 'AVAILABLE' ? 'Available' : 'Pending'}
    </span>
  );
}

export default function PetsPage() {
  const [activeSpecies, setActiveSpecies] = useState<Species>('All');
  const [activeGender, setActiveGender] = useState<Gender>('Any');
  const [activeSize, setActiveSize] = useState<Size>('Any');

  const filtered = PET_LISTINGS.filter((p) => {
    if (activeSpecies !== 'All' && p.species !== activeSpecies) return false;
    if (activeGender !== 'Any' && p.gender !== activeGender) return false;
    if (activeSize !== 'Any' && p.size !== activeSize) return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className={styles.pageHero}>
        <div>
          <Eyebrow>Browse pets</Eyebrow>
          <h1 className='mt-16'>
            Find your perfect
            <br />
            companion
          </h1>
          <p>
            Every pet listed here is available for adoption from a verified
            shelter. Filter by species, size, and gender to find the match
            that's right for your home.
          </p>
          <div className={styles.filterRow}>
            {SPECIES_FILTERS.map((label) => (
              <span
                key={label}
                className={`chip${activeSpecies === label ? ' active' : ''}`}
                onClick={() => setActiveSpecies(label)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveSpecies(label)}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', height: 360 }}>
          <span className={`${styles.petBubble} ${styles.b1}`}>
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
          <span className={`${styles.petBubble} ${styles.b2}`}>
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
            <rect x='60' y='180' width='280' height='20' fill='#ff385c' />
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
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ink-2)',
              }}
            >
              Gender:
            </span>
            {(['Any', 'Male', 'Female'] as Gender[]).map((g) => (
              <span
                key={g}
                className={`chip${activeGender === g ? ' active' : ''}`}
                style={{ fontSize: 13 }}
                onClick={() => setActiveGender(g)}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveGender(g)}
              >
                {g}
              </span>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ink-2)',
              }}
            >
              Size:
            </span>
            {(['Any', 'Small', 'Medium', 'Large', 'Extra Large'] as Size[]).map(
              (s) => (
                <span
                  key={s}
                  className={`chip${activeSize === s ? ' active' : ''}`}
                  style={{ fontSize: 13 }}
                  onClick={() => setActiveSize(s)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveSize(s)}
                >
                  {s}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Pet listings */}
      <section className='section'>
        <SectionHead
          heading={
            filtered.length > 0
              ? `${filtered.length} pets available`
              : 'No pets match your filters'
          }
          subheading='Each pet is listed by a verified shelter. Click a listing to view full details and start your adoption application.'
        />
        {filtered.length > 0 ? (
          <div className={styles.svcGrid}>
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
              }) => (
                <article key={id} className={styles.svcCard}>
                  <div className={styles.svcThumb} style={{ background: bg }}>
                    <span
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 2,
                      }}
                    >
                      <StatusBadge status={status} />
                    </span>
                    {svg}
                  </div>
                  <div className={styles.svcBody}>
                    <h3>{name}</h3>
                    <p style={{ marginBottom: 4 }}>
                      {breed} · {species.slice(0, -1)} · {gender}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: 'var(--ink-2)',
                        marginBottom: 4,
                      }}
                    >
                      Age: {ageLabel(ageMonths)} · Size: {size}
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                      {shelterName}
                    </p>
                    <div className={styles.svcFoot}>
                      <div />
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
            style={{
              textAlign: 'center',
              padding: '48px 0',
              color: 'var(--ink-2)',
            }}
          >
            <p>
              No pets match your current filters. Try adjusting your selection.
            </p>
            <button
              className='btn btn-soft mt-16'
              onClick={() => {
                setActiveSpecies('All');
                setActiveGender('Any');
                setActiveSize('Any');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* How applications work */}
      <section className='section-tight'>
        <div className='cream-band'>
          <div className={styles.ctaBottom}>
            <div>
              <h2 style={{ fontSize: 40 }}>Ready to apply?</h2>
              <p className='mt-12 muted'>
                Create an account, complete your adopter profile, and submit an
                application to the shelter of your choice. A real shelter staff
                member reviews every request.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
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
