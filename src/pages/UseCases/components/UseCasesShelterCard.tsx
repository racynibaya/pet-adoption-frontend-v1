import { Link } from 'react-router-dom'
import type { Shelter } from '../types'

interface UseCasesShelterCardProps {
  shelter: Shelter
  availableCount: number
}

export default function UseCasesShelterCard({ shelter, availableCount }: UseCasesShelterCardProps) {
  const { id, name, address, bg, svg } = shelter
  const city = address.split(',').slice(-2, -1)[0]?.trim() ?? ''

  return (
    <Link
      to={`/shelters/${id}`}
      className='group block bg-(--canvas) border border-(--hairline-soft) rounded-[20px] p-6 text-left no-underline text-inherit transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-(--ink) hover:shadow-(--shadow-lift) hover:-translate-y-1'
    >
      <div
        className='overflow-hidden rounded-2xl transition-transform duration-200 ease-out group-hover:scale-[1.02]'
        style={{ background: bg }}
      >
        {svg}
      </div>
      <h3
        className='mt-5 text-[20px] sm:text-[22px] leading-tight'
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {name}
      </h3>
      <p className='mt-1 text-[13px] text-(--muted)'>{city}</p>
      <div className='mt-5 pt-4 border-t border-(--hairline-soft) flex items-center justify-between'>
        <span className='text-[13px] text-(--ink-2)'>{availableCount} pets</span>
        <span className='text-[12px] uppercase tracking-[0.14em] font-semibold text-(--ink-2) inline-flex items-center gap-1.5 transition-transform duration-200 ease-out group-hover:translate-x-1'>
          View shelter
          <span aria-hidden='true'>→</span>
        </span>
      </div>
    </Link>
  )
}
