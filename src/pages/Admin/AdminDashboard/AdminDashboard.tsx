import { useMemo } from 'react'
import { useStaff } from '@/context/useStaff'
import {
  AdminDashboardHeader,
  AdminDashboardHero,
  AdminDashboardShelters,
  AdminDashboardSpark,
  AdminDashboardPending,
  AdminDashboardActivity,
  AdminDashboardActions,
} from './components'
import { buildSpark } from './utils/buildSpark'
import { buildActivity } from './utils/buildActivity'
import type { ShelterRow } from './types'

export default function AdminDashboard() {
  const { pets, adoptions, staffUser } = useStaff()

  const stats = useMemo(() => {
    const total = pets.length
    const available = pets.filter(p => p.status === 'AVAILABLE').length
    const pending = pets.filter(p => p.status === 'PENDING').length
    const adopted = pets.filter(p => p.status === 'ADOPTED').length
    const rate = total > 0 ? Math.round((adopted / total) * 100) : 0
    const pendingApps = adoptions.filter(a => a.status === 'PENDING').length
    return { total, available, pending, adopted, rate, pendingApps }
  }, [pets, adoptions])

  const shelters: ShelterRow[] = useMemo(() => {
    const map = new Map<string, ShelterRow>()
    pets.forEach(p => {
      if (!p.shelterName) return
      const key = p.shelterName
      const cur = map.get(key)
      if (cur) {
        cur.count += 1
      } else {
        map.set(key, { name: p.shelterName, city: p.shelterCity || '', count: 1 })
      }
    })
    return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 4)
  }, [pets])

  const spark = useMemo(() => buildSpark(adoptions.map(a => a.submittedAt)), [adoptions])
  const activity = useMemo(() => buildActivity(pets, adoptions), [pets, adoptions])

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
      <div className='admin-bento'>
        <AdminDashboardHero stats={stats} shelterCount={shelters.length} />
        <AdminDashboardShelters shelters={shelters} />
        <AdminDashboardSpark adoptionCount={adoptions.length} spark={spark} />
        <AdminDashboardPending pendingApps={stats.pendingApps} />
        <AdminDashboardActivity activity={activity} />
        <AdminDashboardActions />
      </div>
    </>
  )
}
