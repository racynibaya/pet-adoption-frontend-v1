import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';
import styles from './About.module.css';

/* ---- Gallery photos (SVG illustrations) ---- */
const GALLERY_PHOTOS = [
  {
    bg: '#f3d2b3',
    svg: (
      <svg viewBox='0 0 400 600' width='100%' height='100%'>
        <rect width='400' height='600' fill='#f3d2b3' />
        <ellipse cx='200' cy='380' rx='120' ry='90' fill='#a87d62' />
        <ellipse cx='200' cy='350' rx='90' ry='80' fill='#e8a878' />
        <polygon points='115,300 130,220 168,304' fill='#a87d62' />
        <polygon points='232,304 270,220 285,300' fill='#a87d62' />
        <circle cx='172' cy='350' r='6' fill='#1d2235' />
        <circle cx='228' cy='350' r='6' fill='#1d2235' />
        <ellipse cx='200' cy='380' rx='10' ry='6' fill='#1d2235' />
        <path
          d='M192 392 Q200 404 208 392'
          stroke='#1d2235'
          strokeWidth='2'
          fill='none'
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
    bg: '#ff385c',
    svg: (
      <svg viewBox='0 0 300 220' width='100%' height='100%'>
        <rect width='300' height='220' fill='#ff385c' />
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
      <svg viewBox='0 0 300 220' width='100%' height='100%'>
        <rect width='300' height='220' fill='#ffe9b8' />
        <ellipse cx='150' cy='140' rx='70' ry='56' fill='#3a3530' />
        <ellipse cx='150' cy='130' rx='52' ry='44' fill='#5a4a3e' />
        <ellipse cx='150' cy='146' rx='22' ry='14' fill='#1d1916' />
        <circle cx='132' cy='124' r='3.4' fill='#fff' />
        <circle cx='168' cy='124' r='3.4' fill='#fff' />
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
          stroke='#3a8c6a'
          strokeWidth='1.6'
          fill='none'
        />
        <polyline
          points='7 11 10 14 15 8'
          stroke='#3a8c6a'
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
          fill='#ff385c'
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
          stroke='#5a8cb0'
          strokeWidth='1.6'
          fill='none'
        />
        <line
          x1='11'
          y1='6'
          x2='11'
          y2='11'
          stroke='#5a8cb0'
          strokeWidth='1.8'
          strokeLinecap='round'
        />
        <line
          x1='11'
          y1='11'
          x2='14'
          y2='13'
          stroke='#5a8cb0'
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
        <path d='M40 200 Q60 156 100 152 Q140 156 160 200 Z' fill='#ff385c' />
      </svg>
    ),
  },
  {
    name: 'Triccie Ann Rafin',
    role: 'Head of Adoption',
    bg: '#cfe6f7',
    svg: (
      <svg viewBox='0 0 200 200' width='100%' height='100%'>
        {/* Long flowing hair - side strands */}
        <path
          d='M54 82 Q38 126 44 166 Q56 178 68 170 Q53 138 57 104 Z'
          fill='#5a3a22'
        />
        <path
          d='M146 82 Q162 126 156 166 Q144 178 132 170 Q147 138 143 104 Z'
          fill='#5a3a22'
        />
        {/* Neck */}
        <rect x='89' y='138' width='22' height='22' rx='4' fill='#f0b896' />
        {/* Body - feminine pink top */}
        <path
          d='M40 200 Q52 154 82 146 Q91 150 100 150 Q109 150 118 146 Q148 154 160 200 Z'
          fill='#ff7eb3'
        />
        {/* V-neck collar */}
        <path
          d='M82 146 Q91 162 100 162 Q109 162 118 146'
          fill='#ffbfda'
          stroke='#dd6699'
          strokeWidth='1.5'
        />
        {/* Hair mass top/back */}
        <ellipse cx='100' cy='64' rx='54' ry='44' fill='#5a3a22' />
        {/* Face */}
        <ellipse cx='100' cy='96' rx='46' ry='52' fill='#f0b896' />
        {/* Hair forehead layer */}
        <path
          d='M54 82 Q60 40 100 36 Q140 40 146 82 Q138 70 130 68 Q120 44 100 42 Q80 44 70 68 Q62 70 54 82Z'
          fill='#5a3a22'
        />
        {/* Pink bow hair accessory */}
        <path d='M122 50 Q132 40 140 50 Q132 58 122 50Z' fill='#ff4d88' />
        <path d='M140 50 Q148 40 158 50 Q148 58 140 50Z' fill='#ff4d88' />
        <circle cx='140' cy='50' r='5' fill='#cc2266' />
        <circle cx='140' cy='50' r='2.5' fill='#ff8ab4' />
        {/* Arched eyebrows */}
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
        {/* Eyes */}
        <ellipse cx='86' cy='96' rx='7' ry='7' fill='#1d2235' />
        <ellipse cx='114' cy='96' rx='7' ry='7' fill='#1d2235' />
        {/* Eye shine */}
        <circle cx='88.5' cy='93.5' r='2.2' fill='white' />
        <circle cx='116.5' cy='93.5' r='2.2' fill='white' />
        {/* Eyelashes - left */}
        <line
          x1='79'
          y1='91'
          x2='77'
          y2='87'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        <line
          x1='83'
          y1='89'
          x2='81'
          y2='85'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        <line
          x1='86'
          y1='89'
          x2='86'
          y2='85'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        <line
          x1='89'
          y1='89'
          x2='90'
          y2='85'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        <line
          x1='93'
          y1='91'
          x2='95'
          y2='87'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        {/* Eyelashes - right */}
        <line
          x1='107'
          y1='91'
          x2='105'
          y2='87'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        <line
          x1='111'
          y1='89'
          x2='110'
          y2='85'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        <line
          x1='114'
          y1='89'
          x2='114'
          y2='85'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        <line
          x1='117'
          y1='89'
          x2='118'
          y2='85'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        <line
          x1='121'
          y1='91'
          x2='123'
          y2='87'
          stroke='#1d2235'
          strokeWidth='1.4'
          strokeLinecap='round'
        />
        {/* Nose */}
        <path
          d='M97 110 Q100 115 103 110'
          stroke='#c98060'
          strokeWidth='1.5'
          fill='none'
          strokeLinecap='round'
        />
        {/* Rosy cheeks */}
        <ellipse cx='72' cy='112' rx='13' ry='7' fill='#ff9999' opacity='0.4' />
        <ellipse
          cx='128'
          cy='112'
          rx='13'
          ry='7'
          fill='#ff9999'
          opacity='0.4'
        />
        {/* Lips */}
        <path
          d='M88 122 Q94 118 100 120 Q106 118 112 122 Q106 130 100 131 Q94 130 88 122Z'
          fill='#e06070'
        />
        <path
          d='M88 122 Q100 126 112 122'
          stroke='#b03050'
          strokeWidth='0.8'
          fill='none'
        />
        <path
          d='M88 122 Q94 119 100 120 Q106 119 112 122'
          stroke='#b03050'
          strokeWidth='0.8'
          fill='none'
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
        <path d='M40 200 Q60 156 100 152 Q140 156 160 200 Z' fill='#3a8c6a' />
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
      <section className={styles.aboutHero}>
        <span className={styles.decoL}>
          <PawprintDeco />
        </span>
        <span className={styles.decoR}>
          <PawprintDeco flip />
        </span>
        <Eyebrow style={{ justifyContent: 'center' }}>About KodaNest</Eyebrow>
        <h1 className='mt-16'>
          Built by people
          <br />
          who can't stop
          <br />
          looking at dogs
        </h1>
        <p>
          We started KodaNest in 2023 because finding the right home for a
          rescue pet shouldn't feel like a search engine result — it should feel
          like meeting a friend. Today we connect 12,000+ households with
          adoptable pets from verified shelters across 40 cities in the
          Philippines.
        </p>
      </section>

      {/* Gallery */}
      <section style={{ padding: '0 0 64px' }}>
        <div className={styles.gallery}>
          {GALLERY_PHOTOS.map(({ bg, svg }, i) => (
            <div key={i} className='photo' style={{ background: bg }}>
              {svg}
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className='section'>
        <div className={styles.story}>
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className='mt-16'>
              From one rescued
              <br />
              terrier to
              <br />
              twelve thousand
              <br />
              matches
            </h2>
          </div>
          <div className={styles.storyBody}>
            <p>
              KodaNest began in 2023, in a small barangay in La Union, after our
              founder Racyn adopted a one-eyed terrier named Eli and discovered
              that finding a sitter for him while traveling was nearly
              impossible. The shelter that had matched her with Eli ran on
              spreadsheets. The sitter she eventually found ran on Venmo and
              crossed fingers. Both deserved better.
            </p>
            <p>
              Today, KodaNest is a platform built around a simple promise: the
              adoption process should feel as warm and trustworthy as handing
              your pet to a friend. We verify every shelter, require proof of
              care on every application, and send email notifications every time
              an application status changes — so adopters are never left
              wondering.
            </p>
            <p>
              We're a team of forty across Manila, Philippines. Most of us live
              with at least one rescued pet (one of us has six cats, which we
              don't recommend but do admire). We're hiring, and yes, you can
              bring your dog to the office.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ padding: '32px 0 96px' }}>
        <div className={styles.statsStrip}>
          {ABOUT_STATS.map(({ num, lab }) => (
            <div key={lab} className={`${styles.stat}`}>
              <div className={styles.num}>{num}</div>
              <div className={styles.lab}>{lab}</div>
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
        <div className={styles.valuesGrid}>
          {VALUES.map(({ bg, title, desc, icon }) => (
            <div key={title} className={styles.value}>
              <div className={styles.valueIcon} style={{ background: bg }}>
                {icon}
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className='section-tight'>
        <SectionHead heading='How we got here' />
        <div className={styles.timeline}>
          {TIMELINE.map(({ yr, title, desc }) => (
            <div key={yr} className={styles.tlItem}>
              <span className={styles.dot} />
              <div className={styles.yr}>{yr}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
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
        <div className={styles.teamGrid}>
          {TEAM.map(({ name, role, bg, svg }) => (
            <div key={name} className={styles.teamCard}>
              <div className={styles.teamPhoto} style={{ background: bg }}>
                {svg}
              </div>
              <h4>{name}</h4>
              <div className={styles.role}>{role}</div>
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
