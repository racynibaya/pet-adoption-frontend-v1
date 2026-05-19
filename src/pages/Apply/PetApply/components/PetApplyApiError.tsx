interface PetApplyApiErrorProps {
  message: string
}

export default function PetApplyApiError({ message }: PetApplyApiErrorProps) {
  return (
    <div
      style={{
        padding: '14px 20px',
        background: '#fde8ec',
        borderRadius: 12,
        color: '#c0304d',
        fontSize: 14,
        marginBottom: 20,
        lineHeight: 1.55,
        border: '1.5px solid #f5c3cc',
      }}
      role='alert'
    >
      {message}
    </div>
  )
}
