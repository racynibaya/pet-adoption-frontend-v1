import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';
import CtaBand from '@/components/shared/CtaBand';

/* ------------------------------------------------------------------ */
/* Hero                                                                  */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section
      className='mt-6 rounded-[28px] overflow-hidden relative grid gap-8 items-end'
      style={{
        background:
          'radial-gradient(ellipse 65% 55% at 84% 16%, rgba(93,181,196,0.45) 0%, transparent 52%),' +
          'radial-gradient(ellipse 50% 60% at 16% 88%, rgba(253,224,178,0.65) 0%, transparent 55%),' +
          'radial-gradient(ellipse 38% 48% at 52% 52%, rgba(255,253,247,0.3) 0%, transparent 60%),' +
          'linear-gradient(162deg, #FDF5E2 0%, #FBEAD0 100%)',
        padding: '64px 64px 0',
        minHeight: 600,
        gridTemplateColumns: '1.05fr 1fr',
      }}
    >
      <div style={{ paddingBottom: 56 }}>
        {/* floating dog bubble */}
        <span
          aria-hidden='true'
          style={{ top: 92, left: 56, background: '#cfe6f7', animation: 'floatY 4s ease-in-out infinite' }}
          className='absolute w-[84px] h-[84px] rounded-full overflow-hidden [box-shadow:0_12px_32px_rgba(20,20,50,0.14)] border-4 border-white'
        >
          <svg viewBox='0 0 100 100' width='100%' height='100%'>
            <rect width='100' height='100' fill='#cfe6f7' />
            <ellipse cx='50' cy='58' rx='30' ry='24' fill='#e8a878' />
            <polygon points='22,38 30,20 38,40' fill='#c98a5c' />
            <polygon points='62,40 70,20 78,38' fill='#c98a5c' />
            <ellipse cx='50' cy='64' rx='22' ry='16' fill='#f3d2b3' />
            <circle cx='42' cy='56' r='2.2' fill='#1d2235' />
            <circle cx='58' cy='56' r='2.2' fill='#1d2235' />
            <ellipse cx='50' cy='64' rx='3' ry='2' fill='#1d2235' />
            <path d='M48 67 Q50 71 52 67' stroke='#1d2235' strokeWidth='1.4' fill='none' strokeLinecap='round' />
          </svg>
        </span>

        <h1 style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: '-0.025em' }}>
          Find your next
          <br />
          family member
        </h1>
        <p className='mt-6 text-[17px] max-w-[460px]' style={{ color: 'var(--ink-2)' }}>
          Browse adoptable pets from shelters near you, submit an application,
          and bring a new companion home. Every pet on KodaNest is listed by a
          verified shelter — no middlemen, no guesswork.
        </p>
        <div className='mt-9 flex gap-[14px]'>
          <Link className='btn btn-primary btn-lg' to='/pets'>Browse Pets</Link>
          <Link className='btn btn-outline btn-lg' to='/shelters'>Find Shelters</Link>
        </div>

        {/* pawprints deco */}
        <div className='absolute' style={{ top: 220, left: 380 }} aria-hidden='true'>
          <svg width='120' height='60' viewBox='0 0 120 60'>
            <g fill='#d97757' opacity='0.7'>
              <ellipse cx='14' cy='20' rx='3' ry='5' transform='rotate(-20 14 20)' />
              <ellipse cx='22' cy='14' rx='2.4' ry='4' transform='rotate(-10 22 14)' />
              <ellipse cx='28' cy='22' rx='2.4' ry='4' transform='rotate(15 28 22)' />
              <ellipse cx='20' cy='28' rx='4' ry='6' transform='rotate(-5 20 28)' />
              <ellipse cx='64' cy='40' rx='3' ry='5' transform='rotate(-20 64 40)' />
              <ellipse cx='72' cy='34' rx='2.4' ry='4' />
              <ellipse cx='78' cy='42' rx='2.4' ry='4' transform='rotate(15 78 42)' />
              <ellipse cx='70' cy='48' rx='4' ry='6' />
            </g>
          </svg>
        </div>
      </div>

      {/* Hero illustration column */}
      <div className='relative h-[540px] self-end'>
        {/* brush strokes */}
        <span
          aria-hidden='true'
          className='absolute opacity-[0.55]'
          style={{
            top: 20, left: 0,
            width: 380, height: 380,
            background: 'linear-gradient(135deg, #f7c4a3 0%, #f5b894 100%)',
            borderRadius: '220px 60px 280px 80px',
            transform: 'rotate(-12deg)',
          }}
        />
        <span
          aria-hidden='true'
          className='absolute opacity-[0.45]'
          style={{
            top: 90, left: 60,
            width: 360, height: 80,
            background: 'linear-gradient(90deg, #f5b894 0%, transparent 100%)',
            borderRadius: 999,
            transform: 'rotate(-18deg)',
          }}
        />

        {/* cat bubble */}
        <span
          aria-hidden='true'
          style={{ top: 168, right: 84, width: 76, height: 76, background: '#ffe9b8', animation: 'floatY 5.2s ease-in-out 1s infinite' }}
          className='absolute rounded-full overflow-hidden [box-shadow:0_12px_32px_rgba(20,20,50,0.14)] border-4 border-white'
        >
          <svg viewBox='0 0 100 100' width='100%' height='100%'>
            <rect width='100' height='100' fill='#ffe9b8' />
            <polygon points='20,40 28,18 40,38' fill='#5a5853' />
            <polygon points='60,38 72,18 80,40' fill='#5a5853' />
            <ellipse cx='50' cy='58' rx='28' ry='24' fill='#7d7872' />
            <ellipse cx='50' cy='60' rx='20' ry='14' fill='#cdc6bd' />
            <ellipse cx='42' cy='54' rx='3' ry='2.6' fill='#1d2235' />
            <ellipse cx='58' cy='54' rx='3' ry='2.6' fill='#1d2235' />
            <ellipse cx='50' cy='62' rx='2.6' ry='1.8' fill='#1d2235' />
            <path d='M50 64 L50 67 M50 67 Q47 70 44 68 M50 67 Q53 70 56 68' stroke='#1d2235' strokeWidth='1.2' fill='none' strokeLinecap='round' />
          </svg>
        </span>

        {/* Vet + pug illustration */}
        <svg
          className='absolute right-0 bottom-0'
          style={{ width: 460, height: 540 }}
          viewBox='0 0 460 540'
          xmlns='http://www.w3.org/2000/svg'
        >
          <ellipse cx='260' cy='510' rx='180' ry='14' fill='#000' opacity='0.06' />
          <path d='M170 200 Q170 170 220 168 Q280 165 340 175 Q380 182 380 260 L380 460 L160 460 L160 280 Q160 230 170 200 Z' fill='#5fb4d8' />
          <path d='M230 175 Q260 200 290 175 L300 200 Q260 220 220 200 Z' fill='#fff' />
          <path d='M236 180 Q220 230 240 280 Q260 320 280 280' stroke='#222' strokeWidth='3' fill='none' strokeLinecap='round' />
          <circle cx='280' cy='284' r='10' fill='#222' />
          <circle cx='280' cy='284' r='5' fill='#5a5a5a' />
          <ellipse cx='270' cy='120' rx='48' ry='56' fill='#e8b890' />
          <path d='M225 90 Q230 60 270 56 Q310 60 318 90 Q316 100 308 102 Q300 80 270 76 Q240 80 232 102 Q224 100 225 90 Z' fill='#3a2a20' />
          <circle cx='252' cy='124' r='11' fill='none' stroke='#1d2235' strokeWidth='2.2' />
          <circle cx='288' cy='124' r='11' fill='none' stroke='#1d2235' strokeWidth='2.2' />
          <line x1='263' y1='124' x2='277' y2='124' stroke='#1d2235' strokeWidth='2.2' />
          <path d='M260 148 Q270 154 280 148' stroke='#1d2235' strokeWidth='2' fill='none' strokeLinecap='round' />
          <ellipse cx='222' cy='124' rx='6' ry='9' fill='#d99c72' />
          <path d='M170 280 Q150 320 145 380 Q150 410 175 415 L210 410 Q220 380 215 350 Z' fill='#5fb4d8' />
          <path d='M158 360 Q140 380 145 410 Q150 425 175 422 L215 415 Q210 395 200 380 Z' fill='#3a8fc1' />
          <path d='M310 280 Q340 310 360 360 Q360 400 330 415 L290 408 Q290 380 295 350 Z' fill='#5fb4d8' />
          <path d='M320 360 Q350 380 350 410 Q340 428 310 422 L280 412 Q278 392 285 380 Z' fill='#3a8fc1' />
          <ellipse cx='240' cy='380' rx='80' ry='58' fill='#2a2620' />
          <ellipse cx='240' cy='350' rx='58' ry='50' fill='#3a3530' />
          <path d='M195 320 Q190 295 205 290 Q220 300 222 320 Z' fill='#1d1916' />
          <path d='M285 320 Q290 295 275 290 Q260 300 258 320 Z' fill='#1d1916' />
          <ellipse cx='240' cy='360' rx='22' ry='16' fill='#5a4a3e' />
          <ellipse cx='240' cy='354' rx='6' ry='4' fill='#1d1916' />
          <circle cx='222' cy='340' r='4' fill='#fff' />
          <circle cx='258' cy='340' r='4' fill='#fff' />
          <circle cx='222' cy='341' r='2.2' fill='#1d1916' />
          <circle cx='258' cy='341' r='2.2' fill='#1d1916' />
          <path d='M228 350 Q240 358 252 350' stroke='#1d1916' strokeWidth='1.4' fill='none' strokeLinecap='round' opacity='0.6' />
          <path d='M220 332 Q240 326 260 332' stroke='#1d1916' strokeWidth='1.4' fill='none' strokeLinecap='round' opacity='0.5' />
        </svg>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats                                                                 */
/* ------------------------------------------------------------------ */
const STATS = [
  { num: '12k+', lab: 'Adoptions completed' },
  { num: '200+', lab: 'Partner shelters' },
  { num: '98%',  lab: 'Happy households' },
  { num: '4.92★', lab: 'Avg shelter rating' },
];

function StatsSection() {
  return (
    <section
      aria-label='Stats'
      className='relative z-[5] grid [box-shadow:var(--shadow-card)] border border-[var(--hairline-soft)] rounded-[20px]'
      style={{
        marginTop: -28,
        gridTemplateColumns: 'repeat(4,1fr)',
        background: 'linear-gradient(145deg, var(--canvas) 0%, #f8f5ef 100%)',
        padding: '28px 16px',
      }}
    >
      {STATS.map(({ num, lab }) => (
        <div key={lab} className='text-center px-4 border-r border-[var(--hairline-soft)] last:border-r-0'>
          <div className='font-[var(--font-display)] text-[36px] font-semibold text-[var(--ink)] [letter-spacing:-0.02em]'>{num}</div>
          <div className='text-[var(--muted)] text-[13px] mt-1'>{lab}</div>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Features                                                              */
/* ------------------------------------------------------------------ */
function FeaturesSection() {
  return (
    <section className='section'>
      <SectionHead
        heading={<>Everything you need to<br />adopt with confidence</>}
        subheading='KodaNest connects adopters directly with verified shelters. Browse available pets, submit a proof-of-care application, and track your request every step of the way.'
      />
      <div className='grid max-w-[980px] mx-auto' style={{ gridTemplateColumns: '1fr 1fr', gap: '56px 80px' }}>
        {/* Feature 1 */}
        <div className='grid items-start gap-5 transition-transform duration-200 hover:-translate-y-1' style={{ gridTemplateColumns: '64px 1fr' }}>
          <div className='w-16 h-16 rounded-full inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:-rotate-6' style={{ background: 'var(--mint)' }}>
            <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
              <path d='M16 4 L26 9 L26 18 Q26 26 16 28 Q6 26 6 18 L6 9 Z' fill='#1D7575' opacity='0.18' />
              <path d='M16 4 L26 9 L26 18 Q26 26 16 28 Q6 26 6 18 L6 9 Z' stroke='#1D7575' strokeWidth='1.6' fill='none' />
              <path d='M11 16 L14 19 L21 12' stroke='#1D7575' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
          <div>
            <h3 className='mb-2' style={{ fontSize: 19 }}>Verified shelters</h3>
            <p className='text-[15px] leading-relaxed' style={{ color: 'var(--ink-2)' }}>
              Every shelter on KodaNest is reviewed and approved by our team.
              Only verified organizations can list pets and review adoption applications.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className='grid items-start gap-5 transition-transform duration-200 hover:-translate-y-1' style={{ gridTemplateColumns: '64px 1fr' }}>
          <div className='w-16 h-16 rounded-full inline-flex items-center justify-center' style={{ background: '#fde2cf' }}>
            <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
              <circle cx='16' cy='12' r='7' fill='#d97757' opacity='0.2' />
              <circle cx='16' cy='12' r='7' stroke='#d97757' strokeWidth='1.6' fill='none' />
              <path d='M10 26 Q12 20 16 20 Q20 20 22 26' stroke='#d97757' strokeWidth='1.6' fill='none' strokeLinecap='round' />
            </svg>
          </div>
          <div>
            <h3 className='mb-2' style={{ fontSize: 19 }}>Proof-of-care applications</h3>
            <p className='text-[15px] leading-relaxed' style={{ color: 'var(--ink-2)' }}>
              Applications require an adopter profile — living situation,
              experience, working hours — so shelters can find the best home for each pet.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className='grid items-start gap-5 transition-transform duration-200 hover:-translate-y-1' style={{ gridTemplateColumns: '64px 1fr' }}>
          <div className='w-16 h-16 rounded-full inline-flex items-center justify-center' style={{ background: 'var(--sun)' }}>
            <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
              <rect x='5' y='9' width='22' height='16' rx='2' fill='#e0b73a' opacity='0.22' />
              <rect x='5' y='9' width='22' height='16' rx='2' stroke='#a87d12' strokeWidth='1.6' fill='none' />
              <line x1='9' y1='15' x2='23' y2='15' stroke='#a87d12' strokeWidth='1.6' strokeLinecap='round' />
              <line x1='9' y1='19' x2='17' y2='19' stroke='#a87d12' strokeWidth='1.6' strokeLinecap='round' />
            </svg>
          </div>
          <div>
            <h3 className='mb-2' style={{ fontSize: 19 }}>Track your application</h3>
            <p className='text-[15px] leading-relaxed' style={{ color: 'var(--ink-2)' }}>
              See the real-time status of every application you've submitted —
              pending, reviewing, approved, or rejected — all in one place.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className='grid items-start gap-5 transition-transform duration-200 hover:-translate-y-1' style={{ gridTemplateColumns: '64px 1fr' }}>
          <div className='w-16 h-16 rounded-full inline-flex items-center justify-center' style={{ background: 'var(--sky)' }}>
            <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
              <rect x='4' y='6' width='20' height='20' rx='2' fill='#5a8cb0' opacity='0.18' />
              <rect x='4' y='6' width='20' height='20' rx='2' stroke='#5a8cb0' strokeWidth='1.6' fill='none' />
              <line x1='4' y1='12' x2='24' y2='12' stroke='#5a8cb0' strokeWidth='1.6' />
              <line x1='9' y1='4' x2='9' y2='10' stroke='#5a8cb0' strokeWidth='1.6' strokeLinecap='round' />
              <line x1='19' y1='4' x2='19' y2='10' stroke='#5a8cb0' strokeWidth='1.6' strokeLinecap='round' />
            </svg>
          </div>
          <div>
            <h3 className='mb-2' style={{ fontSize: 19 }}>Filter by species &amp; size</h3>
            <p className='text-[15px] leading-relaxed' style={{ color: 'var(--ink-2)' }}>
              Search dogs, cats, rabbits, birds, and more. Filter by age,
              gender, and size to find the pet that fits your home perfectly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shelter trust                                                          */
/* ------------------------------------------------------------------ */
const TRUST_ITEMS = [
  'All shelters are reviewed and approved before listing pets.',
  'Shelter staff manage listings and review every application personally.',
  'Auto-rejection protects other applicants when a pet is adopted.',
];

function ShelterTrustSection() {
  return (
    <section className='section-tight'>
      <div className='grid gap-16 items-center' style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Photos */}
        <div className='relative h-[460px]' aria-hidden='true'>
          <svg style={{ position: 'absolute', top: -10, left: 240, zIndex: 2 }} width='60' height='40' viewBox='0 0 60 40'>
            <g fill='#d97757' opacity='0.7'>
              <ellipse cx='10' cy='14' rx='2' ry='3.4' transform='rotate(-15 10 14)' />
              <ellipse cx='18' cy='10' rx='1.6' ry='2.6' />
              <ellipse cx='24' cy='16' rx='1.6' ry='2.6' transform='rotate(15 24 16)' />
              <ellipse cx='16' cy='22' rx='2.8' ry='4.2' />
            </g>
          </svg>

          <div
            className='absolute rounded-[14px] overflow-hidden transition-[transform,box-shadow] duration-[340ms] hover:-translate-y-[6px] hover:scale-[1.02] hover:[box-shadow:0_16px_40px_rgba(0,0,0,0.13)]'
            style={{ left: 0, top: 0, width: 240, height: 300, background: '#efe9e3' }}
          >
            <svg viewBox='0 0 240 300' width='100%' height='100%'>
              <rect width='240' height='300' fill='#efe9e3' />
              <ellipse cx='120' cy='120' rx='46' ry='54' fill='#e0c4ad' />
              <path d='M75 105 Q80 70 120 65 Q160 70 165 105 Q160 115 150 116 Q145 92 120 88 Q95 92 90 116 Q80 115 75 105Z' fill='#cfcdcb' />
              <ellipse cx='100' cy='125' rx='3' ry='4' fill='#1d2235' />
              <ellipse cx='140' cy='125' rx='3' ry='4' fill='#1d2235' />
              <path d='M108 148 Q120 154 132 148' stroke='#1d2235' strokeWidth='1.6' fill='none' strokeLinecap='round' />
              <path d='M92 145 Q95 175 120 180 Q145 175 148 145 Q140 158 120 160 Q100 158 92 145Z' fill='#cfcdcb' />
              <path d='M50 200 Q60 180 120 178 Q180 180 190 200 L195 300 L45 300 Z' fill='#5fb4d8' />
              <ellipse cx='120' cy='240' rx='40' ry='28' fill='#3a3530' />
              <ellipse cx='105' cy='232' rx='3' ry='2' fill='#fff' />
              <ellipse cx='135' cy='232' rx='3' ry='2' fill='#fff' />
              <ellipse cx='120' cy='248' rx='6' ry='4' fill='#1d1916' />
            </svg>
          </div>

          <div
            className='absolute rounded-[14px] overflow-hidden transition-[transform,box-shadow] duration-[340ms] hover:-translate-y-[6px] hover:scale-[1.02] hover:[box-shadow:0_16px_40px_rgba(0,0,0,0.13)]'
            style={{ right: 0, top: 60, width: 250, height: 320, background: '#f5cd6a' }}
          >
            <svg viewBox='0 0 250 320' width='100%' height='100%'>
              <rect width='250' height='320' fill='#f5cd6a' />
              <polygon points='80,140 92,90 115,130' fill='#5a5853' />
              <polygon points='135,130 158,90 170,140' fill='#5a5853' />
              <ellipse cx='125' cy='190' rx='76' ry='62' fill='#827d76' />
              <ellipse cx='125' cy='200' rx='50' ry='34' fill='#cdc6bd' />
              <ellipse cx='100' cy='170' rx='6' ry='5' fill='#1d2235' />
              <ellipse cx='150' cy='170' rx='6' ry='5' fill='#1d2235' />
              <ellipse cx='125' cy='200' rx='6' ry='4' fill='#1d2235' />
              <path d='M125 204 L125 212 M125 212 Q115 220 105 215 M125 212 Q135 220 145 215' stroke='#1d2235' strokeWidth='1.8' fill='none' strokeLinecap='round' />
            </svg>
          </div>
        </div>

        <div>
          <Eyebrow>Trusted shelters</Eyebrow>
          <h2 style={{ marginTop: 14 }}>
            Adopt from shelters<br />you can actually<br />trust
          </h2>
          <p className='mt-16 muted' style={{ maxWidth: 460 }}>
            Every shelter on KodaNest is verified and accountable. Shelter staff
            review each adoption application personally — no algorithm decides
            the right home for a pet.
          </p>
          <ul className='mt-6 flex flex-col gap-[14px]'>
            {TRUST_ITEMS.map((item) => (
              <li key={item} className='flex gap-3 items-start list-none text-[var(--ink-2)] text-[15px]'>
                <span
                  className='w-[22px] h-[22px] rounded-full flex-shrink-0 inline-flex items-center justify-center mt-[1px]'
                  style={{ background: 'var(--rausch)' }}
                >
                  <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
                    <polyline points='2.5 6.5 5 9 9.5 3.5' stroke='#fff' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link className='btn btn-primary mt-32' to='/shelters'>Browse shelters →</Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                               */
/* ------------------------------------------------------------------ */
const PROCESS_STEPS = [
  {
    step: 'Step 01', bg: 'var(--mint)',
    title: 'Browse & filter pets',
    desc: 'Search available pets by species, breed, age, gender, and size. Every listing is managed by a verified shelter with real photos and descriptions.',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
        <circle cx='12' cy='12' r='8' stroke='#1D7575' strokeWidth='1.8' fill='none' />
        <line x1='18' y1='18' x2='24' y2='24' stroke='#1D7575' strokeWidth='2' strokeLinecap='round' />
      </svg>
    ),
  },
  {
    step: 'Step 02', bg: 'var(--rose)',
    title: 'Submit an application',
    desc: 'Create an account and fill out your adopter profile — living situation, experience, working hours. Submit directly to the shelter with a personal message.',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
        <rect x='4' y='4' width='20' height='20' rx='2' stroke='#D94F68' strokeWidth='1.8' fill='none' />
        <line x1='9' y1='10' x2='19' y2='10' stroke='#D94F68' strokeWidth='1.8' strokeLinecap='round' />
        <line x1='9' y1='14' x2='19' y2='14' stroke='#D94F68' strokeWidth='1.8' strokeLinecap='round' />
        <line x1='9' y1='18' x2='15' y2='18' stroke='#D94F68' strokeWidth='1.8' strokeLinecap='round' />
      </svg>
    ),
  },
  {
    step: 'Step 03', bg: 'var(--sky)',
    title: 'Bring your pet home',
    desc: 'The shelter reviews your application and notifies you of the decision. Once approved, coordinate pickup and welcome your new family member home.',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
        <path d='M14 4 Q21 4 22 11 Q22 16 14 24 Q6 16 6 11 Q7 4 14 4Z' fill='#2F97AC' opacity='0.2' />
        <path d='M14 4 Q21 4 22 11 Q22 16 14 24 Q6 16 6 11 Q7 4 14 4Z' stroke='#2F97AC' strokeWidth='1.8' fill='none' />
        <path d='M10 11 L13 14 L18 9' stroke='#2F97AC' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    ),
  },
];

function ProcessSection() {
  return (
    <section className='section'>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div
          className='rounded-[28px] relative overflow-hidden border border-[var(--hairline-soft)]'
          style={{ background: 'linear-gradient(145deg, var(--soft) 0%, #eae8e2 100%)', padding: '88px 56px' }}
        >
          <div className='section-head' style={{ marginBottom: 64 }}>
            <Eyebrow style={{ display: 'block', justifyContent: 'center', marginBottom: 12 }}>How it works</Eyebrow>
            <h2>Three steps to your<br />forever companion</h2>
            <p>From browsing available pets to bringing one home — the entire adoption journey in one place.</p>
          </div>
          <div className='grid gap-6 max-w-[1080px] mx-auto' style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {PROCESS_STEPS.map(({ step, bg, title, desc, icon }) => (
              <div
                key={step}
                className='bg-white rounded-[18px] relative [box-shadow:var(--shadow-soft)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[5px] hover:[box-shadow:var(--shadow-lift)]'
                style={{ padding: '32px 28px' }}
              >
                <span
                  className='absolute flex items-center text-white text-[11px] font-bold tracking-[0.06em] uppercase rounded-full'
                  style={{ top: -12, left: 24, height: 26, padding: '0 12px', background: 'var(--rausch)' }}
                >
                  {step}
                </span>
                <div className='w-14 h-14 rounded-[14px] inline-flex items-center justify-center mb-[18px]' style={{ background: bg }}>{icon}</div>
                <h4 style={{ fontSize: 18, marginBottom: 6 }}>{title}</h4>
                <p style={{ fontSize: 14, color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonial                                                           */
/* ------------------------------------------------------------------ */
function TestimonialSection() {
  return (
    <section className='section-tight'>
      <div className='grid gap-16 items-center' style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className='relative h-[480px]' aria-hidden='true'>
          {/* blob */}
          <span
            className='absolute'
            style={{
              left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)',
              width: 380, height: 380,
              background: '#fde2cf',
              borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
            }}
          />
          <svg viewBox='0 0 480 480' style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <ellipse cx='200' cy='190' rx='46' ry='52' fill='#f1c8a0' />
            <path d='M156 175 Q160 130 200 124 Q240 130 244 175 Q240 185 230 187 Q224 156 200 152 Q176 156 170 187 Q160 185 156 175Z' fill='#5a3a22' />
            <circle cx='186' cy='195' r='3' fill='#1d2235' />
            <circle cx='214' cy='195' r='3' fill='#1d2235' />
            <path d='M192 215 Q200 220 208 215' stroke='#1d2235' strokeWidth='1.8' fill='none' strokeLinecap='round' />
            <path d='M140 280 Q160 250 200 246 Q240 250 260 280 L268 360 L132 360 Z' fill='#fff' />
            <rect x='155' y='350' width='90' height='80' rx='6' fill='#3a73c2' />
            <path d='M255 310 Q310 320 350 360 Q360 380 340 388 Q300 372 270 362 Z' fill='#fff' />
            <ellipse cx='320' cy='380' rx='80' ry='50' fill='#cdcdcd' />
            <ellipse cx='320' cy='370' rx='48' ry='36' fill='#fff' />
            <polygon points='280,350 286,322 305,348' fill='#cdcdcd' />
            <polygon points='335,348 354,322 360,350' fill='#cdcdcd' />
            <circle cx='305' cy='370' r='3' fill='#1d2235' />
            <circle cx='335' cy='370' r='3' fill='#1d2235' />
            <ellipse cx='320' cy='382' rx='5' ry='3.4' fill='#1d2235' />
            <path d='M250 400 Q270 420 300 415' stroke='#d92a2a' strokeWidth='6' fill='none' strokeLinecap='round' />
          </svg>
        </div>

        <div>
          <Eyebrow>Testimonials</Eyebrow>
          <h2 style={{ marginTop: 14, fontSize: 40 }}>Real adopters,<br />real families, real stories</h2>
          <p className='mt-16 muted'>
            Every adoption on KodaNest connects a pet with a home that truly fits. Here's what some of our adopters had to say.
          </p>

          <div className='row row-center mt-32' style={{ gap: 20 }}>
            <div className='avatar avatar-sm'>
              <svg viewBox='0 0 40 40' width='40' height='40'>
                <rect width='40' height='40' fill='#fde2cf' />
                <circle cx='20' cy='16' r='8' fill='#a87d62' />
                <path d='M8 36 Q12 24 20 24 Q28 24 32 36 Z' fill='#3a73c2' />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>Adamon Galvez.</div>
              <div className='muted' style={{ fontSize: 13 }}>First-time adopter · San Agustin, SFC</div>
            </div>
          </div>

          <p className='mt-24' style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink)' }}>
            "I had no idea what I was doing. The shelter's counselor met me before I even saw a pet. By the time I brought Biscuit home, it felt like he was already mine. The application process was so straightforward."
          </p>

          <div className='row mt-24' style={{ gap: 12 }}>
            <button className='nav-cart' aria-label='Previous'>
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <polyline points='10 4 6 8 10 12' stroke='#1d2235' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
            <button className='nav-cart' style={{ background: 'var(--rausch)', borderColor: 'var(--rausch)' }} aria-label='Next'>
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <polyline points='6 4 10 8 6 12' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Blog                                                                  */
/* ------------------------------------------------------------------ */
const BLOG_POSTS = [
  {
    bg: '#e9f5ee', category: 'Adoption', readTime: '6 min read',
    title: 'The first 30 days: how to help a newly adopted pet settle in',
    svg: (
      <svg viewBox='0 0 400 240' width='100%' height='100%'>
        <rect width='400' height='240' fill='#e9f5ee' />
        <rect x='40' y='60' width='120' height='120' rx='60' fill='#fff' />
        <ellipse cx='100' cy='120' rx='32' ry='28' fill='#a87d62' />
        <polygon points='78,98 84,80 96,100' fill='#7d5a40' />
        <polygon points='104,100 116,80 122,98' fill='#7d5a40' />
        <circle cx='92' cy='118' r='2' fill='#1d2235' />
        <circle cx='108' cy='118' r='2' fill='#1d2235' />
        <ellipse cx='100' cy='128' rx='3' ry='2' fill='#1d2235' />
        <text x='220' y='120' fontFamily='Fraunces, serif' fontWeight='700' fontSize='22' fill='#1D7575'>First 30 days</text>
        <text x='220' y='148' fontFamily='Fraunces, serif' fontWeight='700' fontSize='22' fill='#1D7575'>at home →</text>
      </svg>
    ),
  },
  {
    bg: '#2a2620', category: 'Health', readTime: '4 min read',
    title: 'Reading body language: subtle signs your pet is stressed',
    svg: (
      <svg viewBox='0 0 400 240' width='100%' height='240'>
        <rect width='400' height='240' fill='#2a2620' />
        <ellipse cx='200' cy='160' rx='120' ry='80' fill='#3a3530' />
        <polygon points='130,120 138,90 158,118' fill='#1d1916' />
        <polygon points='242,118 262,90 270,120' fill='#1d1916' />
        <ellipse cx='200' cy='170' rx='40' ry='28' fill='#5a4a3e' />
        <ellipse cx='200' cy='160' rx='6' ry='4' fill='#1d1916' />
        <circle cx='180' cy='142' r='3' fill='#fff' />
        <circle cx='220' cy='142' r='3' fill='#fff' />
      </svg>
    ),
  },
  {
    bg: '#ffe9b8', category: 'Nutrition', readTime: '5 min read',
    title: 'What to feed a senior cat: a vet-approved starter guide',
    svg: (
      <svg viewBox='0 0 400 240' width='100%' height='240'>
        <rect width='400' height='240' fill='#ffe9b8' />
        <circle cx='200' cy='120' r='60' fill='#E8923C' opacity='0.25' />
        <ellipse cx='200' cy='140' rx='50' ry='40' fill='#827d76' />
        <polygon points='160,108 168,82 186,110' fill='#5a5853' />
        <polygon points='214,110 232,82 240,108' fill='#5a5853' />
        <ellipse cx='200' cy='148' rx='22' ry='16' fill='#cdc6bd' />
        <ellipse cx='184' cy='130' rx='3' ry='4' fill='#1d2235' />
        <ellipse cx='216' cy='130' rx='3' ry='4' fill='#1d2235' />
        <ellipse cx='200' cy='148' rx='3' ry='2' fill='#1d2235' />
      </svg>
    ),
  },
];

function BlogSection() {
  return (
    <section className='section'>
      <SectionHead
        heading='Resources &amp; blog stories'
        subheading='Practical guides for new pet parents — from the first 30 days to senior care.'
      />
      <div className='grid gap-7' style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {BLOG_POSTS.map(({ bg, category, readTime, title, svg }) => (
          <article
            key={title}
            className='group flex flex-col gap-[14px] cursor-pointer transition-transform duration-200 hover:-translate-y-1'
          >
            <div className='photo h-[240px] overflow-hidden' style={{ background: bg }}>
              <div className='transition-transform duration-[340ms] group-hover:scale-[1.05] w-full h-full'>
                {svg}
              </div>
            </div>
            <div className='flex gap-3 text-[13px]' style={{ color: 'var(--muted)' }}>
              <span>{category}</span> · <span>{readTime}</span>
            </div>
            <h4 className='text-[18px] leading-[1.3] font-semibold transition-colors duration-200 group-hover:text-[var(--rausch)]'>{title}</h4>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Home page                                                             */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ShelterTrustSection />
      <ProcessSection />
      <TestimonialSection />
      <BlogSection />
      <CtaBand
        heading={<>Ready to find your<br />new family member?</>}
        description='Browse adoptable pets from verified shelters near you. Create an account and submit your first application in minutes.'
      >
        <Link to='/pets' className='btn btn-primary btn-lg'>Browse pets</Link>
        <Link to='/contact' className='btn' style={{ background: '#fff', color: 'var(--ink)' }}>Talk to us</Link>
      </CtaBand>
    </>
  );
}
