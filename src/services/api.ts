export let API_BASE: string;

if (import.meta.env.DEV) {
  API_BASE = 'http://localhost:9000/api/v1';
} else {
  API_BASE = import.meta.env.VITE_API_BASE;
}

// ── Token management ────────────────────────────────────────────────────────

let _token: string | null = null;

export function setToken(t: string | null) {
  _token = t;
}
export function getToken() {
  return _token;
}

// Mirror a refreshed token into whichever sessionStorage key the active session uses.
function persistAccessToken(token: string) {
  setToken(token);
  if (sessionStorage.getItem('staff-token') !== null) {
    sessionStorage.setItem('staff-token', token);
  }
  if (sessionStorage.getItem('koda-user-token') !== null) {
    sessionStorage.setItem('koda-user-token', token);
  }
}

// Wipe every auth marker when refresh itself fails — next page load forces a fresh sign-in.
function clearAuthStorage() {
  setToken(null);
  sessionStorage.removeItem('staff-token');
  sessionStorage.removeItem('staff-auth');
  sessionStorage.removeItem('staff-user');
  sessionStorage.removeItem('koda-user-token');
  sessionStorage.removeItem('koda-user');
}

// Single-flight: parallel 401s share one /auth/refresh call.
let refreshInFlight: Promise<string | null> | null = null;

function tryRefresh(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) return null;
      const body = (await res.json()) as {
        success: boolean;
        accessToken?: string;
      };
      return body.accessToken ?? null;
    } catch {
      return null;
    } finally {
      queueMicrotask(() => {
        refreshInFlight = null;
      });
    }
  })();
  return refreshInFlight;
}

// ── Error class ─────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ── Core fetch helper ────────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  opts?: RequestInit,
  _retried = false,
): Promise<T> {
  const isFormData = opts?.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(_token ? { Authorization: `Bearer ${_token}` } : {}),
    ...((opts?.headers as Record<string, string>) ?? {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
    credentials: 'include', // send refresh-token cookie
    cache: 'no-store',
  });

  // Self-healing: on 401, try /auth/refresh once and retry the original request.
  if (
    res.status === 401 &&
    !_retried &&
    _token &&
    path !== '/auth/refresh' &&
    path !== '/auth/login'
  ) {
    const fresh = await tryRefresh();
    if (fresh) {
      persistAccessToken(fresh);
      return apiFetch<T>(path, opts, true);
    }
    clearAuthStorage();
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      /* ignore parse error */
    }
    throw new ApiError(res.status, message);
  }

  return res.json() as Promise<T>;
}

// ── Backend response types ───────────────────────────────────────────────────

export type BackendSpecies = 'DOG' | 'CAT' | 'RABBIT' | 'BIRD' | 'OTHER';
export type BackendGender = 'MALE' | 'FEMALE';
export type BackendSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
export type BackendStatus = 'AVAILABLE' | 'PENDING' | 'ADOPTED';
export type BackendRole = 'USER' | 'STAFF' | 'ADMIN';

export interface ApiUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: BackendRole;
  isVerified: boolean;
  address?: string | null;
  phoneNumber?: string | null;
  shelterStaffs?: { shelterId: number }[];
}

export type BackendRegion = 'LUZON' | 'VISAYAS' | 'MINDANAO';

/** Normalize a region value coming from the backend (which stores it as a
 * free String column) into one of the three canonical island IDs the UI
 * knows how to group/display. Defaults to 'LUZON' for unknown/missing values. */
export function normalizeRegion(raw: unknown): BackendRegion {
  const up = typeof raw === 'string' ? raw.toUpperCase() : '';
  if (up === 'LUZON' || up === 'VISAYAS' || up === 'MINDANAO') return up;
  return 'LUZON';
}

/** Clean up a single shelter row coming from the API: forces region into the
 * canonical 3-island enum, and fills in empty strings for any structured
 * location field the backend might omit. */
export function normalizeShelter(s: ApiShelter): ApiShelter {
  return {
    ...s,
    addressLine: s.addressLine ?? '',
    city: s.city ?? '',
    province: s.province ?? '',
    region: normalizeRegion(s.region),
  };
}

export interface ApiShelter {
  id: number;
  name: string;
  description: string;
  addressLine: string;
  city: string;
  province: string;
  region: BackendRegion;
  contactEmail: string;
  phoneNumber: string;
  imageUrl: string | null;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiPetImage {
  id: number;
  petId: number;
  imageUrl: string;
  publicId: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface ApiPet {
  id: number;
  name: string;
  species: BackendSpecies;
  breed: string;
  ageMonths: number;
  gender: BackendGender;
  size: BackendSize;
  status: BackendStatus;
  shelterId: number;
  description: string;
  shelter?: ApiShelter;
  images?: ApiPetImage[];
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ── Auth endpoints ───────────────────────────────────────────────────────────

export function apiLogin(email: string, password: string) {
  return apiFetch<{ success: boolean; message: string; accessToken: string }>(
    '/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) },
  );
}

export function apiLogout() {
  return apiFetch<{ success: boolean; message: string }>('/auth/logout', {
    method: 'POST',
  });
}

export function apiRefresh() {
  return apiFetch<{ success: boolean; accessToken: string }>('/auth/refresh');
}

export function apiRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  return apiFetch<{ success: boolean; message: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
}

export function apiVerifyEmail(token: string) {
  return apiFetch<{ success: boolean; message: string }>(
    `/auth/verify-email?token=${encodeURIComponent(token)}`,
  );
}

export function apiResendVerification(email: string) {
  return apiFetch<{ success: boolean; message: string }>(
    '/auth/resend-verification',
    { method: 'POST', body: JSON.stringify({ email }) },
  );
}

// ── Donation endpoints ───────────────────────────────────────────────────────

export type CreateDonationInput = {
  amount: number; // in dollars; backend converts to cents for Stripe
  name: string;
  email: string;
  shelterId: number;
  message?: string;
};

export type CreateDonationResult = {
  id: string;
  checkoutUrl: string; // will be a real Stripe Checkout URL once backend ships
};

export function apiCreateDonation(
  input: CreateDonationInput,
): Promise<CreateDonationResult> {
  // STUB — backend /donations endpoint does not exist yet.
  // When it does, replace this body with:
  //   return apiFetch<{ success: boolean; message: string; data: CreateDonationResult }>(
  //     '/donations',
  //     { method: 'POST', body: JSON.stringify(input) },
  //   ).then((r) => r.data);
  void input;
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({ id: `mock_${Date.now()}`, checkoutUrl: '#' }),
      800,
    );
  });
}

// ── User endpoints ───────────────────────────────────────────────────────────

export function apiGetMe() {
  return apiFetch<{ success: boolean; message: string; data: ApiUser }>(
    '/users/me',
  );
}

// ── Pet endpoints ────────────────────────────────────────────────────────────

export interface PetFilterParams {
  species?: BackendSpecies;
  gender?: BackendGender;
  size?: BackendSize;
}

export function apiGetPets(page = 1, limit = 9, filters: PetFilterParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (filters.species) params.set('species', filters.species);
  if (filters.gender) params.set('gender', filters.gender);
  if (filters.size) params.set('size', filters.size);

  return apiFetch<{
    success: boolean;
    message: string;
    data: ApiPet[];
    pagination: Pagination;
  }>(`/pets?${params.toString()}`);
}

const PETS_PAGE_SIZE = 100;

export async function apiGetAllPets(
  filters: PetFilterParams = {},
): Promise<ApiPet[]> {
  const first = await apiGetPets(1, PETS_PAGE_SIZE, filters);
  const { totalPages } = first.pagination;
  if (totalPages <= 1) return first.data;

  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      apiGetPets(i + 2, PETS_PAGE_SIZE, filters).then((r) => r.data),
    ),
  );
  return [...first.data, ...rest.flat()];
}

export function apiGetPet(id: number) {
  return apiFetch<{ success: boolean; message: string; data: ApiPet }>(
    `/pets/${id}`,
  );
}

export function apiCreatePet(formData: FormData) {
  return apiFetch<{
    success: boolean;
    message: string;
    data: ApiPet & { images: ApiPetImage[] };
  }>('/pets', { method: 'POST', body: formData });
}

// ── Adoption endpoints ───────────────────────────────────────────────────────

export type HomeType = 'HOUSE' | 'APARTMENT' | 'CONDO';

export interface CreateAdoptionInput {
  petId: number;
  message?: string;
  homeType: HomeType;
  hasYard: boolean;
  yardFenced?: boolean;
  ownsHome: boolean;
  landlordAllowsPets?: boolean;
  householdSize: number;
  hasChildren: boolean;
  hasPreviousPetExperience: boolean;
  yearsOfPetExperience?: number;
  hoursAwayPerDay: number;
  hasOtherPetsNow: boolean;
  reasonForAdopting: string;
  hasBackupCarePlan: boolean;
  awareOfMonthlyCosts: boolean;
}

export function apiCreateAdoption(input: CreateAdoptionInput) {
  return apiFetch<{ success: boolean; message: string; data: { id: number } }>(
    '/adoption-requests',
    { method: 'POST', body: JSON.stringify(input) },
  );
}

// ── Shelter endpoints ─────────────────────────────────────────────────────────

export async function apiGetShelters(page = 1, limit = 50) {
  const res = await apiFetch<{
    success: boolean;
    message: string;
    data: ApiShelter[];
    pagination: Pagination;
  }>(`/shelters?page=${page}&limit=${limit}`);
  return { ...res, data: res.data.map(normalizeShelter) };
}

export async function apiCreateShelter(formData: FormData) {
  const res = await apiFetch<{
    success: boolean;
    message: string;
    data: ApiShelter;
  }>('/shelters', { method: 'POST', body: formData });
  return { ...res, data: normalizeShelter(res.data) };
}

export async function apiUpdateShelter(id: number, formData: FormData) {
  const res = await apiFetch<{
    success: boolean;
    message: string;
    data: ApiShelter;
  }>(`/shelters/${id}`, { method: 'PATCH', body: formData });
  return { ...res, data: normalizeShelter(res.data) };
}
