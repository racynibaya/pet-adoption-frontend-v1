interface ShelterDetailStatTileProps {
  label: string
  value: string
}

export default function ShelterDetailStatTile({ label, value }: ShelterDetailStatTileProps) {
  return (
    <div className='rounded-2xl border border-(--hairline-soft) bg-(--canvas) px-5 py-4 flex items-baseline justify-between gap-3'>
      <p className='text-[11px] font-bold tracking-[0.14em] uppercase text-(--muted)'>
        {label}
      </p>
      <p
        className='text-[20px] text-(--ink) leading-tight'
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {value}
      </p>
    </div>
  )
}
