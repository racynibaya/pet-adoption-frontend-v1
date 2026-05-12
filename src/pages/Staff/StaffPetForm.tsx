import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useStaff } from '@/context/StaffContext'
import { speciesLabel, genderLabel, sizeLabel, type Species, type Gender, type Size } from '@/data/pets'
import { ApiError } from '@/services/api'

// ── Exact enum values the backend accepts ─────────────────────────────────────
const SPECIES_OPTIONS: Species[] = ['DOG', 'CAT', 'RABBIT', 'BIRD', 'OTHER']
const GENDER_OPTIONS: Gender[] = ['MALE', 'FEMALE']
const SIZE_OPTIONS: Size[] = ['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE']

interface FormState {
  name: string
  species: Species
  breed: string
  ageMonths: string
  gender: Gender
  size: Size
  status: 'AVAILABLE' | 'PENDING' | 'ADOPTED'
  shelterId: string
  description: string
}

const EMPTY: FormState = {
  name: '', species: 'DOG', breed: '', ageMonths: '',
  gender: 'MALE', size: 'MEDIUM',
  status: 'AVAILABLE', shelterId: '',
  description: '',
}

// ── Shared field components ───────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, letterSpacing: '0.02em' }}>
      {children}
    </label>
  )
}

const baseInput: React.CSSProperties = {
  width: '100%', height: 44, padding: '0 13px',
  border: '1.5px solid var(--hairline)', borderRadius: 11,
  fontSize: 13.5, color: 'var(--ink)', background: 'white',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'var(--font-body)',
  transition: 'border-color 0.14s',
}

function TextInput({ value, onChange, placeholder, type = 'text', required }: {
  value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string; type?: string; required?: boolean
}) {
  return (
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} required={required}
      style={baseInput}
      onFocus={e => { e.currentTarget.style.borderColor = '#E8923C' }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
    />
  )
}

function Select({ value, onChange, children }: {
  value: string; onChange: (e: ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode
}) {
  return (
    <select
      value={value} onChange={onChange}
      style={{
        ...baseInput, cursor: 'pointer', appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%236C8080' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36,
      }}
      onFocus={e => { e.currentTarget.style.borderColor = '#E8923C' }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
    >
      {children}
    </select>
  )
}

function FieldErr({ msg }: { msg?: string }) {
  if (!msg) return null
  return <div style={{ color: '#c0304d', fontSize: 12, marginTop: 4 }}>{msg}</div>
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StaffPetForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = id != null
  const { pets, addPet, updatePet } = useStaff()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const existing = isEdit ? pets.find(p => p.id === Number(id)) : null

  const [form, setForm] = useState<FormState>(() => existing
    ? {
        name: existing.name,
        species: existing.species,
        breed: existing.breed,
        ageMonths: String(existing.ageMonths),
        gender: existing.gender,
        size: existing.size,
        status: existing.status,
        shelterId: String(existing.shelterId),
        description: existing.description,
      }
    : EMPTY
  )

  const [images, setImages] = useState<File[]>([])
  const [imagePreview, setImagePreview] = useState<string[]>([])
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const valid = files.filter(f => f.size <= 5 * 1024 * 1024)
    setImages(valid)
    setImagePreview(valid.map(f => URL.createObjectURL(f)))
  }

  function removeImage(i: number) {
    setImages(prev => prev.filter((_, idx) => idx !== i))
    setImagePreview(prev => prev.filter((_, idx) => idx !== i))
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.breed.trim()) errs.breed = 'Required'
    const age = Number(form.ageMonths)
    if (!form.ageMonths || isNaN(age) || age < 0 || age > 600) errs.ageMonths = 'Enter a valid age (0–600 months)'
    if (!form.shelterId || isNaN(Number(form.shelterId))) errs.shelterId = 'Enter a valid shelter ID'
    if (!form.description.trim()) errs.description = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setApiError('')
    setLoading(true)

    try {
      if (isEdit && existing) {
        // PATCH /pets/:id not yet implemented in backend — local state only
        updatePet(existing.id, {
          name: form.name.trim(),
          species: form.species,
          breed: form.breed.trim(),
          ageMonths: Number(form.ageMonths),
          gender: form.gender,
          size: form.size,
          status: form.status,
          shelterId: Number(form.shelterId),
          description: form.description.trim(),
        })
      } else {
        const fd = new FormData()
        fd.append('name', form.name.trim())
        fd.append('species', form.species)
        fd.append('breed', form.breed.trim())
        fd.append('ageMonths', form.ageMonths)
        fd.append('gender', form.gender)
        fd.append('size', form.size)
        fd.append('status', form.status)
        fd.append('shelterId', form.shelterId)
        fd.append('description', form.description.trim())
        images.forEach(f => fd.append('images', f))
        await addPet(fd)
      }

      setSaved(true)
      setTimeout(() => navigate('/staff/pets'), 800)
    } catch (err) {
      setApiError(err instanceof ApiError ? err.message : 'An unexpected error occurred.')
      setLoading(false)
    }
  }

  const STATUS_OPTIONS = [
    { value: 'AVAILABLE', label: '● Available', color: '#1D7575', bg: '#e2f2ee' },
    { value: 'PENDING',   label: '◌ Pending',   color: '#a05818', bg: '#fef1e1' },
    { value: 'ADOPTED',   label: '✓ Adopted',   color: '#5a5a9e', bg: '#eeeef8' },
  ] as const

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div className="staff-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Link to="/staff/pets" style={{ fontSize: 12.5, color: 'var(--muted)', textDecoration: 'none' }}>Pets</Link>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>›</span>
            <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>{isEdit ? `Edit ${existing?.name ?? ''}` : 'Add New Pet'}</span>
          </div>
          <h1 className="staff-page-title">{isEdit ? `Edit ${existing?.name ?? 'Pet'}` : 'Add New Pet'}</h1>
          <p className="staff-page-sub">
            {isEdit
              ? 'Changes to species, size, and gender will sync once PATCH /pets/:id is implemented in the backend.'
              : 'Creates a record via POST /api/v1/pets. All fields are required by the backend.'}
          </p>
        </div>
      </div>

      <div style={{ padding: '24px 32px', maxWidth: 800 }}>
        <form onSubmit={handleSubmit}>

          {/* Basic info */}
          <div className="staff-form-section">
            <div className="staff-form-section-head">Basic Information</div>
            <div className="staff-form-section-body">
              <div className="staff-form-grid">
                <div>
                  <Label>Pet name *</Label>
                  <TextInput value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Biscuit" required />
                  <FieldErr msg={errors.name} />
                </div>
                <div>
                  <Label>Species *</Label>
                  <Select value={form.species} onChange={e => set('species', e.target.value as Species)}>
                    {SPECIES_OPTIONS.map(s => <option key={s} value={s}>{speciesLabel(s)}</option>)}
                  </Select>
                </div>
                <div>
                  <Label>Breed *</Label>
                  <TextInput value={form.breed} onChange={e => set('breed', e.target.value)} placeholder="e.g. Jack Russell Terrier" required />
                  <FieldErr msg={errors.breed} />
                </div>
                <div>
                  <Label>Age (months) *</Label>
                  <TextInput type="number" value={form.ageMonths} onChange={e => set('ageMonths', e.target.value)} placeholder="e.g. 18" required />
                  <FieldErr msg={errors.ageMonths} />
                </div>
                <div>
                  <Label>Gender *</Label>
                  <Select value={form.gender} onChange={e => set('gender', e.target.value as Gender)}>
                    {GENDER_OPTIONS.map(g => <option key={g} value={g}>{genderLabel(g)}</option>)}
                  </Select>
                </div>
                <div>
                  <Label>Size *</Label>
                  <Select value={form.size} onChange={e => set('size', e.target.value as Size)}>
                    {SIZE_OPTIONS.map(s => <option key={s} value={s}>{sizeLabel(s)}</option>)}
                  </Select>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <Label>Listing status</Label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {STATUS_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set('status', opt.value)}
                      style={{
                        padding: '8px 18px', borderRadius: 9, cursor: 'pointer',
                        fontSize: 13, fontWeight: 600, border: '2px solid',
                        borderColor: form.status === opt.value ? opt.color : 'var(--hairline)',
                        background: form.status === opt.value ? opt.bg : 'white',
                        color: form.status === opt.value ? opt.color : 'var(--muted)',
                        transition: 'all 0.13s', fontFamily: 'var(--font-body)',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Shelter */}
          <div className="staff-form-section">
            <div className="staff-form-section-head">Shelter</div>
            <div className="staff-form-section-body">
              <div style={{ maxWidth: 200 }}>
                <Label>Shelter ID *</Label>
                <TextInput
                  type="number"
                  value={form.shelterId}
                  onChange={e => set('shelterId', e.target.value)}
                  placeholder="e.g. 1"
                  required
                />
                <FieldErr msg={errors.shelterId} />
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                The numeric ID of the shelter this pet belongs to. You can find this in the backend's shelters table.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="staff-form-section">
            <div className="staff-form-section-head">Description</div>
            <div className="staff-form-section-body">
              <Label>About this pet *</Label>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Write a warm, descriptive paragraph about this pet's personality and backstory…"
                rows={5}
                style={{
                  width: '100%', padding: '11px 13px',
                  border: '1.5px solid var(--hairline)', borderRadius: 11,
                  fontSize: 13.5, color: 'var(--ink)', background: 'white',
                  outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                  fontFamily: 'var(--font-body)', lineHeight: 1.6,
                  transition: 'border-color 0.14s',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#E8923C' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--hairline)' }}
              />
              <FieldErr msg={errors.description} />
            </div>
          </div>

          {/* Images */}
          {!isEdit && (
            <div className="staff-form-section">
              <div className="staff-form-section-head">Photos</div>
              <div className="staff-form-section-body">
                <p style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 12 }}>
                  Up to 10 images · max 5 MB each · JPEG, PNG, or WebP
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                {imagePreview.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                    {imagePreview.map((src, i) => (
                      <div key={src} style={{ position: 'relative', width: 88, height: 88 }}>
                        <img src={src} alt="" style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 10, border: '1.5px solid var(--hairline)' }} />
                        {i === 0 && (
                          <span style={{
                            position: 'absolute', bottom: 4, left: 4,
                            fontSize: 9, fontWeight: 700, background: '#1D7575', color: 'white',
                            padding: '2px 6px', borderRadius: 4, letterSpacing: '0.05em',
                          }}>PRIMARY</span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          style={{
                            position: 'absolute', top: -6, right: -6,
                            width: 20, height: 20, borderRadius: '50%',
                            background: '#D94F68', border: 'none', color: 'white',
                            cursor: 'pointer', fontSize: 12, lineHeight: 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >✕</button>
                      </div>
                    ))}
                    {imagePreview.length < 10 && (
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        style={{
                          width: 88, height: 88, borderRadius: 10, border: '2px dashed var(--hairline)',
                          background: 'white', cursor: 'pointer', color: 'var(--muted)', fontSize: 22,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >+</button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    style={{
                      width: '100%', padding: '28px 16px',
                      border: '2px dashed var(--hairline)', borderRadius: 12,
                      background: 'white', cursor: 'pointer',
                      color: 'var(--muted)', fontSize: 13.5, fontFamily: 'var(--font-body)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      transition: 'border-color 0.13s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E8923C' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hairline)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                      <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Click to upload photos
                  </button>
                )}
              </div>
            </div>
          )}

          {/* API error */}
          {apiError && (
            <div style={{ padding: '12px 16px', background: '#fde8ec', borderRadius: 10, color: '#c0304d', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
              {apiError}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingBottom: 40 }}>
            <button
              type="submit"
              disabled={loading || saved}
              style={{
                padding: '12px 28px',
                background: saved ? '#1D7575' : loading ? '#f5ae50' : '#E8923C',
                color: 'white', border: 'none', borderRadius: 11,
                fontSize: 14, fontWeight: 600,
                cursor: loading || saved ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)', transition: 'background 0.15s',
                display: 'flex', alignItems: 'center', gap: 7,
              }}
              onMouseEnter={e => { if (!loading && !saved) (e.currentTarget as HTMLButtonElement).style.background = '#CB7730' }}
              onMouseLeave={e => { if (!loading && !saved) (e.currentTarget as HTMLButtonElement).style.background = '#E8923C' }}
            >
              {saved ? '✓ Saved!' : loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Pet'}
            </button>
            <Link
              to="/staff/pets"
              style={{
                padding: '12px 24px', borderRadius: 11, border: '1.5px solid var(--hairline)',
                background: 'white', color: 'var(--ink-2)', fontSize: 14, fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
