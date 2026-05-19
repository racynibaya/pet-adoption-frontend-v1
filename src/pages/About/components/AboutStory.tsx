import Eyebrow from '@/components/ui/Eyebrow'

export default function AboutStory() {
  return (
    <section className='section'>
      <div className='r-grid-side-rev gap-20 items-start about-story-grid'>
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 className='section-title mt-16'>
            From one rescued terrier to twelve thousand matches
          </h2>
        </div>
        <div className='story-drop-cap'>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.7 }}>
            KodaNest began in 2023, in a small barangay in La Union, after our
            founder Cris adopted a one-eyed terrier named Eli and discovered
            that finding a sitter for him while traveling was nearly
            impossible. The shelter that had matched her with Eli ran on
            spreadsheets. The sitter she eventually found ran on Venmo and
            crossed fingers. Both deserved better.
          </p>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.7, marginTop: 16 }}>
            Today, KodaNest is a platform built around a simple promise: the
            adoption process should feel as warm and trustworthy as handing
            your pet to a friend. We verify every shelter, require proof of
            care on every application, and send email notifications every time
            an application status changes — so adopters are never left
            wondering.
          </p>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.7, marginTop: 16 }}>
            We're a team of forty across Manila, Philippines. Most of us live
            with at least one rescued pet (one of us has six cats, which we
            don't recommend but do admire). We're hiring, and yes, you can
            bring your dog to the office.
          </p>
        </div>
      </div>
    </section>
  )
}
