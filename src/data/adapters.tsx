import type { ReactNode } from 'react'
import type { ApiPet } from '@/services/api'
import type { PetCard, Species } from './pets'

// ── Pet display defaults (not stored in backend) ─────────────────────────────
// These give backend-loaded pets a usable fallback art + palette so the public
// PetCard view model is complete even before/without an uploaded photo.

const SPECIES_COLOR: Record<Species, string> = {
  DOG: '#a87d62',
  CAT: '#827d76',
  RABBIT: '#a0c8b4',
  BIRD: '#3a73c2',
  OTHER: '#6c8080',
}

const SPECIES_BG: Record<Species, string> = {
  DOG: '#fef5e2',
  CAT: '#ffe9b8',
  RABBIT: '#e9f5ee',
  BIRD: '#e5edf6',
  OTHER: '#f3f0ea',
}

function makeSvg(species: Species): ReactNode {
  const c = SPECIES_COLOR[species]
  return (
    <svg viewBox='0 0 200 160' width='200' height='160'>
      <ellipse cx='100' cy='100' rx='58' ry='42' fill={c} />
      <ellipse cx='100' cy='92' rx='42' ry='36' fill={c} opacity='0.45' />
      <circle cx='87' cy='94' r='3.2' fill='#1d2235' />
      <circle cx='113' cy='94' r='3.2' fill='#1d2235' />
      <ellipse cx='100' cy='106' rx='5' ry='3.5' fill='#1d2235' />
    </svg>
  )
}

export function shelterCityOf(
  shelter: { city?: string | null } | null | undefined,
): string {
  return shelter?.city?.trim() ?? ''
}

export function apiPetToPetCard(p: ApiPet): PetCard {
  const sortedImages = p.images
    ? [...p.images].sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
    : []
  const imageUrls = sortedImages.map((img) => img.imageUrl)
  return {
    id: p.id,
    name: p.name,
    species: p.species,
    breed: p.breed,
    ageMonths: p.ageMonths,
    gender: p.gender,
    size: p.size,
    status: p.status,
    shelterId: p.shelterId,
    shelterName: p.shelter?.name ?? '',
    shelterCity: shelterCityOf(p.shelter),
    description: p.description,
    bg: SPECIES_BG[p.species],
    color: SPECIES_COLOR[p.species],
    svg: makeSvg(p.species),
    imageUrl: imageUrls[0],
    imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
    traits: [],
    vaccinated: false,
    neutered: false,
    houseTrained: false,
    goodWith: [],
  }
}
