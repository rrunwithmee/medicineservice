import React, { useState, useEffect } from 'react';
import './App.css';
import './AboutPage.css';
import logoImage from './фото_проекта/логотип.png';
import clinicImage from './фото_проекта/поликлиника.png';
import footerImage from './фото_проекта/нижняя_панель_фото.jpg';
import { FaStethoscope, FaUserMd, FaClock, FaMicroscope } from 'react-icons/fa';

function AboutPage() {
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
        <div className="about-container">
          {/* Верхний блок с описанием сервиса */}
          <div className="service-description-container">
            <div className="service-description">
              <div className="service-icon">
                <FaStethoscope />
              </div>
              <div className="service-text">
                <h2 className="service-title">MedTime — это медицинский сервис</h2>
                <p className="service-description-text">
                  помогающий выбрать врача,<br />
                  записаться в два клика и держать<br />
                  свое здоровье под контролем
                </p>
              </div>
            </div>
          </div>
          
          {/* Серый блок с тремя компонентами  */}
          <div className="about-features-section">
            <div className="about-features-container">
              <div className="about-features-grid">
                <div className="about-feature-card">
                  <div className="about-feature-icon">
                    <FaUserMd />
                  </div>
                  <div className="about-feature-content">
                    <h3 className="about-feature-title">Точно найдете хорошего врача</h3>
                    <p className="about-feature-text">Более 100 000 практикующих врачей</p>
                  </div>
                </div>
                
                <div className="about-feature-card">
                  <div className="about-feature-icon">
                    <FaClock />
                  </div>
                  <div className="about-feature-content">
                    <h3 className="about-feature-title">Запись на любое время</h3>
                    <p className="about-feature-text">Организуем запись к нужному врачу за два клика</p>
                  </div>
                </div>
                
                <div className="about-feature-card">
                  <div className="about-feature-icon">
                    <FaMicroscope />
                  </div>
                  <div className="about-feature-content">
                    <h3 className="about-feature-title">Современное оборудование</h3>
                    <p className="about-feature-text">Новая и сертифицированная техника</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Подвал */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <a href="/about" className="footer-link active">О нас</a>
            <a href="/contacts" className="footer-link">Контакты</a>
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

export default AboutPage;