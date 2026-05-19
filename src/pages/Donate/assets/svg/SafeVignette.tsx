export const SafeVignette = () => (
  <svg viewBox='0 0 120 80' width='100%' height='100%' fill='none'>
    <path
      d='M6 70 H114'
      stroke='#E8C28A'
      strokeWidth='1'
      strokeDasharray='2 3'
    />
    {/* carrier crate */}
    <rect
      x='34'
      y='38'
      width='52'
      height='30'
      rx='6'
      fill='#FDDDB0'
      stroke='#A55E24'
      strokeWidth='1.6'
    />
    <path
      d='M38 46 H82 M38 52 H82 M38 58 H82'
      stroke='#A55E24'
      strokeWidth='1'
    />
    {/* handle */}
    <path
      d='M50 38 Q60 30 70 38'
      stroke='#A55E24'
      strokeWidth='1.6'
      fill='none'
    />
    {/* peeking face */}
    <circle cx='60' cy='52' r='5' fill='#FEF5E2' />
    <circle cx='58' cy='52' r='0.8' fill='#1C2C2C' />
    <circle cx='62' cy='52' r='0.8' fill='#1C2C2C' />
    {/* tiny heart */}
    <path
      d='M82 30 Q84 27 87 28 Q90 27 92 30 Q92 33 87 38 Q82 33 82 30 Z'
      fill='#D94F68'
    />
  </svg>
);
