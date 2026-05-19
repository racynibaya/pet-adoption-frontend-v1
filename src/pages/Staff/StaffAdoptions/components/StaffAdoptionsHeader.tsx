interface StaffAdoptionsHeaderProps {
  totalCount: number
  pendingCount: number
}

export default function StaffAdoptionsHeader({ totalCount, pendingCount }: StaffAdoptionsHeaderProps) {
  return (
    <div className="staff-page-header">
      <div>
        <h1 className="staff-page-title">
          Adoptions
          {pendingCount > 0 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 22, height: 22, borderRadius: '50%',
              background: '#D94F68', color: 'white',
              fontSize: 11, fontWeight: 700, marginLeft: 10,
              verticalAlign: 'middle',
            }}>
              {pendingCount}
            </span>
          )}
        </h1>
        <p className="staff-page-sub">{totalCount} total applications · {pendingCount} awaiting review</p>
      </div>
    </div>
  )
}
