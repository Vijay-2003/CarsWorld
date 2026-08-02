import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage.jsx'
import { Navigate } from "react-router-dom";
import AddCarPage from './pages/AddCarPage.jsx'
import AddBrandPage from './pages/AddBrandPage.jsx';
import CarsPage from './pages/CarsPage.jsx';
import UsersPage from './pages/UsersPage.jsx'
import BrandsPage from './pages/BrandsPage.jsx'
import BrandInfoPage from './pages/BrandInfoPage.jsx';
import CarInfoPage from './pages/CarInfoPage.jsx'
import ResetEmailPage from './pages/ResetEmailPage.jsx'

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" replace /> : children;
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />
}

const App = () => {
  return (
    <div>
      <Routes>

        <Route path='/' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path='/login' element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />

        <Route path='/reset-password' element={<ResetEmailPage />} />

        <Route path='/add-car' element={
          <PrivateRoute>
            <AddCarPage />
          </PrivateRoute>
        } />
        <Route path='/update-car/:id' element={
          <PrivateRoute>
            <AddCarPage />
          </PrivateRoute>
        } />

        <Route path='/add-brand' element={
          <PrivateRoute>
            <AddBrandPage />
          </PrivateRoute>
        } />
        <Route path='/update-brand/:id' element={
          <PrivateRoute>
            <AddBrandPage />
          </PrivateRoute>
        } />

        <Route path='/cars' element={<CarsPage />} />
        <Route path='/car/info/:id' element={
          <PrivateRoute>
            <CarInfoPage />
          </PrivateRoute>
        } />

        <Route path='/brands' element={<BrandsPage />} />
        <Route path='/brand/info/:id' element={
          <PrivateRoute>
            <BrandInfoPage />
          </PrivateRoute>
        } />

        <Route path='/users' element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        } />

      </Routes>
    </div>
  )
}

export default App