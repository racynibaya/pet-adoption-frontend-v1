export const PawDeco = ({
  size = 24,
  opacity = 0.55,
}: {
  size?: number;
  opacity?: number;
}) => (
  <svg width={size} height={size} viewBox='0 0 30 30' fill='none' aria-hidden>
    <g fill='#D97757' opacity={opacity}>
      <ellipse cx='8' cy='10' rx='2' ry='3' />
      <ellipse cx='14' cy='6' rx='1.8' ry='2.6' />
      <ellipse cx='22' cy='10' rx='2' ry='3' />
      <ellipse cx='15' cy='20' rx='4.5' ry='5.5' />
    </g>
  </svg>
);
