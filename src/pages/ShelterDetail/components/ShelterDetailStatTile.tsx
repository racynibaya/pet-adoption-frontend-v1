interface ShelterDetailStatTileProps {
  label: string
  value: string
}

export default function ShelterDetailStatTile({ label, value }: ShelterDetailStatTileProps) {
  return (
    <div className='rounded-2xl border border-(--hairline-soft) bg-(--canvas) p-5'>
      <p className='text-[11px] font-bold tracking-[0.14em] uppercase text-(--muted) mb-1.5'>
        {label}
      </p>
      <p
        className='text-[22px] text-(--ink) leading-tight'
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {value}
      </p>
    </div>
  )
}
