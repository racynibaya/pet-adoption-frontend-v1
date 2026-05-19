interface PetDetailStatusBadgeProps {
  status: 'AVAILABLE' | 'PENDING' | 'ADOPTED'
}

export default function PetDetailStatusBadge({ status }: PetDetailStatusBadgeProps) {
  return (
    <span
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 2,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        padding: '4px 12px',
        borderRadius: 20,
        background:
          status === 'AVAILABLE' ? '#e6f4f0' : status === 'PENDING' ? '#fff3d9' : '#eeeef8',
        color:
          status === 'AVAILABLE' ? '#1D7575' : status === 'PENDING' ? '#a87d12' : '#5a5a9e',
        border: `1.5px solid ${status === 'AVAILABLE' ? '#99D0D9' : status === 'PENDING' ? '#FAC878' : '#c0c0e0'}`,
      }}
    >
      {status === 'AVAILABLE' ? 'Available' : status === 'PENDING' ? 'Pending' : 'Adopted'}
    </span>
  )
}
