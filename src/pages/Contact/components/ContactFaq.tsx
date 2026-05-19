import { useState } from 'react'
import SectionHead from '@/components/ui/SectionHead'
import { FAQ_ITEMS } from '../data'

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section
      className='section mb-7'
      style={{ background: 'var(--soft)', borderRadius: 28 }}
    >
      <SectionHead eyebrow='FAQ' heading='Quick answers, before you write' />
      <div className='max-w-220 mx-auto'>
        {FAQ_ITEMS.map(({ question, answer }, i) => (
          <div key={question} className={`faq-item${openIndex === i ? ' open' : ''}`}>
            <div
              className='faq-question mx-auto'
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setOpenIndex(openIndex === i ? -1 : i)}
            >
              <h4>{question}</h4>
              <span className='faq-toggle'>
                <svg width='14' height='14' viewBox='0 0 14 14'>
                  <path
                    d='M7 2 V12 M2 7 H12'
                    stroke={openIndex === i ? '#fff' : '#1d2235'}
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </span>
            </div>
            <div className='faq-answer'>{answer}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
