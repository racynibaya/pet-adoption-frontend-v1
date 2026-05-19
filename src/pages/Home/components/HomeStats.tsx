import { STATS } from '../data';

export default function HomeStats() {
  return (
    <section
      aria-label='Stats'
      className='home-stats relative z-5 [box-shadow:var(--shadow-card)] border border-(--hairline-soft) rounded-[20px]'
      style={{
        background: 'linear-gradient(145deg, var(--canvas) 0%, #f8f5ef 100%)',
      }}
    >
      {STATS.map(({ value, label }) => (
        <div
          key={label}
          className='text-center border-r border-(--hairline-soft)last:border-r-0'
        >
          <div className='home-stats-num'>{value}</div>
          <div className='home-stats-label'>{label}</div>
        </div>
      ))}
    </section>
  );
}
