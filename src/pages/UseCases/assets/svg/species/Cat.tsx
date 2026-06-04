import type { SVGProps } from 'react'

export default function Cat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M2.8 2.2 L6.2 7.4 L4 8.4 Z' />
      <path d='M13.2 2.2 L9.8 7.4 L12 8.4 Z' />
      <ellipse cx='8' cy='9.4' rx='4.6' ry='4.2' />
    </svg>
  )
}
