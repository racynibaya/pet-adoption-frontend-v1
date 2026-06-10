import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

export default function ContactFormSuccess() {
  return (
    <div
      className='text-center'
      style={{
        padding: '20px 0',
        animation: 'authScaleIn 0.36s cubic-bezier(0.2,0,0,1) both',
      }}
    >
      <div
        className='w-18 h-18 rounded-full flex items-center justify-center mx-auto mb-5'
        style={{
          background: 'var(--mint)',
          animation: 'authScaleIn 0.42s cubic-bezier(0.34,1.56,0.64,1) 0.1s both',
        }}
      >
        <Check size={32} color='var(--color-teal-500)' strokeWidth={3} />
      </div>
      <h2 style={{ fontSize: 30 }}>Thanks — your message is on its way</h2>
      <p className='mt-12 muted' style={{ maxWidth: 380, margin: '12px auto 0' }}>
        A real human (probably with a dog on their lap) will read this
        and reply within 24 hours.
      </p>
      <Link to='/' className='btn btn-soft mt-32'>
        Back to home
      </Link>
    </div>
  )
}
