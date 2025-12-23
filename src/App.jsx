import { useState, useEffect } from 'react';
import './App.css';
import { FaSearch, FaStethoscope, FaMapMarkerAlt } from 'react-icons/fa';
import logoImage from './фото_проекта/логотип.png';
import footerImage from './фото_проекта/нижняя_панель_фото.jpg';
import clinicImage from './фото_проекта/поликлиника.png';
import { FaUserMd, FaClock, FaMicroscope } from 'react-icons/fa';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const specialtyIdMap = {
    "Офтальмологи": 1,
    "Травматолог": 2,
    "Невролог": 3,
    "Врачи общей практики": 4,
    "Кардиолог": 5,
    "Гинеколог": 6,
    "Дерматолог": 7,
    "Отоларинголог": 8,
    "Уролог": 9,
    "Гастроэнтеролог": 10,
    "Стоматолог": 11,
    "Окулист": 12,
    "Эндокринолог": 13,
    "Проктолог": 14,
    "Маммолог": 15,
    "Психолог": 16,
    "Психиатр": 17,
    "Психотерапевт": 18,
    "Терапевт": 19,
    "Хирург": 20
  };

  const handleSpecialtyClick = (specialty) => {
    const specialtyId = specialtyIdMap[specialty] || 1;
    window.location.href = `/doctor/${specialtyId}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <div className="App">
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
            <a href="/" className="nav-link active">Главная</a>
            <a href="/clinics" className="nav-link">Поликлиники</a>
            <a href="/doctors" className="nav-link">Врачи</a>
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

      <div className="background-image-container">
        <img 
          src={clinicImage} 
          alt="Поликлиника" 
          className="background-clinic-image"
        />
      </div>

      <main className="main-content">
        <div className="welcome-section">
          <h1>Онлайн запись к врачу</h1>
          <p>Запишитесь на прием к лучшим специалистам в удобное для вас время</p>
        </div>

        <div className="search-section">
          <div className="search-group">
            <div className="search-icon">
              <FaStethoscope />
            </div>
            <input 
              type="text" 
              placeholder="Врач или специальность" 
              className="search-input"
            />
            <button className="search-btn">
              <FaSearch className="search-btn-icon" />
              <span>Найти</span>
            </button>
          </div>

          <div className="search-group">
            <div className="search-icon">
              <FaMapMarkerAlt />
            </div>
            <input 
              type="text" 
              placeholder="Адрес" 
              className="search-input"
            />
            <button className="search-btn">
              <FaSearch className="search-btn-icon" />
              <span>Найти</span>
            </button>
          </div>
        </div>

        <div className="specialties-section">
          <h2>Врачи по специальностям</h2>
          <div className="specialties-grid">
            <button 
              className="specialty-btn" 
              onClick={() => handleSpecialtyClick("Офтальмолог")}
            >
              Офтальмолог
            </button>
            <button 
              className="specialty-btn" 
              onClick={() => handleSpecialtyClick("Травматолог")}
            >
              Травматолог
            </button>
            <button 
              className="specialty-btn" 
              onClick={() => handleSpecialtyClick("Невролог")}
            >
              Невролог
            </button>
            <button 
              className="specialty-btn" 
              onClick={() => handleSpecialtyClick("Врачи общей практики")}
            >
              Врач общей практики
            </button>
            <button 
              className="specialty-btn" 
              onClick={() => handleSpecialtyClick("Кардиолог")}
            >
              Кардиолог
            </button>
            <a href="/doctors" className="specialty-btn">Другие</a>
          </div>
        </div>

        {/* Один серый блок с информацией о сервисе */}
        <div className="service-info-section">
          <div className="service-info-container">
            <div className="service-info-grid">
              <div className="service-info-card">
                <div className="service-info-icon">
                  <FaUserMd />
                </div>
                <div className="service-info-content">
                  <h3 className="service-info-title">Точно найдете хорошего врача</h3>
                  <p className="service-info-text">Более 100 000 практикующих врачей</p>
                </div>
              </div>
              
              <div className="service-info-card">
                <div className="service-info-icon">
                  <FaClock />
                </div>
                <div className="service-info-content">
                  <h3 className="service-info-title">Запись на любое время</h3>
                  <p className="service-info-text">Организуем запись к нужному врачу за два клика</p>
                </div>
              </div>
              
              <div className="service-info-card">
                <div className="service-info-icon">
                  <FaMicroscope />
                </div>
                <div className="service-info-content">
                  <h3 className="service-info-title">Современное оборудование</h3>
                  <p className="service-info-text">Новая и сертифицированная техника</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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

export default App;