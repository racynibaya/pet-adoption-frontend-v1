import { useMemo, useState } from 'react'
import { useStaff } from '@/context/useStaff'
import { StaffAdoptionsTable } from '@/pages/Staff/StaffAdoptions/components'
import AdminAdoptionsToolbar from './AdminAdoptionsToolbar'
import type {
  AdoptionShelterFilter,
  AdoptionStatusFilter,
} from './AdminAdoptionsToolbar'

export default function AdminAdoptions() {
  const { adoptions, pets, shelters, updateAdoption } = useStaff()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<AdoptionStatusFilter>('ALL')
  const [shelterId, setShelterId] = useState<AdoptionShelterFilter>('ALL')

  const petById = useMemo(() => {
    const m = new Map<number, (typeof pets)[number]>()
    pets.forEach((p) => m.set(p.id, p))
    return m
  }, [pets])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return adoptions.filter((a) => {
      if (status !== 'ALL' && a.status !== status) return false
      if (shelterId !== 'ALL') {
        const pet = petById.get(a.petId)
        if (!pet || pet.shelterId !== shelterId) return false
      }
      if (q.length > 0) {
        const hay = `${a.applicantName} ${a.petName} ${a.email}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [adoptions, search, status, shelterId, petById])

  const activeCount =
    (search.trim().length > 0 ? 1 : 0) +
    (status !== 'ALL' ? 1 : 0) +
    (shelterId !== 'ALL' ? 1 : 0)

  function clearAll() {
    setSearch('')
    setStatus('ALL')
    setShelterId('ALL')
  }

  const pendingCount = adoptions.filter(
    (a) => a.status === 'PENDING' || a.status === 'REVIEWING',
  ).length

  return (
    <>
      <header className='admin-topline a-section' style={{ ['--i' as string]: 0 }}>
        <div>
          <div className='admin-eyebrow'>Application queue</div>
          <h1 className='admin-title'>Adoption pipeline, end-to-end.</h1>
          <p className='admin-subtitle'>
            Every applicant across every shelter in one queue — move applications
            through review, approve matches, or flag for follow-up.
          </p>
        </div>
        <div className='admin-clock' aria-live='polite'>
          <span>Awaiting action</span>
          <span className='admin-clock-now'>{pendingCount}</span>
        </div>
      </header>

      <AdminAdoptionsToolbar
        search={search}
        status={status}
        shelterId={shelterId}
        shelters={shelters}
        activeCount={activeCount}
        resultCount={filtered.length}
        totalCount={adoptions.length}
        setSearch={setSearch}
        setStatus={setStatus}
        setShelterId={setShelterId}
        clearAll={clearAll}
      />

      <section className='a-section' style={{ ['--i' as string]: 1 }}>
        <div className='admin-table-card'>
          <StaffAdoptionsTable
            adoptions={filtered}
            pets={pets}
            onUpdate={updateAdoption}
          />
        </div>
      </section>
    </>
  )
}
