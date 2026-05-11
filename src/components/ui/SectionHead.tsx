import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';

interface SectionHeadProps {
  eyebrow?: string;
  heading: ReactNode;
  subheading?: string;
}

export default function SectionHead({
  eyebrow,
  heading,
  subheading,
}: SectionHeadProps) {
  return (
    <div className='section-head'>
      {eyebrow && (
        <Eyebrow style={{ marginBottom: 12, justifyContent: 'center' }}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2>{heading}</h2>
      {subheading && <p>{subheading}</p>}
    </div>
  );
}
