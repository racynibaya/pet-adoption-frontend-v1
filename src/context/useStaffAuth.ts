import { createContext, useContext } from 'react'

// ── Staff user ────────────────────────────────────────────────────────────────

export interface StaffUser {
  id: number
  name: string
  email: string
  role: 'STAFF' | 'ADMIN'
  initials: string
  shelterIds: number[]
}

export function canManagePet(
  staffUser: StaffUser | null,
  pet: { shelterId: number } | null | undefined,
): boolean {
  if (!staffUser || !pet) return false
  if (staffUser.role === 'ADMIN') return true
  return staffUser.shelterIds.includes(pet.shelterId)
}

// ── Context shape ─────────────────────────────────────────────────────────────

export interface StaffAuthCtx {
  isAuthenticated: boolean
  staffUser: StaffUser | null
  loginError: string
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

export const StaffAuthContext = createContext<StaffAuthCtx | null>(null)

export function useStaffAuth(): StaffAuthCtx {
  const ctx = useContext(StaffAuthContext)
  if (!ctx)
    throw new Error('useStaffAuth must be used within StaffAuthProvider')
  return ctx
}
