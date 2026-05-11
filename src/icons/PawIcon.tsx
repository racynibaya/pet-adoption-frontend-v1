export default function PawIcon({ width = 20, height = 20 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <ellipse cx="6" cy="9" rx="2.2" ry="3" fill="#ff385c" />
      <ellipse cx="11" cy="6" rx="2" ry="2.6" fill="#ff385c" />
      <ellipse cx="16" cy="7" rx="2" ry="2.6" fill="#ff385c" />
      <ellipse cx="19" cy="11" rx="2" ry="2.6" fill="#ff385c" />
      <path
        d="M12.5 11c-3.3 0-6.5 2.5-6.5 5.5 0 1.7 1.3 3 3 3 1 0 1.8-.4 2.6-.7.6-.2 1.2-.4 1.9-.4s1.3.2 1.9.4c.8.3 1.6.7 2.6.7 1.7 0 3-1.3 3-3 0-3-3.2-5.5-6.5-5.5Z"
        fill="#ff385c"
      />
    </svg>
  )
}
