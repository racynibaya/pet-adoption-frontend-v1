export function HeroIllustration() {
  return (
    <svg
      viewBox='0 0 460 360'
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <path
        d='M40 280 Q200 80 420 220'
        stroke='#f5b894'
        strokeWidth='50'
        fill='none'
        strokeLinecap='round'
        opacity='0.55'
      />
      <circle cx='100' cy='120' r='44' fill='#cfe6f7' opacity='0.8' />
      <ellipse cx='100' cy='128' rx='22' ry='18' fill='#e8a878' />
      <polygon points='80,108 86,92 96,110' fill='#a87d62' />
      <polygon points='106,110 116,92 122,108' fill='#a87d62' />
      <circle cx='92' cy='124' r='2' fill='#1d2235' />
      <circle cx='108' cy='124' r='2' fill='#1d2235' />
      <circle cx='220' cy='220' r='56' fill='#ffe9b8' opacity='0.85' />
      <ellipse cx='220' cy='226' rx='30' ry='24' fill='#827d76' />
      <polygon points='194,200 200,180 214,202' fill='#5a5853' />
      <polygon points='226,202 240,180 246,200' fill='#5a5853' />
      <circle cx='208' cy='220' r='3' fill='#1d2235' />
      <circle cx='232' cy='220' r='3' fill='#1d2235' />
      <circle cx='350' cy='140' r='48' fill='#fde2cf' opacity='0.9' />
      <ellipse cx='350' cy='148' rx='26' ry='20' fill='#3a3530' />
      <polygon points='328,128 326,108 342,130' fill='#1d1916' />
      <polygon points='358,130 374,108 372,128' fill='#1d1916' />
      <circle cx='340' cy='144' r='2.4' fill='#fff' />
      <circle cx='360' cy='144' r='2.4' fill='#fff' />
      <g fill='#d97757' opacity='0.7' transform='translate(180 60)'>
        <ellipse cx='6' cy='14' rx='3' ry='5' transform='rotate(-15 6 14)' />
        <ellipse cx='14' cy='8' rx='2.4' ry='4' />
        <ellipse cx='22' cy='10' rx='2.4' ry='4' transform='rotate(15 22 10)' />
        <ellipse cx='14' cy='20' rx='4.4' ry='6.4' />
      </g>
    </svg>
  )
}
