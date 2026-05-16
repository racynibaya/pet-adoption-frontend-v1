// ── Enums — exact casing as defined in the backend Prisma schema ─────────────
export type Species = 'DOG' | 'CAT' | 'RABBIT' | 'BIRD' | 'OTHER'
export type Gender  = 'MALE' | 'FEMALE'
export type Size    = 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE'

// Filter-only values used by the public Browse Pets page (not sent to backend)
export type SpeciesFilter = 'ALL' | Species
export type GenderFilter  = 'ANY' | Gender
export type SizeFilter    = 'ANY' | Size

// ── Display label helpers ─────────────────────────────────────────────────────

export function speciesLabel(s: Species): string {
  const map: Record<Species, string> = { DOG: 'Dog', CAT: 'Cat', RABBIT: 'Rabbit', BIRD: 'Bird', OTHER: 'Other' }
  return map[s]
}

export function genderLabel(g: Gender): string {
  return g === 'MALE' ? 'Male' : 'Female'
}

export function sizeLabel(s: Size): string {
  const map: Record<Size, string> = { SMALL: 'Small', MEDIUM: 'Medium', LARGE: 'Large', EXTRA_LARGE: 'Extra Large' }
  return map[s]
}

export function speciesFilterLabel(s: SpeciesFilter): string {
  return s === 'ALL' ? 'All' : speciesLabel(s)
}

export function genderFilterLabel(g: GenderFilter): string {
  return g === 'ANY' ? 'Any' : genderLabel(g)
}

export function sizeFilterLabel(s: SizeFilter): string {
  return s === 'ANY' ? 'Any' : sizeLabel(s)
}

// ── PetCard ───────────────────────────────────────────────────────────────────
// This is the frontend view model. The backend stores only the core fields;
// the display-only fields (svg, bg, color, traits, etc.) are generated or
// populated from mock data when the backend does not yet provide them.

export interface PetCard {
  id: number
  name: string
  species: Species
  breed: string
  ageMonths: number
  gender: Gender
  size: Size
  status: 'AVAILABLE' | 'PENDING' | 'ADOPTED'
  shelterId: number
  // Flattened from the shelter relation in API responses:
  shelterName: string
  shelterCity: string
  // Display-only (not stored in backend):
  bg: string
  svg: React.ReactNode
  color: string
  imageUrl?: string
  imageUrls?: string[]
  // Extended info (not in backend — shown in PetDetail from mock data):
  description: string
  traits: string[]
  vaccinated: boolean
  neutered: boolean
  houseTrained: boolean
  goodWith: string[]
}

export function ageLabel(months: number): string {
  if (months < 12) return `${months}mo`
  const years = Math.floor(months / 12)
  const rem = months % 12
  return rem > 0 ? `${years}y ${rem}mo` : `${years}y`
}

// ── Mock data ─────────────────────────────────────────────────────────────────
// Used as initial state until the real /pets API is loaded.
// All enum values must match the backend exactly.

export const PET_LISTINGS: PetCard[] = [
  {
    id: 1,
    name: 'Biscuit',
    species: 'DOG',
    breed: 'Jack Russell Terrier',
    ageMonths: 18,
    gender: 'MALE',
    size: 'SMALL',
    status: 'AVAILABLE',
    shelterId: 1,
    shelterName: 'San Agustin HQ Animal Rescue',
    shelterCity: 'Quezon City',
    bg: 'var(--cream)',
    color: '#a87d62',
    description:
      'Biscuit is a lively and affectionate Jack Russell who never runs out of energy. He loves fetch in open spaces, morning jogs, and cuddling up after a long play session. Biscuit was found near a school and has been socialized with kids and other small dogs. He does best in an active household that can match his enthusiasm.',
    traits: ['Playful', 'Energetic', 'Affectionate', 'Smart', 'Bold'],
    vaccinated: true,
    neutered: true,
    houseTrained: true,
    goodWith: ['Kids', 'Small dogs'],
    svg: (
      <svg viewBox='0 0 200 160' width='200' height='160'>
        <ellipse cx='100' cy='100' rx='60' ry='44' fill='#a87d62' />
        <ellipse cx='100' cy='92' rx='44' ry='38' fill='#e8a878' />
        <polygon points='62,68 70,40 86,72' fill='#a87d62' />
        <polygon points='114,72 130,40 138,68' fill='#a87d62' />
        <circle cx='86' cy='92' r='3' fill='#1d2235' />
        <circle cx='114' cy='92' r='3' fill='#1d2235' />
        <ellipse cx='100' cy='104' rx='5' ry='3.4' fill='#1d2235' />
        <path d='M96 110 Q100 116 104 110' stroke='#1d2235' strokeWidth='1.6' fill='none' />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Luna',
    species: 'CAT',
    breed: 'Domestic Shorthair',
    ageMonths: 8,
    gender: 'FEMALE',
    size: 'SMALL',
    status: 'AVAILABLE',
    shelterId: 2,
    shelterName: 'BGC Cat Sanctuary',
    shelterCity: 'Taguig City',
    bg: '#ffe9b8',
    color: '#827d76',
    description:
      'Luna is a serene, graceful cat who loves quiet corners and warm laps. She was surrendered by a family moving abroad and has been living at BGC Cat Sanctuary for two months. Luna is gentle with adults and teenagers and prefers a calm indoor environment. She will purr loudly the moment she trusts you.',
    traits: ['Calm', 'Independent', 'Gentle', 'Curious', 'Affectionate'],
    vaccinated: true,
    neutered: true,
    houseTrained: true,
    goodWith: ['Adults', 'Teens', 'Other cats'],
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
    species: 'RABBIT',
    breed: 'Holland Lop',
    ageMonths: 12,
    gender: 'MALE',
    size: 'SMALL',
    status: 'AVAILABLE',
    shelterId: 1,
    shelterName: 'San Agustin HQ Animal Rescue',
    shelterCity: 'Quezon City',
    bg: '#e9f5ee',
    color: '#a0c8b4',
    description:
      'Mochi is a fluffy Holland Lop with floppy ears and the personality of a tiny couch philosopher. He loves leafy greens, gentle head rubs, and lounging beside his favorite hooman. Mochi is litter-trained and does well in apartment settings. He was rescued from a pet store closure and is ready for his forever home.',
    traits: ['Gentle', 'Curious', 'Laid-back', 'Quiet', 'Sociable'],
    vaccinated: true,
    neutered: false,
    houseTrained: true,
    goodWith: ['Adults', 'Teens', 'Other rabbits'],
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
    species: 'DOG',
    breed: 'German Shepherd',
    ageMonths: 36,
    gender: 'MALE',
    size: 'LARGE',
    status: 'AVAILABLE',
    shelterId: 3,
    shelterName: 'Cebu Paws',
    shelterCity: 'Cebu City',
    bg: '#e9eef3',
    color: '#3a3530',
    description:
      'Rex is a loyal and intelligent German Shepherd with a steady, protective temperament. He was previously trained as a working dog and responds well to commands. Rex thrives with an experienced owner who can provide structure, daily exercise, and mental stimulation. He is deeply loyal once he bonds and will guard his family with unwavering devotion.',
    traits: ['Loyal', 'Protective', 'Intelligent', 'Calm', 'Disciplined'],
    vaccinated: true,
    neutered: true,
    houseTrained: true,
    goodWith: ['Adults', 'Experienced owners'],
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
    species: 'BIRD',
    breed: 'Conure',
    ageMonths: 24,
    gender: 'FEMALE',
    size: 'SMALL',
    status: 'PENDING',
    shelterId: 2,
    shelterName: 'BGC Cat Sanctuary',
    shelterCity: 'Taguig City',
    bg: '#e5edf6',
    color: '#3a73c2',
    description:
      'Kiwi is a vibrant Sun Conure who loves to be the center of attention. She chatters, dances, and will copy phrases she hears frequently. Kiwi is best suited for a household without very young children due to her sensitive hearing. She requires daily interaction, mental enrichment, and a spacious cage. Her adoption is currently in final review.',
    traits: ['Vocal', 'Playful', 'Intelligent', 'Social', 'Expressive'],
    vaccinated: true,
    neutered: false,
    houseTrained: false,
    goodWith: ['Adults', 'Teens', 'Other birds'],
    svg: (
      <svg viewBox='0 0 200 160' width='200' height='160'>
        <ellipse cx='100' cy='100' rx='44' ry='50' fill='#3a73c2' />
        <ellipse cx='100' cy='104' rx='32' ry='36' fill='#5a8cb0' />
        <ellipse cx='100' cy='80' rx='22' ry='20' fill='#5fb4d8' />
        <circle cx='92' cy='76' r='3' fill='#1d2235' />
        <circle cx='108' cy='76' r='3' fill='#1d2235' />
        <path d='M94 88 Q100 94 106 88' stroke='#1d2235' strokeWidth='1.4' fill='none' strokeLinecap='round' />
        <polygon points='96,92 100,100 104,92' fill='#ffd166' />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Daisy',
    species: 'DOG',
    breed: 'Golden Retriever',
    ageMonths: 10,
    gender: 'FEMALE',
    size: 'LARGE',
    status: 'AVAILABLE',
    shelterId: 3,
    shelterName: 'Cebu Paws',
    shelterCity: 'Cebu City',
    bg: '#fff3d9',
    color: '#c98a5c',
    description:
      'Daisy is sunshine in dog form — a Golden Retriever puppy brimming with love and curiosity. She was rescued from a backyard breeding situation at 6 weeks old and has flourished at Cebu Paws. Daisy gets along with everyone: kids, other dogs, and cats. She is working through basic commands and would thrive in a family ready to grow with her.',
    traits: ['Friendly', 'Gentle', 'Enthusiastic', 'Loving', 'Trainable'],
    vaccinated: true,
    neutered: false,
    houseTrained: false,
    goodWith: ['Kids', 'Dogs', 'Cats', 'All ages'],
    svg: (
      <svg viewBox='0 0 200 160' width='200' height='160'>
        <ellipse cx='100' cy='100' rx='60' ry='44' fill='#e8a878' />
        <ellipse cx='100' cy='92' rx='44' ry='38' fill='#f3d2b3' />
        <polygon points='62,68 70,40 86,72' fill='#c98a5c' />
        <polygon points='114,72 130,40 138,68' fill='#c98a5c' />
        <circle cx='86' cy='92' r='3' fill='#1d2235' />
        <circle cx='114' cy='92' r='3' fill='#1d2235' />
        <ellipse cx='100' cy='104' rx='5' ry='3.4' fill='#1d2235' />
        <path d='M92 112 Q100 120 108 112' stroke='#1d2235' strokeWidth='1.6' fill='none' strokeLinecap='round' />
      </svg>
    ),
  },
]
