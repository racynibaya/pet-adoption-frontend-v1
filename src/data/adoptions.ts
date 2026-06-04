// ── Adoption request (mock until backend implements the endpoint) ────────────

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

// Seeded so the staff/admin portals have something to demo while the
// /adoption-requests endpoint is in flight on the backend.
export const MOCK_ADOPTIONS: AdoptionRequest[] = [
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
]
