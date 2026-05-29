import { createContext, useContext } from 'react';
import type { PetCard } from '@/data/pets';
import type { ApiShelter } from '@/services/api';

// ── Adoption request (mock until backend implements the endpoint) ─────────────

export interface AdoptionRequest {
  id: number;
  petId: number;
  petName: string;
  applicantName: string;
  email: string;
  phone: string;
  message?: string;
  rejectionReason?: string;
  submittedAt: string;
  status: 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
}

// ── Staff user ────────────────────────────────────────────────────────────────

export interface StaffUser {
  id: number;
  name: string;
  email: string;
  role: 'STAFF' | 'ADMIN';
  initials: string;
  shelterIds: number[];
}

export function canManagePet(
  staffUser: StaffUser | null,
  pet: { shelterId: number } | null | undefined,
): boolean {
  if (!staffUser || !pet) return false;
  if (staffUser.role === 'ADMIN') return true;
  return staffUser.shelterIds.includes(pet.shelterId);
}

// ── Context shape ─────────────────────────────────────────────────────────────

export interface StaffCtx {
  isAuthenticated: boolean;
  staffUser: StaffUser | null;
  pets: PetCard[];
  visiblePets: PetCard[];
  petsLoaded: boolean;
  shelters: ApiShelter[];
  visibleShelters: ApiShelter[];
  sheltersLoaded: boolean;
  adoptions: AdoptionRequest[];
  loginError: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addPet: (formData: FormData) => Promise<void>;
  updatePet: (
    id: number,
    updates: Partial<Omit<PetCard, 'id' | 'svg' | 'bg' | 'color'>>,
  ) => void;
  deletePet: (id: number) => void;
  addShelter: (formData: FormData) => Promise<ApiShelter>;
  updateShelter: (id: number, formData: FormData) => Promise<ApiShelter>;
  updateAdoption: (
    id: number,
    status: AdoptionRequest['status'],
    rejectionReason?: string,
  ) => void;
}

export const StaffContext = createContext<StaffCtx | null>(null);

export function useStaff(): StaffCtx {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error('useStaff must be used within StaffProvider');
  return ctx;
}
