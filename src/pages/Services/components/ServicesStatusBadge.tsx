interface ServicesStatusBadgeProps {
  status: 'AVAILABLE' | 'PENDING' | 'ADOPTED'
}

export default function ServicesStatusBadge({ status }: ServicesStatusBadgeProps) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        padding: '3px 10px',
        borderRadius: 20,
        background:
          status === 'AVAILABLE' ? '#e6f4f0' : status === 'PENDING' ? '#fff3d9' : '#eeeef8',
        color:
          status === 'AVAILABLE' ? '#1D7575' : status === 'PENDING' ? '#a87d12' : '#5a5a9e',
      }}
    >
      {status === 'AVAILABLE' ? 'Available' : status === 'PENDING' ? 'Pending' : 'Adopted'}
    </span>
  )
}
