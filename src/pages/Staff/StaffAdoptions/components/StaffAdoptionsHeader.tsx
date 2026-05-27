interface StaffAdoptionsHeaderProps {
  totalCount: number
  pendingCount: number
}

export default function StaffAdoptionsHeader({ totalCount, pendingCount }: StaffAdoptionsHeaderProps) {
  return (
    <header className='staff-subtopbar'>
      <div className='staff-subtopbar-title'>
        <h1 className='staff-subtopbar-name'>
          Open <em>queue</em>
        </h1>
        <p className='staff-subtopbar-sub'>
          {totalCount} total applications · {pendingCount} awaiting review
        </p>
      </div>
      {pendingCount > 0 && (
        <div className='staff-subtopbar-actions'>
          <span className='staff-subtopbar-pendpill'>
            <span className='num'>{pendingCount}</span>
            need attention
          </span>
        </div>
      )}
    </header>
  )
}
