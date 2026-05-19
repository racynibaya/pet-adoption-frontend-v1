interface PetApplyMarginErrProps {
  msg?: string
}

export default function PetApplyMarginErr({ msg }: PetApplyMarginErrProps) {
  if (!msg) return null
  return (
    <div
      style={{
        marginTop: 8,
        paddingLeft: 12,
        borderLeft: '2px solid var(--rausch-soft)',
        fontSize: 12.5,
        fontStyle: 'italic',
        color: '#c0304d',
        lineHeight: 1.45,
      }}
    >
      {msg}
    </div>
  )
}
