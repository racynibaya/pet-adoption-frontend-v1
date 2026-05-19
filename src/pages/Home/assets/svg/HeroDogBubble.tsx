export const HeroDogBubble = () => (
  <span
    aria-hidden='true'
    style={{
      top: 92,
      left: 56,
      background: '#cfe6f7',
      animation: 'floatY 4s ease-in-out infinite',
    }}
    className='home-hero-bubble absolute w-21 h-21 rounded-full overflow-hidden [box-shadow:0_12px_32px_rgba(20,20,50,0.14)] border-4 border-white'
  >
    <svg viewBox='0 0 100 100' width='100%' height='100%'>
      <rect width='100' height='100' fill='#cfe6f7' />
      <ellipse cx='50' cy='58' rx='30' ry='24' fill='#e8a878' />
      <polygon points='22,38 30,20 38,40' fill='#c98a5c' />
      <polygon points='62,40 70,20 78,38' fill='#c98a5c' />
      <ellipse cx='50' cy='64' rx='22' ry='16' fill='#f3d2b3' />
      <circle cx='42' cy='56' r='2.2' fill='#1d2235' />
      <circle cx='58' cy='56' r='2.2' fill='#1d2235' />
      <ellipse cx='50' cy='64' rx='3' ry='2' fill='#1d2235' />
      <path
        d='M48 67 Q50 71 52 67'
        stroke='#1d2235'
        strokeWidth='1.4'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  </span>
);
