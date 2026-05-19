interface AdminDashboardSparklineProps {
  points: number[]
  max: number
}

export default function AdminDashboardSparkline({ points, max }: AdminDashboardSparklineProps) {
  if (points.length === 0) return null
  const W = 100
  const H = 100
  const n = points.length
  const step = n > 1 ? W / (n - 1) : 0
  const m = max === 0 ? 1 : max
  const coords = points.map((v, i) => {
    const x = i * step
    const y = H - (v / m) * (H - 8) - 4
    return { x, y }
  })
  const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`).join(' ')
  const area = `${path} L ${W} ${H} L 0 ${H} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio='none' aria-hidden>
      <defs>
        <linearGradient id='sparkFill' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#e8923c' stopOpacity='0.32' />
          <stop offset='100%' stopColor='#e8923c' stopOpacity='0' />
        </linearGradient>
      </defs>
      <path d={area} fill='url(#sparkFill)' />
      <path
        d={path}
        fill='none'
        stroke='#e8923c'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        vectorEffect='non-scaling-stroke'
      />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r='1.4' fill='#cb7730' />
      ))}
    </svg>
  )
}
