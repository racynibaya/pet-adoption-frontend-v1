import type { SVGProps } from 'react'

export default function Other(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <ellipse cx='3.4' cy='6.4' rx='1.4' ry='1.9' />
      <ellipse cx='6.6' cy='3.6' rx='1.4' ry='1.9' />
      <ellipse cx='9.4' cy='3.6' rx='1.4' ry='1.9' />
      <ellipse cx='12.6' cy='6.4' rx='1.4' ry='1.9' />
      <ellipse cx='8' cy='11.2' rx='3.4' ry='2.8' />
    </svg>
  )
}
