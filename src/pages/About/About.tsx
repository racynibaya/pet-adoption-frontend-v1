import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';

const GALLERY_PHOTOS = [
  {
    bg: '#f3d2b3',
    svg: (
      <svg
        viewBox='0 0 400 400'
        width='100%'
        height='100%'
        preserveAspectRatio='xMidYMid slice'
      >
        <rect width='400' height='400' fill='#f3d2b3' />
        <ellipse cx='200' cy='285' rx='128' ry='72' fill='#a87d62' />
        <ellipse cx='200' cy='200' rx='102' ry='92' fill='#e8a878' />
        <polygon points='112,150 138,72 180,158' fill='#a87d62' />
        <polygon points='220,158 262,72 288,150' fill='#a87d62' />
        <polygon points='128,140 142,98 162,140' fill='#f3d2b3' />
        <polygon points='238,140 258,98 272,140' fill='#f3d2b3' />
        <circle cx='170' cy='205' r='9' fill='#1d2235' />
        <circle cx='230' cy='205' r='9' fill='#1d2235' />
        <ellipse cx='200' cy='240' rx='11' ry='7' fill='#1d2235' />
        <path
          d='M188 254 Q200 268 212 254'
          stroke='#1d2235'
          strokeWidth='2.4'
          fill='none'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    bg: '#cdc6bd',
    svg: (
      <svg viewBox='0 0 300 220' width='100%' height='100%'>
        <rect width='300' height='220' fill='#cdc6bd' />
        <polygon points='100,80 110,40 132,80' fill='#5a5853' />
        <polygon points='168,80 190,40 200,80' fill='#5a5853' />
        <ellipse cx='150' cy='130' rx='64' ry='52' fill='#827d76' />
        <ellipse cx='150' cy='138' rx='42' ry='32' fill='#cdc6bd' />
        <ellipse cx='130' cy='120' rx='5' ry='6' fill='#1d2235' />
        <ellipse cx='170' cy='120' rx='5' ry='6' fill='#1d2235' />
      </svg>
    ),
  },
  {
    bg: '#5fb4d8',
    svg: (
      <svg viewBox='0 0 300 220' width='100%' height='100%'>
        <rect width='300' height='220' fill='#5fb4d8' />
        <ellipse cx='150' cy='140' rx='80' ry='60' fill='#fff' />
        <ellipse cx='150' cy='130' rx='50' ry='44' fill='#cdcdcd' />
        <ellipse cx='150' cy='138' rx='36' ry='26' fill='#fff' />
        <polygon points='118,98 124,68 146,100' fill='#cdcdcd' />
        <polygon points='154,100 176,68 182,98' fill='#cdcdcd' />
        <circle cx='138' cy='128' r='4' fill='#1d2235' />
        <circle cx='162' cy='128' r='4' fill='#1d2235' />
      </svg>
    ),
  },
  {
    bg: '#E8923C',
    svg: (
      <svg viewBox='0 0 300 220' width='100%' height='100%'>
        <rect width='300' height='220' fill='#E8923C' />
        <text
          x='150'
          y='120'
          textAnchor='middle'
          fontFamily='Fraunces, serif'
          fontWeight='700'
          fontSize='42'
          fill='#fff'
        >
          12k+
        </text>
        <text
          x='150'
          y='150'
          textAnchor='middle'
          fontFamily='Inter, sans-serif'
          fontWeight='500'
          fontSize='14'
          fill='#fff'
          opacity='0.9'
        >
          adoptions matched
        </text>
      </svg>
    ),
  },
  {
    bg: '#ffe9b8',
    svg: (
      <svg
        viewBox='0 0 400 150'
        width='100%'
        height='100%'
        preserveAspectRatio='xMidYMid slice'
      >
        <rect width='400' height='150' fill='#ffe9b8' />
        <line
          x1='30'
          y1='133'
          x2='370'
          y2='133'
          stroke='#d4a838'
          strokeWidth='1.4'
          strokeDasharray='3 6'
          strokeLinecap='round'
          opacity='0.35'
        />
        <g fill='#3a3530' opacity='0.42'>
          <ellipse
            cx='62'
            cy='92'
            rx='4'
            ry='5.6'
            transform='rotate(-15 62 92)'
          />
          <ellipse cx='56' cy='82' rx='2.2' ry='3.4' />
          <ellipse cx='70' cy='84' rx='2.2' ry='3.4' />
        </g>
        <g fill='#3a3530' opacity='0.3'>
          <ellipse
            cx='108'
            cy='115'
            rx='3.4'
            ry='4.8'
            transform='rotate(8 108 115)'
          />
          <ellipse cx='102' cy='107' rx='1.8' ry='2.8' />
          <ellipse cx='114' cy='107' rx='1.8' ry='2.8' />
        </g>
        <ellipse cx='200' cy='128' rx='62' ry='20' fill='#3a3530' />
        <ellipse
          cx='162'
          cy='48'
          rx='12'
          ry='20'
          fill='#3a3530'
          transform='rotate(-25 162 48)'
        />
        <ellipse
          cx='238'
          cy='48'
          rx='12'
          ry='20'
          fill='#3a3530'
          transform='rotate(25 238 48)'
        />
        <ellipse cx='200' cy='78' rx='54' ry='52' fill='#3a3530' />
        <ellipse cx='200' cy='86' rx='38' ry='30' fill='#5a4a3e' />
        <circle cx='184' cy='74' r='4.4' fill='#fff' />
        <circle cx='216' cy='74' r='4.4' fill='#fff' />
        <circle cx='184' cy='75' r='2.2' fill='#1d1916' />
        <circle cx='216' cy='75' r='2.2' fill='#1d1916' />
        <ellipse cx='200' cy='100' rx='12' ry='8' fill='#1d1916' />
        <path
          d='M188 107 Q200 115 212 107'
          stroke='#1d1916'
          strokeWidth='2'
          fill='none'
          strokeLinecap='round'
        />
        <g fill='#3a3530' opacity='0.42'>
          <ellipse
            cx='338'
            cy='92'
            rx='4'
            ry='5.6'
            transform='rotate(15 338 92)'
          />
          <ellipse cx='330' cy='82' rx='2.2' ry='3.4' />
          <ellipse cx='344' cy='84' rx='2.2' ry='3.4' />
        </g>
        <g fill='#3a3530' opacity='0.3'>
          <ellipse
            cx='292'
            cy='115'
            rx='3.4'
            ry='4.8'
            transform='rotate(-8 292 115)'
          />
          <ellipse cx='286' cy='107' rx='1.8' ry='2.8' />
          <ellipse cx='298' cy='107' rx='1.8' ry='2.8' />
        </g>
      </svg>
    ),
  },
];

const ABOUT_STATS = [
  { num: '12,400', lab: 'Adoptions completed since 2023' },
  { num: '50+', lab: 'Verified partner shelters' },
  { num: '40', lab: 'Cities across the PH' },
  { num: '4.92★', lab: 'Average shelter rating' },
];

const VALUES = [
  {
    bg: 'var(--mint)',
    title: 'Animal first, always',
    desc: "If a placement isn't right for the pet, we don't approve it. Shelters have full authority to reject any application that doesn't feel like the right fit.",
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <path
          d='M11 2 L19 6 V13 Q19 19 11 21 Q3 19 3 13 V6 Z'
          stroke='#1D7575'
          strokeWidth='1.6'
          fill='none'
        />
        <polyline
          points='7 11 10 14 15 8'
          stroke='#1D7575'
          strokeWidth='1.8'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    bg: 'var(--rose)',
    title: 'Warmth over forms',
    desc: 'We talk like humans. Every shelter staff member is a real person who has personally cared for animals and reviews each application thoughtfully.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <path
          d='M11 4 Q15 1 18 5 Q21 11 11 19 Q1 11 4 5 Q7 1 11 4Z'
          fill='#D94F68'
        />
      </svg>
    ),
  },
  {
    bg: 'var(--sky)',
    title: 'Transparent process',
    desc: 'Adopters can track their application status in real time — pending, reviewing, approved, or rejected. No black boxes, no waiting in the dark.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <circle
          cx='11'
          cy='11'
          r='8'
          stroke='#2F97AC'
          strokeWidth='1.6'
          fill='none'
        />
        <line
          x1='11'
          y1='6'
          x2='11'
          y2='11'
          stroke='#2F97AC'
          strokeWidth='1.8'
          strokeLinecap='round'
        />
        <line
          x1='11'
          y1='11'
          x2='14'
          y2='13'
          stroke='#2F97AC'
          strokeWidth='1.8'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    bg: 'var(--sun)',
    title: 'Diversity of homes',
    desc: "We match small apartments and big yards alike. The right home isn't always the biggest one — it's the one with the right energy and experience.",
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <circle
          cx='11'
          cy='11'
          r='8'
          stroke='#a87d12'
          strokeWidth='1.6'
          fill='none'
        />
        <circle cx='11' cy='11' r='3' fill='#a87d12' />
      </svg>
    ),
  },
  {
    bg: 'var(--cream)',
    title: 'Open communication',
    desc: 'Email notifications on every application status change. Shelters communicate directly through the platform — adopters are never left guessing.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <path
          d='M4 6 Q4 4 6 4 H16 Q18 4 18 6 V14 Q18 16 16 16 H10 L6 19 V16 H6 Q4 16 4 14Z'
          stroke='#d97757'
          strokeWidth='1.6'
          fill='none'
        />
      </svg>
    ),
  },
  {
    bg: '#f4eaff',
    title: 'Proof of care required',
    desc: 'Every adoption application requires an adopter profile — living situation, other pets, experience, working hours. This protects both the pet and the adopter.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <path
          d='M3 11 Q11 4 19 11 Q11 18 3 11Z'
          stroke='#7d4ea3'
          strokeWidth='1.6'
          fill='none'
        />
        <circle cx='11' cy='11' r='2.4' fill='#7d4ea3' />
      </svg>
    ),
  },
];

const TIMELINE = [
  {
    yr: '2023',
    title: 'Founded in Philippines',
    desc: 'Racyn adopts Eli. KodaNest launches as a sitter directory in 4 zip codes.',
  },
  {
    yr: '2024',
    title: 'Adoption matching',
    desc: 'Partnered with 50 shelters. First 1,000 adoptions matched. Series A led by Lerer Hippeau.',
  },
  {
    yr: '2025',
    title: 'Medi-care launches',
    desc: 'Partnered with 200+ vet clinics for routine and emergency care. Live cams roll out.',
  },
  {
    yr: '2026',
    title: '40 cities, 12k matches',
    desc: 'Now operating in 40 metros. Multi-pet plans, training, and grooming open to all members.',
  },
];

const TEAM = [
  {
    name: 'Racyn Ibaya',
    role: 'Founder & CEO',
    bg: '#f3d2b3',
    svg: (
      <svg viewBox='0 0 200 200' width='100%' height='100%'>
        <ellipse cx='100' cy='92' rx='46' ry='54' fill='#e0c4ad' />
        <path
          d='M55 80 Q60 40 100 36 Q140 40 145 80 Q140 90 130 92 Q126 60 100 56 Q74 60 70 92 Q60 90 55 80Z'
          fill='#1d1916'
        />
        <circle cx='86' cy='98' r='3' fill='#1d2235' />
        <circle cx='114' cy='98' r='3' fill='#1d2235' />
        <path
          d='M92 118 Q100 124 108 118'
          stroke='#1d2235'
          strokeWidth='1.8'
          fill='none'
        />
        <path d='M40 200 Q60 156 100 152 Q140 156 160 200 Z' fill='#E8923C' />
      </svg>
    ),
  },
  {
    name: 'Triccie Ann Rafin',
    role: 'Head of Adoption',
    bg: '#cfe6f7',
    svg: (
      <svg viewBox='0 0 200 200' width='100%' height='100%'>
        <path
          d='M54 82 Q38 126 44 166 Q56 178 68 170 Q53 138 57 104 Z'
          fill='#5a3a22'
        />
        <path
          d='M146 82 Q162 126 156 166 Q144 178 132 170 Q147 138 143 104 Z'
          fill='#5a3a22'
        />
        <rect x='89' y='138' width='22' height='22' rx='4' fill='#f0b896' />
        <path
          d='M40 200 Q52 154 82 146 Q91 150 100 150 Q109 150 118 146 Q148 154 160 200 Z'
          fill='#ff7eb3'
        />
        <path
          d='M82 146 Q91 162 100 162 Q109 162 118 146'
          fill='#ffbfda'
          stroke='#dd6699'
          strokeWidth='1.5'
        />
        <ellipse cx='100' cy='64' rx='54' ry='44' fill='#5a3a22' />
        <ellipse cx='100' cy='96' rx='46' ry='52' fill='#f0b896' />
        <path
          d='M54 82 Q60 40 100 36 Q140 40 146 82 Q138 70 130 68 Q120 44 100 42 Q80 44 70 68 Q62 70 54 82Z'
          fill='#5a3a22'
        />
        <path d='M122 50 Q132 40 140 50 Q132 58 122 50Z' fill='#ff4d88' />
        <path d='M140 50 Q148 40 158 50 Q148 58 140 50Z' fill='#ff4d88' />
        <circle cx='140' cy='50' r='5' fill='#cc2266' />
        <circle cx='140' cy='50' r='2.5' fill='#ff8ab4' />
        <path
          d='M79 85 Q86 79 93 82'
          stroke='#5a3a22'
          strokeWidth='2.2'
          fill='none'
          strokeLinecap='round'
        />
        <path
          d='M107 82 Q114 79 121 85'
          stroke='#5a3a22'
          strokeWidth='2.2'
          fill='none'
          strokeLinecap='round'
        />
        <ellipse cx='86' cy='96' rx='7' ry='7' fill='#1d2235' />
        <ellipse cx='114' cy='96' rx='7' ry='7' fill='#1d2235' />
        <circle cx='88.5' cy='93.5' r='2.2' fill='white' />
        <circle cx='116.5' cy='93.5' r='2.2' fill='white' />
        <path
          d='M97 110 Q100 115 103 110'
          stroke='#c98060'
          strokeWidth='1.5'
          fill='none'
          strokeLinecap='round'
        />
        <ellipse cx='72' cy='112' rx='13' ry='7' fill='#ff9999' opacity='0.4' />
        <ellipse
          cx='128'
          cy='112'
          rx='13'
          ry='7'
          fill='#ff9999'
          opacity='0.4'
        />
        <path
          d='M88 122 Q94 118 100 120 Q106 118 112 122 Q106 130 100 131 Q94 130 88 122Z'
          fill='#e06070'
        />
      </svg>
    ),
  },
  {
    name: 'Dr. Rowel Nepomuceno',
    role: 'Chief Veterinarian',
    bg: '#ffe9b8',
    svg: (
      <svg viewBox='0 0 200 200' width='100%' height='100%'>
        <ellipse cx='100' cy='92' rx='46' ry='54' fill='#f1c8a0' />
        <path
          d='M55 80 Q60 40 100 36 Q140 40 145 80 Q140 90 130 92 Q126 60 100 56 Q74 60 70 92 Q60 90 55 80Z'
          fill='#d4a06c'
        />
        <circle cx='86' cy='98' r='3' fill='#1d2235' />
        <circle cx='114' cy='98' r='3' fill='#1d2235' />
        <path
          d='M92 118 Q100 122 108 118'
          stroke='#1d2235'
          strokeWidth='1.8'
          fill='none'
        />
        <path d='M40 200 Q60 156 100 152 Q140 156 160 200 Z' fill='#5fb4d8' />
      </svg>
    ),
  },
  {
    name: 'Archie Alviar',
    role: 'Head of Training',
    bg: 'var(--mint)',
    svg: (
      <svg viewBox='0 0 200 200' width='100%' height='100%'>
        <ellipse cx='100' cy='92' rx='46' ry='54' fill='#d99c72' />
        <path
          d='M55 80 Q60 40 100 36 Q140 40 145 80 Q140 90 130 92 Q126 60 100 56 Q74 60 70 92 Q60 90 55 80Z'
          fill='#3a2a20'
        />
        <circle cx='86' cy='98' r='3' fill='#1d2235' />
        <circle cx='114' cy='98' r='3' fill='#1d2235' />
        <path
          d='M92 118 Q100 122 108 118'
          stroke='#1d2235'
          strokeWidth='1.8'
          fill='none'
        />
        <path d='M40 200 Q60 156 100 152 Q140 156 160 200 Z' fill='#1D7575' />
      </svg>
    ),
  },
];

const PawprintDeco = ({ flip = false }: { flip?: boolean }) => (
  <svg width='80' height='50' viewBox='0 0 80 50'>
    <g fill='#d97757' opacity='0.7'>
      <ellipse
        cx='14'
        cy='20'
        rx='3'
        ry='5'
        transform={`rotate(${flip ? 20 : -20} 14 20)`}
      />
      <ellipse cx='22' cy='14' rx='2.4' ry='4' />
      <ellipse cx='28' cy='22' rx='2.4' ry='4' />
      <ellipse cx='20' cy='28' rx='4' ry='6' />
    </g>
  </svg>
);

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className='about-hero mt-6 rounded-[28px] text-center relative overflow-hidden'
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 10%, rgba(93,181,196,0.45) 0%, transparent 55%),' +
            'radial-gradient(ellipse 45% 55% at 80% 85%, rgba(253,224,178,0.62) 0%, transparent 52%),' +
            'radial-gradient(ellipse 35% 45% at 55% 50%, rgba(255,253,247,0.25) 0%, transparent 60%),' +
            'linear-gradient(158deg, #FDF5E2 0%, #FBEAD0 100%)',
        }}
      >
        <span className='about-paw-tl'>
          <PawprintDeco />
        </span>
        <span className='about-paw-br'>
          <PawprintDeco flip />
        </span>
        <Eyebrow style={{ justifyContent: 'center' }}>About KodaNest</Eyebrow>
        <div className='flex items-center flex-col'>
          <h1 className='hero-title mt-16 max-w-220 mx-auto'>
            Built by people
            <br />
            who can't stop
            <br />
            looking at dogs
          </h1>
          <p
            className='max-w-155 mx-auto text-[18px]'
            style={{ marginTop: 24, color: 'var(--ink-2)' }}
          >
            We started KodaNest in 2023 because finding the right home for a
            rescue pet shouldn't feel like a search engine result — it should
            feel like meeting a friend. Today we connect 12,000+ households with
            adoptable pets from verified shelters across 40 cities in the
            Philippines.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: '0 0 64px' }}>
        <div
          className='r-grid-gallery gap-4 relative z-5 about-gallery'
          style={{ marginTop: -38 }}
        >
          {GALLERY_PHOTOS.map(({ bg, svg }, i) => (
            <div
              key={i}
              className='photo transition-[transform,box-shadow] duration-340 hover:-translate-y-1.25 hover:[box-shadow:0_14px_36px_rgba(18,52,64,0.14)] w-full h-full'
              style={{
                aspectRatio: i === 0 ? '1/1.4' : '4/3',
                gridRow: i === 0 ? 'span 2' : undefined,
                background: bg,
              }}
            >
              {svg}
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className='section'>
        <div className='r-grid-side-rev gap-20 items-start about-story-grid'>
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className='section-title mt-16'>
              From one rescued terrier to twelve thousand matches
            </h2>
          </div>
          <div className='story-drop-cap'>
            <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.7 }}>
              KodaNest began in 2023, in a small barangay in La Union, after our
              founder Racyn adopted a one-eyed terrier named Eli and discovered
              that finding a sitter for him while traveling was nearly
              impossible. The shelter that had matched her with Eli ran on
              spreadsheets. The sitter she eventually found ran on Venmo and
              crossed fingers. Both deserved better.
            </p>
            <p
              style={{
                color: 'var(--ink-2)',
                fontSize: 16,
                lineHeight: 1.7,
                marginTop: 16,
              }}
            >
              Today, KodaNest is a platform built around a simple promise: the
              adoption process should feel as warm and trustworthy as handing
              your pet to a friend. We verify every shelter, require proof of
              care on every application, and send email notifications every time
              an application status changes — so adopters are never left
              wondering.
            </p>
            <p
              style={{
                color: 'var(--ink-2)',
                fontSize: 16,
                lineHeight: 1.7,
                marginTop: 16,
              }}
            >
              We're a team of forty across Manila, Philippines. Most of us live
              with at least one rescued pet (one of us has six cats, which we
              don't recommend but do admire). We're hiring, and yes, you can
              bring your dog to the office.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className='about-stats-section'>
        <div
          className='r-grid-4 rounded-[28px] text-white about-stats-card'
          style={{
            gap: 32,
            background: 'var(--ink)',
          }}
        >
          {ABOUT_STATS.map(({ num, lab }) => (
            <div key={lab} className='text-left'>
              <div
                className='about-stats-num text-white font-semibold tracking-tight'
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {num}
              </div>
              <div className='text-[14px] mt-2' style={{ color: '#b8cec0' }}>
                {lab}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className='section-tight'>
        <SectionHead
          eyebrow='What we believe'
          heading="Six things we won't compromise on"
        />
        <div className='r-grid-3 gap-6'>
          {VALUES.map(({ bg, title, desc, icon }) => (
            <div
              key={title}
              className='bg-(--canvas) border border-(--hairline-soft) rounded-2xl flex flex-row gap-3.5 items-start transition-[transform,box-shadow] duration-200 hover:-translate-y-0.75 hover:[box-shadow:var(--shadow-lift)]'
              style={{ padding: '16px 18px' }}
            >
              <div
                className='w-9 h-9 shrink-0 rounded-[10px] flex items-center justify-center mt-0.5'
                style={{ background: bg }}
              >
                {icon}
              </div>
              <div className='flex-1 min-w-0'>
                <h3 style={{ fontSize: 14, marginBottom: 5 }}>{title}</h3>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--muted)',
                    lineHeight: 1.55,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className='section-tight'>
        <SectionHead heading='How we got here' />
        <div className='about-timeline r-grid-4 gap-6 relative timeline-line'>
          {TIMELINE.map(({ yr, title, desc }) => (
            <div key={yr} className='relative pt-15 group'>
              <span className='tl-dot' />
              <div
                className='text-[24px] font-semibold mb-1.5'
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--ink)',
                }}
              >
                {yr}
              </div>
              <h4>{title}</h4>
              <p style={{ fontSize: 14, color: 'var(--muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className='section-tight'>
        <SectionHead
          eyebrow='Leadership'
          heading='The humans behind the haven'
        />
        <div className='r-grid-4 gap-6'>
          {TEAM.map(({ name, role, bg, svg }) => (
            <div
              key={name}
              className='text-center transition-transform duration-200 hover:-translate-y-1.25 group'
            >
              <div
                className='rounded-[20px] overflow-hidden mb-3.5 transition-shadow duration-200 group-hover:[box-shadow:0_12px_32px_rgba(18,52,64,0.14)]'
                style={{ aspectRatio: '1/1', background: bg }}
              >
                {svg}
              </div>
              <h4 style={{ fontSize: 17 }}>{name}</h4>
              <div
                style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}
              >
                {role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='section-tight'>
        <div className='cta-band'>
          <div>
            <h2>Want to work with us?</h2>
            <p>
              We're hiring counselors, vets, and engineers in San Agustin HQ.
              Bring your pet to the interview.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Link to='/contact' className='btn btn-primary btn-lg'>
              Open roles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
