import type { AdoptionRequest } from '@/context/useAdoptions'
import { STAT_STATUSES } from '../data'

interface StaffAdoptionsStatsProps {
  adoptions: AdoptionRequest[]
}

const META: Record<AdoptionRequest['status'], { label: string; dotClass: string }> = {
  PENDING:   { label: 'Pending',   dotClass: '' },
  REVIEWING: { label: 'Reviewing', dotClass: 'is-teal' },
  APPROVED:  { label: 'Approved',  dotClass: 'is-teal' },
  REJECTED:  { label: 'Rejected',  dotClass: 'is-rose' },
  CANCELLED: { label: 'Cancelled', dotClass: 'is-ink' },
}

export default function StaffAdoptionsStats({ adoptions }: StaffAdoptionsStatsProps) {
  return (
    <section className='staff-tiles' aria-label='Application status breakdown'>
      {STAT_STATUSES.map((s) => {
        const meta = META[s]
        return (
          <article key={s} className='staff-tile'>
            <span className='staff-tile-label'>
              <span className={`staff-tile-dot ${meta.dotClass}`} />
              {meta.label}
            </span>
            <span className='staff-tile-num'>
              {adoptions.filter((a) => a.status === s).length}
            </span>
          </article>
        )
      })}
    </section>
  )
}
