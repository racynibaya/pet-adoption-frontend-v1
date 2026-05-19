import type { ReactNode } from 'react'
import { MessageIcon, PhoneIcon, PinIcon } from '../assets'

interface ReachCardProps {
  icon: ReactNode
  iconBg: string
  title: string
  primary: string
  secondary: string
}

function ReachCard({ icon, iconBg, title, primary, secondary }: ReachCardProps) {
  return (
    <div
      className='bg-(--canvas) rounded-[20px] text-left [box-shadow:var(--shadow-card)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)]'
      style={{ padding: '32px 28px' }}
    >
      <div
        className='w-12 h-12 rounded-[14px] flex items-center justify-center mb-4'
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: 18 }}>{title}</h3>
      <div
        className='mt-2 text-[22px] font-semibold'
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
      >
        {primary}
      </div>
      <div className='text-[13px] mt-1.5' style={{ color: 'var(--muted)' }}>
        {secondary}
      </div>
    </div>
  )
}

export default function ContactReachCards() {
  return (
    <div className='contact-reach-cards r-grid-3 gap-6 relative z-5'>
      <ReachCard
        icon={<MessageIcon />}
        iconBg='var(--cream)'
        title='Send us a message'
        primary='hello@kodanest.co'
        secondary='Reply within 24 hours, every day of the week.'
      />
      <ReachCard
        icon={<PhoneIcon />}
        iconBg='var(--rose)'
        title='24/7 emergency line'
        primary='1-800-KODA-NEST'
        secondary='For urgent pet medical concerns, day or night.'
      />
      <ReachCard
        icon={<PinIcon />}
        iconBg='var(--mint)'
        title='Visit us in person'
        primary='3 cities, no appt.'
        secondary='Drop in for a counselor session in San Agustin, Port Bonifacio, MNL, or Siargao.'
      />
    </div>
  )
}
