import React, { useState, useEffect } from 'react';
import './App.css';
import './ClinicsPage.css';
import logoImage from './фото_проекта/логотип.png';
import clinicImage from './фото_проекта/поликлиника.png';
import footerImage from './фото_проекта/нижняя_панель_фото.jpg';

function ClinicsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Функция для симуляции клика на PDF
  const handlePdfClick = () => {
    alert('Файл address.pdf открывается...');
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
        <div className="clinics-container">
          {/* Белый блок с информацией о поликлиниках  */}
          <div className="clinics-info-container">
            <div className="clinics-info">
              <h1 className="clinics-title">Поликлиники</h1>
              
              <div className="clinics-text">
                <p className="contact-line">С полным списком доступных</p>
                <p className="contact-line">поликлиник можно</p>
                <p className="contact-line">ознакомиться в файле:</p>
                
                {/* Кликабельная надпись address.pdf курсивом */}
                <div className="pdf-link-container">
                  <a 
                    href="#" 
                    className="pdf-link" 
                    onClick={handlePdfClick}
                  >
                    <i>address.pdf</i>
                  </a>
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
            <a href="/about" className="footer-link">О нас</a>
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

export default ClinicsPage;