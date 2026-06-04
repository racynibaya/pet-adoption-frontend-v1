import type { BackendRegion } from '@/services/api'

// Region identifiers are now first-class on the backend (Shelter.region).
// The frontend just defines display metadata for each.
export type RegionId = BackendRegion

export const REGION_ORDER: RegionId[] = ['LUZON', 'VISAYAS', 'MINDANAO']

export interface RegionMeta {
  id: RegionId
  display: string
  eyebrow: string
  tagline: (count: number) => string
  intro: string
  tint: string
  accent: string
}

export const REGIONS: Record<RegionId, RegionMeta> = {
  LUZON: {
    id: 'LUZON',
    display: 'Luzon',
    eyebrow: 'NORTH',
    tagline: (n) =>
      n === 1 ? 'One shelter, one story.' : `${n} shelters, ${n} stories.`,
    intro:
      'From the Cordillera ridges down to the lowland barangays, Luzon’s rescues carry the weight of the country’s densest urban centers — and the patience to match.',
    tint: '#fde2cf',
    accent: 'var(--rausch)',
  },
  VISAYAS: {
    id: 'VISAYAS',
    display: 'Visayas',
    eyebrow: 'CENTRAL',
    tagline: (n) =>
      n === 1
        ? 'One shelter in the islands.'
        : `${n} shelters across the islands.`,
    intro:
      'A scattering of island rescues, each one rooted in a coastal town. Smaller operations, deeper local knowledge, and an unhurried way of placing every animal.',
    tint: '#e7f0ec',
    accent: '#3d7a72',
  },
  MINDANAO: {
    id: 'MINDANAO',
    display: 'Mindanao',
    eyebrow: 'SOUTH',
    tagline: (n) =>
      n === 1
        ? 'One shelter in the south.'
        : `${n} shelters across the south.`,
    intro:
      'Sprawling rural rescues and city-edge sanctuaries. Mindanao’s shelters serve the longest distances and the most surrendered working dogs in the network.',
    tint: '#f3e3d6',
    accent: '#b25a3b',
  },
}
