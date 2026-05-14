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
import { UserProvider } from '@/context/UserContext';
import StaffLayout from '@/components/staff/StaffLayout';
import StaffLogin from '@/pages/Staff/StaffLogin';
import StaffDashboard from '@/pages/Staff/StaffDashboard';
import StaffPets from '@/pages/Staff/StaffPets';
import StaffPetForm from '@/pages/Staff/StaffPetForm';
import StaffAdoptions from '@/pages/Staff/StaffAdoptions';
import UserLayout from '@/components/user/UserLayout';
import UserDashboard from '@/pages/User/UserDashboard';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/Admin/AdminDashboard';
import AdminShelters from '@/pages/Admin/AdminShelters';
import VerifyEmailPage from '@/pages/Auth/VerifyEmail';

export default function App() {
  return (
    <StaffProvider>
      <UserProvider>
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
              <Route path='/verify-email' element={<VerifyEmailPage />} />
            </Route>

            {/* Adopter portal */}
            <Route element={<UserLayout />}>
              <Route path='/users/me' element={<UserDashboard />} />
            </Route>

            {/* Admin command center */}
            <Route element={<AdminLayout />}>
              <Route path='/admin' element={<AdminDashboard />} />
              <Route path='/admin/shelters' element={<AdminShelters />} />
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
      </UserProvider>
    </StaffProvider>
  );
}
