import { useState, useEffect } from 'react';
import './App.css';
import './DoctorsPage.css';
import logoImage from './фото_проекта/логотип.png';
import clinicImage from './фото_проекта/поликлиника.png';
import footerImage from './фото_проекта/нижняя_панель_фото.jpg';

function DoctorsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const doctorsRows = [
    ["Офтальмолог", "Травматолог", "Невролог", "Врачи общей практики", "Кардиолог"],
    ["Гинеколог", "Дерматолог", "Отоларинголог", "Уролог", "Гастроэнтеролог"],
    ["Стоматолог", "Окулист", "Травматолог", "Эндокринолог", "Проктолог"],
    ["Терапевт", "Маммолог", "Психолог", "Психиатр", "Психотерапевт"]
  ];

  const specialtyIdMap = {
    "Офтальмолог": 1,
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

      <div className="background-image-container">
        <img 
          src={clinicImage} 
          alt="Поликлиника" 
          className="background-clinic-image"
        />
      </div>

      <main className="main-content">
        <div className="doctors-form-container">
          <div className="doctors-form">
            <h2 className="form-title">Все врачи по специальностям</h2>
            <p className="form-subtitle">Выберите специальность для просмотра врачей</p>
            
            <div className="doctors-grid-container">
              {doctorsRows.map((row, rowIndex) => (
                <div key={rowIndex} className="doctors-row">
                  {row.map((specialty, specialtyIndex) => (
                    <button
                      key={`${rowIndex}-${specialtyIndex}`}
                      className="doctor-grid-btn"
                      onClick={() => handleSpecialtyClick(specialty)}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="doctors-count">
              Всего специальностей: {doctorsRows.flat().length}
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

export default DoctorsPage;