import { useMemo } from 'react'
import { useStaff } from '@/context/useStaff'
import { shelterCityFromAddress } from '@/context/StaffContext'
import {
  AdminDashboardHeader,
  AdminDashboardFilterBar,
  AdminDashboardHero,
  AdminDashboardShelters,
  AdminDashboardSpark,
  AdminDashboardPending,
  AdminDashboardActivity,
  AdminDashboardActions,
} from './components'
import { useAdminFilters } from './hooks/useAdminFilters'
import { buildSpark } from './utils/buildSpark'
import { buildActivity } from './utils/buildActivity'
import type { ShelterRow } from './types'

export default function AdminDashboard() {
  const { pets, shelters: allShelters, adoptions, staffUser } = useStaff()

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
    filteredAdoptions,
  } = useAdminFilters(pets, adoptions)

  const stats = useMemo(() => {
    const total = filteredPets.length
    const available = filteredPets.filter(p => p.status === 'AVAILABLE').length
    const pending = filteredPets.filter(p => p.status === 'PENDING').length
    const adopted = filteredPets.filter(p => p.status === 'ADOPTED').length
    const rate = total > 0 ? Math.round((adopted / total) * 100) : 0
    const pendingApps = filteredAdoptions.filter(a => a.status === 'PENDING').length
    return { total, available, pending, adopted, rate, pendingApps }
  }, [filteredPets, filteredAdoptions])

  const shelters: ShelterRow[] = useMemo(() => {
    return allShelters
      .map(s => ({
        name: s.name,
        city: shelterCityFromAddress(s.address),
        count: filteredPets.filter(p => p.shelterId === s.id).length,
      }))
      .filter(s => s.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
  }, [filteredPets, allShelters])

  const spark = useMemo(
    () => buildSpark(filteredAdoptions.map(a => a.submittedAt)),
    [filteredAdoptions],
  )
  const activity = useMemo(
    () => buildActivity(filteredPets, filteredAdoptions),
    [filteredPets, filteredAdoptions],
  )

  const clock = useMemo(() => {
    const now = new Date()
    return {
      date: now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }),
      time: now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
    }
  }, [])

  return (
    <>
      <AdminDashboardHeader
        firstName={staffUser?.name?.split(' ')[0]}
        date={clock.date}
        time={clock.time}
      />
      <AdminDashboardFilterBar
        filters={filters}
        shelters={allShelters}
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
      <div className='admin-bento'>
        <AdminDashboardHero stats={stats} shelterCount={shelters.length} />
        <AdminDashboardShelters shelters={shelters} />
        <AdminDashboardSpark adoptionCount={filteredAdoptions.length} spark={spark} />
        <AdminDashboardPending pendingApps={stats.pendingApps} />
        <AdminDashboardActivity activity={activity} />
        <AdminDashboardActions />
      </div>
    </>
  )
}
