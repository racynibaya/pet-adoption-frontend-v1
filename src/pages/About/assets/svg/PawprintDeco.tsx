interface PawprintDecoProps {
  flip?: boolean
}

export function PawprintDeco({ flip = false }: PawprintDecoProps) {
  return (
    <svg width='80' height='50' viewBox='0 0 80 50'>
      <g fill='#d97757' opacity='0.7'>
        <ellipse cx='14' cy='20' rx='3' ry='5' transform={`rotate(${flip ? 20 : -20} 14 20)`} />
        <ellipse cx='22' cy='14' rx='2.4' ry='4' />
        <ellipse cx='28' cy='22' rx='2.4' ry='4' />
        <ellipse cx='20' cy='28' rx='4' ry='6' />
      </g>
    </svg>
  )
}
