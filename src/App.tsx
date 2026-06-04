import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/Home/Home';
import AboutPage from '@/pages/About/About';
import PetsPage from '@/pages/Services/Services';
import PetDetailPage from '@/pages/PetDetail/PetDetail';
import SheltersPage from '@/pages/UseCases/UseCases';
import ShelterDetailPage from '@/pages/ShelterDetail/ShelterDetail';
import ShelterPetsPage from '@/pages/ShelterPets/ShelterPets';
import ContactPage from '@/pages/Contact/Contact';
import DonatePage from '@/pages/Donate/Donate';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { StaffAuthProvider } from '@/context/StaffAuthContext';
import { PetsProvider } from '@/context/PetsContext';
import { SheltersProvider } from '@/context/SheltersContext';
import { AdoptionsProvider } from '@/context/AdoptionsContext';
import { UserProvider } from '@/context/UserContext';
import StaffLayout from '@/components/staff/StaffLayout';
import StaffLogin from '@/pages/Staff/StaffLogin/StaffLogin';
import StaffDashboard from '@/pages/Staff/StaffDashboard/StaffDashboard';
import StaffPets from '@/pages/Staff/StaffPets/StaffPets';
import StaffPetForm from '@/pages/Staff/StaffPetForm/StaffPetForm';
import StaffAdoptions from '@/pages/Staff/StaffAdoptions/StaffAdoptions';
import UserLayout from '@/components/user/UserLayout';
import UserDashboard from '@/pages/User/UserDashboard/UserDashboard';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/Admin/AdminDashboard/AdminDashboard';
import AdminPets from '@/pages/Admin/AdminPets/AdminPets';
import AdminAdoptions from '@/pages/Admin/AdminAdoptions/AdminAdoptions';
import AdminShelters from '@/pages/Admin/AdminShelters/AdminShelters';
import AdminShelterForm from '@/pages/Admin/AdminShelterForm/AdminShelterForm';
import AdminPetForm from '@/pages/Admin/AdminPetForm/AdminPetForm';
import VerifyEmailPage from '@/pages/Auth/VerifyEmail/VerifyEmail';
import PetApplyPage from '@/pages/Apply/PetApply/PetApply';
import NotFoundPage from '@/pages/NotFound/NotFound';

export default function App() {
  return (
    <StaffAuthProvider>
      <PetsProvider>
        <SheltersProvider>
          <AdoptionsProvider>
            <UserProvider>
              <FavoritesProvider>
                <Routes>
            {/* Public site */}
            <Route element={<Layout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/pets' element={<PetsPage />} />
              <Route path='/pets/:id' element={<PetDetailPage />} />
              <Route path='/pets/:id/apply' element={<PetApplyPage />} />
              <Route path='/shelters' element={<SheltersPage />} />
              <Route path='/shelters/:id' element={<ShelterDetailPage />} />
              <Route path='/shelters/:id/pets' element={<ShelterPetsPage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path='/donate' element={<DonatePage />} />
              <Route path='/verify-email' element={<VerifyEmailPage />} />
              {/* Catch-all 404 — must stay last in this block */}
            </Route>
            <Route path='*' element={<NotFoundPage />} />
            {/* Adopter portal */}
            <Route element={<UserLayout />}>
              <Route path='/users/me' element={<UserDashboard />} />
            </Route>

            {/* Admin command center */}
            <Route element={<AdminLayout />}>
              <Route path='/admin' element={<AdminDashboard />} />
              <Route path='/admin/pets' element={<AdminPets />} />
              <Route path='/admin/pets/add' element={<AdminPetForm />} />
              <Route path='/admin/pets/:id/edit' element={<AdminPetForm />} />
              <Route path='/admin/adoptions' element={<AdminAdoptions />} />
              <Route path='/admin/shelters' element={<AdminShelters />} />
              <Route path='/admin/shelters/add' element={<AdminShelterForm />} />
              <Route path='/admin/shelters/:id/edit' element={<AdminShelterForm />} />
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
          </AdoptionsProvider>
        </SheltersProvider>
      </PetsProvider>
    </StaffAuthProvider>
  );
}
