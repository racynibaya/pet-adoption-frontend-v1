import type { PetCard } from '@/data/pets'
import type { AdoptionRequest } from '@/context/useStaff'
import type { Activity } from '../types'

function relTime(ts: number): string {
  const diff = Date.now() - ts
  const day = 24 * 60 * 60 * 1000
  if (diff < day) return 'today'
  if (diff < 2 * day) return 'yesterday'
  const days = Math.floor(diff / day)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

export function buildActivity(pets: PetCard[], adoptions: AdoptionRequest[]): Activity[] {
  const events: (Activity & { ts: number })[] = []

  adoptions.forEach(a => {
    const ts = new Date(a.submittedAt).getTime()
    const tone: Activity['tone'] = a.status === 'APPROVED' ? 'teal' : a.status === 'REJECTED' ? 'rose' : 'amber'
    const verb = a.status === 'APPROVED' ? 'was approved for' : a.status === 'REJECTED' ? 'was declined for' : 'applied to adopt'
    events.push({
      id: `a-${a.id}`,
      actor: a.applicantName,
      verb,
      subject: a.petName,
      time: relTime(ts),
      tone,
      ts,
    })
  })

  pets.slice(-6).forEach(p => {
    events.push({
      id: `p-${p.id}`,
      actor: p.shelterName || 'A shelter',
      verb: 'listed',
      subject: p.name,
      time: 'recently',
      tone: 'teal',
      ts: Date.now() - p.id * 1000,
    })
  })

  return events
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 6)
    .map(({ ts: _ts, ...rest }) => rest)
}
