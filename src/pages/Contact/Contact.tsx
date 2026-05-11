import { useState } from 'react';
import { Link } from 'react-router-dom';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';
import styles from './Contact.module.css';

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
          fill='#ff385c'
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
          stroke='#3a8c6a'
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
          stroke='#5a8cb0'
          strokeWidth='1.6'
        />
        <line
          x1='10'
          y1='10'
          x2='18'
          y2='10'
          stroke='#5a8cb0'
          strokeWidth='1.6'
          strokeLinecap='round'
        />
        <line
          x1='10'
          y1='14'
          x2='18'
          y2='14'
          stroke='#5a8cb0'
          strokeWidth='1.6'
          strokeLinecap='round'
        />
        <line
          x1='10'
          y1='18'
          x2='14'
          y2='18'
          stroke='#5a8cb0'
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
          stroke='#5a8cb0'
          strokeWidth='1.6'
        />
        <circle cx='14' cy='14' r='2' fill='#5a8cb0' />
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
    <div className={styles.faq}>
      {FAQ_ITEMS.map(({ question, answer }, i) => (
        <div
          key={question}
          className={`${styles.faqItem}${openIndex === i ? ` ${styles.open}` : ''}`}
        >
          <div
            className={styles.faqQ}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' && setOpenIndex(openIndex === i ? -1 : i)
            }
          >
            <h4>{question}</h4>
            <span className={styles.faqToggle}>
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
          <div className={styles.faqA}>{answer}</div>
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
      <section className={styles.contactHero}>
        <span className={styles.decoL}>
          <PawprintDeco />
        </span>
        <span className={styles.decoR}>
          <PawprintDeco />
        </span>
        <Eyebrow style={{ justifyContent: 'center' }}>Get in touch</Eyebrow>
        <h1 className='mt-16'>
          Have a question?
          <br />
          We're here to help
        </h1>
        <p>
          Reach out about adoption, your application status, registering a
          shelter, or anything else. A real person replies within 24 hours.
        </p>
      </section>

      {/* Reach cards */}
      <section className={styles.reachGrid}>
        <div className={styles.reach}>
          <div
            className={styles.reachIcon}
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
          <h3>Send us a message</h3>
          <div className={styles.val}>hello@kodanest.co</div>
          <div className={styles.sub}>
            Reply within 24 hours, every day of the week.
          </div>
        </div>
        <div className={styles.reach}>
          <div
            className={styles.reachIcon}
            style={{ background: 'var(--rose)' }}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
              <path
                d='M4 4 Q4 2 6 2 H8 L10 7 L7 9 Q9 14 13 16 L15 13 L20 15 V18 Q20 20 18 20 A16 16 0 0 1 4 4Z'
                stroke='#ff385c'
                strokeWidth='1.8'
                fill='none'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <h3>24/7 emergency line</h3>
          <div className={styles.val}>1-800-PAW-HAVN</div>
          <div className={styles.sub}>
            For urgent pet medical concerns, day or night.
          </div>
        </div>
        <div className={styles.reach}>
          <div
            className={styles.reachIcon}
            style={{ background: 'var(--mint)' }}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
              <path
                d='M11 2 Q4 2 4 9 Q4 14 11 20 Q18 14 18 9 Q18 2 11 2Z'
                stroke='#3a8c6a'
                strokeWidth='1.8'
                fill='none'
              />
              <circle cx='11' cy='9' r='2.4' fill='#3a8c6a' />
            </svg>
          </div>
          <h3>Visit us in person</h3>
          <div className={styles.val}>3 cities, no appt.</div>
          <div className={styles.sub}>
            Drop in for a counselor session in San Agustin, Port Bonifacio, MNL
            , or Siargao.
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className={styles.formSection}>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          {submitted ? (
            <div className={styles.submittedMsg}>
              <div className={styles.checkCircle}>
                <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
                  <polyline
                    points='8 16 14 22 24 10'
                    stroke='#3a8c6a'
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
            <div className={styles.formStack}>
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
                <div className={styles.petTypeGrid}>
                  {TOPIC_BUTTONS.map(({ key, label, icon }) => (
                    <button
                      key={key}
                      type='button'
                      className={`${styles.petType}${activeTopic === key ? ` ${styles.active}` : ''}`}
                      onClick={() => setActiveTopic(key)}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formRow}>
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

              <div className={styles.formRow}>
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

              <div className={styles.formRow}>
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
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  padding: 14,
                  background: 'var(--soft)',
                  borderRadius: 12,
                }}
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

        <div className={styles.infoSide}>
          <h3 style={{ fontSize: 22, marginBottom: 18 }}>Or visit us</h3>
          <div className={styles.mapCard}>
            <span className={styles.mapPin}>
              <svg width='36' height='48' viewBox='0 0 36 48' fill='none'>
                <path
                  d='M18 2 Q4 2 4 16 Q4 28 18 46 Q32 28 32 16 Q32 2 18 2Z'
                  fill='#ff385c'
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

          <div className={styles.officeList}>
            {OFFICES.map(({ code, name, addr }) => (
              <div key={code} className={styles.office}>
                <div className={styles.officeFlag}>{code}</div>
                <div>
                  <h4>{name}</h4>
                  <div className={styles.addr}>{addr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className='section'
        style={{ background: 'var(--soft)', borderRadius: 28 }}
      >
        <SectionHead eyebrow='FAQ' heading='Quick answers, before you write' />
        <FaqAccordion />
      </section>
    </>
  );
}
