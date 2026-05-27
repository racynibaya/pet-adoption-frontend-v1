interface PawTrailProps {
  rotate?: number;
  opacity?: number;
}

export function PawTrail({ rotate = 0, opacity = 0.55 }: PawTrailProps) {
  return (
    <svg
      width='320'
      height='90'
      viewBox='0 0 320 90'
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
    >
      <g fill='#cb7730'>
        {/* Paw 1 */}
        <g transform='translate(8 22)' opacity='0.35'>
          <ellipse cx='14' cy='20' rx='3' ry='5' transform='rotate(-20 14 20)' />
          <ellipse cx='22' cy='14' rx='2.4' ry='4' />
          <ellipse cx='28' cy='22' rx='2.4' ry='4' />
          <ellipse cx='20' cy='28' rx='4' ry='6' />
        </g>
        {/* Paw 2 */}
        <g transform='translate(64 6)' opacity='0.5'>
          <ellipse cx='14' cy='20' rx='3' ry='5' transform='rotate(20 14 20)' />
          <ellipse cx='6' cy='14' rx='2.4' ry='4' />
          <ellipse cx='0' cy='22' rx='2.4' ry='4' />
          <ellipse cx='8' cy='28' rx='4' ry='6' />
        </g>
        {/* Paw 3 */}
        <g transform='translate(128 30)' opacity='0.62'>
          <ellipse cx='14' cy='20' rx='3' ry='5' transform='rotate(-20 14 20)' />
          <ellipse cx='22' cy='14' rx='2.4' ry='4' />
          <ellipse cx='28' cy='22' rx='2.4' ry='4' />
          <ellipse cx='20' cy='28' rx='4' ry='6' />
        </g>
        {/* Paw 4 */}
        <g transform='translate(192 14)' opacity='0.78'>
          <ellipse cx='14' cy='20' rx='3' ry='5' transform='rotate(20 14 20)' />
          <ellipse cx='6' cy='14' rx='2.4' ry='4' />
          <ellipse cx='0' cy='22' rx='2.4' ry='4' />
          <ellipse cx='8' cy='28' rx='4' ry='6' />
        </g>
        {/* Paw 5 */}
        <g transform='translate(256 38)' opacity='0.9'>
          <ellipse cx='14' cy='20' rx='3' ry='5' transform='rotate(-20 14 20)' />
          <ellipse cx='22' cy='14' rx='2.4' ry='4' />
          <ellipse cx='28' cy='22' rx='2.4' ry='4' />
          <ellipse cx='20' cy='28' rx='4' ry='6' />
        </g>
      </g>
    </svg>
  );
}
