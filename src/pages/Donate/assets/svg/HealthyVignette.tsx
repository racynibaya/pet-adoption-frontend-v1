export const HealthyVignette = () => (
  <svg viewBox='0 0 120 80' width='100%' height='100%' fill='none'>
    <path
      d='M6 70 H114'
      stroke='#E8C28A'
      strokeWidth='1'
      strokeDasharray='2 3'
    />
    {/* stethoscope curl */}
    <path
      d='M28 22 Q22 30 28 38 Q34 44 44 42'
      stroke='#1D7575'
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
    />
    <circle cx='28' cy='22' r='3' fill='#1D7575' />
    <circle
      cx='46'
      cy='44'
      r='4.5'
      fill='#5DB5C4'
      stroke='#1D7575'
      strokeWidth='1.4'
    />
    {/* pet standing, perky */}
    <path
      d='M60 64 Q60 50 72 50 Q86 48 92 56 L94 64 Z'
      fill='#FAC878'
      stroke='#CB7730'
      strokeWidth='1.4'
    />
    <circle
      cx='90'
      cy='50'
      r='6'
      fill='#FAC878'
      stroke='#CB7730'
      strokeWidth='1.4'
    />
    <path d='M86 44 Q84 40 88 42' fill='#CB7730' />
    <path d='M94 44 Q96 40 92 42' fill='#CB7730' />
    <circle cx='91' cy='50' r='0.8' fill='#1C2C2C' />
    {/* plus marks (vaccine) */}
    <path
      d='M16 50 V58 M12 54 H20'
      stroke='#D94F68'
      strokeWidth='1.6'
      strokeLinecap='round'
    />
  </svg>
);
