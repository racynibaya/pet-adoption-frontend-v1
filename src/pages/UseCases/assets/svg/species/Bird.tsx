import type { SVGProps } from 'react'

export default function Bird(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <ellipse cx='7' cy='9.2' rx='4.6' ry='3.4' />
      <circle cx='11.4' cy='6.2' r='2.4' />
      <path d='M13.4 5.4 L15.6 5.8 L13.4 7 Z' />
      <path d='M2.6 7.6 L0.6 11.4 L3.6 10.4 Z' />
    </svg>
  )
}
