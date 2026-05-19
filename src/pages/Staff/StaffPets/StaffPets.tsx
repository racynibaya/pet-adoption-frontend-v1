import {
  StaffPetsHeader,
  StaffPetsToolbar,
  StaffPetsTable,
  StaffPetsConfirmDialog,
} from './components'
import { useStaffPets } from './hooks/useStaffPets'

export default function StaffPets() {
  const pets = useStaffPets()

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {pets.confirmPet && (
        <StaffPetsConfirmDialog
          petName={pets.confirmPet.name}
          onConfirm={pets.handleConfirmDelete}
          onCancel={pets.closeConfirm}
        />
      )}

      <StaffPetsHeader
        totalCount={pets.visiblePets.length}
        availableCount={pets.visiblePets.filter((p) => p.status === 'AVAILABLE').length}
      />

      <div className='staff-page-body' style={{ padding: '24px 32px' }}>
        <div className='staff-card'>
          <StaffPetsToolbar
            search={pets.search}
            speciesFilter={pets.speciesFilter}
            onSearchChange={pets.setSearch}
            onSpeciesChange={pets.setSpeciesFilter}
          />
          <StaffPetsTable
            pets={pets.filtered}
            onToggleStatus={pets.toggleStatus}
            onRequestDelete={pets.openConfirm}
          />
        </div>
      </div>
    </div>
  )
}
