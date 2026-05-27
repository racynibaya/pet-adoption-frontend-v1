export function LostPup() {
  return (
    <svg
      viewBox='0 0 220 220'
      width='100%'
      height='100%'
      role='img'
      aria-label='A small dog peeking out'
      style={{ display: 'block' }}
    >
      <defs>
        <radialGradient id='lp-floor' cx='50%' cy='62%' r='55%'>
          <stop offset='0%' stopColor='#fef0d8' />
          <stop offset='60%' stopColor='#fdddb0' />
          <stop offset='100%' stopColor='#fac878' />
        </radialGradient>
        <linearGradient id='lp-fur' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stopColor='#fac878' />
          <stop offset='100%' stopColor='#e8923c' />
        </linearGradient>
        <linearGradient id='lp-ear' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stopColor='#cb7730' />
          <stop offset='100%' stopColor='#a55e24' />
        </linearGradient>
      </defs>

      {/* Circular ground tint */}
      <circle cx='110' cy='110' r='104' fill='url(#lp-floor)' />

      {/* Soft shadow under pup */}
      <ellipse cx='110' cy='176' rx='52' ry='8' fill='#a55e24' opacity='0.18' />

      {/* Tail wagging off to the side */}
      <path
        d='M 158 138 Q 184 124 188 96 Q 188 90 182 92 Q 178 116 152 128 Z'
        fill='url(#lp-fur)'
      />

      {/* Body */}
      <path
        d='M 68 168 Q 60 130 88 118 Q 110 110 132 118 Q 160 130 152 168 Z'
        fill='url(#lp-fur)'
      />

      {/* Front paws */}
      <ellipse cx='90' cy='170' rx='12' ry='8' fill='#cb7730' />
      <ellipse cx='130' cy='170' rx='12' ry='8' fill='#cb7730' />
      <circle cx='86' cy='168' r='2.2' fill='#5e3410' />
      <circle cx='94' cy='168' r='2.2' fill='#5e3410' />
      <circle cx='126' cy='168' r='2.2' fill='#5e3410' />
      <circle cx='134' cy='168' r='2.2' fill='#5e3410' />

      {/* Head */}
      <ellipse cx='110' cy='100' rx='44' ry='40' fill='url(#lp-fur)' />

      {/* Floppy ears */}
      <path
        d='M 70 78 Q 56 88 60 116 Q 64 132 80 128 Q 84 110 86 92 Z'
        fill='url(#lp-ear)'
      />
      <path
        d='M 150 78 Q 164 88 160 116 Q 156 132 140 128 Q 136 110 134 92 Z'
        fill='url(#lp-ear)'
      />

      {/* Forehead stripe — small detail */}
      <path
        d='M 102 70 Q 110 64 118 70 Q 116 80 110 82 Q 104 80 102 70 Z'
        fill='#fef5e2'
        opacity='0.6'
      />

      {/* Eyes — soft, looking up curiously */}
      <ellipse cx='96' cy='102' rx='5' ry='6' fill='#1c2c2c' />
      <ellipse cx='124' cy='102' rx='5' ry='6' fill='#1c2c2c' />
      <circle cx='98' cy='99' r='1.6' fill='#fff' />
      <circle cx='126' cy='99' r='1.6' fill='#fff' />

      {/* Snout */}
      <ellipse cx='110' cy='118' rx='14' ry='10' fill='#fde9c4' />

      {/* Nose */}
      <path
        d='M 104 112 Q 110 108 116 112 Q 116 118 110 120 Q 104 118 104 112 Z'
        fill='#1c2c2c'
      />

      {/* Smile */}
      <path
        d='M 104 122 Q 110 128 116 122'
        stroke='#1c2c2c'
        strokeWidth='2'
        strokeLinecap='round'
        fill='none'
      />

      {/* Tiny collar tag with question mark — the "lost" detail */}
      <rect x='98' y='148' width='24' height='6' rx='3' fill='#d94f68' />
      <circle cx='110' cy='158' r='6' fill='#fef5e2' stroke='#d94f68' strokeWidth='1.5' />
      <text
        x='110'
        y='161'
        textAnchor='middle'
        fontFamily='Lora, Georgia, serif'
        fontSize='8'
        fontWeight='700'
        fill='#d94f68'
      >
        ?
      </text>
    </svg>
  );
}
