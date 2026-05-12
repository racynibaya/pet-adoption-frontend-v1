export const API_BASE = 'http://localhost:3000/api/v1'

// ── Token management ────────────────────────────────────────────────────────

let _token: string | null = null

export function setToken(t: string | null) { _token = t }
export function getToken() { return _token }

// ── Error class ─────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

// ── Core fetch helper ────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, opts?: RequestInit): Promise<T> {
  const isFormData = opts?.body instanceof FormData
  const headers: Record<string, string> = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(_token ? { Authorization: `Bearer ${_token}` } : {}),
    ...(opts?.headers as Record<string, string> ?? {}),
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
    credentials: 'include', // send refresh-token cookie
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch { /* ignore parse error */ }
    throw new ApiError(res.status, message)
  }

  return res.json() as Promise<T>
}

// ── Backend response types ───────────────────────────────────────────────────

export type BackendSpecies = 'DOG' | 'CAT' | 'RABBIT' | 'BIRD' | 'OTHER'
export type BackendGender  = 'MALE' | 'FEMALE'
export type BackendSize    = 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE'
export type BackendStatus  = 'AVAILABLE' | 'PENDING' | 'ADOPTED'
export type BackendRole    = 'USER' | 'STAFF' | 'ADMIN'

export interface ApiUser {
  id: number
  email: string
  firstName: string
  lastName: string
  role: BackendRole
  isVerified: boolean
  address?: string | null
  phoneNumber?: string | null
}

export interface ApiShelter {
  id: number
  name: string
  address: string
  contactEmail: string
  phoneNumber: string
}

export interface ApiPetImage {
  id: number
  petId: number
  imageUrl: string
  publicId: string
  isPrimary: boolean
  createdAt: string
}

export interface ApiPet {
  id: number
  name: string
  species: BackendSpecies
  breed: string
  ageMonths: number
  gender: BackendGender
  size: BackendSize
  status: BackendStatus
  shelterId: number
  description: string
  shelter?: ApiShelter
  images?: ApiPetImage[]
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// ── Auth endpoints ───────────────────────────────────────────────────────────

export function apiLogin(email: string, password: string) {
  return apiFetch<{ success: boolean; message: string; accessToken: string }>(
    '/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) }
  )
}

export function apiLogout() {
  return apiFetch<{ success: boolean; message: string }>(
    '/auth/logout',
    { method: 'POST' }
  )
}

export function apiRefresh() {
  return apiFetch<{ success: boolean; accessToken: string }>('/auth/refresh')
}

// ── User endpoints ───────────────────────────────────────────────────────────

export function apiGetMe() {
  return apiFetch<{ success: boolean; message: string; data: ApiUser }>('/users/me')
}

// ── Pet endpoints ────────────────────────────────────────────────────────────

export function apiGetPets(page = 1, limit = 100) {
  return apiFetch<{ success: boolean; message: string; data: ApiPet[]; pagination: Pagination }>(
    `/pets?page=${page}&limit=${limit}`
  )
}

export function apiCreatePet(formData: FormData) {
  return apiFetch<{ success: boolean; message: string; data: ApiPet & { images: ApiPetImage[] } }>(
    '/pets',
    { method: 'POST', body: formData }
  )
}

// ── Shelter endpoints ─────────────────────────────────────────────────────────

export function apiGetShelters(page = 1, limit = 50) {
  return apiFetch<{ success: boolean; message: string; data: ApiShelter[]; pagination: Pagination }>(
    `/shelters?page=${page}&limit=${limit}`
  )
}
