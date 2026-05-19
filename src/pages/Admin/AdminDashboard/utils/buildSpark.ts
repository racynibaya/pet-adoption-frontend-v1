import type { SparkData } from '../types'

export function buildSpark(dates: string[]): SparkData {
  if (dates.length === 0) return { points: [], max: 0 }
  const counts = new Map<string, number>()
  dates.forEach(d => {
    const key = d.slice(0, 10)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  })
  const sorted = [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
  const fillDays = 8
  const last = sorted.slice(-fillDays)
  const points = last.map(([, v]) => v)
  while (points.length < 4) points.unshift(0)
  return { points, max: Math.max(...points, 1) }
}
