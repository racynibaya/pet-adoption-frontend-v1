import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { PET_LISTINGS, type PetCard, type Species } from '@/data/pets'
import {
  apiLogin, apiLogout, apiGetMe, apiGetPets, apiCreatePet,
  setToken,
  ApiError,
  type ApiPet,
} from '@/services/api'

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

interface StaffCtx {
  isAuthenticated: boolean
  staffUser: StaffUser | null
  pets: PetCard[]
  adoptions: AdoptionRequest[]
  loginError: string
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  addPet: (formData: FormData) => Promise<void>
  // updatePet / deletePet operate on local state only until the backend
  // implements PATCH /pets/:id and DELETE /pets/:id
  updatePet: (id: number, updates: Partial<Omit<PetCard, 'id' | 'svg' | 'bg' | 'color'>>) => void
  deletePet: (id: number) => void
  // Adoption operations are local-only until the backend implements those routes
  updateAdoption: (id: number, status: AdoptionRequest['status'], rejectionReason?: string) => void
}

const StaffContext = createContext<StaffCtx | null>(null)

// ── Pet display defaults (not stored in backend) ──────────────────────────────

const SPECIES_COLOR: Record<Species, string> = {
  DOG: '#a87d62', CAT: '#827d76', RABBIT: '#a0c8b4', BIRD: '#3a73c2', OTHER: '#6c8080',
}
const SPECIES_BG: Record<Species, string> = {
  DOG: '#fef5e2', CAT: '#ffe9b8', RABBIT: '#e9f5ee', BIRD: '#e5edf6', OTHER: '#f3f0ea',
}

function makeSvg(species: Species): ReactNode {
  const c = SPECIES_COLOR[species]
  return (
    <svg viewBox="0 0 200 160" width="200" height="160">
      <ellipse cx="100" cy="100" rx="58" ry="42" fill={c} />
      <ellipse cx="100" cy="92" rx="42" ry="36" fill={c} opacity="0.45" />
      <circle cx="87" cy="94" r="3.2" fill="#1d2235" />
      <circle cx="113" cy="94" r="3.2" fill="#1d2235" />
      <ellipse cx="100" cy="106" rx="5" ry="3.5" fill="#1d2235" />
    </svg>
  )
}

function apiPetToPetCard(p: ApiPet): PetCard {
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
    shelterCity: p.shelter?.address?.split(',')[0]?.trim() ?? '',
    description: p.description,
    bg: SPECIES_BG[p.species],
    color: SPECIES_COLOR[p.species],
    svg: makeSvg(p.species),
    // Extended fields not in backend — empty defaults
    traits: [],
    vaccinated: false,
    neutered: false,
    houseTrained: false,
    goodWith: [],
  }
}

// ── Mock adoptions (no backend endpoint yet) ──────────────────────────────────

const MOCK_ADOPTIONS: AdoptionRequest[] = [
  { id: 1, petId: 1, petName: 'Biscuit', applicantName: 'Juan Dela Cruz', email: 'juan@email.com', phone: '09171234567', submittedAt: '2026-05-10', status: 'PENDING' },
  { id: 2, petId: 2, petName: 'Luna', applicantName: 'Ana Reyes', email: 'ana@email.com', phone: '09281234567', submittedAt: '2026-05-11', status: 'REVIEWING' },
  { id: 3, petId: 6, petName: 'Daisy', applicantName: 'Carlo Mendoza', email: 'carlo@email.com', phone: '09191234567', submittedAt: '2026-05-09', status: 'APPROVED' },
  { id: 4, petId: 5, petName: 'Kiwi', applicantName: 'Sarah Kim', email: 'sarah@email.com', phone: '09361234567', submittedAt: '2026-05-08', status: 'PENDING' },
  { id: 5, petId: 4, petName: 'Rex', applicantName: 'Paolo Reyes', email: 'paolo@email.com', phone: '09451234567', submittedAt: '2026-05-07', status: 'REJECTED', rejectionReason: 'Applicant does not meet experience requirements for large breeds.' },
]

// ── Provider ──────────────────────────────────────────────────────────────────

export function StaffProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Restore token to api module on page load
    const token = sessionStorage.getItem('staff-token')
    if (token) setToken(token)
    return sessionStorage.getItem('staff-auth') === '1'
  })
  const [staffUser, setStaffUser] = useState<StaffUser | null>(() => {
    const stored = sessionStorage.getItem('staff-user')
    return stored ? (JSON.parse(stored) as StaffUser) : null
  })
  const [pets, setPets] = useState<PetCard[]>(PET_LISTINGS)
  const [adoptions, setAdoptions] = useState<AdoptionRequest[]>(MOCK_ADOPTIONS)
  const [loginError, setLoginError] = useState('')

  // Load real pets from API on mount (GET /pets is public — no auth required)
  useEffect(() => {
    apiGetPets().then(res => {
      if (res.data.length > 0) setPets(res.data.map(apiPetToPetCard))
    }).catch(() => { /* backend unavailable — keep mock data */ })
  }, [])

  async function login(email: string, password: string): Promise<boolean> {
    setLoginError('')
    try {
      const authRes = await apiLogin(email, password)
      setToken(authRes.accessToken)
      sessionStorage.setItem('staff-token', authRes.accessToken)

      const meRes = await apiGetMe()
      const u = meRes.data

      if (u.role !== 'STAFF' && u.role !== 'ADMIN') {
        setLoginError('This account does not have staff access.')
        setToken(null)
        sessionStorage.removeItem('staff-token')
        return false
      }

      const staffUserData: StaffUser = {
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        role: u.role,
        initials: `${u.firstName[0]}${u.lastName[0]}`.toUpperCase(),
      }

      setIsAuthenticated(true)
      setStaffUser(staffUserData)
      sessionStorage.setItem('staff-auth', '1')
      sessionStorage.setItem('staff-user', JSON.stringify(staffUserData))

      // Reload pets with auth context (in case staff-only pets are returned later)
      apiGetPets().then(res => {
        if (res.data.length > 0) setPets(res.data.map(apiPetToPetCard))
      }).catch(() => {})

      return true
    } catch (err) {
      if (err instanceof ApiError) {
        setLoginError(err.status === 401 ? 'Invalid email or password.' : err.message)
      } else {
        setLoginError('Could not connect to the server. Make sure the backend is running.')
      }
      return false
    }
  }

  async function logout(): Promise<void> {
    try { await apiLogout() } catch { /* ignore */ }
    setToken(null)
    setIsAuthenticated(false)
    setStaffUser(null)
    sessionStorage.removeItem('staff-auth')
    sessionStorage.removeItem('staff-token')
    sessionStorage.removeItem('staff-user')
  }

  async function addPet(formData: FormData): Promise<void> {
    const res = await apiCreatePet(formData)
    setPets(prev => [...prev, apiPetToPetCard(res.data)])
  }

  // Local-only until backend implements PATCH /pets/:id
  function updatePet(id: number, updates: Partial<Omit<PetCard, 'id' | 'svg' | 'bg' | 'color'>>) {
    setPets(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  // Local-only until backend implements DELETE /pets/:id
  function deletePet(id: number) {
    setPets(prev => prev.filter(p => p.id !== id))
  }

  // Local-only until backend implements adoption request routes
  function updateAdoption(id: number, status: AdoptionRequest['status'], rejectionReason?: string) {
    setAdoptions(prev => prev.map(a =>
      a.id === id ? { ...a, status, ...(rejectionReason !== undefined && { rejectionReason }) } : a
    ))
  }

  return (
    <StaffContext.Provider value={{ isAuthenticated, staffUser, pets, adoptions, loginError, login, logout, addPet, updatePet, deletePet, updateAdoption }}>
      {children}
    </StaffContext.Provider>
  )
}

export function useStaff(): StaffCtx {
  const ctx = useContext(StaffContext)
  if (!ctx) throw new Error('useStaff must be used within StaffProvider')
  return ctx
}
