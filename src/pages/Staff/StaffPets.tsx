import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStaff } from '@/context/StaffContext'
import { ageLabel, speciesLabel, genderLabel, sizeLabel, type SpeciesFilter } from '@/data/pets'

const SPECIES_FILTERS: SpeciesFilter[] = ['ALL', 'DOG', 'CAT', 'RABBIT', 'BIRD', 'OTHER']
const SPECIES_FILTER_LABELS: Record<SpeciesFilter, string> = {
  ALL: 'All', DOG: 'Dogs', CAT: 'Cats', RABBIT: 'Rabbits', BIRD: 'Birds', OTHER: 'Other',
}

function ConfirmDialog({ petName, onConfirm, onCancel }: { petName: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.42)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200, padding: 16,
    }}>
      <div style={{
        background: 'white', borderRadius: 16, padding: '28px 28px',
        maxWidth: 360, width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
        fontFamily: 'var(--font-body)',
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, margin: '0 0 8px', color: 'var(--ink)' }}>
          Remove {petName}?
        </h3>
        <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.5 }}>
          This will permanently remove this pet from the listings. This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '9px 18px', borderRadius: 9, border: '1.5px solid var(--hairline)',
              background: 'white', color: 'var(--ink-2)', cursor: 'pointer', fontSize: 13.5,
              fontWeight: 500, fontFamily: 'var(--font-body)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '9px 18px', borderRadius: 9, border: 'none',
              background: '#D94F68', color: 'white', cursor: 'pointer', fontSize: 13.5,
              fontWeight: 600, fontFamily: 'var(--font-body)',
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default function StaffPets() {
  const { pets, deletePet, updatePet } = useStaff()
  const [search, setSearch] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesFilter>('ALL')
  const [confirmId, setConfirmId] = useState<number | null>(null)

  const filtered = pets.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase()) ||
      p.shelterName.toLowerCase().includes(search.toLowerCase())
    const matchSpecies = speciesFilter === 'ALL' || p.species === speciesFilter
    return matchSearch && matchSpecies
  })

  const confirmPet = confirmId != null ? pets.find(p => p.id === confirmId) : null

  function toggleStatus(id: number, current: 'AVAILABLE' | 'PENDING') {
    updatePet(id, { status: current === 'AVAILABLE' ? 'PENDING' : 'AVAILABLE' })
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {confirmPet && (
        <ConfirmDialog
          petName={confirmPet.name}
          onConfirm={() => { deletePet(confirmId!); setConfirmId(null) }}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {/* Header */}
      <div className="staff-page-header">
        <div>
          <h1 className="staff-page-title">Pets</h1>
          <p className="staff-page-sub">{pets.length} total · {pets.filter(p => p.status === 'AVAILABLE').length} available</p>
        </div>
        <Link
          to="/staff/pets/add"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '10px 20px',
            background: '#E8923C', color: 'white',
            borderRadius: 11, fontWeight: 600, fontSize: 13.5,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(232,146,60,0.3)',
            transition: 'background 0.14s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#CB7730' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#E8923C' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Add Pet
        </Link>
      </div>

      {/* Main card */}
      <div style={{ padding: '24px 32px' }}>
        <div className="staff-card">
          {/* Toolbar */}
          <div className="staff-toolbar">
            <input
              className="staff-search"
              placeholder="Search by name, breed, or shelter…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {SPECIES_FILTERS.map(s => (
              <button
                key={s}
                className={`staff-filter-pill${speciesFilter === s ? ' active' : ''}`}
                onClick={() => setSpeciesFilter(s)}
              >
                {SPECIES_FILTER_LABELS[s]}
              </button>
            ))}
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
              No pets match your search.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="staff-table">
                <thead>
                  <tr>
                    <th>Pet</th>
                    <th>Species / Breed</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Size</th>
                    <th>Shelter</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(pet => (
                    <tr key={pet.id}>
                      {/* Name + avatar */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: pet.bg, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden',
                          }}>
                            <div style={{ transform: 'scale(0.22)', transformOrigin: 'center', width: 200, height: 160, flexShrink: 0 }}>
                              {pet.svg}
                            </div>
                          </div>
                          <span style={{ fontWeight: 600, fontSize: 13.5 }}>{pet.name}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: 13 }}>{speciesLabel(pet.species)}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{pet.breed}</div>
                      </td>
                      <td style={{ fontSize: 13.5 }}>{ageLabel(pet.ageMonths)}</td>
                      <td style={{ fontSize: 13.5 }}>{genderLabel(pet.gender)}</td>
                      <td style={{ fontSize: 13.5 }}>{sizeLabel(pet.size)}</td>
                      <td>
                        <div style={{ fontSize: 13 }}>{pet.shelterName}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{pet.shelterCity}</div>
                      </td>
                      <td>
                        <button
                          onClick={() => pet.status !== 'ADOPTED' && toggleStatus(pet.id, pet.status as 'AVAILABLE' | 'PENDING')}
                          className={`s-badge ${pet.status === 'AVAILABLE' ? 's-badge-available' : pet.status === 'PENDING' ? 's-badge-pending' : 's-badge-rejected'}`}
                          style={{ cursor: pet.status === 'ADOPTED' ? 'default' : 'pointer', border: 'none', background: undefined }}
                          title={pet.status === 'ADOPTED' ? 'Adopted — cannot toggle' : 'Click to toggle status'}
                        >
                          {pet.status === 'AVAILABLE' ? '● Available' : pet.status === 'PENDING' ? '◌ Pending' : '✓ Adopted'}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                          <Link
                            to={`/staff/pets/${pet.id}/edit`}
                            className="staff-action-btn staff-btn-edit"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Edit
                          </Link>
                          <button
                            onClick={() => setConfirmId(pet.id)}
                            className="staff-action-btn staff-btn-delete"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                              <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
