export const GENERIC_SHELTER_BG = '#fde2cf'

export function GenericShelterSvg() {
  return (
    <svg viewBox='0 0 200 140' width='200' height='140'>
      <rect width='200' height='140' fill={GENERIC_SHELTER_BG} />
      <path
        d='M40 110 L100 50 L160 110 Z'
        fill='#e8a878'
        stroke='#a87d62'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <rect x='84' y='84' width='32' height='26' fill='#a87d62' />
      <circle cx='100' cy='96' r='3' fill='#1d2235' />
    </svg>
  )
}
