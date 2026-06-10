import type { ReactNode } from 'react'
import type { BackendRegion } from '@/services/api'

// ── Shelter view model ────────────────────────────────────────────────────────
// View-model shape for the shelter directory. The display fields (bg, svg) are
// not stored in the backend — they're derived for display by the grid's
// apiShelterToCard adapter.

export interface Shelter {
  id: number
  name: string
  description: string
  addressLine: string
  city: string
  province: string
  region: BackendRegion
  contactEmail: string
  phoneNumber: string
  petCount: number
  bg: string
  svg: ReactNode
}
