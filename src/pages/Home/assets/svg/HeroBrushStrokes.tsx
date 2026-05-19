export const HeroBrushStrokes = () => (
  <>
    <span
      aria-hidden='true'
      className='absolute opacity-[0.55]'
      style={{
        top: 20,
        left: 0,
        width: 380,
        height: 380,
        background: 'linear-gradient(135deg, #f7c4a3 0%, #f5b894 100%)',
        borderRadius: '220px 60px 280px 80px',
        transform: 'rotate(-12deg)',
      }}
    />
    <span
      aria-hidden='true'
      className='absolute opacity-[0.45]'
      style={{
        top: 90,
        left: 60,
        width: 360,
        height: 80,
        background: 'linear-gradient(90deg, #f5b894 0%, transparent 100%)',
        borderRadius: 999,
        transform: 'rotate(-18deg)',
      }}
    />
  </>
);
