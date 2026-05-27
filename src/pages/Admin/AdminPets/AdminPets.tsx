import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStaff } from '@/context/useStaff'
import { useAdminFilters } from '@/pages/Admin/AdminDashboard/hooks/useAdminFilters'
import { AdminDashboardFilterBar } from '@/pages/Admin/AdminDashboard/components'
import {
  StaffPetsTable,
  StaffPetsConfirmDialog,
} from '@/pages/Staff/StaffPets/components'

export default function AdminPets() {
  const { pets, adoptions, shelters, updatePet, deletePet } = useStaff()
  const {
    filters,
    setSearch,
    setShelterId,
    setStatus,
    setSpecies,
    setGender,
    setSize,
    clearAll,
    activeCount,
    filteredPets,
  } = useAdminFilters(pets, adoptions)

  const [confirmId, setConfirmId] = useState<number | null>(null)
  const confirmPet =
    confirmId != null ? pets.find((p) => p.id === confirmId) ?? null : null

  function toggleStatus(id: number, current: 'AVAILABLE' | 'PENDING') {
    updatePet(id, { status: current === 'AVAILABLE' ? 'PENDING' : 'AVAILABLE' })
  }

  function handleConfirmDelete() {
    if (confirmId == null) return
    deletePet(confirmId)
    setConfirmId(null)
  }

  return (
    <>
      {confirmPet && (
        <StaffPetsConfirmDialog
          petName={confirmPet.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      <header className='admin-topline a-section' style={{ ['--i' as string]: 0 }}>
        <div>
          <div className='admin-eyebrow'>Pet roster</div>
          <h1 className='admin-title'>Every animal in the network.</h1>
          <p className='admin-subtitle'>
            Search, filter, and triage pets across every partner shelter — toggle
            availability, edit details, or remove listings.
          </p>
        </div>
        <Link to='/staff/pets/add' className='bento-action-btn primary'>
          Add a pet →
        </Link>
      </header>

      <AdminDashboardFilterBar
        filters={filters}
        shelters={shelters}
        activeCount={activeCount}
        resultCount={filteredPets.length}
        totalCount={pets.length}
        setSearch={setSearch}
        setShelterId={setShelterId}
        setStatus={setStatus}
        setSpecies={setSpecies}
        setGender={setGender}
        setSize={setSize}
        clearAll={clearAll}
      />

      <section className='a-section' style={{ ['--i' as string]: 1 }}>
        <div className='staff-card'>
          <StaffPetsTable
            pets={filteredPets}
            onToggleStatus={toggleStatus}
            onRequestDelete={setConfirmId}
          />
        </div>
      </section>
    </>
  )
}
