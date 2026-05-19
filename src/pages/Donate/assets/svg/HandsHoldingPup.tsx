// ─── Hand-illustrated SVGs ────────────────────────────────────────────────────
export const HandsHoldingPup = () => (
  <svg
    viewBox='0 0 320 280'
    width='100%'
    height='100%'
    role='img'
    aria-label='Two hands gently cradling a sleeping puppy'
  >
    {/* Soft glow halo behind */}
    <defs>
      <radialGradient id='halo' cx='50%' cy='44%' r='40%'>
        <stop offset='0%' stopColor='#FDDDB0' stopOpacity='0.9' />
        <stop offset='70%' stopColor='#FEF5E2' stopOpacity='0' />
      </radialGradient>
      <linearGradient id='handGrad' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stopColor='#F5AE50' />
        <stop offset='100%' stopColor='#CB7730' />
      </linearGradient>
      <linearGradient id='pupGrad' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stopColor='#FDE9C4' />
        <stop offset='100%' stopColor='#FAC878' />
      </linearGradient>
    </defs>

    <circle cx='160' cy='124' r='118' fill='url(#halo)' />

    {/* Cupped hands — back palm */}
    <path
      d='M52 168 Q42 138 60 122 Q78 110 96 120 L120 140 Q132 148 144 148 H180 Q198 148 214 142 L242 130 Q262 122 274 138 Q288 158 270 184 Q256 206 232 218 Q204 234 168 236 Q126 236 96 224 Q70 212 60 196 Q50 184 52 168 Z'
      fill='url(#handGrad)'
      opacity='0.96'
    />
    {/* Front palm overlay */}
    <path
      d='M80 178 Q72 160 88 152 Q104 146 124 154 L150 168 Q162 174 174 174 H198 Q214 172 230 164 L246 156 Q260 152 268 168 Q272 184 258 200 Q240 216 212 222 Q176 230 142 222 Q112 214 96 202 Q84 192 80 178 Z'
      fill='#FAC878'
      opacity='0.7'
    />

    {/* Puppy body (curled, sleeping) */}
    <ellipse
      cx='162'
      cy='150'
      rx='56'
      ry='30'
      fill='url(#pupGrad)'
      stroke='#CB7730'
      strokeWidth='1.5'
    />
    {/* Puppy head */}
    <circle
      cx='198'
      cy='138'
      r='26'
      fill='url(#pupGrad)'
      stroke='#CB7730'
      strokeWidth='1.5'
    />
    {/* Floppy ear */}
    <path
      d='M186 118 Q172 108 168 124 Q166 138 184 138 Z'
      fill='#CB7730'
      opacity='0.7'
    />
    {/* Tail tucked */}
    <path
      d='M114 152 Q98 152 102 138 Q108 130 122 138'
      stroke='#CB7730'
      strokeWidth='3'
      fill='none'
      strokeLinecap='round'
    />
    {/* Sleeping eye */}
    <path
      d='M196 138 Q200 142 204 138'
      stroke='#5E3410'
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
    />
    {/* Snout & nose */}
    <path
      d='M212 144 Q220 146 218 152'
      stroke='#5E3410'
      strokeWidth='1.6'
      fill='none'
      strokeLinecap='round'
    />
    <ellipse cx='218' cy='146' rx='2.4' ry='1.6' fill='#5E3410' />

    {/* Heart floating above */}
    <g style={{ animation: 'floatY 3s ease-in-out infinite' }}>
      <path
        d='M204 70 Q210 60 218 64 Q226 60 232 70 Q232 80 218 92 Q204 80 204 70 Z'
        fill='#D94F68'
      />
    </g>

    {/* Tiny sparkle dots */}
    <circle cx='80' cy='90' r='2.5' fill='#E8923C' opacity='0.7' />
    <circle cx='266' cy='90' r='2' fill='#D94F68' opacity='0.7' />
    <circle cx='250' cy='52' r='1.8' fill='#1D7575' opacity='0.6' />
    <circle cx='62' cy='52' r='1.8' fill='#1D7575' opacity='0.6' />
  </svg>
);
