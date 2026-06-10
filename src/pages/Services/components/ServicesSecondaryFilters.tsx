import type { GenderFilter, SizeFilter } from '@/data/pets'
import { genderFilterLabel, sizeFilterLabel } from '@/data/pets'
import { GENDER_FILTERS, SIZE_FILTERS } from '../constants/services.constants'

interface ServicesSecondaryFiltersProps {
  activeGender: GenderFilter
  activeSize: SizeFilter
  onGenderChange: (g: GenderFilter) => void
  onSizeChange: (s: SizeFilter) => void
}

export default function ServicesSecondaryFilters({
  activeGender,
  activeSize,
  onGenderChange,
  onSizeChange,
}: ServicesSecondaryFiltersProps) {
  return (
    <section style={{ padding: '30px 0' }}>
      <div className='max-w-295 mx-auto flex flex-wrap gap-4 items-center'>
        <div className='flex gap-2 items-center flex-wrap'>
          <span className='text-13 font-semibold text-(--ink-2)'>Gender:</span>
          {GENDER_FILTERS.map((g) => (
            <span
              key={g}
              className={`chip${activeGender === g ? ' active' : ''}`}
              style={{ fontSize: 13 }}
              onClick={() => onGenderChange(g)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onGenderChange(g)}
            >
              {genderFilterLabel(g)}
            </span>
          ))}
        </div>
        <div className='flex gap-2 items-center flex-wrap'>
          <span className='text-13 font-semibold text-(--ink-2)'>Size:</span>
          {SIZE_FILTERS.map((s) => (
            <span
              key={s}
              className={`chip${activeSize === s ? ' active' : ''}`}
              style={{ fontSize: 13 }}
              onClick={() => onSizeChange(s)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSizeChange(s)}
            >
              {sizeFilterLabel(s)}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
