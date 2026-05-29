import { useState, useEffect, type ReactNode } from 'react';
import { type PetCard, type Species } from '@/data/pets';
import {
  apiLogin,
  apiLogout,
  apiGetMe,
  apiGetAllPets,
  apiGetShelters,
  apiCreatePet,
  apiCreateShelter,
  apiUpdateShelter,
  setToken,
  ApiError,
  type ApiPet,
  type ApiShelter,
} from '@/services/api';
import { StaffContext, type AdoptionRequest, type StaffUser } from './useStaff';

// ── Pet display defaults (not stored in backend) ──────────────────────────────

const SPECIES_COLOR: Record<Species, string> = {
  DOG: '#a87d62',
  CAT: '#827d76',
  RABBIT: '#a0c8b4',
  BIRD: '#3a73c2',
  OTHER: '#6c8080',
};
const SPECIES_BG: Record<Species, string> = {
  DOG: '#fef5e2',
  CAT: '#ffe9b8',
  RABBIT: '#e9f5ee',
  BIRD: '#e5edf6',
  OTHER: '#f3f0ea',
};

function makeSvg(species: Species): ReactNode {
  const c = SPECIES_COLOR[species];
  return (
    <svg viewBox='0 0 200 160' width='200' height='160'>
      <ellipse cx='100' cy='100' rx='58' ry='42' fill={c} />
      <ellipse cx='100' cy='92' rx='42' ry='36' fill={c} opacity='0.45' />
      <circle cx='87' cy='94' r='3.2' fill='#1d2235' />
      <circle cx='113' cy='94' r='3.2' fill='#1d2235' />
      <ellipse cx='100' cy='106' rx='5' ry='3.5' fill='#1d2235' />
    </svg>
  );
}

export function shelterCityFromAddress(address: string | undefined): string {
  return address?.split(',')[0]?.trim() ?? '';
}

export function apiPetToPetCard(p: ApiPet): PetCard {
  const sortedImages = p.images
    ? [...p.images].sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
    : [];
  const imageUrls = sortedImages.map((img) => img.imageUrl);
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
    shelterCity: shelterCityFromAddress(p.shelter?.address),
    description: p.description,
    bg: SPECIES_BG[p.species],
    color: SPECIES_COLOR[p.species],
    svg: makeSvg(p.species),
    imageUrl: imageUrls[0],
    imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
    traits: [],
    vaccinated: false,
    neutered: false,
    houseTrained: false,
    goodWith: [],
  };
}

// ── Mock adoptions (no backend endpoint yet) ──────────────────────────────────

const MOCK_ADOPTIONS: AdoptionRequest[] = [
  {
    id: 1,
    petId: 1,
    petName: 'Biscuit',
    applicantName: 'Juan Dela Cruz',
    email: 'juan@email.com',
    phone: '09171234567',
    submittedAt: '2026-05-10',
    status: 'PENDING',
  },
  {
    id: 2,
    petId: 2,
    petName: 'Luna',
    applicantName: 'Ana Reyes',
    email: 'ana@email.com',
    phone: '09281234567',
    submittedAt: '2026-05-11',
    status: 'REVIEWING',
  },
  {
    id: 3,
    petId: 6,
    petName: 'Daisy',
    applicantName: 'Carlo Mendoza',
    email: 'carlo@email.com',
    phone: '09191234567',
    submittedAt: '2026-05-09',
    status: 'APPROVED',
  },
  {
    id: 4,
    petId: 5,
    petName: 'Kiwi',
    applicantName: 'Sarah Kim',
    email: 'sarah@email.com',
    phone: '09361234567',
    submittedAt: '2026-05-08',
    status: 'PENDING',
  },
  {
    id: 5,
    petId: 4,
    petName: 'Rex',
    applicantName: 'Paolo Reyes',
    email: 'paolo@email.com',
    phone: '09451234567',
    submittedAt: '2026-05-07',
    status: 'REJECTED',
    rejectionReason:
      'Applicant does not meet experience requirements for large breeds.',
  },
];

// ── Provider ──────────────────────────────────────────────────────────────────

export function StaffProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = sessionStorage.getItem('staff-token');
    if (token) setToken(token);
    return sessionStorage.getItem('staff-auth') === '1';
  });

  const [staffUser, setStaffUser] = useState<StaffUser | null>(() => {
    const stored = sessionStorage.getItem('staff-user');
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<StaffUser> & {
      shelterId?: number | null;
    };
    return {
      id: parsed.id!,
      name: parsed.name!,
      email: parsed.email!,
      role: parsed.role!,
      initials: parsed.initials!,
      shelterIds:
        parsed.shelterIds ??
        (parsed.shelterId != null ? [parsed.shelterId] : []),
    };
  });

  const [pets, setPets] = useState<PetCard[]>([]);
  const [petsLoaded, setPetsLoaded] = useState(false);
  const [shelters, setShelters] = useState<ApiShelter[]>([]);
  const [sheltersLoaded, setSheltersLoaded] = useState(false);
  const [adoptions, setAdoptions] = useState<AdoptionRequest[]>(MOCK_ADOPTIONS);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    apiGetAllPets()
      .then((all) => {
        setPets(all.map(apiPetToPetCard));
      })
      .catch((err) => {
        console.error('Failed to load pets', err);
      })
      .finally(() => {
        setPetsLoaded(true);
      });
  }, [isAuthenticated]);

  useEffect(() => {
    apiGetShelters()
      .then((res) => {
        setShelters(res.data);
      })
      .catch((err) => {
        console.error('Failed to load shelters', err);
      })
      .finally(() => {
        setSheltersLoaded(true);
      });
  }, []);

  async function login(email: string, password: string): Promise<boolean> {
    setLoginError('');
    try {
      const authRes = await apiLogin(email, password);
      setToken(authRes.accessToken);
      sessionStorage.setItem('staff-token', authRes.accessToken);

      const meRes = await apiGetMe();
      const u = meRes.data;

      if (u.role !== 'STAFF' && u.role !== 'ADMIN') {
        setLoginError('This account does not have staff access.');
        setToken(null);
        sessionStorage.removeItem('staff-token');
        return false;
      }

      const staffUserData: StaffUser = {
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        role: u.role,
        initials: `${u.firstName[0]}${u.lastName[0]}`.toUpperCase(),
        shelterIds: u.shelterStaffs?.map((s) => s.shelterId) ?? [],
      };

      setIsAuthenticated(true);
      setStaffUser(staffUserData);
      sessionStorage.setItem('staff-auth', '1');
      sessionStorage.setItem('staff-user', JSON.stringify(staffUserData));

      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setLoginError(
          err.status === 401 ? 'Invalid email or password.' : err.message,
        );
      } else {
        setLoginError(
          'Could not connect to the server. Make sure the backend is running.',
        );
      }
      return false;
    }
  }

  async function logout(): Promise<void> {
    try {
      await apiLogout();
    } catch {
      /* ignore */
    }
    setToken(null);
    setIsAuthenticated(false);
    setStaffUser(null);
    sessionStorage.removeItem('staff-auth');
    sessionStorage.removeItem('staff-token');
    sessionStorage.removeItem('staff-user');
  }

  async function addPet(formData: FormData): Promise<void> {
    const res = await apiCreatePet(formData);
    setPets((prev) => [...prev, apiPetToPetCard(res.data)]);
  }

  async function addShelter(formData: FormData): Promise<ApiShelter> {
    const res = await apiCreateShelter(formData);
    setShelters((prev) => [...prev, res.data]);
    return res.data;
  }

  async function updateShelter(
    id: number,
    formData: FormData,
  ): Promise<ApiShelter> {
    const res = await apiUpdateShelter(id, formData);
    setShelters((prev) => prev.map((s) => (s.id === id ? res.data : s)));
    return res.data;
  }

  function updatePet(
    id: number,
    updates: Partial<Omit<PetCard, 'id' | 'svg' | 'bg' | 'color'>>,
  ) {
    setPets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  }

  function deletePet(id: number) {
    setPets((prev) => prev.filter((p) => p.id !== id));
  }

  function updateAdoption(
    id: number,
    status: AdoptionRequest['status'],
    rejectionReason?: string,
  ) {
    setAdoptions((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              ...(rejectionReason !== undefined && { rejectionReason }),
            }
          : a,
      ),
    );
  }

  const visiblePets = (() => {
    if (!staffUser) return pets;
    if (staffUser.role === 'ADMIN') return pets;
    if (staffUser.shelterIds.length === 0) return [];
    return pets.filter((p) => staffUser.shelterIds.includes(p.shelterId));
  })();

  const visibleShelters = (() => {
    if (!staffUser) return shelters;
    if (staffUser.role === 'ADMIN') return shelters;
    if (staffUser.shelterIds.length === 0) return [];
    return shelters.filter((s) => staffUser.shelterIds.includes(s.id));
  })();

  return (
    <StaffContext.Provider
      value={{
        isAuthenticated,
        staffUser,
        pets,
        visiblePets,
        petsLoaded,
        shelters,
        visibleShelters,
        sheltersLoaded,
        adoptions,
        loginError,
        login,
        logout,
        addPet,
        updatePet,
        deletePet,
        addShelter,
        updateShelter,
        updateAdoption,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
}
