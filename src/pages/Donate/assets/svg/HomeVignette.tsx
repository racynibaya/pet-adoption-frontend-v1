export const HomeVignette = () => (
  <svg viewBox='0 0 120 80' width='100%' height='100%' fill='none'>
    <path
      d='M6 70 H114'
      stroke='#E8C28A'
      strokeWidth='1'
      strokeDasharray='2 3'
    />
    {/* couch */}
    <path
      d='M20 60 Q20 50 30 50 H90 Q100 50 100 60 V68 H20 Z'
      fill='#F9BCC8'
      stroke='#BF3B5C'
      strokeWidth='1.4'
    />
    <path d='M28 50 V58 M92 50 V58' stroke='#BF3B5C' strokeWidth='1.4' />
    {/* family silhouettes */}
    <circle cx='40' cy='40' r='4' fill='#3C4E4E' />
    <path d='M34 56 Q34 46 40 46 Q46 46 46 56' fill='#3C4E4E' />
    <circle cx='52' cy='42' r='3' fill='#3C4E4E' />
    <path d='M48 56 Q48 48 52 48 Q56 48 56 56' fill='#3C4E4E' />
    {/* curled cat */}
    <path
      d='M68 58 Q66 52 74 52 Q82 52 84 58 Q82 62 76 62 Q70 62 68 58 Z'
      fill='#E8923C'
      stroke='#A55E24'
      strokeWidth='1.4'
    />
    <path
      d='M82 54 Q86 52 84 50 M80 52 Q80 50 82 50'
      stroke='#A55E24'
      strokeWidth='1.2'
      fill='none'
    />
    {/* heart over family */}
    <path
      d='M44 20 Q46 16 50 18 Q54 16 56 20 Q56 24 50 30 Q44 24 44 20 Z'
      fill='#D94F68'
      opacity='0.85'
    />
  </svg>
);
