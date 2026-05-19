import SectionHead from '@/components/ui/SectionHead'
import { HOW_IT_WORKS } from '../data'

export default function UseCasesHowItWorks() {
  return (
    <section
      className='section rounded-[28px] max-sm:px-5'
      style={{ background: 'var(--soft)' }}
    >
      <SectionHead
        eyebrow='How it works'
        heading='The adoption process, end to end'
        subheading='KodaNest handles the connection — shelters handle the decision.'
      />
      <div className='max-w-215 mx-auto flex flex-col gap-8'>
        {HOW_IT_WORKS.map(({ step, title, desc }) => (
          <div key={step} className='flex gap-6 items-start'>
            <span
              className='shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-[15px] text-white'
              style={{ background: 'var(--rausch)' }}
            >
              {step}
            </span>
            <div>
              <h4 className='mb-1.5'>{title}</h4>
              <p className='text-(--ink-2)'>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
