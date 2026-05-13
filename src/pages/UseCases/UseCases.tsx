import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';

interface Shelter {
  id: number;
  name: string;
  description: string;
  address: string;
  contactEmail: string;
  phoneNumber: string;
  petCount: number;
  bg: string;
  svg: React.ReactNode;
}

const SHELTERS: Shelter[] = [
  {
    id: 1,
    name: 'San Agustin HQ Animal Rescue',
    description:
      'A community-driven rescue shelter in San Agustin, La Union. We specialize in dogs and cats rescued from high-intake city shelters, and offer full behavioral assessment before any adoption.',
    address: 'Brgy. San Agustin, Chismosa St., San Fernando, La Union 2500',
    contactEmail: 'adopt@sanagustin-rescue.org',
    phoneNumber: '+63 72 888 0142',
    petCount: 34,
    bg: '#fde2cf',
    svg: (
      <svg viewBox='0 0 200 140' width='200' height='140'>
        <rect width='200' height='140' fill='#fde2cf' />
        <ellipse cx='100' cy='80' rx='44' ry='38' fill='#e8a878' />
        <polygon points='60,58 70,28 88,62' fill='#a87d62' />
        <polygon points='112,62 130,28 140,58' fill='#a87d62' />
        <circle cx='85' cy='76' r='3' fill='#1d2235' />
        <circle cx='115' cy='76' r='3' fill='#1d2235' />
        <ellipse cx='100' cy='90' rx='5' ry='3.4' fill='#1d2235' />
        <path
          d='M92 98 Q100 106 108 98'
          stroke='#1d2235'
          strokeWidth='1.6'
          fill='none'
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'BGC Cat Sanctuary',
    description:
      "Manila's largest cat-focused rescue. We take in strays, owner surrenders, and senior cats overlooked at other facilities. All cats are spayed/neutered and microchipped.",
    address: '32nd St, Bonifacio Global City, Taguig, Metro Manila 1634',
    contactEmail: 'hello@bgccatsanctuary.org',
    phoneNumber: '+63 2 8555 0281',
    petCount: 52,
    bg: '#ffe9b8',
    svg: (
      <svg viewBox='0 0 200 140' width='200' height='140'>
        <rect width='200' height='140' fill='#ffe9b8' />
        <polygon points='56,72 60,36 80,72' fill='#5a5853' />
        <polygon points='120,72 140,36 144,72' fill='#5a5853' />
        <ellipse cx='100' cy='96' rx='56' ry='42' fill='#827d76' />
        <ellipse cx='100' cy='102' rx='36' ry='26' fill='#cdc6bd' />
        <ellipse cx='82' cy='84' rx='5' ry='6' fill='#1d2235' />
        <ellipse cx='118' cy='84' rx='5' ry='6' fill='#1d2235' />
        <ellipse cx='100' cy='102' rx='5' ry='3.4' fill='#1d2235' />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Cebu Paws',
    description:
      'A multi-species shelter serving the greater Cebu area. Dogs, cats, rabbits, and small animals — we partner with local vet clinics to ensure every pet is healthy before placement.',
    address: 'P. Del Rosario St, Cebu City, Cebu 6000',
    contactEmail: 'info@cebupaws.org',
    phoneNumber: '+63 32 888 0374',
    petCount: 61,
    bg: '#e9f5ee',
    svg: (
      <svg viewBox='0 0 200 140' width='200' height='140'>
        <rect width='200' height='140' fill='#e9f5ee' />
        <ellipse cx='80' cy='86' rx='36' ry='30' fill='#e8a878' />
        <polygon points='56,66 60,36 76,68' fill='#a87d62' />
        <polygon points='84,68 100,36 104,66' fill='#a87d62' />
        <circle cx='70' cy='82' r='2.6' fill='#1d2235' />
        <circle cx='90' cy='82' r='2.6' fill='#1d2235' />
        <ellipse cx='80' cy='92' rx='3.4' ry='2.4' fill='#1d2235' />
        <ellipse cx='140' cy='90' rx='30' ry='24' fill='#cdc6bd' />
        <polygon points='116,68 122,44 138,70' fill='#cdcdcd' />
        <polygon points='142,70 158,44 164,68' fill='#cdcdcd' />
        <circle cx='130' cy='86' r='2.2' fill='#1d2235' />
        <circle cx='150' cy='86' r='2.2' fill='#1d2235' />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Palawan Wildlife & Exotic Rescue',
    description:
      'Specializing in parrots, conures, reptiles, and small exotic animals native to the Philippine archipelago. Our team has decades of combined experience in avian and reptile care, behavior, and rehoming.',
    address: 'Rizal Ave, Puerto Princesa, Palawan 5300',
    contactEmail: 'adopt@palawanwildlife.org',
    phoneNumber: '+63 48 888 0519',
    petCount: 18,
    bg: '#e5edf6',
    svg: (
      <svg viewBox='0 0 200 140' width='200' height='140'>
        <rect width='200' height='140' fill='#e5edf6' />
        <ellipse cx='100' cy='90' rx='44' ry='50' fill='#3a73c2' />
        <ellipse cx='100' cy='94' rx='32' ry='36' fill='#5a8cb0' />
        <ellipse cx='100' cy='68' rx='22' ry='20' fill='#5fb4d8' />
        <circle cx='92' cy='62' r='3' fill='#1d2235' />
        <circle cx='108' cy='62' r='3' fill='#1d2235' />
        <polygon points='96,72 100,80 104,72' fill='#ffd166' />
        <path
          d='M60 100 Q50 110 58 120 Q70 128 80 118'
          stroke='#5a8cb0'
          strokeWidth='8'
          strokeLinecap='round'
          fill='none'
        />
        <path
          d='M140 100 Q150 110 142 120 Q130 128 120 118'
          stroke='#5a8cb0'
          strokeWidth='8'
          strokeLinecap='round'
          fill='none'
        />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Paws of Hope — Davao',
    description:
      "Davao City's pet overpopulation problem fuels our mission. We pull dogs and cats from the highest-intake municipal shelters in the region, rehabilitate them, and find them families.",
    address: 'C.M. Recto St, Davao City, Davao del Sur 8000',
    contactEmail: 'rescue@pawsofhope-davao.org',
    phoneNumber: '+63 82 888 0638',
    petCount: 78,
    bg: '#f4eaff',
    svg: (
      <svg viewBox='0 0 200 140' width='200' height='140'>
        <rect width='200' height='140' fill='#f4eaff' />
        <ellipse cx='100' cy='92' rx='60' ry='44' fill='#3a3530' />
        <ellipse cx='100' cy='86' rx='44' ry='36' fill='#5a4a3e' />
        <polygon points='62,62 60,32 80,64' fill='#1d1916' />
        <polygon points='120,64 140,32 138,62' fill='#1d1916' />
        <circle cx='84' cy='84' r='3' fill='#fff' />
        <circle cx='116' cy='84' r='3' fill='#fff' />
        <ellipse cx='100' cy='98' rx='6' ry='4' fill='#1d1916' />
        <path
          d='M90 108 Q100 116 110 108'
          stroke='#1d1916'
          strokeWidth='1.4'
          fill='none'
          strokeLinecap='round'
          opacity='0.6'
        />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Manila Small Animal Society',
    description:
      'Dedicated to rabbits, guinea pigs, hamsters, and other small animals often overlooked by larger shelters. All animals are health-checked and housed in enriched, cage-free environments.',
    address: 'Taft Ave, Ermita, Manila 1000',
    contactEmail: 'adopt@manilasmallanimals.org',
    phoneNumber: '+63 2 8555 0711',
    petCount: 29,
    bg: '#e9f5ee',
    svg: (
      <svg viewBox='0 0 200 140' width='200' height='140'>
        <rect width='200' height='140' fill='#e9f5ee' />
        <ellipse cx='100' cy='90' rx='44' ry='34' fill='#fff' />
        <ellipse cx='100' cy='86' rx='32' ry='26' fill='#f3d2b3' />
        <ellipse cx='78' cy='52' rx='7' ry='20' fill='#f3d2b3' />
        <ellipse cx='122' cy='52' rx='7' ry='20' fill='#f3d2b3' />
        <circle cx='88' cy='84' r='2.8' fill='#1d2235' />
        <circle cx='112' cy='84' r='2.8' fill='#1d2235' />
        <ellipse cx='100' cy='94' rx='4' ry='2.6' fill='#ff7a8a' />
        <line
          x1='86'
          y1='96'
          x2='70'
          y2='100'
          stroke='#1d2235'
          strokeWidth='1'
        />
        <line
          x1='86'
          y1='98'
          x2='70'
          y2='104'
          stroke='#1d2235'
          strokeWidth='1'
        />
        <line
          x1='114'
          y1='96'
          x2='130'
          y2='100'
          stroke='#1d2235'
          strokeWidth='1'
        />
        <line
          x1='114'
          y1='98'
          x2='130'
          y2='104'
          stroke='#1d2235'
          strokeWidth='1'
        />
      </svg>
    ),
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Shelters list their pets',
    desc: 'Verified shelter staff create and manage pet listings with photos, breed info, age, size, and a personal description of each animal.',
  },
  {
    step: '02',
    title: 'Adopters browse and apply',
    desc: 'Registered adopters submit a proof-of-care application with their living situation, experience, and a personal message to the shelter.',
  },
  {
    step: '03',
    title: 'Shelter reviews each request',
    desc: 'Staff personally review every application and approve or reject based on fit. Once approved, all other pending applications for that pet are automatically closed.',
  },
];

export default function SheltersPage() {
  return (
    <>
      {/* Hero */}
      <section
        className='relative overflow-hidden rounded-[28px] mt-6 p-6 md:p-[72px_64px] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 items-center'
        style={{
          background: `
            radial-gradient(ellipse 58% 54% at 82% 14%, rgba(29,117,117,0.15) 0%, transparent 53%),
            radial-gradient(ellipse 48% 52% at 18% 86%, rgba(232,146,60,0.18) 0%, transparent 54%),
            linear-gradient(156deg, #FDFAF4 0%, #F0E8D0 100%)
          `,
        }}
      >
        <div>
          <Eyebrow>Shelters</Eyebrow>
          <h1 className='mt-4 text-[30px] sm:text-[40px] md:text-[64px] leading-[1.04]'>
            Partner shelters
            <br />
            across the Philippines
          </h1>
          <p className='text-(--ink-2) mt-4.5 max-w-120 text-[17px]'>
            Every shelter on KodaNest is reviewed and approved before they can
            list pets. Browse our network of rescue organizations — from big
            multi-species centers to specialist sanctuaries.
          </p>
          <div className='hero-cta-row flex gap-3 mt-8'>
            <Link to='/pets' className='btn btn-primary btn-lg'>
              Browse pets
            </Link>
            <Link to='/contact' className='btn btn-outline btn-lg'>
              Contact a shelter
            </Link>
          </div>
        </div>
        <div className='hero-side-illu relative h-90'>
          <svg
            viewBox='0 0 460 360'
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <path
              d='M40 280 Q200 80 420 220'
              stroke='#f5b894'
              strokeWidth='50'
              fill='none'
              strokeLinecap='round'
              opacity='0.55'
            />
            <circle cx='100' cy='120' r='44' fill='#cfe6f7' opacity='0.8' />
            <ellipse cx='100' cy='128' rx='22' ry='18' fill='#e8a878' />
            <polygon points='80,108 86,92 96,110' fill='#a87d62' />
            <polygon points='106,110 116,92 122,108' fill='#a87d62' />
            <circle cx='92' cy='124' r='2' fill='#1d2235' />
            <circle cx='108' cy='124' r='2' fill='#1d2235' />
            <circle cx='220' cy='220' r='56' fill='#ffe9b8' opacity='0.85' />
            <ellipse cx='220' cy='226' rx='30' ry='24' fill='#827d76' />
            <polygon points='194,200 200,180 214,202' fill='#5a5853' />
            <polygon points='226,202 240,180 246,200' fill='#5a5853' />
            <circle cx='208' cy='220' r='3' fill='#1d2235' />
            <circle cx='232' cy='220' r='3' fill='#1d2235' />
            <circle cx='350' cy='140' r='48' fill='#fde2cf' opacity='0.9' />
            <ellipse cx='350' cy='148' rx='26' ry='20' fill='#3a3530' />
            <polygon points='328,128 326,108 342,130' fill='#1d1916' />
            <polygon points='358,130 374,108 372,128' fill='#1d1916' />
            <circle cx='340' cy='144' r='2.4' fill='#fff' />
            <circle cx='360' cy='144' r='2.4' fill='#fff' />
            <g fill='#d97757' opacity='0.7' transform='translate(180 60)'>
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

      {/* Shelter listings */}
      <section className='section'>
        <SectionHead
          heading={`${SHELTERS.length} verified shelters`}
          subheading='Each organization listed here has been reviewed by the KodaNest team. Staff manage their own pet listings and applications.'
        />
        <div
          className='grid gap-5 mt-12'
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          }}
        >
          {SHELTERS.map(
            ({
              id,
              name,
              description,
              address,
              contactEmail,
              phoneNumber,
              petCount,
              bg,
              svg,
            }) => (
              <div
                key={id}
                className='group bg-(--canvas) border border-(--hairline-soft) rounded-[20px] p-6 text-left cursor-default transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-(--ink) hover:shadow-(--shadow-lift) hover:-translate-y-1'
              >
                <div
                  className='mb-3.5 overflow-hidden rounded-2xl transition-transform duration-200 ease-out group-hover:scale-[1.02]'
                  style={{ background: bg }}
                >
                  {svg}
                </div>
                <div>
                  <h3 className='mb-1.5'>{name}</h3>
                  <p className='mb-3 text-(--muted) text-[13px] leading-normal'>
                    {description}
                  </p>
                  <div className='text-[13px] text-(--ink-2) flex flex-col gap-1'>
                    <span>📍 {address}</span>
                    <span>✉️ {contactEmail}</span>
                    <span>📞 {phoneNumber}</span>
                  </div>
                  <div className='flex gap-3 mt-4 items-center'>
                    <span
                      className='text-[12px] font-bold px-3 py-1 rounded-full'
                      style={{ background: '#e6f4f0', color: '#1D7575' }}
                    >
                      {petCount} pets available
                    </span>
                    <Link
                      to='/pets'
                      className='text-[13px] text-(--rausch) font-semibold'
                    >
                      Browse pets →
                    </Link>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* How it works */}
      <section
        className='section rounded-[28px] max-sm:px-5'
        style={{ background: 'var(--soft)' }}
      >
        <SectionHead
          eyebrow='How it works'
          heading='The adoption process, end to end'
          subheading='KodaNest handles the connection — shelters handle the decision.'
        />
        <div className='max-w-215 mx-auto flex flex-col gap-8'>
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className='flex gap-6 items-start'>
              <span
                className='shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-[15px] text-white'
                style={{ background: 'var(--rausch)' }}
              >
                {step}
              </span>
              <div>
                <h4 className='mb-1.5'>{title}</h4>
                <p className='text-(--ink-2)'>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='section-tight'>
        <div className='cta-band'>
          <div>
            <h2>Is your shelter on KodaNest?</h2>
            <p>
              Reach thousands of verified adopters. Get in touch to set up your
              shelter account and start listing pets.
            </p>
          </div>
          <div className='row' style={{ gap: 12, justifyContent: 'flex-end' }}>
            <Link to='/contact' className='btn btn-primary btn-lg'>
              Register your shelter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
