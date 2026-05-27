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
    <div className='staff-page-shell'>
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

      <StaffPetsToolbar
        search={pets.search}
        speciesFilter={pets.speciesFilter}
        onSearchChange={pets.setSearch}
        onSpeciesChange={pets.setSpeciesFilter}
      />

      <div className='staff-table-card'>
        <StaffPetsTable
          pets={pets.filtered}
          onToggleStatus={pets.toggleStatus}
          onRequestDelete={pets.openConfirm}
        />
      </div>
    </div>
  )
}
