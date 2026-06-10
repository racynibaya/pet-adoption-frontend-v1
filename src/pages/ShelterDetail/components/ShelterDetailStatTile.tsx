interface ShelterDetailStatTileProps {
  label: string
  value: string
}

export default function ShelterDetailStatTile({ label, value }: ShelterDetailStatTileProps) {
  return (
    <div className='rounded-2xl border border-(--hairline-soft) bg-(--canvas) px-5 py-4 flex items-baseline justify-between gap-3'>
      <p className='text-11 font-bold tracking-14 uppercase text-(--muted)'>
        {label}
      </p>
      <p
        className='text-20 text-(--ink) leading-tight'
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {value}
      </p>
    </div>
  )
}
