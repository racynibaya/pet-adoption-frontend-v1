import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/Home/Home'
import AboutPage from '@/pages/About/About'
import PetsPage from '@/pages/Services/Services'
import SheltersPage from '@/pages/UseCases/UseCases'
import ContactPage from '@/pages/Contact/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/shelters" element={<SheltersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
