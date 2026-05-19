interface AdminSheltersToplineProps {
  shelterCount: number
  statusLabel: string
}

export default function AdminSheltersTopline({ shelterCount, statusLabel }: AdminSheltersToplineProps) {
  return (
    <header className='admin-topline a-section' style={{ ['--i' as string]: 0 }}>
      <div>
        <div className='admin-eyebrow'>Directory</div>
        <h1 className='admin-title'>Partner shelters.</h1>
        <p className='admin-subtitle'>
          Every shelter currently homing pets on KodaNest. Pick a shelter on
          the left to see its contact info and live roster by status.
        </p>
      </div>
      <div className='admin-clock'>
        <span>{shelterCount} shelter{shelterCount === 1 ? '' : 's'}</span>
        <span className='admin-clock-now'>{statusLabel}</span>
      </div>
    </header>
  )
}
