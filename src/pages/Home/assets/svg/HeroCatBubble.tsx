export const HeroCatBubble = () => (
  <span
    aria-hidden='true'
    style={{
      top: 168,
      right: 84,
      width: 76,
      height: 76,
      background: '#ffe9b8',
      animation: 'floatY 5.2s ease-in-out 1s infinite',
    }}
    className='absolute rounded-full overflow-hidden [box-shadow:0_12px_32px_rgba(20,20,50,0.14)] border-4 border-white'
  >
    <svg viewBox='0 0 100 100' width='100%' height='100%'>
      <rect width='100' height='100' fill='#ffe9b8' />
      <polygon points='20,40 28,18 40,38' fill='#5a5853' />
      <polygon points='60,38 72,18 80,40' fill='#5a5853' />
      <ellipse cx='50' cy='58' rx='28' ry='24' fill='#7d7872' />
      <ellipse cx='50' cy='60' rx='20' ry='14' fill='#cdc6bd' />
      <ellipse cx='42' cy='54' rx='3' ry='2.6' fill='#1d2235' />
      <ellipse cx='58' cy='54' rx='3' ry='2.6' fill='#1d2235' />
      <ellipse cx='50' cy='62' rx='2.6' ry='1.8' fill='#1d2235' />
      <path
        d='M50 64 L50 67 M50 67 Q47 70 44 68 M50 67 Q53 70 56 68'
        stroke='#1d2235'
        strokeWidth='1.2'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  </span>
);
