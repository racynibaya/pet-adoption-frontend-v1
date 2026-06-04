import { useMemo, useState } from 'react'
import { useAdoptions } from '@/context/useAdoptions'
import { useStaffAuth } from '@/context/useStaffAuth'
import { useStaffScopedPets, useStaffScopedShelters } from '@/context/selectors'
import { shelterCityOf } from '@/data/adapters'
import type { PetCard } from '@/data/pets'
import {
  StaffDashboardTopbar,
  StaffDashboardChipStrip,
  StaffDashboardStatTiles,
  StaffDashboardRoster,
  StaffDashboardDetail,
} from './components'
import { useStaffFilters } from './hooks/useStaffFilters'
import type { SortKey } from './components/StaffDashboardChipStrip'

export default function StaffDashboard() {
  const { staffUser } = useStaffAuth()
  const visiblePets = useStaffScopedPets()
  const visibleShelters = useStaffScopedShelters()
  const { adoptions } = useAdoptions()

  const {
    filters,
    setSearch,
    setStatus,
    setSpecies,
    clearAll,
    activeCount,
    filteredPets,
    filteredAdoptions,
  } = useStaffFilters(visiblePets, adoptions)

  const [sort, setSort] = useState<SortKey>('RECENT')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const sortedPets = useMemo(() => {
    const arr = [...filteredPets]
    if (sort === 'NAME') {
      arr.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'PRESSURE') {
      const pressure = (p: PetCard) =>
        adoptions.filter(
          (a) => a.petId === p.id && (a.status === 'PENDING' || a.status === 'REVIEWING'),
        ).length
      arr.sort((a, b) => pressure(b) - pressure(a))
    } else {
      arr.sort((a, b) => b.id - a.id)
    }
    return arr
  }, [filteredPets, sort, adoptions])

  const selectedPet = useMemo(() => {
    if (selectedId !== null) {
      const found = sortedPets.find((p) => p.id === selectedId)
      if (found) return found
    }
    return sortedPets[0] ?? null
  }, [sortedPets, selectedId])

  const selectedShelter = useMemo(() => {
    if (!selectedPet) return null
    return visibleShelters.find((s) => s.id === selectedPet.shelterId) ?? null
  }, [visibleShelters, selectedPet])

  const selectedApps = useMemo(() => {
    if (!selectedPet) return []
    return adoptions
      .filter((a) => a.petId === selectedPet.id)
      .sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
      )
  }, [adoptions, selectedPet])

  const stats = useMemo(() => {
    const total = filteredPets.length
    const available = filteredPets.filter((p) => p.status === 'AVAILABLE').length
    const pending = filteredPets.filter((p) => p.status === 'PENDING').length
    const adopted = filteredPets.filter((p) => p.status === 'ADOPTED').length
    const rate = total > 0 ? Math.round((adopted / total) * 100) : 0
    const pendingApps = filteredAdoptions.filter(
      (a) => a.status === 'PENDING' || a.status === 'REVIEWING',
    ).length
    return { total, available, pending, adopted, rate, pendingApps }
  }, [filteredPets, filteredAdoptions])

  const shelterName = visibleShelters[0]?.name ?? ''

  const clock = useMemo(() => {
    const now = new Date()
    return {
      date: now.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
      time: now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
  }, [])

  return (
    <div className='staff-desk'>
      <StaffDashboardTopbar
        firstName={staffUser?.name?.split(' ')[0] ?? 'Friend'}
        initials={staffUser?.initials}
        date={clock.date}
        time={clock.time}
        search={filters.search}
        onSearch={setSearch}
      />

      <StaffDashboardChipStrip
        filters={filters}
        sort={sort}
        activeCount={activeCount}
        resultCount={sortedPets.length}
        totalCount={visiblePets.length}
        onStatus={setStatus}
        onSpecies={setSpecies}
        onSort={setSort}
        onClear={clearAll}
      />

      <StaffDashboardStatTiles stats={stats} shelterName={shelterName} />

      <div className='staff-board'>
        <StaffDashboardRoster
          pets={sortedPets}
          selectedId={selectedPet?.id ?? null}
          onSelect={setSelectedId}
        />
        <StaffDashboardDetail
          pet={selectedPet}
          shelterCity={shelterCityOf(selectedShelter)}
          applications={selectedApps}
        />
      </div>
    </div>
  )
}
