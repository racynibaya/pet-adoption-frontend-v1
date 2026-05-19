import {
  useState,
  useMemo,
  useEffect,
  type FormEvent,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useStaff } from '@/context/useStaff';
import { useAdopter } from '@/context/useUser';
import { PET_LISTINGS, speciesLabel, genderLabel } from '@/data/pets';
import {
  apiCreateAdoption,
  apiResendVerification,
  ApiError,
  type HomeType,
} from '@/services/api';
import AuthModal from '@/components/ui/AuthModal';
import PawIcon from '@/icons/PawIcon';

// ── Form state ──────────────────────────────────────────────────────────────

interface FormState {
  message: string;
  homeType: HomeType | '';
  hasYard: boolean | null;
  yardFenced: boolean | null;
  ownsHome: boolean | null;
  landlordAllowsPets: boolean | null;
  householdSize: string;
  hasChildren: boolean | null;
  hasPreviousPetExperience: boolean | null;
  yearsOfPetExperience: string;
  hoursAwayPerDay: string;
  hasOtherPetsNow: boolean | null;
  reasonForAdopting: string;
  hasBackupCarePlan: boolean | null;
  awareOfMonthlyCosts: boolean | null;
}

const EMPTY: FormState = {
  message: '',
  homeType: '',
  hasYard: null,
  yardFenced: null,
  ownsHome: null,
  landlordAllowsPets: null,
  householdSize: '',
  hasChildren: null,
  hasPreviousPetExperience: null,
  yearsOfPetExperience: '',
  hoursAwayPerDay: '',
  hasOtherPetsNow: null,
  reasonForAdopting: '',
  hasBackupCarePlan: null,
  awareOfMonthlyCosts: null,
};

// ── Validation ──────────────────────────────────────────────────────────────

function validateForm(
  form: FormState,
): Partial<Record<keyof FormState, string>> {
  const errs: Partial<Record<keyof FormState, string>> = {};

  if (!form.homeType) errs.homeType = 'Pick one';
  if (form.hasYard === null) errs.hasYard = 'Required';
  if (form.hasYard === true && form.yardFenced === null)
    errs.yardFenced = 'Required';
  if (form.ownsHome === null) errs.ownsHome = 'Required';
  if (form.ownsHome === false && form.landlordAllowsPets === null)
    errs.landlordAllowsPets = 'Required';

  const hh = Number(form.householdSize);
  if (!form.householdSize || !Number.isInteger(hh) || hh < 1 || hh > 50)
    errs.householdSize = 'Whole number, 1–50';

  if (form.hasChildren === null) errs.hasChildren = 'Required';
  if (form.hasPreviousPetExperience === null)
    errs.hasPreviousPetExperience = 'Required';
  if (form.hasPreviousPetExperience === true) {
    const yrs = Number(form.yearsOfPetExperience);
    if (
      form.yearsOfPetExperience === '' ||
      !Number.isInteger(yrs) ||
      yrs < 0 ||
      yrs > 100
    )
      errs.yearsOfPetExperience = 'Whole number, 0–100';
  }

  const hrs = Number(form.hoursAwayPerDay);
  if (
    form.hoursAwayPerDay === '' ||
    !Number.isInteger(hrs) ||
    hrs < 0 ||
    hrs > 24
  )
    errs.hoursAwayPerDay = 'Whole number, 0–24';

  if (form.hasOtherPetsNow === null) errs.hasOtherPetsNow = 'Required';

  const reason = form.reasonForAdopting.trim();
  if (reason.length < 10 || reason.length > 1000)
    errs.reasonForAdopting = 'Between 10 and 1000 characters';

  if (form.hasBackupCarePlan === null) errs.hasBackupCarePlan = 'Required';
  if (form.awareOfMonthlyCosts === null) errs.awareOfMonthlyCosts = 'Required';

  if (form.message.trim().length > 1000)
    errs.message = 'Maximum 1000 characters';

  return errs;
}

// Count answered/total of the *currently-visible* required fields,
// so the progress count shrinks/grows with conditional reveals.
function countProgress(form: FormState): { answered: number; total: number } {
  const items: boolean[] = [];

  // Always-required
  items.push(!!form.homeType);
  items.push(form.hasYard !== null);
  items.push(form.ownsHome !== null);
  items.push(form.householdSize !== '' && Number(form.householdSize) >= 1);
  items.push(form.hasChildren !== null);
  items.push(form.hasPreviousPetExperience !== null);
  items.push(form.hoursAwayPerDay !== '' && Number(form.hoursAwayPerDay) >= 0);
  items.push(form.hasOtherPetsNow !== null);
  items.push(form.reasonForAdopting.trim().length >= 10);
  items.push(form.hasBackupCarePlan !== null);
  items.push(form.awareOfMonthlyCosts !== null);

  // Conditional
  if (form.hasYard === true) items.push(form.yardFenced !== null);
  if (form.ownsHome === false) items.push(form.landlordAllowsPets !== null);
  if (form.hasPreviousPetExperience === true)
    items.push(form.yearsOfPetExperience !== '');

  return {
    answered: items.filter(Boolean).length,
    total: items.length,
  };
}

// ── Inline styles helpers (CSS vars + no Tailwind arbitrary values) ─────────

const chapterCard: React.CSSProperties = {
  background: 'white',
  border: '1.5px solid var(--hairline-soft)',
  borderRadius: 22,
  padding: 'clamp(24px, 5.5vw, 40px) clamp(20px, 5vw, 44px)',
  marginBottom: 22,
  boxShadow:
    '0 1px 0 rgba(28,44,44,0.02), 0 12px 36px -18px rgba(28,44,44,0.10)',
};

const questionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 19,
  fontWeight: 500,
  color: 'var(--ink)',
  lineHeight: 1.35,
  letterSpacing: '-0.005em',
  margin: 0,
};

const helperText: React.CSSProperties = {
  fontSize: 13.5,
  color: 'var(--muted)',
  lineHeight: 1.55,
  margin: '6px 0 0',
};

const numberInput: React.CSSProperties = {
  width: '100%',
  height: 48,
  padding: '0 16px',
  border: '1.5px solid var(--hairline)',
  borderRadius: 12,
  fontSize: 15,
  color: 'var(--ink)',
  background: 'white',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-body)',
  transition:
    'border-color 160ms var(--ease-out), background 160ms var(--ease-out)',
};

// ── Sub-components ──────────────────────────────────────────────────────────

function MarginErr({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div
      style={{
        marginTop: 8,
        paddingLeft: 12,
        borderLeft: '2px solid var(--rausch-soft)',
        fontSize: 12.5,
        fontStyle: 'italic',
        color: '#c0304d',
        lineHeight: 1.45,
      }}
    >
      {msg}
    </div>
  );
}

function YesNoPills({
  value,
  onChange,
  disabled,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  const opts: { v: boolean; label: string }[] = [
    { v: true, label: 'Yes' },
    { v: false, label: 'No' },
  ];
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
      {opts.map((opt) => {
        const active = value === opt.v;
        return (
          <button
            key={String(opt.v)}
            type='button'
            disabled={disabled}
            onClick={() => onChange(opt.v)}
            style={{
              flex: 1,
              maxWidth: 180,
              minHeight: 52,
              borderRadius: 14,
              padding: '12px 22px',
              border: '1.5px solid',
              borderColor: active ? '#1D7575' : 'var(--hairline)',
              background: disabled
                ? 'repeating-linear-gradient(135deg, var(--soft) 0 8px, transparent 8px 14px)'
                : active
                  ? '#e2f2ee'
                  : 'white',
              color: disabled
                ? 'var(--muted)'
                : active
                  ? '#155e5e'
                  : 'var(--ink-2)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: 14.5,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: disabled ? 0.5 : 1,
              transition:
                'background 180ms var(--ease-out), border-color 180ms var(--ease-out), transform 120ms var(--ease-out), color 180ms var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (!disabled && !active)
                e.currentTarget.style.borderColor = '#99D0D9';
            }}
            onMouseLeave={(e) => {
              if (!disabled && !active)
                e.currentTarget.style.borderColor = 'var(--hairline)';
            }}
          >
            <span
              aria-hidden
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: active ? '#1D7575' : 'transparent',
                border: active ? 'none' : '1.5px solid var(--hairline)',
                transition: 'all 180ms var(--ease-out)',
                flexShrink: 0,
              }}
            >
              {active && (
                <svg width='9' height='9' viewBox='0 0 9 9' fill='none'>
                  <path
                    d='M1.5 4.5 L3.5 6.5 L7.5 2.5'
                    stroke='white'
                    strokeWidth='1.6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function HomeTypeChoice({
  value,
  onChange,
}: {
  value: HomeType | '';
  onChange: (v: HomeType) => void;
}) {
  const opts: {
    v: HomeType;
    label: string;
    icon: ReactNode;
  }[] = [
    {
      v: 'HOUSE',
      label: 'House',
      icon: (
        <svg width='26' height='26' viewBox='0 0 26 26' fill='none'>
          <path
            d='M4 11.5 L13 4 L22 11.5 V21 a1 1 0 0 1-1 1 H5 a1 1 0 0 1-1-1 Z'
            stroke='currentColor'
            strokeWidth='1.4'
            strokeLinejoin='round'
          />
          <path
            d='M10 22 V15 H16 V22'
            stroke='currentColor'
            strokeWidth='1.4'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
    {
      v: 'APARTMENT',
      label: 'Apartment',
      icon: (
        <svg width='26' height='26' viewBox='0 0 26 26' fill='none'>
          <rect
            x='5'
            y='4'
            width='16'
            height='18'
            rx='1.5'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <path
            d='M9 8 H10 M13 8 H14 M17 8 H18 M9 12 H10 M13 12 H14 M17 12 H18 M9 16 H10 M13 16 H14 M17 16 H18'
            stroke='currentColor'
            strokeWidth='1.4'
            strokeLinecap='round'
          />
          <path
            d='M11 22 V19 H15 V22'
            stroke='currentColor'
            strokeWidth='1.4'
          />
        </svg>
      ),
    },
    {
      v: 'CONDO',
      label: 'Condo',
      icon: (
        <svg width='26' height='26' viewBox='0 0 26 26' fill='none'>
          <rect
            x='3'
            y='10'
            width='9'
            height='12'
            rx='1'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <rect
            x='14'
            y='4'
            width='9'
            height='18'
            rx='1'
            stroke='currentColor'
            strokeWidth='1.4'
          />
          <path
            d='M6 14 H7 M6 17 H7 M9 14 H10 M9 17 H10 M17 8 H18 M17 12 H18 M17 16 H18 M20 8 H21 M20 12 H21 M20 16 H21'
            stroke='currentColor'
            strokeWidth='1.4'
            strokeLinecap='round'
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className='petapply-hometype-grid'
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 12,
        marginTop: 14,
      }}
    >
      {opts.map((opt) => {
        const active = value === opt.v;
        return (
          <button
            key={opt.v}
            type='button'
            className='petapply-hometype-btn'
            onClick={() => onChange(opt.v)}
            style={{
              minHeight: 110,
              borderRadius: 16,
              padding: '20px 12px',
              border: '1.5px solid',
              borderColor: active ? '#E8923C' : 'var(--hairline)',
              background: active ? '#fef1e1' : 'white',
              color: active ? '#a05818' : 'var(--ink-2)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: 14.5,
              fontWeight: 600,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition:
                'background 180ms var(--ease-out), border-color 180ms var(--ease-out), transform 120ms var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.borderColor = '#FAC878';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              if (!active)
                e.currentTarget.style.borderColor = 'var(--hairline)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span
              style={{
                color: active ? '#E8923C' : 'var(--muted)',
                transition: 'color 180ms var(--ease-out)',
              }}
            >
              {opt.icon}
            </span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Collapsible({
  open,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        opacity: open ? 1 : 0,
        transition:
          'grid-template-rows 280ms var(--ease-out), opacity 220ms var(--ease-out), margin 280ms var(--ease-out)',
        marginTop: open ? 24 : 0,
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            transform: open ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'transform 280ms var(--ease-out)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function JournalTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  max = 1000,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
  max?: number;
}) {
  const count = value.length;
  const near = count / max > 0.85;
  return (
    <div style={{ position: 'relative', marginTop: 14 }}>
      <textarea
        className='petapply-journal'
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        maxLength={max}
        style={{
          width: '100%',
          padding: '18px 20px 30px',
          border: '1.5px solid var(--hairline)',
          borderRadius: 14,
          fontSize: 15,
          color: 'var(--ink)',
          background: 'var(--cream)',
          outline: 'none',
          resize: 'vertical',
          boxSizing: 'border-box',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.7,
          transition:
            'border-color 180ms var(--ease-out), background 180ms var(--ease-out)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#E8923C';
          e.currentTarget.style.background = 'white';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--hairline)';
          e.currentTarget.style.background = 'var(--cream)';
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 14,
          bottom: 10,
          fontSize: 11.5,
          letterSpacing: '0.03em',
          color: near ? '#a05818' : 'var(--muted)',
          fontVariantNumeric: 'tabular-nums',
          pointerEvents: 'none',
        }}
      >
        {count} / {max}
      </div>
    </div>
  );
}

function ChapterHead({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      className='petapply-chapter-head'
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 18,
        marginBottom: 28,
        paddingBottom: 18,
        borderBottom: '1px solid var(--hairline-soft)',
      }}
    >
      <span
        aria-hidden
        className='petapply-chapter-num'
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 44,
          fontWeight: 300,
          letterSpacing: '-0.04em',
          color: '#E8923C',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {num}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2
          className='petapply-chapter-title'
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 26,
            fontWeight: 600,
            color: 'var(--ink)',
            margin: 0,
            letterSpacing: '-0.018em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 14,
              color: 'var(--muted)',
              margin: '6px 0 0',
              lineHeight: 1.55,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function PetSidebar({
  pet,
}: {
  pet: {
    id: number;
    name: string;
    breed: string;
    species: 'DOG' | 'CAT' | 'RABBIT' | 'BIRD' | 'OTHER';
    gender: 'MALE' | 'FEMALE';
    bg: string;
    svg: ReactNode;
    imageUrls?: string[];
    imageUrl?: string;
    shelterName?: string;
    shelterCity?: string;
  };
}) {
  const primaryImage = pet.imageUrls?.[0] ?? pet.imageUrl;
  return (
    <aside
      className='petapply-sidebar'
      style={{
        position: 'sticky',
        top: 96,
        alignSelf: 'start',
      }}
    >
      <div
        style={{
          borderRadius: 22,
          overflow: 'hidden',
          border: '1.5px solid var(--hairline-soft)',
          background: 'white',
          boxShadow: '0 12px 36px -16px rgba(28,44,44,0.16)',
        }}
      >
        <div
          className='petapply-sidebar-image'
          style={{
            aspectRatio: '1 / 1',
            background: pet.bg,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={pet.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ transform: 'scale(2)' }}>{pet.svg}</div>
            </div>
          )}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              padding: '5px 11px',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(6px)',
              borderRadius: 999,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
            }}
          >
            Applying to adopt
          </span>
        </div>
        <div style={{ padding: '22px 22px 24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--ink)',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {pet.name}
          </h3>
          <p
            style={{
              fontSize: 13.5,
              color: 'var(--muted)',
              margin: '6px 0 0',
              lineHeight: 1.5,
            }}
          >
            {pet.breed} · {speciesLabel(pet.species)} ·{' '}
            {genderLabel(pet.gender)}
          </p>
          {pet.shelterName && (
            <div
              style={{
                marginTop: 18,
                paddingTop: 16,
                borderTop: '1px solid var(--hairline-soft)',
              }}
            >
              <p
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  margin: 0,
                }}
              >
                In the care of
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  margin: '4px 0 0',
                  lineHeight: 1.4,
                }}
              >
                {pet.shelterName}
              </p>
              {pet.shelterCity && (
                <p
                  style={{
                    fontSize: 12.5,
                    color: 'var(--muted)',
                    margin: '2px 0 0',
                  }}
                >
                  {pet.shelterCity}
                </p>
              )}
            </div>
          )}
          <Link
            to={`/pets/${pet.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 20,
              fontSize: 13,
              color: 'var(--muted)',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 150ms var(--ease-out)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E8923C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Back to {pet.name}'s page
          </Link>
        </div>
      </div>
    </aside>
  );
}

function PageHero({ petName }: { petName: string }) {
  return (
    <header style={{ marginBottom: 32 }}>
      <p
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#1D7575',
          margin: '0 0 14px',
        }}
      >
        A letter to the shelter
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(34px, 5.5vw, 56px)',
          fontWeight: 700,
          color: 'var(--ink)',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          margin: 0,
        }}
      >
        Apply to adopt{' '}
        <span style={{ fontStyle: 'italic', color: '#a05818' }}>{petName}</span>
      </h1>
      <p
        style={{
          fontSize: 16,
          color: 'var(--muted)',
          margin: '18px 0 0',
          lineHeight: 1.65,
          maxWidth: 520,
        }}
      >
        Real shelter staff read every application. Take your time — honest
        answers are what help us picture {petName} in your home.
      </p>
    </header>
  );
}

function SignupGate({
  petName,
  onOpenSignup,
  onOpenSignin,
}: {
  petName: string;
  onOpenSignup: () => void;
  onOpenSignin: () => void;
}) {
  return (
    <div
      style={{
        ...chapterCard,
        textAlign: 'center',
        padding: 'clamp(36px, 7vw, 56px) clamp(22px, 6vw, 48px)',
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, var(--cream) 0%, white 70%)',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #FDDDB0 0%, #FEF5E2 100%)',
          border: '1.5px solid #E8C28A',
          margin: '0 auto 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 18px -6px rgba(232,146,60,0.4)',
        }}
        aria-hidden
      >
        <PawIcon width={28} height={28} />
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--ink)',
          margin: '0 0 12px',
          letterSpacing: '-0.018em',
          lineHeight: 1.2,
        }}
      >
        First, create your account
      </h2>
      <p
        style={{
          fontSize: 14.5,
          color: 'var(--muted)',
          lineHeight: 1.65,
          margin: '0 auto 28px',
          maxWidth: 380,
        }}
      >
        The shelter caring for {petName} will need a way to reach you. Setting
        up your KodaNest account takes about a minute.
      </p>
      <button
        type='button'
        onClick={onOpenSignup}
        style={{
          padding: '14px 32px',
          background: 'var(--rausch)',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          boxShadow: '0 4px 16px -4px rgba(232,146,60,0.5)',
          transition:
            'background 160ms var(--ease-out), transform 120ms var(--ease-out)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--rausch-active)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--rausch)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Create account →
      </button>
      <p
        style={{
          fontSize: 13,
          color: 'var(--muted)',
          marginTop: 18,
          marginBottom: 0,
        }}
      >
        Already have one?{' '}
        <button
          type='button'
          onClick={onOpenSignin}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: '#1D7575',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            fontFamily: 'var(--font-body)',
          }}
        >
          Sign in instead
        </button>
      </p>
    </div>
  );
}

function VerifyGate({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [errMsg, setErrMsg] = useState('');

  async function handleResend() {
    if (status !== 'idle') return;
    setStatus('sending');
    try {
      await apiResendVerification(email);
      setStatus('sent');
    } catch (err) {
      setErrMsg(err instanceof ApiError ? err.message : 'Could not resend.');
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
        setErrMsg('');
      }, 4000);
    }
  }

  return (
    <div
      style={{
        ...chapterCard,
        textAlign: 'center',
        padding: 'clamp(36px, 6.5vw, 52px) clamp(22px, 6vw, 48px)',
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#e6f4f0',
          border: '1.5px solid #99D0D9',
          margin: '0 auto 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-hidden
      >
        <svg width='26' height='26' viewBox='0 0 26 26' fill='none'>
          <rect
            x='4'
            y='7'
            width='18'
            height='13'
            rx='2'
            stroke='#1D7575'
            strokeWidth='1.6'
          />
          <path
            d='M4 9 L13 15 L22 9'
            stroke='#1D7575'
            strokeWidth='1.6'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          fontWeight: 700,
          color: 'var(--ink)',
          margin: '0 0 10px',
          letterSpacing: '-0.018em',
        }}
      >
        One step left — verify your email
      </h2>
      <p
        style={{
          fontSize: 14.5,
          color: 'var(--muted)',
          lineHeight: 1.65,
          margin: '0 auto 26px',
          maxWidth: 380,
        }}
      >
        We sent a verification link to{' '}
        <span style={{ color: 'var(--ink-2)', fontWeight: 600 }}>{email}</span>.
        Click it, then come back here to send your application.
      </p>
      <button
        type='button'
        onClick={handleResend}
        disabled={status !== 'idle'}
        style={{
          padding: '12px 26px',
          background: status === 'sent' ? '#1D7575' : 'white',
          color: status === 'sent' ? 'white' : 'var(--ink-2)',
          border: '1.5px solid',
          borderColor: status === 'sent' ? '#1D7575' : 'var(--hairline)',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          cursor: status === 'idle' ? 'pointer' : 'default',
          fontFamily: 'var(--font-body)',
          transition: 'all 180ms var(--ease-out)',
        }}
      >
        {status === 'sending'
          ? 'Sending…'
          : status === 'sent'
            ? '✓ Verification email sent'
            : 'Resend verification email'}
      </button>
      {status === 'error' && (
        <p
          style={{
            color: '#c0304d',
            fontSize: 13,
            marginTop: 12,
            fontStyle: 'italic',
          }}
        >
          {errMsg}
        </p>
      )}
    </div>
  );
}

function SuccessScreen({ petId, petName }: { petId: number; petName: string }) {
  return (
    <div
      style={{
        ...chapterCard,
        padding: 'clamp(40px, 8vw, 64px) clamp(22px, 6vw, 48px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ transform: 'scale(8)' }}>
          <PawIcon width={64} height={64} />
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <p
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#1D7575',
            margin: '0 0 14px',
          }}
        >
          Your application
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4.5vw, 48px)',
            fontWeight: 700,
            color: 'var(--ink)',
            margin: '0 0 14px',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}
        >
          Letter sent.
        </h2>
        <p
          style={{
            fontSize: 15.5,
            color: 'var(--muted)',
            lineHeight: 1.7,
            margin: '0 auto 36px',
            maxWidth: 420,
          }}
        >
          Thank you for writing to us about {petName}. Here's what happens next.
        </p>
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 auto 36px',
            maxWidth: 380,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {[
            {
              n: '①',
              t: 'Shelter staff review',
              d: 'Usually within a few days.',
            },
            {
              n: '②',
              t: 'They reach out by email',
              d: 'Sometimes with a follow-up question or two.',
            },
            {
              n: '③',
              t: 'Meet & greet',
              d: 'If it feels right on both sides, you visit.',
            },
          ].map((step) => (
            <li
              key={step.n}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 16,
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  color: '#E8923C',
                  fontWeight: 500,
                }}
              >
                {step.n}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    margin: 0,
                  }}
                >
                  {step.t}
                </p>
                <p
                  style={{
                    fontSize: 13.5,
                    color: 'var(--muted)',
                    margin: '2px 0 0',
                    lineHeight: 1.55,
                  }}
                >
                  {step.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <Link
          to={`/pets/${petId}`}
          style={{
            display: 'inline-block',
            padding: '13px 28px',
            borderRadius: 12,
            background: 'var(--rausch)',
            color: 'white',
            fontSize: 14.5,
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 16px -4px rgba(232,146,60,0.5)',
            transition:
              'background 160ms var(--ease-out), transform 120ms var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--rausch-active)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--rausch)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Back to {petName}'s page
        </Link>
      </div>
    </div>
  );
}

// ── Page-scoped CSS (placeholder italic, sidebar responsive, sticky footer) ─

const PAGE_CSS = `
.petapply-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 56px;
  align-items: start;
}
.petapply-journal::placeholder {
  font-style: italic;
  color: #B6A998;
}
.petapply-sticky-footer {
  position: fixed;
  right: 28px;
  bottom: 24px;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 12px 10px 22px;
  background: white;
  border: 1.5px solid var(--hairline);
  border-radius: 999px;
  box-shadow: 0 14px 38px -10px rgba(28,44,44,0.22);
  animation: petapplyFooterIn 320ms var(--ease-out) both;
}
@keyframes petapplyFooterIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (max-width: 900px) {
  .petapply-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .petapply-sidebar {
    position: static !important;
  }
  .petapply-sticky-footer {
    display: none;
  }
  .petapply-sidebar-image {
    aspect-ratio: 16 / 10 !important;
  }
}
@media (max-width: 480px) {
  .petapply-chapter-head {
    gap: 12px !important;
    margin-bottom: 22px !important;
    padding-bottom: 14px !important;
  }
  .petapply-chapter-num {
    font-size: 32px !important;
  }
  .petapply-chapter-title {
    font-size: 22px !important;
  }
  .petapply-hometype-grid {
    gap: 8px !important;
  }
  .petapply-hometype-btn {
    min-height: 92px !important;
    padding: 14px 6px !important;
    font-size: 12.5px !important;
  }
  .petapply-hometype-btn svg {
    width: 22px;
    height: 22px;
  }
}
`;

// ── Main page ───────────────────────────────────────────────────────────────

export default function PetApply() {
  const { id } = useParams<{ id: string }>();
  const { pets } = useStaff();
  const { adopter, isAuthenticated } = useAdopter();

  const pet =
    pets.find((p) => String(p.id) === id) ??
    PET_LISTINGS.find((p) => String(p.id) === id);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [showStickyFooter, setShowStickyFooter] = useState(false);

  const progress = useMemo(() => countProgress(form), [form]);

  useEffect(() => {
    const onScroll = () => {
      setShowStickyFooter(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!pet) return <Navigate to='/pets' replace />;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!pet) return;

    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstErrKey = Object.keys(errs)[0];
      const el = document.querySelector(`[data-field="${firstErrKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setApiError('');
    setLoading(true);

    try {
      await apiCreateAdoption({
        petId: pet.id,
        ...(form.message.trim() ? { message: form.message.trim() } : {}),
        homeType: form.homeType as HomeType,
        hasYard: form.hasYard as boolean,
        ...(form.hasYard === true
          ? { yardFenced: form.yardFenced as boolean }
          : {}),
        ownsHome: form.ownsHome as boolean,
        ...(form.ownsHome === false
          ? { landlordAllowsPets: form.landlordAllowsPets as boolean }
          : {}),
        householdSize: Number(form.householdSize),
        hasChildren: form.hasChildren as boolean,
        hasPreviousPetExperience: form.hasPreviousPetExperience as boolean,
        ...(form.hasPreviousPetExperience === true
          ? { yearsOfPetExperience: Number(form.yearsOfPetExperience) }
          : {}),
        hoursAwayPerDay: Number(form.hoursAwayPerDay),
        hasOtherPetsNow: form.hasOtherPetsNow as boolean,
        reasonForAdopting: form.reasonForAdopting.trim(),
        hasBackupCarePlan: form.hasBackupCarePlan as boolean,
        awareOfMonthlyCosts: form.awareOfMonthlyCosts as boolean,
      });

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setApiError(
        err instanceof ApiError ? err.message : 'An unexpected error occurred.',
      );
      setLoading(false);
    }
  }

  // ── Page chrome wrapper ───────────────────────────────────────────────────
  const pageWrapper = (children: ReactNode) => (
    <div style={{ paddingTop: 32, paddingBottom: 96 }}>
      <style>{PAGE_CSS}</style>
      <nav
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          fontSize: 13,
          color: 'var(--muted)',
          marginBottom: 24,
        }}
      >
        <Link
          to='/pets'
          style={{
            color: 'var(--muted)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          All pets
        </Link>
        <span style={{ opacity: 0.4 }}>/</span>
        <Link
          to={`/pets/${pet.id}`}
          style={{
            color: 'var(--muted)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          {pet.name}
        </Link>
        <span style={{ opacity: 0.4 }}>/</span>
        <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Apply</span>
      </nav>

      <div className='petapply-grid'>
        <PetSidebar pet={pet} />
        <div style={{ minWidth: 0, maxWidth: 620 }}>
          <PageHero petName={pet.name} />
          {children}
        </div>
      </div>
    </div>
  );

  // ── Unauthenticated → signup gate ────────────────────────────────────────
  if (!isAuthenticated || !adopter) {
    return pageWrapper(
      <>
        <SignupGate
          petName={pet.name}
          onOpenSignup={() => {
            setAuthMode('signup');
            setAuthOpen(true);
          }}
          onOpenSignin={() => {
            setAuthMode('signin');
            setAuthOpen(true);
          }}
        />
        <AuthModal
          isOpen={authOpen}
          mode={authMode}
          onClose={() => setAuthOpen(false)}
          onModeChange={setAuthMode}
        />
      </>,
    );
  }

  // ── Authenticated but unverified ─────────────────────────────────────────
  if (!adopter.isVerified) {
    return pageWrapper(<VerifyGate email={adopter.email} />);
  }

  // ── Submitted ────────────────────────────────────────────────────────────
  if (submitted) {
    return pageWrapper(<SuccessScreen petId={pet.id} petName={pet.name} />);
  }

  // ── Verified + form ──────────────────────────────────────────────────────
  return pageWrapper(
    <>
      <form onSubmit={handleSubmit} noValidate>
        {/* Chapter 01 — Home */}
        <section style={chapterCard}>
          <ChapterHead
            num='01'
            title='Your home'
            subtitle='Where would this little one be sleeping, eating, and exploring?'
          />

          <div data-field='homeType'>
            <p style={questionLabel}>What kind of home do you live in?</p>
            <HomeTypeChoice
              value={form.homeType}
              onChange={(v) => set('homeType', v)}
            />
            <MarginErr msg={errors.homeType} />
          </div>

          <div data-field='hasYard' style={{ marginTop: 32 }}>
            <p style={questionLabel}>Do you have a yard?</p>
            <YesNoPills
              value={form.hasYard}
              onChange={(v) => {
                set('hasYard', v);
                if (!v) set('yardFenced', null);
              }}
            />
            <MarginErr msg={errors.hasYard} />
          </div>

          <Collapsible open={form.hasYard === true}>
            <div data-field='yardFenced'>
              <p style={questionLabel}>Is the yard fenced?</p>
              <p style={helperText}>
                A safe perimeter matters more for some pets than others.
              </p>
              <YesNoPills
                value={form.yardFenced}
                onChange={(v) => set('yardFenced', v)}
              />
              <MarginErr msg={errors.yardFenced} />
            </div>
          </Collapsible>

          <div data-field='ownsHome' style={{ marginTop: 32 }}>
            <p style={questionLabel}>Do you own your home?</p>
            <YesNoPills
              value={form.ownsHome}
              onChange={(v) => {
                set('ownsHome', v);
                if (v) set('landlordAllowsPets', null);
              }}
            />
            <MarginErr msg={errors.ownsHome} />
          </div>

          <Collapsible open={form.ownsHome === false}>
            <div data-field='landlordAllowsPets'>
              <p style={questionLabel}>Does your landlord allow pets?</p>
              <p style={helperText}>
                If yes, the shelter may request written confirmation later.
              </p>
              <YesNoPills
                value={form.landlordAllowsPets}
                onChange={(v) => set('landlordAllowsPets', v)}
              />
              <MarginErr msg={errors.landlordAllowsPets} />
            </div>
          </Collapsible>
        </section>

        {/* Chapter 02 — Household */}
        <section style={chapterCard}>
          <ChapterHead
            num='02'
            title='Your household'
            subtitle='Who lives with you, and who else shares the space?'
          />

          <div data-field='householdSize' style={{ maxWidth: 200 }}>
            <p style={questionLabel}>How many people live in your home?</p>
            <input
              type='number'
              value={form.householdSize}
              onChange={(e) => set('householdSize', e.target.value)}
              placeholder='e.g. 3'
              min={1}
              max={50}
              style={{ ...numberInput, marginTop: 14 }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#E8923C';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--hairline)';
              }}
            />
            <MarginErr msg={errors.householdSize} />
          </div>

          <div data-field='hasChildren' style={{ marginTop: 32 }}>
            <p style={questionLabel}>Are there children in the home?</p>
            <YesNoPills
              value={form.hasChildren}
              onChange={(v) => set('hasChildren', v)}
            />
            <MarginErr msg={errors.hasChildren} />
          </div>

          <div data-field='hasOtherPetsNow' style={{ marginTop: 32 }}>
            <p style={questionLabel}>Do you currently have other pets?</p>
            <YesNoPills
              value={form.hasOtherPetsNow}
              onChange={(v) => set('hasOtherPetsNow', v)}
            />
            <MarginErr msg={errors.hasOtherPetsNow} />
          </div>
        </section>

        {/* Chapter 03 — Experience */}
        <section style={chapterCard}>
          <ChapterHead
            num='03'
            title='Your experience'
            subtitle='Have you done this dance before?'
          />

          <div data-field='hasPreviousPetExperience'>
            <p style={questionLabel}>Have you cared for a pet before?</p>
            <YesNoPills
              value={form.hasPreviousPetExperience}
              onChange={(v) => {
                set('hasPreviousPetExperience', v);
                if (!v) set('yearsOfPetExperience', '');
              }}
            />
            <MarginErr msg={errors.hasPreviousPetExperience} />
          </div>

          <Collapsible open={form.hasPreviousPetExperience === true}>
            <div data-field='yearsOfPetExperience' style={{ maxWidth: 200 }}>
              <p style={questionLabel}>How many years, roughly?</p>
              <input
                type='number'
                value={form.yearsOfPetExperience}
                onChange={(e) => set('yearsOfPetExperience', e.target.value)}
                placeholder='e.g. 5'
                min={0}
                max={100}
                style={{ ...numberInput, marginTop: 14 }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#E8923C';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hairline)';
                }}
              />
              <MarginErr msg={errors.yearsOfPetExperience} />
            </div>
          </Collapsible>
        </section>

        {/* Chapter 04 — Care commitment */}
        <section style={chapterCard}>
          <ChapterHead
            num='04'
            title='Your care commitment'
            subtitle='The honest stuff — schedule, motivation, and the long view.'
          />

          <div data-field='hoursAwayPerDay' style={{ maxWidth: 200 }}>
            <p style={questionLabel}>Hours away from home each day?</p>
            <input
              type='number'
              value={form.hoursAwayPerDay}
              onChange={(e) => set('hoursAwayPerDay', e.target.value)}
              placeholder='0–24'
              min={0}
              max={24}
              style={{ ...numberInput, marginTop: 14 }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#E8923C';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--hairline)';
              }}
            />
            <MarginErr msg={errors.hoursAwayPerDay} />
          </div>

          <div data-field='reasonForAdopting' style={{ marginTop: 32 }}>
            <p style={questionLabel}>Why do you want to adopt {pet.name}?</p>
            <p style={helperText}>
              Speak from your own life — your routine, what drew you to{' '}
              {pet.name}, what your weeks tend to look like.
            </p>
            <JournalTextarea
              value={form.reasonForAdopting}
              onChange={(v) => set('reasonForAdopting', v)}
              placeholder='I noticed in the listing that…'
              rows={6}
            />
            <MarginErr msg={errors.reasonForAdopting} />
          </div>

          <div data-field='hasBackupCarePlan' style={{ marginTop: 32 }}>
            <p style={questionLabel}>
              Do you have a backup plan if you can't care for the pet?
            </p>
            <p style={helperText}>
              Travel, illness, life surprises — who steps in for the day or the
              week?
            </p>
            <YesNoPills
              value={form.hasBackupCarePlan}
              onChange={(v) => set('hasBackupCarePlan', v)}
            />
            <MarginErr msg={errors.hasBackupCarePlan} />
          </div>

          <div data-field='awareOfMonthlyCosts' style={{ marginTop: 32 }}>
            <p style={questionLabel}>
              Are you aware of the monthly costs of pet care?
            </p>
            <p style={helperText}>
              Food, vet visits, grooming, the occasional emergency.
            </p>
            <YesNoPills
              value={form.awareOfMonthlyCosts}
              onChange={(v) => set('awareOfMonthlyCosts', v)}
            />
            <MarginErr msg={errors.awareOfMonthlyCosts} />
          </div>

          <div data-field='message' style={{ marginTop: 32 }}>
            <p style={questionLabel}>
              Anything else for the shelter? (optional)
            </p>
            <p style={helperText}>
              A short note, a question, something they should know.
            </p>
            <JournalTextarea
              value={form.message}
              onChange={(v) => set('message', v)}
              placeholder='Hello — '
              rows={4}
            />
            <MarginErr msg={errors.message} />
          </div>
        </section>

        {apiError && (
          <div
            style={{
              padding: '14px 20px',
              background: '#fde8ec',
              borderRadius: 12,
              color: '#c0304d',
              fontSize: 14,
              marginBottom: 20,
              lineHeight: 1.55,
              border: '1.5px solid #f5c3cc',
            }}
            role='alert'
          >
            {apiError}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: 4,
          }}
        >
          <button
            type='submit'
            disabled={loading}
            style={{
              padding: '15px 36px',
              background: loading ? '#f5ae50' : 'var(--rausch)',
              color: 'white',
              border: 'none',
              borderRadius: 13,
              fontSize: 15.5,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 6px 20px -6px rgba(232,146,60,0.6)',
              transition:
                'background 160ms var(--ease-out), transform 120ms var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'var(--rausch-active)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'var(--rausch)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? 'Sending…' : 'Send application →'}
          </button>
          <span
            style={{
              fontSize: 13,
              color: 'var(--muted)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {progress.answered} of {progress.total} answered
          </span>
        </div>
      </form>

      {/* Desktop sticky footer with progress + CTA */}
      {showStickyFooter && (
        <div
          className='petapply-sticky-footer'
          role='status'
          aria-live='polite'
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Progress
            </span>
            <span
              style={{
                fontSize: 13.5,
                fontWeight: 600,
                color: 'var(--ink)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {progress.answered} / {progress.total} answered
            </span>
          </div>
          <button
            type='button'
            onClick={() => {
              const formEl = document.querySelector('form');
              if (formEl)
                formEl.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true }),
                );
            }}
            disabled={loading}
            style={{
              padding: '11px 22px',
              background: loading ? '#f5ae50' : 'var(--rausch)',
              color: 'white',
              border: 'none',
              borderRadius: 999,
              fontSize: 13.5,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'background 160ms var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (!loading)
                e.currentTarget.style.background = 'var(--rausch-active)';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.background = 'var(--rausch)';
            }}
          >
            {loading ? 'Sending…' : 'Send →'}
          </button>
        </div>
      )}
    </>,
  );
}
