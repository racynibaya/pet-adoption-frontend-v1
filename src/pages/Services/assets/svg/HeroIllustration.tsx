export function HeroIllustration() {
  return (
    <svg
      viewBox='0 0 400 360'
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <ellipse cx='200' cy='320' rx='160' ry='14' fill='#000' opacity='0.06' />
      <rect x='60' y='180' width='280' height='140' rx='14' fill='#fff' stroke='#1d2235' strokeWidth='2' />
      <rect x='60' y='180' width='280' height='20' fill='#E8923C' />
      <rect x='170' y='170' width='60' height='14' rx='6' fill='#1d2235' />
      <circle cx='200' cy='250' r='36' fill='#ffe9b8' />
      <ellipse cx='200' cy='268' rx='26' ry='18' fill='#e8a878' />
      <polygon points='168,236 174,208 194,238' fill='#a87d62' />
      <polygon points='206,238 226,208 232,236' fill='#a87d62' />
      <circle cx='186' cy='246' r='2.4' fill='#1d2235' />
      <circle cx='214' cy='246' r='2.4' fill='#1d2235' />
      <g fill='#d97757' opacity='0.7' transform='translate(280 60)'>
        <ellipse cx='6' cy='14' rx='3' ry='5' transform='rotate(-15 6 14)' />
        <ellipse cx='14' cy='8' rx='2.4' ry='4' />
        <ellipse cx='22' cy='10' rx='2.4' ry='4' transform='rotate(15 22 10)' />
        <ellipse cx='14' cy='20' rx='4.4' ry='6.4' />
      </g>
    </svg>
  )
}
