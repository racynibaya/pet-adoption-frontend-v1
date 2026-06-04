import type { SVGProps } from 'react'

export default function Dog(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <ellipse cx='3.6' cy='5.6' rx='1.7' ry='2.9' />
      <ellipse cx='12.4' cy='5.6' rx='1.7' ry='2.9' />
      <ellipse cx='8' cy='9.4' rx='4.6' ry='4.1' />
      <ellipse cx='8' cy='11.6' rx='1.9' ry='1.4' />
    </svg>
  )
}
