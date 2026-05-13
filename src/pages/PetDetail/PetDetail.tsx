import { useParams, Link, Navigate } from 'react-router-dom';
import { PET_LISTINGS, ageLabel, speciesLabel, genderLabel, sizeLabel } from '@/data/pets';
import { useFavorites } from '@/context/useFavorites';
import HeartIcon from '@/icons/HeartIcon';

function CareChip({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 600,
        padding: '6px 14px',
        borderRadius: 30,
        background: active ? '#e6f4f0' : 'var(--soft)',
        color: active ? '#1D7575' : 'var(--muted)',
        border: `1.5px solid ${active ? '#99D0D9' : 'var(--hairline-soft)'}`,
      }}
    >
      <span style={{ fontSize: 15 }}>{active ? '✓' : '✗'}</span>
      {label}
    </span>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: '14px 18px',
        borderRadius: 14,
        background: 'var(--soft)',
        border: '1.5px solid var(--hairline-soft)',
        minWidth: 0,
      }}
    >
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
        {value}
      </p>
    </div>
  );
}

export default function PetDetail() {
  const { id } = useParams<{ id: string }>();
  const pet = PET_LISTINGS.find(p => String(p.id) === id);
  const { toggle, isSaved } = useFavorites();

  if (!pet) return <Navigate to='/pets' replace />;

  const saved = isSaved(String(pet.id));

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Breadcrumb */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '24px 0 20px',
          fontSize: 13,
          color: 'var(--muted)',
        }}
      >
        <Link
          to='/pets'
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--muted)',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 150ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
            <path d='M9 11L5 7l4-4' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
          All pets
        </Link>
        <span style={{ opacity: 0.4 }}>/</span>
        <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{pet.name}</span>
      </nav>

      {/* Main layout */}
      <div
        className='pet-detail-grid'
        style={{
          display: 'grid',
          gap: 40,
          alignItems: 'start',
        }}
      >
        {/* LEFT: Illustration card */}
        <div className='r-sticky-md'>
          <div
            style={{
              borderRadius: 28,
              overflow: 'hidden',
              border: '1.5px solid var(--hairline-soft)',
              boxShadow: '0 8px 48px rgba(28,44,44,0.10), 0 2px 12px rgba(28,44,44,0.06)',
            }}
          >
            {/* Pet illustration */}
            <div
              style={{
                background: pet.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '1 / 1',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative rings */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55) 0%, transparent 60%),
                               radial-gradient(circle at 80% 80%, rgba(0,0,0,0.04) 0%, transparent 50%)`,
                }}
              />
              <div
                style={{
                  transform: 'scale(2.2)',
                  transition: 'transform 400ms cubic-bezier(0.34,1.56,0.64,1)',
                  position: 'relative',
                  zIndex: 1,
                }}
                className='pet-detail-svg'
              >
                {pet.svg}
              </div>

              {/* Status badge */}
              <span
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 2,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '4px 12px',
                  borderRadius: 20,
                  background: pet.status === 'AVAILABLE' ? '#e6f4f0' : pet.status === 'PENDING' ? '#fff3d9' : '#eeeef8',
                  color: pet.status === 'AVAILABLE' ? '#1D7575' : pet.status === 'PENDING' ? '#a87d12' : '#5a5a9e',
                  border: `1.5px solid ${pet.status === 'AVAILABLE' ? '#99D0D9' : pet.status === 'PENDING' ? '#FAC878' : '#c0c0e0'}`,
                }}
              >
                {pet.status === 'AVAILABLE' ? 'Available' : pet.status === 'PENDING' ? 'Pending' : 'Adopted'}
              </span>

              {/* Heart button */}
              <button
                onClick={() => toggle(String(pet.id))}
                aria-label={saved ? 'Remove from saved' : 'Save pet'}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 2,
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: 'none',
                  background: saved ? '#fff0f2' : 'rgba(255,255,255,0.92)',
                  color: saved ? '#e0465a' : 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(18,52,64,0.16)',
                  backdropFilter: 'blur(8px)',
                  transition: 'transform 150ms cubic-bezier(0.34,1.56,0.64,1), background 150ms ease, color 150ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.9)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'scale(1.14)'; }}
              >
                <HeartIcon width={20} height={20} filled={saved} />
              </button>
            </div>

            {/* Shelter info strip */}
            <div
              style={{
                padding: '18px 22px',
                background: 'var(--canvas)',
                borderTop: '1.5px solid var(--hairline-soft)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'var(--soft)',
                  border: '1.5px solid var(--hairline-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
                  <path d='M9 1L1 7v10h5v-5h6v5h5V7L9 1z' stroke='#1D7575' strokeWidth='1.5' strokeLinejoin='round' fill='none' />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pet.shelterName}
                </p>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{pet.shelterCity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Name & headline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 6vw, 64px)',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                {pet.name}
              </h1>
            </div>
            <p
              style={{
                fontSize: 17,
                color: 'var(--muted)',
                marginTop: 8,
                fontWeight: 500,
              }}
            >
              {pet.breed} · {speciesLabel(pet.species)} · {genderLabel(pet.gender)}
            </p>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 10 }}>
            <StatBox label='Age' value={ageLabel(pet.ageMonths)} />
            <StatBox label='Size' value={sizeLabel(pet.size)} />
            <StatBox label='Gender' value={genderLabel(pet.gender)} />
            <StatBox label='Species' value={speciesLabel(pet.species)} />
          </div>

          {/* Description */}
          <div
            style={{
              padding: '24px 26px',
              borderRadius: 20,
              background: `linear-gradient(135deg, var(--cream) 0%, var(--canvas) 100%)`,
              border: '1.5px solid var(--hairline-soft)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: 12,
                letterSpacing: '-0.01em',
              }}
            >
              About {pet.name}
            </h2>
            <p
              style={{
                fontSize: 15,
                color: 'var(--ink-2)',
                lineHeight: 1.72,
                margin: 0,
              }}
            >
              {pet.description}
            </p>
          </div>

          {/* Traits */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: 14,
                letterSpacing: '-0.01em',
              }}
            >
              Personality
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {pet.traits.map(trait => (
                <span
                  key={trait}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '7px 16px',
                    borderRadius: 30,
                    background: 'var(--canvas)',
                    color: 'var(--ink-2)',
                    border: '1.5px solid var(--hairline)',
                    letterSpacing: '0.01em',
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Care info */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: 14,
                letterSpacing: '-0.01em',
              }}
            >
              Care & Health
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <CareChip label='Vaccinated' active={pet.vaccinated} />
              <CareChip label='Neutered / Spayed' active={pet.neutered} />
              <CareChip label='House Trained' active={pet.houseTrained} />
            </div>
          </div>

          {/* Good with */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: 14,
                letterSpacing: '-0.01em',
              }}
            >
              Good With
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {pet.goodWith.map(item => (
                <span
                  key={item}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '7px 16px',
                    borderRadius: 30,
                    background: '#e6f4f0',
                    color: '#1D7575',
                    border: '1.5px solid #99D0D9',
                  }}
                >
                  <span style={{ fontSize: 14 }}>✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              padding: '28px 30px',
              borderRadius: 22,
              background: `
                radial-gradient(ellipse 70% 60% at 100% 0%, rgba(29,117,117,0.12) 0%, transparent 55%),
                radial-gradient(ellipse 50% 60% at 0% 100%, rgba(232,146,60,0.14) 0%, transparent 55%),
                linear-gradient(135deg, #1C2C2C 0%, #2a3f3f 100%)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                Ready to adopt {pet.name}?
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 6, marginBottom: 0 }}>
                A real shelter staff member reviews every request.
              </p>
            </div>
            <Link
              to='/contact'
              style={{
                display: 'inline-block',
                padding: '13px 28px',
                borderRadius: 12,
                background: 'var(--rausch)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
                transition: 'background 150ms ease, transform 150ms ease',
                boxShadow: '0 4px 20px rgba(232,146,60,0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--rausch-active)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--rausch)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Apply to adopt →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
