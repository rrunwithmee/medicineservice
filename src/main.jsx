import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import DoctorsPage from './DoctorsPage'
import DoctorDetailPage from './DoctorDetailPage'
import ProfilePage from './ProfilePage'
import ContactsPage from './ContactsPage'
import AboutPage from './AboutPage'
import ClinicsPage from './ClinicsPage'
import './index.css'
import { initializeTestData } from './initializeData'

// Инициализируем тестовые данные при запуске приложения
initializeTestData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor/:id" element={<DoctorDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/clinics" element={<ClinicsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)