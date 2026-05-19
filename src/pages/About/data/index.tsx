import type { AboutStat, AboutValue, AboutTimelineItem, AboutTeamMember } from '../types'

export const ABOUT_STATS: AboutStat[] = [
  { num: '12,400', lab: 'Adoptions completed since 2023' },
  { num: '50+', lab: 'Verified partner shelters' },
  { num: '40', lab: 'Cities across the PH' },
  { num: '4.92★', lab: 'Average shelter rating' },
]

export const VALUES: AboutValue[] = [
  {
    bg: 'var(--mint)',
    title: 'Animal first, always',
    desc: "If a placement isn't right for the pet, we don't approve it. Shelters have full authority to reject any application that doesn't feel like the right fit.",
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <path d='M11 2 L19 6 V13 Q19 19 11 21 Q3 19 3 13 V6 Z' stroke='#1D7575' strokeWidth='1.6' fill='none' />
        <polyline points='7 11 10 14 15 8' stroke='#1D7575' strokeWidth='1.8' fill='none' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    ),
  },
  {
    bg: 'var(--rose)',
    title: 'Warmth over forms',
    desc: 'We talk like humans. Every shelter staff member is a real person who has personally cared for animals and reviews each application thoughtfully.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <path d='M11 4 Q15 1 18 5 Q21 11 11 19 Q1 11 4 5 Q7 1 11 4Z' fill='#D94F68' />
      </svg>
    ),
  },
  {
    bg: 'var(--sky)',
    title: 'Transparent process',
    desc: 'Adopters can track their application status in real time — pending, reviewing, approved, or rejected. No black boxes, no waiting in the dark.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <circle cx='11' cy='11' r='8' stroke='#2F97AC' strokeWidth='1.6' fill='none' />
        <line x1='11' y1='6' x2='11' y2='11' stroke='#2F97AC' strokeWidth='1.8' strokeLinecap='round' />
        <line x1='11' y1='11' x2='14' y2='13' stroke='#2F97AC' strokeWidth='1.8' strokeLinecap='round' />
      </svg>
    ),
  },
  {
    bg: 'var(--sun)',
    title: 'Diversity of homes',
    desc: "We match small apartments and big yards alike. The right home isn't always the biggest one — it's the one with the right energy and experience.",
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <circle cx='11' cy='11' r='8' stroke='#a87d12' strokeWidth='1.6' fill='none' />
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
        <path d='M4 6 Q4 4 6 4 H16 Q18 4 18 6 V14 Q18 16 16 16 H10 L6 19 V16 H6 Q4 16 4 14Z' stroke='#d97757' strokeWidth='1.6' fill='none' />
      </svg>
    ),
  },
  {
    bg: '#f4eaff',
    title: 'Proof of care required',
    desc: 'Every adoption application requires an adopter profile — living situation, other pets, experience, working hours. This protects both the pet and the adopter.',
    icon: (
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <path d='M3 11 Q11 4 19 11 Q11 18 3 11Z' stroke='#7d4ea3' strokeWidth='1.6' fill='none' />
        <circle cx='11' cy='11' r='2.4' fill='#7d4ea3' />
      </svg>
    ),
  },
]

export const TIMELINE: AboutTimelineItem[] = [
  {
    yr: '2023',
    title: 'Founded in Philippines',
    desc: 'Cris adopts Eli. KodaNest launches as a sitter directory in 4 zip codes.',
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
]

export const TEAM: AboutTeamMember[] = [
  {
    name: 'Cris Reyes',
    role: 'Founder & CEO',
    bg: '#f3d2b3',
    svg: (
      <svg viewBox='0 0 200 200' width='100%' height='100%'>
        <ellipse cx='100' cy='92' rx='46' ry='54' fill='#e0c4ad' />
        <path d='M55 80 Q60 40 100 36 Q140 40 145 80 Q140 90 130 92 Q126 60 100 56 Q74 60 70 92 Q60 90 55 80Z' fill='#1d1916' />
        <circle cx='86' cy='98' r='3' fill='#1d2235' />
        <circle cx='114' cy='98' r='3' fill='#1d2235' />
        <path d='M92 118 Q100 124 108 118' stroke='#1d2235' strokeWidth='1.8' fill='none' />
        <path d='M40 200 Q60 156 100 152 Q140 156 160 200 Z' fill='#E8923C' />
      </svg>
    ),
  },
  {
    name: 'Contessa Circe',
    role: 'Head of Adoption',
    bg: '#cfe6f7',
    svg: (
      <svg viewBox='0 0 200 200' width='100%' height='100%'>
        <path d='M54 82 Q38 126 44 166 Q56 178 68 170 Q53 138 57 104 Z' fill='#5a3a22' />
        <path d='M146 82 Q162 126 156 166 Q144 178 132 170 Q147 138 143 104 Z' fill='#5a3a22' />
        <rect x='89' y='138' width='22' height='22' rx='4' fill='#f0b896' />
        <path d='M40 200 Q52 154 82 146 Q91 150 100 150 Q109 150 118 146 Q148 154 160 200 Z' fill='#ff7eb3' />
        <path d='M82 146 Q91 162 100 162 Q109 162 118 146' fill='#ffbfda' stroke='#dd6699' strokeWidth='1.5' />
        <ellipse cx='100' cy='64' rx='54' ry='44' fill='#5a3a22' />
        <ellipse cx='100' cy='96' rx='46' ry='52' fill='#f0b896' />
        <path d='M54 82 Q60 40 100 36 Q140 40 146 82 Q138 70 130 68 Q120 44 100 42 Q80 44 70 68 Q62 70 54 82Z' fill='#5a3a22' />
        <path d='M122 50 Q132 40 140 50 Q132 58 122 50Z' fill='#ff4d88' />
        <path d='M140 50 Q148 40 158 50 Q148 58 140 50Z' fill='#ff4d88' />
        <circle cx='140' cy='50' r='5' fill='#cc2266' />
        <circle cx='140' cy='50' r='2.5' fill='#ff8ab4' />
        <path d='M79 85 Q86 79 93 82' stroke='#5a3a22' strokeWidth='2.2' fill='none' strokeLinecap='round' />
        <path d='M107 82 Q114 79 121 85' stroke='#5a3a22' strokeWidth='2.2' fill='none' strokeLinecap='round' />
        <ellipse cx='86' cy='96' rx='7' ry='7' fill='#1d2235' />
        <ellipse cx='114' cy='96' rx='7' ry='7' fill='#1d2235' />
        <circle cx='88.5' cy='93.5' r='2.2' fill='white' />
        <circle cx='116.5' cy='93.5' r='2.2' fill='white' />
        <path d='M97 110 Q100 115 103 110' stroke='#c98060' strokeWidth='1.5' fill='none' strokeLinecap='round' />
        <ellipse cx='72' cy='112' rx='13' ry='7' fill='#ff9999' opacity='0.4' />
        <ellipse cx='128' cy='112' rx='13' ry='7' fill='#ff9999' opacity='0.4' />
        <path d='M88 122 Q94 118 100 120 Q106 118 112 122 Q106 130 100 131 Q94 130 88 122Z' fill='#e06070' />
      </svg>
    ),
  },
  {
    name: 'Dr. Romell Nepo',
    role: 'Chief Veterinarian',
    bg: '#ffe9b8',
    svg: (
      <svg viewBox='0 0 200 200' width='100%' height='100%'>
        <ellipse cx='100' cy='92' rx='46' ry='54' fill='#f1c8a0' />
        <path d='M55 80 Q60 40 100 36 Q140 40 145 80 Q140 90 130 92 Q126 60 100 56 Q74 60 70 92 Q60 90 55 80Z' fill='#d4a06c' />
        <circle cx='86' cy='98' r='3' fill='#1d2235' />
        <circle cx='114' cy='98' r='3' fill='#1d2235' />
        <path d='M92 118 Q100 122 108 118' stroke='#1d2235' strokeWidth='1.8' fill='none' />
        <path d='M40 200 Q60 156 100 152 Q140 156 160 200 Z' fill='#5fb4d8' />
      </svg>
    ),
  },
  {
    name: 'RR Calviar',
    role: 'Head of Training',
    bg: 'var(--mint)',
    svg: (
      <svg viewBox='0 0 200 200' width='100%' height='100%'>
        <ellipse cx='100' cy='92' rx='46' ry='54' fill='#d99c72' />
        <path d='M55 80 Q60 40 100 36 Q140 40 145 80 Q140 90 130 92 Q126 60 100 56 Q74 60 70 92 Q60 90 55 80Z' fill='#3a2a20' />
        <circle cx='86' cy='98' r='3' fill='#1d2235' />
        <circle cx='114' cy='98' r='3' fill='#1d2235' />
        <path d='M92 118 Q100 122 108 118' stroke='#1d2235' strokeWidth='1.8' fill='none' />
        <path d='M40 200 Q60 156 100 152 Q140 156 160 200 Z' fill='#1D7575' />
      </svg>
    ),
  },
]
