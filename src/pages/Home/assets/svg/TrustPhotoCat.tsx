export const TrustPhotoCat = () => (
  <div
    className='home-trust-card-r absolute rounded-14 overflow-hidden transition-[transform,box-shadow] duration-340 hover:-translate-y-1.5 hover:scale-[1.02] hover:[box-shadow:0_16px_40px_rgba(0,0,0,0.13)]'
    style={{
      right: 0,
      top: 60,
      width: 250,
      height: 320,
      background: '#f5cd6a',
    }}
  >
    <svg viewBox='0 0 250 320' width='100%' height='100%'>
      <rect width='250' height='320' fill='#f5cd6a' />
      <polygon points='80,140 92,90 115,130' fill='#5a5853' />
      <polygon points='135,130 158,90 170,140' fill='#5a5853' />
      <ellipse cx='125' cy='190' rx='76' ry='62' fill='#827d76' />
      <ellipse cx='125' cy='200' rx='50' ry='34' fill='#cdc6bd' />
      <ellipse cx='100' cy='170' rx='6' ry='5' fill='#1d2235' />
      <ellipse cx='150' cy='170' rx='6' ry='5' fill='#1d2235' />
      <ellipse cx='125' cy='200' rx='6' ry='4' fill='#1d2235' />
      <path
        d='M125 204 L125 212 M125 212 Q115 220 105 215 M125 212 Q135 220 145 215'
        stroke='#1d2235'
        strokeWidth='1.8'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  </div>
);
