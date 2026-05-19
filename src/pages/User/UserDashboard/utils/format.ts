export function greetingFor(hour: number): string {
  if (hour < 5) return 'Late evening'
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  if (hour < 21) return 'Good evening'
  return 'Late evening'
}

export function formatJoined(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  } catch {
    return 'recently'
  }
}
