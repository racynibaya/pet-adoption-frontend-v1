import type { SVGProps } from 'react'

export default function Rabbit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect x='4.3' y='1' width='2.2' height='7.2' rx='1.1' />
      <rect x='9.5' y='1' width='2.2' height='7.2' rx='1.1' />
      <ellipse cx='8' cy='10.4' rx='4.3' ry='4' />
    </svg>
  )
}
