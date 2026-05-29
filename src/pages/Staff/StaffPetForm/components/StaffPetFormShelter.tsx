import { useStaff } from '@/context/useStaff'
import type { FormState, FormFieldErrors } from '../types'
import StaffPetFormLabel from './StaffPetFormLabel'
import StaffPetFormSelect from './StaffPetFormSelect'
import StaffPetFormFieldErr from './StaffPetFormFieldErr'

interface StaffPetFormShelterProps {
  form: FormState
  errors: FormFieldErrors
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 10.5L12 3l9 7.5V21H3V10.5Z"
        fill="rgba(232,146,60,0.15)"
        stroke="#E8923C"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <rect x="9" y="14" width="6" height="7" rx="1.2" fill="#E8923C" opacity="0.55" />
    </svg>
  )
}

export default function StaffPetFormShelter({ form, errors, set }: StaffPetFormShelterProps) {
  const { staffUser, visiblePets, shelters, sheltersLoaded } = useStaff()

  if (staffUser?.role === 'STAFF') {
    const shelterId = staffUser.shelterIds[0]
    const shelterName =
      visiblePets.find((p) => p.shelterId === shelterId)?.shelterName ??
      `Shelter #${shelterId}`

    return (
      <div className="staff-form-section">
        <div className="staff-form-section-head">Shelter</div>
        <div className="staff-form-section-body">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 18px',
              background: 'linear-gradient(135deg, #fff8f0 0%, #fff4e8 100%)',
              border: '1.5px solid rgba(232,146,60,0.3)',
              borderRadius: 14,
              maxWidth: 380,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle top-right accent glow */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 80,
                height: 80,
                background: 'radial-gradient(circle, rgba(232,146,60,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Icon container with ring */}
            <div
              style={{
                width: 42,
                height: 42,
                background: 'rgba(232,146,60,0.1)',
                border: '1.5px solid rgba(232,146,60,0.28)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconHome />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#CB7730',
                  marginBottom: 3,
                }}
              >
                Your Shelter
              </div>
              <div
                style={{
                  fontSize: 14.5,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.3,
                }}
              >
                {shelterName}
              </div>
            </div>

            {/* Check badge */}
            <div
              style={{
                width: 22,
                height: 22,
                background: 'rgba(232,146,60,0.15)',
                border: '1.5px solid rgba(232,146,60,0.35)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2 6l3 3 5-5"
                  stroke="#E8923C"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10, lineHeight: 1.5 }}>
            This pet will be listed under your shelter automatically.
          </p>
        </div>
      </div>
    )
  }

  // ADMIN: pick from all shelters
  const noShelters = sheltersLoaded && shelters.length === 0

  return (
    <div className='staff-form-card'>
      <div className='staff-form-card-head'>Shelter</div>
      <div className='staff-form-card-body'>
        <div style={{ maxWidth: 420 }}>
          <StaffPetFormLabel>Shelter *</StaffPetFormLabel>
          <StaffPetFormSelect
            value={form.shelterId}
            onChange={(e) => set('shelterId', e.target.value)}
          >
            <option value='' disabled>
              {sheltersLoaded ? 'Select a shelter…' : 'Loading shelters…'}
            </option>
            {shelters.map((s) => (
              <option key={s.id} value={String(s.id)}>
                {s.name}
              </option>
            ))}
          </StaffPetFormSelect>
          <StaffPetFormFieldErr msg={errors.shelterId} />
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
          {noShelters
            ? 'No shelters yet — create one from the admin shelters page first.'
            : 'Choose which partner shelter this pet belongs to.'}
        </p>
      </div>
    </div>
  )
}
