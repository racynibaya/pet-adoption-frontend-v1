export const FoundVignette = () => (
  <svg viewBox='0 0 120 80' width='100%' height='100%' fill='none'>
    <path
      d='M6 70 H114'
      stroke='#E8C28A'
      strokeWidth='1'
      strokeDasharray='2 3'
    />
    {/* lone small pup silhouette */}
    <ellipse cx='60' cy='62' rx='12' ry='6' fill='#3C4E4E' opacity='0.18' />
    <path
      d='M52 60 Q50 50 56 48 Q62 46 64 50 L68 50 Q72 48 74 52 Q74 58 70 60 Z'
      fill='#3C4E4E'
    />
    <circle cx='72' cy='52' r='4' fill='#3C4E4E' />
    {/* stars above */}
    <path
      d='M30 18 L31.5 22 L35.5 22 L32 24.5 L33 28.5 L30 26 L27 28.5 L28 24.5 L24.5 22 L28.5 22 Z'
      fill='#E8923C'
      opacity='0.65'
    />
    <path
      d='M90 28 L91 31 L94 31 L91.6 32.8 L92.4 36 L90 34 L87.6 36 L88.4 32.8 L86 31 L89 31 Z'
      fill='#5DB5C4'
      opacity='0.65'
    />
    <circle cx='102' cy='14' r='1.4' fill='#D94F68' opacity='0.7' />
  </svg>
);
