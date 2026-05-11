import type { ReactNode } from 'react'

interface CtaBandProps {
  heading: ReactNode
  description: string
  children: ReactNode
}

export default function CtaBand({ heading, description, children }: CtaBandProps) {
  return (
    <section className="section-tight">
      <div className="cta-band">
        <div>
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
        <div className="row" style={{ gap: 12, justifyContent: 'flex-end' }}>
          {children}
        </div>
      </div>
    </section>
  )
}
