import { useEffect, useState } from 'react'
import { apiGetPets } from '@/services/api'
import { apiPetToPetCard } from '@/context/StaffContext'
import type { PetCard, SpeciesFilter, GenderFilter, SizeFilter } from '@/data/pets'
import { PAGE_SIZE } from '../constants/services.constants'

export function useServicesPets() {
  const [activeSpecies, setActiveSpecies] = useState<SpeciesFilter>('ALL')
  const [activeGender, setActiveGender] = useState<GenderFilter>('ANY')
  const [activeSize, setActiveSize] = useState<SizeFilter>('ANY')
  const [pets, setPets] = useState<PetCard[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPets, setTotalPets] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-in-effect pattern; matches React docs example
    setLoading(true)
    apiGetPets(currentPage, PAGE_SIZE)
      .then((res) => {
        console.log(res)
        if (cancelled) return
        setPets(res.data.map(apiPetToPetCard))
        setTotalPages(res.pagination.totalPages)
        setTotalPets(res.pagination.total)
      })
      .catch((err) => {
        if (cancelled) return
        console.error('Failed to load pets', err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [currentPage])

  const filtered = pets.filter((p) => {
    if (activeSpecies !== 'ALL' && p.species !== activeSpecies) return false
    if (activeGender !== 'ANY' && p.gender !== activeGender) return false
    if (activeSize !== 'ANY' && p.size !== activeSize) return false
    return true
  })

  function clearFilters() {
    setActiveSpecies('ALL')
    setActiveGender('ANY')
    setActiveSize('ANY')
  }

  return {
    activeSpecies,
    activeGender,
    activeSize,
    setActiveSpecies,
    setActiveGender,
    setActiveSize,
    pets,
    filtered,
    currentPage,
    totalPages,
    totalPets,
    loading,
    setCurrentPage,
    clearFilters,
  }
}
