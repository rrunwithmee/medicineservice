import React, { useState, useEffect } from 'react';
import './App.css';
import './ContactsPage.css';
import logoImage from './фото_проекта/логотип.png';
import clinicImage from './фото_проекта/поликлиника.png';
import footerImage from './фото_проекта/нижняя_панель_фото.jpg';
import { FaStethoscope } from 'react-icons/fa';

function ContactsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <div className="App">
      {/* Шапка сайта */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <div className="logo-image-container">
              <img 
                src={logoImage} 
                alt="MedTime Logo" 
                className="logo-img"
                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
              />
            </div>
            
            <div className="logo-text">
              <span className="first-letter">M</span>
              <span className="middle-letters">edTim</span>
              <span className="last-letter">e</span>
            </div>
          </div>

                    <nav className="nav-center">
            <a href="/" className="nav-link">Главная</a>
            <a href="/clinics" className="nav-link">Поликлиники</a>
            <a href="/doctors" className="nav-link active">Врачи</a>
          </nav>

          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
                <a href="/profile" className="profile-link">Личный кабинет</a>
              </>
            ) : (
              <>
                <a href="/register" className="register-btn">Регистрация</a>
                <a href="/login" className="login-btn">Вход</a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Фоновое изображение поликлиники */}
      <div className="background-image-container">
        <img 
          src={clinicImage} 
          alt="Поликлиника" 
          className="background-clinic-image"
        />
      </div>

      {/* Основной контент */}
      <main className="main-content">
        <div className="contacts-container">
          {/* Белый блок с контактами */}
          <div className="contacts-info-container">
            <div className="contacts-info">
              <h1 className="contacts-title">Контакты</h1>
              
              <div className="contacts-text">
                <p className="contact-line">Номер круглосуточно: 8 (495) 235-75-75</p>
                <p className="contact-line">Почта: MedTime@clinic.com</p>
                <p className="contact-line">Офис: г. Москва, Новослободский проспект, 32</p>
              </div>
            </div>
          </div>
          
          {/* Серый блок с информацией о сервисе - отдельно под белым блоком */}
          <div className="service-info-container">
            <div className="service-info">
              <div className="service-icon">
                <FaStethoscope />
              </div>
              <div className="service-text">
                <h2 className="service-title">MedTime — это медицинский сервис</h2>
                <p className="service-description">
                  помогающий выбрать врача,<br />
                  записаться в два клика и держать<br />
                  свое здоровье под контролем
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Подвал */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <a href="/about" className="footer-link">О нас</a>
            <a href="/contacts" className="footer-link active">Контакты</a>
          </div>
          
          <img 
            src={footerImage} 
            alt="MedTime" 
            className="footer-logo"
          />
        </div>
      </footer>
    </div>
  );
}

export default ContactsPage;