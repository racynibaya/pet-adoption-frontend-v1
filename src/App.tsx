import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/Home/Home';
import AboutPage from '@/pages/About/About';
import PetsPage from '@/pages/Services/Services';
import PetDetailPage from '@/pages/PetDetail/PetDetail';
import SheltersPage from '@/pages/UseCases/UseCases';
import ContactPage from '@/pages/Contact/Contact';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { StaffProvider } from '@/context/StaffContext';
import StaffLayout from '@/components/staff/StaffLayout';
import StaffLogin from '@/pages/Staff/StaffLogin';
import StaffDashboard from '@/pages/Staff/StaffDashboard';
import StaffPets from '@/pages/Staff/StaffPets';
import StaffPetForm from '@/pages/Staff/StaffPetForm';
import StaffAdoptions from '@/pages/Staff/StaffAdoptions';

export default function App() {
  return (
    <StaffProvider>
      <FavoritesProvider>
        <Routes>
          {/* Public site */}
          <Route element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/pets' element={<PetsPage />} />
            <Route path='/pets/:id' element={<PetDetailPage />} />
            <Route path='/shelters' element={<SheltersPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
          </Route>

          {/* Staff portal */}
          <Route path='/staff/login' element={<StaffLogin />} />
          <Route element={<StaffLayout />}>
            <Route path='/staff' element={<StaffDashboard />} />
            <Route path='/staff/pets' element={<StaffPets />} />
            <Route path='/staff/pets/add' element={<StaffPetForm />} />
            <Route path='/staff/pets/:id/edit' element={<StaffPetForm />} />
            <Route path='/staff/adoptions' element={<StaffAdoptions />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </StaffProvider>
  );
}
