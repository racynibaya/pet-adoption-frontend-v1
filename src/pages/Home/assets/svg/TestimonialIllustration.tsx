export const TestimonialIllustration = () => (
  <>
    <span
      className='absolute'
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 380,
        height: 380,
        background: '#fde2cf',
        borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
      }}
    />
    <svg
      viewBox='0 0 480 480'
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <ellipse cx='200' cy='190' rx='46' ry='52' fill='#f1c8a0' />
      <path
        d='M156 175 Q160 130 200 124 Q240 130 244 175 Q240 185 230 187 Q224 156 200 152 Q176 156 170 187 Q160 185 156 175Z'
        fill='#5a3a22'
      />
      <circle cx='186' cy='195' r='3' fill='#1d2235' />
      <circle cx='214' cy='195' r='3' fill='#1d2235' />
      <path
        d='M192 215 Q200 220 208 215'
        stroke='#1d2235'
        strokeWidth='1.8'
        fill='none'
        strokeLinecap='round'
      />
      <path
        d='M140 280 Q160 250 200 246 Q240 250 260 280 L268 360 L132 360 Z'
        fill='#fff'
      />
      <rect
        x='155'
        y='350'
        width='90'
        height='80'
        rx='6'
        fill='#3a73c2'
      />
      <path
        d='M255 310 Q310 320 350 360 Q360 380 340 388 Q300 372 270 362 Z'
        fill='#fff'
      />
      <ellipse cx='320' cy='380' rx='80' ry='50' fill='#cdcdcd' />
      <ellipse cx='320' cy='370' rx='48' ry='36' fill='#fff' />
      <polygon points='280,350 286,322 305,348' fill='#cdcdcd' />
      <polygon points='335,348 354,322 360,350' fill='#cdcdcd' />
      <circle cx='305' cy='370' r='3' fill='#1d2235' />
      <circle cx='335' cy='370' r='3' fill='#1d2235' />
      <ellipse cx='320' cy='382' rx='5' ry='3.4' fill='#1d2235' />
      <path
        d='M250 400 Q270 420 300 415'
        stroke='#d92a2a'
        strokeWidth='6'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  </>
);
