import { useState } from 'react';
import './LoginForm.css';
import './App.css';
import { FaPhone, FaLock } from 'react-icons/fa';
import logoImage from './фото_проекта/логотип.png';
import clinicImage from './фото_проекта/поликлиника.png';
import footerImage from './фото_проекта/нижняя_панель_фото.jpg';

function LoginForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Тестовые данные для входа
  const TEST_PHONE = '12345678';
  const TEST_PASSWORD = 'admin123';

  const handleLogin = () => {
    // Сбрасываем ошибку
    setError('');

    // Простая проверка
    if (phone === '' || password === '') {
      setError('Заполните все поля');
      return;
    }

    // Проверяем тестовые данные
    if (phone === TEST_PHONE && password === TEST_PASSWORD) {
      // Успешный вход
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userPhone', phone);
      localStorage.setItem('userName', 'Анна Иванова'); // Тестовое имя
      window.location.href = '/';
    } else {
      setError('Неверный номер телефона или пароль');
    }
  };

  // Обработка нажатия Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
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
            <a href="/doctors" className="nav-link">Врачи</a>
          </nav>

          <div className="auth-buttons">
            <a href="/register" className="register-btn">Регистрация</a>
            <a href="#" className="login-btn">Вход</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="background-image-container">
          <img 
            src={clinicImage} 
            alt="Поликлиника" 
            className="background-clinic-image"
          />
        </div>

        <div className="login-form-container">
          <div className="login-form">
            <h2 className="form-title">Войти в аккаунт</h2>
            
            {/* Поле для ошибок */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Тестовые данные для подсказки */}
            <div className="test-credentials">
              <p>Тестовые данные:</p>
              <p>Телефон: <strong>12345678</strong></p>
              <p>Пароль: <strong>admin123</strong></p>
            </div>
            
            <div className="form-group with-icon">
              <div className="input-icon black-icon">
                <FaPhone />
              </div>
              <input 
                type="tel"
                placeholder="Номер телефона"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="form-group with-icon">
              <div className="input-icon black-icon">
                <FaLock />
              </div>
              <input 
                type="password"
                placeholder="Пароль"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <button className="login-form-btn" onClick={handleLogin}>
              Войти
            </button>
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

export default LoginForm;