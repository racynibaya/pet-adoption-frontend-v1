import { useMemo, useState } from 'react'
import { useStaff } from '@/context/useStaff'
import { shelterCityFromAddress } from '@/context/StaffContext'
import type { PetCard } from '@/data/pets'
import {
  AdminDashboardTopbar,
  AdminDashboardChipStrip,
  AdminDashboardStatTiles,
  AdminDashboardRoster,
  AdminDashboardDetail,
} from './components'
import { useAdminFilters } from './hooks/useAdminFilters'
import type { SortKey } from './components/AdminDashboardChipStrip'

export default function AdminDashboard() {
  const { pets, shelters: allShelters, adoptions, staffUser } = useStaff()

  const {
    filters,
    setSearch,
    setShelterId,
    setStatus,
    setSpecies,
    clearAll,
    activeCount,
    filteredPets,
    filteredAdoptions,
  } = useAdminFilters(pets, adoptions)

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
    return allShelters.find((s) => s.id === selectedPet.shelterId) ?? null
  }, [allShelters, selectedPet])

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

  const shelterCount = useMemo(() => {
    const ids = new Set(filteredPets.map((p) => p.shelterId))
    return ids.size
  }, [filteredPets])

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
    <>
      <AdminDashboardTopbar
        firstName={staffUser?.name?.split(' ')[0] ?? 'Admin'}
        initials={staffUser?.initials}
        date={clock.date}
        time={clock.time}
        search={filters.search}
        onSearch={setSearch}
      />

      <AdminDashboardChipStrip
        filters={filters}
        shelters={allShelters}
        sort={sort}
        activeCount={activeCount}
        resultCount={sortedPets.length}
        totalCount={pets.length}
        onStatus={setStatus}
        onSpecies={setSpecies}
        onShelter={setShelterId}
        onSort={setSort}
        onClear={clearAll}
      />

      <AdminDashboardStatTiles stats={stats} shelterCount={shelterCount} />

      <div className='admin-board'>
        <AdminDashboardRoster
          pets={sortedPets}
          selectedId={selectedPet?.id ?? null}
          onSelect={setSelectedId}
        />
        <AdminDashboardDetail
          pet={selectedPet}
          shelterCity={selectedShelter ? shelterCityFromAddress(selectedShelter.address) : ''}
          applications={selectedApps}
        />
      </div>
    </>
  )
}
