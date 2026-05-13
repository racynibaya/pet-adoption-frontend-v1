import { createContext, useContext } from 'react'
import type { PetCard } from '@/data/pets'

// ── Adoption request (mock until backend implements the endpoint) ─────────────

export interface AdoptionRequest {
  id: number
  petId: number
  petName: string
  applicantName: string
  email: string
  phone: string
  message?: string
  rejectionReason?: string
  submittedAt: string
  status: 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
}

// ── Staff user ────────────────────────────────────────────────────────────────

export interface StaffUser {
  id: number
  name: string
  email: string
  role: 'STAFF' | 'ADMIN'
  initials: string
}

// ── Context shape ─────────────────────────────────────────────────────────────

export interface StaffCtx {
  isAuthenticated: boolean
  staffUser: StaffUser | null
  pets: PetCard[]
  adoptions: AdoptionRequest[]
  loginError: string
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  addPet: (formData: FormData) => Promise<void>
  updatePet: (id: number, updates: Partial<Omit<PetCard, 'id' | 'svg' | 'bg' | 'color'>>) => void
  deletePet: (id: number) => void
  updateAdoption: (id: number, status: AdoptionRequest['status'], rejectionReason?: string) => void
}

export const StaffContext = createContext<StaffCtx | null>(null)

export function useStaff(): StaffCtx {
  const ctx = useContext(StaffContext)
  if (!ctx) throw new Error('useStaff must be used within StaffProvider')
  return ctx
}
