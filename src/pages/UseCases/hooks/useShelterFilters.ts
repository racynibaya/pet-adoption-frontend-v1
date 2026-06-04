import { useMemo, useState } from 'react'
import type {
  ApiPet,
  ApiShelter,
  BackendGender,
  BackendSize,
  BackendSpecies,
  BackendStatus,
} from '@/services/api'
import type { RegionId } from '../data/regions'

// Structural shape the filter only depends on. Both ApiPet and PetCard satisfy
// this, so callers don't have to convert between them.
export type FilterablePet = Pick<
  ApiPet,
  'id' | 'shelterId' | 'species' | 'size' | 'gender' | 'ageMonths'
> & { status: BackendStatus }

// ── Age bands (derived from ageMonths) ───────────────────────────────────────

export type AgeBand = 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'

export const AGE_BAND_ORDER: AgeBand[] = ['BABY', 'YOUNG', 'ADULT', 'SENIOR']

export const AGE_BAND_LABEL: Record<AgeBand, { label: string; range: string }> =
  {
    BABY: { label: 'Baby', range: 'under 1 yr' },
    YOUNG: { label: 'Young', range: '1–3 yrs' },
    ADULT: { label: 'Adult', range: '3–8 yrs' },
    SENIOR: { label: 'Senior', range: '8 yrs+' },
  }

export function ageBand(months: number): AgeBand {
  if (months < 12) return 'BABY'
  if (months < 36) return 'YOUNG'
  if (months < 96) return 'ADULT'
  return 'SENIOR'
}

// ── Size + gender display lookups ────────────────────────────────────────────

export const SIZE_ORDER: BackendSize[] = [
  'SMALL',
  'MEDIUM',
  'LARGE',
  'EXTRA_LARGE',
]

export const SIZE_LABEL: Record<BackendSize, string> = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  LARGE: 'Large',
  EXTRA_LARGE: 'X-Large',
}

export const GENDER_ORDER: BackendGender[] = ['FEMALE', 'MALE']

export const GENDER_LABEL: Record<BackendGender, string> = {
  FEMALE: 'Female',
  MALE: 'Male',
}

// ── Province option (flat list, region used only for grouping headers) ───────

export type ProvinceFilter = 'ALL' | string

export interface ProvinceOption {
  name: string
  region: RegionId
  /** Shelters in this province with at least one AVAILABLE pet. */
  count: number
}

interface UseShelterFiltersResult {
  search: string
  setSearch: (s: string) => void

  province: ProvinceFilter
  setProvince: (p: ProvinceFilter) => void

  species: ReadonlySet<BackendSpecies>
  toggleSpecies: (s: BackendSpecies) => void

  sizes: ReadonlySet<BackendSize>
  toggleSize: (s: BackendSize) => void

  ages: ReadonlySet<AgeBand>
  toggleAge: (a: AgeBand) => void

  genders: ReadonlySet<BackendGender>
  toggleGender: (g: BackendGender) => void

  /** Total selections across species + size + age + gender. */
  refineCount: number
  clearRefine: () => void

  hideEmpty: boolean
  setHideEmpty: (v: boolean) => void

  matches: ApiShelter[]
  totalCount: number
  matchCount: number
  activeNetworkCount: number
  hasActiveFilters: boolean

  provinceOptions: ProvinceOption[]
  speciesCounts: Partial<Record<BackendSpecies, number>>
  sizeCounts: Partial<Record<BackendSize, number>>
  ageCounts: Partial<Record<AgeBand, number>>
  genderCounts: Partial<Record<BackendGender, number>>

  hiddenEmptyCount: number
  clearAll: () => void
}

export function useShelterFilters(
  shelters: ApiShelter[],
  pets: FilterablePet[],
): UseShelterFiltersResult {
  const [search, setSearch] = useState('')
  const [province, setProvince] = useState<ProvinceFilter>('ALL')
  const [species, setSpecies] = useState<ReadonlySet<BackendSpecies>>(
    () => new Set(),
  )
  const [sizes, setSizes] = useState<ReadonlySet<BackendSize>>(() => new Set())
  const [ages, setAges] = useState<ReadonlySet<AgeBand>>(() => new Set())
  const [genders, setGenders] = useState<ReadonlySet<BackendGender>>(
    () => new Set(),
  )
  const [hideEmpty, setHideEmpty] = useState(true)

  function toggleSpecies(sp: BackendSpecies) {
    setSpecies((prev) => toggled(prev, sp))
  }
  function toggleSize(sz: BackendSize) {
    setSizes((prev) => toggled(prev, sz))
  }
  function toggleAge(a: AgeBand) {
    setAges((prev) => toggled(prev, a))
  }
  function toggleGender(g: BackendGender) {
    setGenders((prev) => toggled(prev, g))
  }

  // Index pets by shelter id (AVAILABLE only — the public grid is adoption-focused).
  const availableByShelter = useMemo(() => {
    const map = new Map<number, FilterablePet[]>()
    for (const p of pets) {
      if (p.status !== 'AVAILABLE') continue
      const arr = map.get(p.shelterId) ?? []
      arr.push(p)
      map.set(p.shelterId, arr)
    }
    return map
  }, [pets])

  const provinceOptions = useMemo<ProvinceOption[]>(() => {
    const byProvince = new Map<string, { count: number; region: RegionId }>()
    for (const s of shelters) {
      const p = s.province.trim()
      if (!p) continue
      const has = (availableByShelter.get(s.id)?.length ?? 0) > 0
      const cur = byProvince.get(p) ?? { count: 0, region: s.region }
      cur.count += has ? 1 : 0
      byProvince.set(p, cur)
    }
    return Array.from(byProvince.entries())
      .map(([name, v]) => ({ name, count: v.count, region: v.region }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [shelters, availableByShelter])

  // Network-wide facet counts: how many shelters have at least one available
  // pet matching the given attribute. Static across selections to keep the
  // popover legible.
  const { speciesCounts, sizeCounts, ageCounts, genderCounts } = useMemo(() => {
    const sp: Partial<Record<BackendSpecies, number>> = {}
    const sz: Partial<Record<BackendSize, number>> = {}
    const ag: Partial<Record<AgeBand, number>> = {}
    const gd: Partial<Record<BackendGender, number>> = {}
    for (const s of shelters) {
      const list = availableByShelter.get(s.id) ?? []
      if (list.length === 0) continue
      const seenSp = new Set<BackendSpecies>()
      const seenSz = new Set<BackendSize>()
      const seenAg = new Set<AgeBand>()
      const seenGd = new Set<BackendGender>()
      for (const p of list) {
        seenSp.add(p.species)
        seenSz.add(p.size)
        seenAg.add(ageBand(p.ageMonths))
        seenGd.add(p.gender)
      }
      seenSp.forEach((k) => (sp[k] = (sp[k] ?? 0) + 1))
      seenSz.forEach((k) => (sz[k] = (sz[k] ?? 0) + 1))
      seenAg.forEach((k) => (ag[k] = (ag[k] ?? 0) + 1))
      seenGd.forEach((k) => (gd[k] = (gd[k] ?? 0) + 1))
    }
    return {
      speciesCounts: sp,
      sizeCounts: sz,
      ageCounts: ag,
      genderCounts: gd,
    }
  }, [shelters, availableByShelter])

  const activeNetworkCount = useMemo(
    () =>
      shelters.filter(
        (s) => (availableByShelter.get(s.id)?.length ?? 0) > 0,
      ).length,
    [shelters, availableByShelter],
  )

  const refineCount = species.size + sizes.size + ages.size + genders.size

  // A pet passes when it matches every active dimension (single pet must
  // satisfy species AND size AND age AND gender simultaneously — that's what
  // the adopter actually cares about).
  function petMatchesRefine(p: FilterablePet): boolean {
    if (species.size > 0 && !species.has(p.species)) return false
    if (sizes.size > 0 && !sizes.has(p.size)) return false
    if (ages.size > 0 && !ages.has(ageBand(p.ageMonths))) return false
    if (genders.size > 0 && !genders.has(p.gender)) return false
    return true
  }

  const { matches, hiddenEmptyCount } = useMemo(() => {
    const q = search.trim().toLowerCase()
    const refining = refineCount > 0
    let hidden = 0

    const base = shelters.filter((s) => {
      if (province !== 'ALL' && s.province !== province) return false
      const list = availableByShelter.get(s.id) ?? []
      if (refining) {
        if (!list.some(petMatchesRefine)) return false
      }
      if (q.length > 0) {
        const hay =
          `${s.name} ${s.addressLine} ${s.city} ${s.province}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })

    const visible = base.filter((s) => {
      const n = availableByShelter.get(s.id)?.length ?? 0
      if (hideEmpty && q.length === 0 && !refining && n === 0) {
        hidden++
        return false
      }
      return true
    })

    visible.sort((a, b) => {
      const av = availableByShelter.get(a.id)?.length ?? 0
      const bv = availableByShelter.get(b.id)?.length ?? 0
      const diff = bv - av
      return diff !== 0 ? diff : a.name.localeCompare(b.name)
    })

    return { matches: visible, hiddenEmptyCount: hidden }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shelters,
    availableByShelter,
    province,
    species,
    sizes,
    ages,
    genders,
    search,
    hideEmpty,
    refineCount,
  ])

  const hasActiveFilters =
    province !== 'ALL' ||
    refineCount > 0 ||
    search.trim().length > 0 ||
    hideEmpty === false

  function clearRefine() {
    setSpecies(new Set())
    setSizes(new Set())
    setAges(new Set())
    setGenders(new Set())
  }

  function clearAll() {
    setSearch('')
    setProvince('ALL')
    clearRefine()
    setHideEmpty(true)
  }

  return {
    search,
    setSearch,
    province,
    setProvince,
    species,
    toggleSpecies,
    sizes,
    toggleSize,
    ages,
    toggleAge,
    genders,
    toggleGender,
    refineCount,
    clearRefine,
    hideEmpty,
    setHideEmpty,
    matches,
    totalCount: shelters.length,
    matchCount: matches.length,
    activeNetworkCount,
    hasActiveFilters,
    provinceOptions,
    speciesCounts,
    sizeCounts,
    ageCounts,
    genderCounts,
    hiddenEmptyCount,
    clearAll,
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toggled<T>(prev: ReadonlySet<T>, value: T): ReadonlySet<T> {
  const next = new Set(prev)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}
