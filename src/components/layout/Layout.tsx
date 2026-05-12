import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SavedDrawer from '@/components/ui/SavedDrawer'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Scroll reveal — add .reveal to all sections, immediately mark those already in view
    const sections = document.querySelectorAll<HTMLElement>('.section, .section-tight')
    const vph = window.innerHeight || document.documentElement.clientHeight

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    )

    sections.forEach(el => {
      const rect = el.getBoundingClientRect()
      el.classList.add('reveal')
      if (rect.top < vph - 40 && rect.bottom > 0) {
        // Already visible — show immediately without transition delay
        el.classList.add('is-visible')
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [location.key])

  return (
    <>
      <Navbar />
      <main className="wrap">
        <div key={location.key} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <SavedDrawer />
    </>
  )
}
