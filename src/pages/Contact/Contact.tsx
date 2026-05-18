import { useState } from 'react';
import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';

type Topic = 'adopt' | 'shelter' | 'application' | 'other';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I apply to adopt a pet?',
    answer:
      "Create an account, browse available pets, and click 'Apply to adopt' on any listing. You'll fill out your adopter profile — living situation, experience, working hours — and add a personal message to the shelter.",
  },
  {
    question: 'How long does the review process take?',
    answer:
      "Each shelter sets its own timeline, but most applications receive a response within 3–7 days. You'll get an email notification the moment your application status changes.",
  },
  {
    question: 'What happens if my application is rejected?',
    answer:
      "A rejection means this specific pet wasn't the right fit — it doesn't mean you can't adopt. You're free to apply for other pets. The shelter may share feedback to help you find a better match.",
  },
  {
    question: 'Can I apply for multiple pets at the same time?',
    answer:
      'Yes. There is no limit on the number of active applications. Each application requires a separate adopter profile and message to the relevant shelter.',
  },
  {
    question: 'Can I cancel my application?',
    answer:
      "Yes — you can cancel any pending application from your account at any time, as long as it hasn't already been approved.",
  },
];

const OFFICES = [
  {
    code: 'SFC',
    name: 'San Agustin, SFC. HQ',
    addr: 'Brgy. San Agustin Chismosa St, Aprt No.4 · Mon–Fri, 9–6',
  },
  {
    code: 'MNL',
    name: 'Manila, Philippines',
    addr: 'BGC Taguig - Fort Bonifacio · Tue–Sat, 10–7',
  },
  {
    code: 'AFM',
    name: 'Siargao - Lugar ng AFAM',
    addr: 'General Luna, 8419 Surigao del Norte · Wed–Sun, 11–6',
  },
];

const TOPIC_BUTTONS: { key: Topic; label: string; icon: React.ReactNode }[] = [
  {
    key: 'adopt',
    label: 'Adopt a pet',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28'>
        <path
          d='M14 4 Q19 1 22 5 Q26 11 14 22 Q2 11 6 5 Q9 1 14 4Z'
          fill='#D94F68'
        />
      </svg>
    ),
  },
  {
    key: 'shelter',
    label: 'Register shelter',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28'>
        <path
          d='M14 4 L24 10 L24 22 L18 22 L18 16 L10 16 L10 22 L4 22 L4 10 Z'
          fill='none'
          stroke='#1D7575'
          strokeWidth='1.6'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    key: 'application',
    label: 'My application',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28'>
        <rect
          x='6'
          y='4'
          width='16'
          height='20'
          rx='2'
          fill='none'
          stroke='#2F97AC'
          strokeWidth='1.6'
        />
        <line
          x1='10'
          y1='10'
          x2='18'
          y2='10'
          stroke='#2F97AC'
          strokeWidth='1.6'
          strokeLinecap='round'
        />
        <line
          x1='10'
          y1='14'
          x2='18'
          y2='14'
          stroke='#2F97AC'
          strokeWidth='1.6'
          strokeLinecap='round'
        />
        <line
          x1='10'
          y1='18'
          x2='14'
          y2='18'
          stroke='#2F97AC'
          strokeWidth='1.6'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    key: 'other',
    label: 'Other',
    icon: (
      <svg width='28' height='28' viewBox='0 0 28 28'>
        <circle
          cx='14'
          cy='14'
          r='9'
          fill='none'
          stroke='#2F97AC'
          strokeWidth='1.6'
        />
        <circle cx='14' cy='14' r='2' fill='#2F97AC' />
      </svg>
    ),
  },
];

const PawprintDeco = () => (
  <svg width='60' height='40' viewBox='0 0 60 40'>
    <g fill='#d97757' opacity='0.7'>
      <ellipse cx='10' cy='14' rx='2' ry='3.4' transform='rotate(-15 10 14)' />
      <ellipse cx='18' cy='10' rx='1.6' ry='2.6' />
      <ellipse cx='24' cy='16' rx='1.6' ry='2.6' />
      <ellipse cx='16' cy='22' rx='2.8' ry='4.2' />
    </g>
  </svg>
);

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className='max-w-220 mx-auto'>
      {FAQ_ITEMS.map(({ question, answer }, i) => (
        <div
          key={question}
          className={`faq-item${openIndex === i ? ' open' : ''}`}
        >
          <div
            className='faq-question mx-auto'
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' && setOpenIndex(openIndex === i ? -1 : i)
            }
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
  );
}

export default function ContactPage() {
  const [activeTopic, setActiveTopic] = useState<Topic>('adopt');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: 'San Agustin HQ, PH',
    pet: 'Dog',
    message: '',
    updates: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className='contact-hero mt-6 rounded-[28px] text-center relative overflow-hidden'
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 78% 18%, rgba(93,181,196,0.45) 0%, transparent 50%),' +
            'radial-gradient(ellipse 50% 55% at 22% 82%, rgba(253,224,178,0.58) 0%, transparent 52%),' +
            'linear-gradient(155deg, #FDF5E2 0%, #F9E8CC 100%)',
        }}
      >
        <span className='contact-paw-tl'>
          <PawprintDeco />
        </span>
        <span className='contact-paw-br'>
          <PawprintDeco />
        </span>
        <Eyebrow style={{ justifyContent: 'center' }}>Get in touch</Eyebrow>
        <div className='flex items-center flex-col'>
          <h1 className='hero-title mt-16 max-w-180 mx-auto'>
            Have a question?
            <br />
            We're here to help
          </h1>
          <p
            className='max-w-140 mx-auto text-[17px]'
            style={{ marginTop: 20, color: 'var(--ink-2)' }}
          >
            Reach out about adoption, your application status, registering a
            shelter, or anything else. A real person replies within 24 hours.
          </p>
        </div>
      </section>

      {/* Reach cards */}
      <div className='contact-reach-cards r-grid-3 gap-6 relative z-5'>
        {/* Message */}
        <div
          className='bg-(--canvas) rounded-[20px] text-left [box-shadow:var(--shadow-card)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)]'
          style={{ padding: '32px 28px' }}
        >
          <div
            className='w-12 h-12 rounded-[14px] flex items-center justify-center mb-4'
            style={{ background: 'var(--cream)' }}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
              <path
                d='M3 5 Q3 3 5 3 H17 Q19 3 19 5 V14 Q19 16 17 16 H7 L3 19 Z'
                stroke='#d97757'
                strokeWidth='1.8'
                fill='none'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <h3 style={{ fontSize: 18 }}>Send us a message</h3>
          <div
            className='mt-2 text-[22px] font-semibold'
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            hello@kodanest.co
          </div>
          <div className='text-[13px] mt-1.5' style={{ color: 'var(--muted)' }}>
            Reply within 24 hours, every day of the week.
          </div>
        </div>

        {/* Phone */}
        <div
          className='bg-(--canvas) rounded-[20px] text-left [box-shadow:var(--shadow-card)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)]'
          style={{ padding: '32px 28px' }}
        >
          <div
            className='w-12 h-12 rounded-[14px] flex items-center justify-center mb-4'
            style={{ background: 'var(--rose)' }}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
              <path
                d='M4 4 Q4 2 6 2 H8 L10 7 L7 9 Q9 14 13 16 L15 13 L20 15 V18 Q20 20 18 20 A16 16 0 0 1 4 4Z'
                stroke='#D94F68'
                strokeWidth='1.8'
                fill='none'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <h3 style={{ fontSize: 18 }}>24/7 emergency line</h3>
          <div
            className='mt-2 text-[22px] font-semibold'
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            1-800-KODA-NEST
          </div>
          <div className='text-[13px] mt-1.5' style={{ color: 'var(--muted)' }}>
            For urgent pet medical concerns, day or night.
          </div>
        </div>

        {/* Visit */}
        <div
          className='bg-(--canvas) rounded-[20px] text-left [box-shadow:var(--shadow-card)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)]'
          style={{ padding: '32px 28px' }}
        >
          <div
            className='w-12 h-12 rounded-[14px] flex items-center justify-center mb-4'
            style={{ background: 'var(--mint)' }}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
              <path
                d='M11 2 Q4 2 4 9 Q4 14 11 20 Q18 14 18 9 Q18 2 11 2Z'
                stroke='#1D7575'
                strokeWidth='1.8'
                fill='none'
              />
              <circle cx='11' cy='9' r='2.4' fill='#1D7575' />
            </svg>
          </div>
          <h3 style={{ fontSize: 18 }}>Visit us in person</h3>
          <div
            className='mt-2 text-[22px] font-semibold'
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            3 cities, no appt.
          </div>
          <div className='text-[13px] mt-1.5' style={{ color: 'var(--muted)' }}>
            Drop in for a counselor session in San Agustin, Port Bonifacio, MNL,
            or Siargao.
          </div>
        </div>
      </div>

      {/* Form + info */}
      <div className='r-grid-side gap-16 items-start contact-form-grid'>
        <form
          className='bg-(--canvas) border border-(--hairline-soft) rounded-3xl'
          style={{ padding: 40 }}
          onSubmit={handleSubmit}
        >
          {submitted ? (
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
                  animation:
                    'authScaleIn 0.42s cubic-bezier(0.34,1.56,0.64,1) 0.1s both',
                }}
              >
                <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
                  <polyline
                    points='8 16 14 22 24 10'
                    stroke='#1D7575'
                    strokeWidth='3'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <h2 style={{ fontSize: 30 }}>
                Thanks — your message is on its way
              </h2>
              <p
                className='mt-12 muted'
                style={{ maxWidth: 380, margin: '12px auto 0' }}
              >
                A real human (probably with a dog on their lap) will read this
                and reply within 24 hours.
              </p>
              <Link to='/' className='btn btn-soft mt-32'>
                Back to home
              </Link>
            </div>
          ) : (
            <div className='flex flex-col gap-4.5'>
              <div>
                <h2 style={{ fontSize: 32 }}>Tell us a bit about you</h2>
                <p className='muted mt-8'>
                  Pick a topic, fill in the details, and we'll match you to the
                  right counselor.
                </p>
              </div>

              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: 10,
                  }}
                >
                  What's it about?
                </label>
                <div className='r-grid-4 gap-2.5 contact-topic-grid'>
                  {TOPIC_BUTTONS.map(({ key, label, icon }) => (
                    <button
                      key={key}
                      type='button'
                      onClick={() => setActiveTopic(key)}
                      className='border-[1.5px] rounded-[14px] text-center cursor-pointer text-[13px] font-medium transition-[border-color,background,transform,box-shadow] duration-200 hover:border-(--ink) hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-soft)] active:scale-[0.96]'
                      style={{
                        padding: '14px 8px',
                        fontFamily: 'inherit',
                        background:
                          activeTopic === key
                            ? 'var(--cream)'
                            : 'var(--canvas)',
                        borderColor:
                          activeTopic === key
                            ? 'var(--ink)'
                            : 'var(--hairline)',
                      }}
                    >
                      <span className='block mx-auto mb-1.5 transition-transform duration-200 hover:scale-[1.15]'>
                        {icon}
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className='r-grid-form-2 gap-4'>
                <div className='field'>
                  <label htmlFor='firstName'>First name</label>
                  <input
                    id='firstName'
                    type='text'
                    placeholder='John'
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className='field'>
                  <label htmlFor='lastName'>Last name</label>
                  <input
                    id='lastName'
                    type='text'
                    placeholder='Doe'
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className='r-grid-form-2 gap-4'>
                <div className='field'>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className='field'>
                  <label htmlFor='phone'>Phone (optional)</label>
                  <input
                    id='phone'
                    type='tel'
                    placeholder='+63 9XX XXX XXX'
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className='r-grid-form-2 gap-4'>
                <div className='field'>
                  <label htmlFor='city'>Where are you?</label>
                  <select
                    id='city'
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  >
                    <option>San Agustin, PH</option>
                    <option>Port Bonifacio, MNL</option>
                    <option>Siargao, AFM</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className='field'>
                  <label htmlFor='pet'>Pet (or hoping for)</label>
                  <select
                    id='pet'
                    value={formData.pet}
                    onChange={(e) =>
                      setFormData({ ...formData, pet: e.target.value })
                    }
                  >
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Rabbit</option>
                    <option>Bird</option>
                    <option>Reptile</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className='field'>
                <label htmlFor='message'>Anything else we should know?</label>
                <textarea
                  id='message'
                  placeholder="Tell us about your home, schedule, or the pet you're looking for…"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <div
                className='flex gap-3 items-center rounded-xl'
                style={{ padding: 14, background: 'var(--soft)' }}
              >
                <input
                  type='checkbox'
                  id='updates'
                  style={{
                    width: 18,
                    height: 18,
                    accentColor: 'var(--rausch)',
                  }}
                  checked={formData.updates}
                  onChange={(e) =>
                    setFormData({ ...formData, updates: e.target.checked })
                  }
                />
                <label
                  htmlFor='updates'
                  style={{
                    fontSize: 14,
                    color: 'var(--ink-2)',
                    cursor: 'pointer',
                  }}
                >
                  Send me monthly stories about adoptions, foster wins, and care
                  tips. No spam, no exclamation marks.
                </label>
              </div>

              <button
                type='submit'
                className='btn btn-primary btn-lg'
                style={{ width: '100%' }}
              >
                Send my message →
              </button>
            </div>
          )}
        </form>

        {/* Info side */}
        <div className='pt-2'>
          <h3 style={{ fontSize: 22, marginBottom: 18 }}>Or visit us</h3>
          <div
            className='contact-map-card rounded-3xl relative overflow-hidden map-card-grid'
            style={{ background: 'var(--cream)' }}
          >
            <span className='absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-full w-9 h-12'>
              <svg width='36' height='48' viewBox='0 0 36 48' fill='none'>
                <path
                  d='M18 2 Q4 2 4 16 Q4 28 18 46 Q32 28 32 16 Q32 2 18 2Z'
                  fill='#E8923C'
                />
                <circle cx='18' cy='16' r='6' fill='#fff' />
              </svg>
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
                  <div
                    style={{
                      color: 'var(--muted)',
                      fontSize: 13,
                      marginTop: 2,
                    }}
                  >
                    {addr}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section
        className='section mb-7'
        style={{ background: 'var(--soft)', borderRadius: 28 }}
      >
        <SectionHead eyebrow='FAQ' heading='Quick answers, before you write' />
        <FaqAccordion />
      </section>
    </>
  );
}
