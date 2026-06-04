import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ShelterDetailCtaProps {
  shelterName: string
}

export default function ShelterDetailCta({ shelterName }: ShelterDetailCtaProps) {
  return (
    <section className='section-tight' style={{ padding: '20px 0 8px' }}>
      <div
        className='rounded-3xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-6'
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 100% 0%, rgba(29,117,117,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 0% 100%, rgba(232,146,60,0.14) 0%, transparent 55%),
            linear-gradient(135deg, #1C2C2C 0%, #2a3f3f 100%)
          `,
        }}
      >
        <div>
          <h3
            className='text-[20px] sm:text-[24px] leading-tight'
            style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
          >
            Ready to meet them?
          </h3>
          <p
            className='text-[13px] mt-1.5 max-w-150'
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Reach out to {shelterName} directly or submit an application
            through KodaNest. A real staff member reviews every request.
          </p>
        </div>
        <Link to='/contact' className='btn btn-primary btn-lg inline-flex items-center gap-2'>
          Apply to adopt <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
