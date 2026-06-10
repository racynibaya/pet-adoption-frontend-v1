import { ArrowRight } from 'lucide-react'
import Eyebrow from '@/components/ui/Eyebrow'

interface ShelterDetailContactProps {
  shelterName: string
  contactEmail: string
  phoneNumber: string
}

interface ContactCardProps {
  channel: string
  label: string
  value: string
  href: string
  action: string
}

function ContactCard({ channel, label, value, href, action }: ContactCardProps) {
  return (
    <a
      href={href}
      className='group block rounded-3xl border border-(--hairline-soft) bg-white p-5 md:p-6 no-underline transition-all duration-300 hover:border-(--rausch) hover:-translate-y-1'
      style={{
        boxShadow: '0 1px 0 rgba(28,44,44,0.04)',
      }}
    >
      <span className='text-11 tracking-widest uppercase font-bold text-(--muted)'>
        {channel}
      </span>
      <p
        className='mt-3 text-13 text-(--ink-2) leading-snug'
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {label}
      </p>
      <p
        className='mt-1.5 text-18 sm:text-20 leading-tight text-(--ink) break-all'
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {value}
      </p>
      <span
        className='mt-4 inline-flex items-center gap-2 text-13 font-bold transition-transform duration-300 group-hover:translate-x-1'
        style={{ color: 'var(--rausch)' }}
      >
        {action}
        <ArrowRight size={13} aria-hidden='true' />
      </span>
    </a>
  )
}

export default function ShelterDetailContact({
  shelterName,
  contactEmail,
  phoneNumber,
}: ShelterDetailContactProps) {
  if (!contactEmail && !phoneNumber) return null

  return (
    <section className='section' style={{ padding: '28px 0' }}>
      <div className='flex flex-wrap items-end justify-between gap-4 mb-5'>
        <div className='flex items-center gap-3'>
          <span
            aria-hidden='true'
            className='block h-px w-12 rounded-full'
            style={{ background: 'var(--rausch)' }}
          />
          <Eyebrow>Get in touch</Eyebrow>
        </div>
        <p className='text-(--muted) text-14 max-w-100'>
          A real staff member from {shelterName} responds to every message.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {contactEmail && (
          <ContactCard
            channel='Email'
            label='Write to the adoptions team'
            value={contactEmail}
            href={`mailto:${contactEmail}`}
            action='Send email'
          />
        )}
        {phoneNumber && (
          <ContactCard
            channel='Phone'
            label='Talk to a staff member'
            value={phoneNumber}
            href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
            action='Call now'
          />
        )}
      </div>
    </section>
  )
}
