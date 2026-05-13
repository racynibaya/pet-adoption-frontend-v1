import { createContext, useContext } from 'react'

// ── Authenticated adopter (USER role) ────────────────────────────────────────

export interface AdopterUser {
  id: number
  firstName: string
  lastName: string
  name: string
  email: string
  initials: string
  isVerified: boolean
  address?: string | null
  phoneNumber?: string | null
  joinedAt: string
}

// ── Context shape ─────────────────────────────────────────────────────────────

export interface UserCtx {
  isAuthenticated: boolean
  adopter: AdopterUser | null
  signIn: (token: string) => Promise<boolean>
  signOut: () => Promise<void>
}

export const UserContext = createContext<UserCtx | null>(null)

export function useAdopter(): UserCtx {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useAdopter must be used within UserProvider')
  return ctx
}
