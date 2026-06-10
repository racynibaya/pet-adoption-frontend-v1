import { ClipboardList, Search, ShieldCheck } from 'lucide-react'
import Eyebrow from '@/components/ui/Eyebrow'
import { HOW_IT_WORKS } from '../data'

const ListIcon = () => <ClipboardList size={26} color='var(--rausch-active)' strokeWidth={1.8} aria-hidden='true' />
const SearchIcon = () => <Search size={26} color='var(--color-teal-500)' strokeWidth={1.8} aria-hidden='true' />
const CheckIcon = () => <ShieldCheck size={26} color='var(--color-rose-600)' strokeWidth={1.8} aria-hidden='true' />

const STEP_VISUALS: { Icon: () => JSX.Element; iconBg: string }[] = [
  { Icon: ListIcon, iconBg: 'var(--rausch-soft)' },
  { Icon: SearchIcon, iconBg: 'var(--mint-2)' },
  { Icon: CheckIcon, iconBg: 'var(--color-rose-100)' },
]

export default function UseCasesHowItWorks() {
  return (
    <section className='section'>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div
          className='home-process-card rounded-28 relative overflow-hidden border border-(--hairline-soft)'
          style={{
            background:
              'linear-gradient(145deg, var(--soft) 0%, #eae8e2 100%)',
          }}
        >
          <div className='section-head' style={{ marginBottom: 64 }}>
            <Eyebrow
              style={{
                display: 'block',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              How it works
            </Eyebrow>
            <h2>
              Three steps,
              <br />
              one approved adoption
            </h2>
            <p>
              KodaNest handles the connection — shelters handle the decision.
              Every adoption is reviewed by the people who have met the animal.
            </p>
          </div>

          <div className='r-grid-3 gap-6 max-w-270 mx-auto'>
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => {
              const { Icon, iconBg } = STEP_VISUALS[i] ?? STEP_VISUALS[0]!
              return (
                <div
                  key={step}
                  className='bg-white rounded-18 relative [box-shadow:var(--shadow-soft)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1.25 hover:[box-shadow:var(--shadow-lift)]'
                  style={{ padding: '32px 28px' }}
                >
                  <span
                    className='absolute flex items-center text-white text-11 font-bold tracking-6 uppercase rounded-full'
                    style={{
                      top: -12,
                      left: 24,
                      height: 26,
                      padding: '0 12px',
                      background: 'var(--rausch)',
                    }}
                  >
                    Step {step}
                  </span>
                  <div
                    className='w-14 h-14 rounded-14 inline-flex items-center justify-center mb-4.5'
                    style={{ background: iconBg }}
                  >
                    <Icon />
                  </div>
                  <h4 style={{ fontSize: 18, marginBottom: 6 }}>{title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--muted)' }}>{desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
