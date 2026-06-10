export const TrustPhotoPerson = () => (
  <div
    className='home-trust-card-l absolute rounded-14 overflow-hidden transition-[transform,box-shadow] duration-340 hover:-translate-y-1.5 hover:scale-[1.02] hover:[box-shadow:0_16px_40px_rgba(0,0,0,0.13)]'
    style={{
      left: 0,
      top: 0,
      width: 240,
      height: 300,
      background: '#efe9e3',
    }}
  >
    <svg viewBox='0 0 240 300' width='100%' height='100%'>
      <rect width='240' height='300' fill='#efe9e3' />
      <ellipse cx='120' cy='120' rx='46' ry='54' fill='#e0c4ad' />
      <path
        d='M75 105 Q80 70 120 65 Q160 70 165 105 Q160 115 150 116 Q145 92 120 88 Q95 92 90 116 Q80 115 75 105Z'
        fill='#cfcdcb'
      />
      <ellipse cx='100' cy='125' rx='3' ry='4' fill='#1d2235' />
      <ellipse cx='140' cy='125' rx='3' ry='4' fill='#1d2235' />
      <path
        d='M108 148 Q120 154 132 148'
        stroke='#1d2235'
        strokeWidth='1.6'
        fill='none'
        strokeLinecap='round'
      />
      <path
        d='M92 145 Q95 175 120 180 Q145 175 148 145 Q140 158 120 160 Q100 158 92 145Z'
        fill='#cfcdcb'
      />
      <path
        d='M50 200 Q60 180 120 178 Q180 180 190 200 L195 300 L45 300 Z'
        fill='#5fb4d8'
      />
      <ellipse cx='120' cy='240' rx='40' ry='28' fill='#3a3530' />
      <ellipse cx='105' cy='232' rx='3' ry='2' fill='#fff' />
      <ellipse cx='135' cy='232' rx='3' ry='2' fill='#fff' />
      <ellipse cx='120' cy='248' rx='6' ry='4' fill='#1d1916' />
    </svg>
  </div>
);
