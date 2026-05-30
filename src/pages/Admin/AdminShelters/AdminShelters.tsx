import { useEffect, useMemo, useState } from 'react'
import { apiGetShelters, type ApiShelter } from '@/services/api'
import { useStaff } from '@/context/useStaff'
import {
  AdminSheltersTopline,
  AdminSheltersList,
  AdminSheltersDetail,
} from './components'
import { AdminDashboardStatTiles } from '@/pages/Admin/AdminDashboard/components'
import type { AggregatedShelter } from './types'
import { parseCity, countPets } from './utils/aggregateShelters'

export default function AdminShelters() {
  const { pets, adoptions, staffUser } = useStaff()
  const [remote, setRemote] = useState<ApiShelter[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    apiGetShelters()
      .then(res => { if (!cancelled) setRemote(res.data) })
      .catch(() => { if (!cancelled) setLoadError(true) })
    return () => { cancelled = true }
  }, [])

  const shelters: AggregatedShelter[] = useMemo(() => {
    if (remote && remote.length > 0) {
      return remote.map(s => ({
        id: s.id,
        name: s.name,
        city: parseCity(s.address),
        address: s.address,
        contactEmail: s.contactEmail,
        phoneNumber: s.phoneNumber,
        pets: countPets(pets, s.id, s.name),
      }))
    }
    const map = new Map<string, AggregatedShelter>()
    pets.forEach(p => {
      if (!p.shelterName) return
      const key = `${p.shelterId}|${p.shelterName}`
      const existing = map.get(key)
      if (existing) {
        existing.pets.total += 1
        if (p.status === 'AVAILABLE') existing.pets.available += 1
        else if (p.status === 'PENDING') existing.pets.pending += 1
        else existing.pets.adopted += 1
      } else {
        map.set(key, {
          id: p.shelterId,
          name: p.shelterName,
          city: p.shelterCity || '',
          address: p.shelterCity || '',
          contactEmail: '',
          phoneNumber: '',
          pets: {
            total: 1,
            available: p.status === 'AVAILABLE' ? 1 : 0,
            pending: p.status === 'PENDING' ? 1 : 0,
            adopted: p.status === 'ADOPTED' ? 1 : 0,
          },
        })
      }
    })
    return [...map.values()].sort((a, b) => b.pets.total - a.pets.total)
  }, [remote, pets])

  useEffect(() => {
    if (selectedId === null && shelters.length > 0) {
      setSelectedId(shelters[0].id)
    }
  }, [shelters, selectedId])

  const selected = shelters.find(s => s.id === selectedId) ?? shelters[0] ?? null
  const statusLabel = loadError ? 'offline · mock' : remote ? 'live' : 'syncing…'

  const stats = useMemo(() => {
    const total = pets.length
    const available = pets.filter((p) => p.status === 'AVAILABLE').length
    const pending = pets.filter((p) => p.status === 'PENDING').length
    const adopted = pets.filter((p) => p.status === 'ADOPTED').length
    const rate = total > 0 ? Math.round((adopted / total) * 100) : 0
    const pendingApps = adoptions.filter(
      (a) => a.status === 'PENDING' || a.status === 'REVIEWING',
    ).length
    return { total, available, pending, adopted, rate, pendingApps }
  }, [pets, adoptions])

  return (
    <>
      <AdminSheltersTopline
        shelterCount={shelters.length}
        statusLabel={statusLabel}
        canCreate={staffUser?.role === 'ADMIN'}
      />

      <AdminDashboardStatTiles stats={stats} shelterCount={shelters.length} />

      <div className='admin-board a-section' style={{ ['--i' as string]: 3 }}>
        <AdminSheltersList
          shelters={shelters}
          activeId={selected?.id ?? null}
          onSelect={setSelectedId}
        />
        <AdminSheltersDetail selected={selected} canEdit={staffUser?.role === 'ADMIN'} />
      </div>
    </>
  )
}
