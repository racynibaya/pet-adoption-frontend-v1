export function parseCity(address: string): string {
  return (
    address.split(',').slice(-2, -1)[0]?.trim() ||
    address.split(',')[0]?.trim() ||
    '—'
  )
}
