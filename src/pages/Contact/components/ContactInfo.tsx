import { MapPin } from 'lucide-react'
import { OFFICES } from '../data'

export default function ContactInfo() {
  return (
    <div className='pt-2'>
      <h3 style={{ fontSize: 22, marginBottom: 18 }}>Or visit us</h3>
      <div
        className='contact-map-card rounded-3xl relative overflow-hidden map-card-grid'
        style={{ background: 'var(--cream)' }}
      >
        <span className='absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-full w-9 h-12'>
          <MapPin size={36} color='var(--rausch)' fill='var(--rausch)' strokeWidth={2} />
        </span>
        <div style={{ position: 'relative', zIndex: 2, padding: 12 }}>
          <div className='pill' style={{ fontSize: 11 }}>
            KodaNest HQ · San Agustin
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3.5 mt-6'>
        {OFFICES.map(({ code, name, addr }) => (
          <div
            key={code}
            className='grid gap-3 items-center bg-(--canvas) border border-(--hairline-soft) rounded-2xl transition-[transform,border-color,box-shadow] duration-200 hover:translate-x-1.25 hover:border-(--hairline) hover:[box-shadow:var(--shadow-soft)]'
            style={{ gridTemplateColumns: '60px 1fr', padding: 16 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 22,
                color: 'var(--rausch)',
              }}
            >
              {code}
            </div>
            <div>
              <h4 style={{ fontSize: 15 }}>{name}</h4>
              <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>
                {addr}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
