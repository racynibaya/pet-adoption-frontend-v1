import { useState } from 'react'
import { usePets } from '@/context/usePets'
import { useStaffScopedPets } from '@/context/selectors'
import type { SpeciesFilter } from '@/data/pets'

export function useStaffPets() {
  const { deletePet, updatePet } = usePets()
  const visiblePets = useStaffScopedPets()
  const [search, setSearch] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesFilter>('ALL')
  const [confirmId, setConfirmId] = useState<number | null>(null)

  const filtered = visiblePets.filter((p) => {
    const q = search.toLowerCase()
    const matchSearch =
      p.name.toLowerCase().includes(q) ||
      p.breed.toLowerCase().includes(q) ||
      p.shelterName.toLowerCase().includes(q)
    const matchSpecies = speciesFilter === 'ALL' || p.species === speciesFilter
    return matchSearch && matchSpecies
  })

  const confirmPet = confirmId != null ? visiblePets.find((p) => p.id === confirmId) ?? null : null

  function toggleStatus(id: number, current: 'AVAILABLE' | 'PENDING') {
    updatePet(id, { status: current === 'AVAILABLE' ? 'PENDING' : 'AVAILABLE' })
  }

  function handleConfirmDelete() {
    if (confirmId == null) return
    deletePet(confirmId)
    setConfirmId(null)
  }

  return {
    visiblePets,
    filtered,
    confirmPet,
    search,
    speciesFilter,
    setSearch,
    setSpeciesFilter,
    openConfirm: setConfirmId,
    closeConfirm: () => setConfirmId(null),
    handleConfirmDelete,
    toggleStatus,
  }
}
