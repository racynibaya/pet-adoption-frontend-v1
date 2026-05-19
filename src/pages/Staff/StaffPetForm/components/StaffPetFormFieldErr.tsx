interface StaffPetFormFieldErrProps {
  msg?: string
}

export default function StaffPetFormFieldErr({ msg }: StaffPetFormFieldErrProps) {
  if (!msg) return null
  return <div style={{ color: '#c0304d', fontSize: 12, marginTop: 4 }}>{msg}</div>
}
