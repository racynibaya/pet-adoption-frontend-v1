import type { CSSProperties } from 'react';

interface EyebrowProps {
  children: string;
  style?: CSSProperties;
  className?: string;
}

export default function Eyebrow({ children, style, className }: EyebrowProps) {
  return (
    <span
      className={`eyebrow${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </span>
  );
}
