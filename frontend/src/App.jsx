import React from 'react'
import './index.css'
import {Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import CarsPage from './pages/CarsPage'
import BrandsPage from './pages/BrandsPage'
import ProfilePage from './pages/ProfilePage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import CarInfoPage from './pages/CarInfoPage'
import BrandInfoPage from './pages/BrandInfoPage'
import ScrollToTop from './components/ScrollToTop'
import MyReviewPage from './pages/MyReviewPage'
import MyFavouritePage from './pages/MyFavouritePage'
import ContactPage from './pages/ContactPage'

const PublicRouter = ({children}) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
}

const PrivateRouter = ({children}) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

const App = () => {
  return (
    <div>

      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={
          <PublicRouter>
            <SignupPage />
          </PublicRouter>
        } />
        <Route path='/login' element={
          <PublicRouter>
            <LoginPage />
          </PublicRouter>
        } />

        <Route path='/reset-password' element={<ResetPasswordPage />} />

        <Route path='/profile' element={
          <PrivateRouter>
            <ProfilePage />
          </PrivateRouter>
        } />

        <Route path='/cars' element={<CarsPage />} />
        <Route path='/car/info/:id' element={
          <PrivateRouter>
            <CarInfoPage />
          </PrivateRouter>
        } />


        <Route path='/brands' element={<BrandsPage />} />
        <Route path='/brand/info/:id' element={
          <PrivateRouter>
            <BrandInfoPage />
          </PrivateRouter>
        } />

        <Route path='/myreviews' element={
          <PrivateRouter>
            <MyReviewPage />
          </PrivateRouter>
        } />
        <Route path='/favourites' element={
          <PrivateRouter>
            <MyFavouritePage />
          </PrivateRouter>
        } />


        <Route path='/contact' element={<ContactPage />} />

      </Routes>
    </div>
  )
}

export default App