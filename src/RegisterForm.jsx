import { useState } from 'react';
import './LoginForm.css';
import './App.css';
import { FaPhone, FaLock, FaUser } from 'react-icons/fa';
import logoImage from './фото_проекта/логотип.png';
import clinicImage from './фото_проекта/поликлиника.png';
import footerImage from './фото_проекта/нижняя_панель_фото.jpg';

function RegisterForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = () => {
    setError('');
    setSuccess('');

    if (phone === '' || password === '' || confirmPassword === '' || name === '') {
      setError('Заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userName', name);
    
    setSuccess('Регистрация успешна! Вы будете перенаправлены...');
    
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
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
            <a href="/login" className="login-btn">Вход</a>
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
            <h2 className="form-title">Регистрация</h2>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}
            
            <div className="form-group with-icon">
              <div className="input-icon">
                <FaUser />
              </div>
              <input 
                type="text"
                placeholder="Ваше имя"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="form-group with-icon">
              <div className="input-icon">
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
              <div className="input-icon">
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

            <div className="form-group with-icon">
              <div className="input-icon">
                <FaLock />
              </div>
              <input 
                type="password"
                placeholder="Подтвердите пароль"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <button className="login-form-btn" onClick={handleRegister}>
              Зарегистрироваться
            </button>

            <div className="form-footer">
              <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
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

export default RegisterForm;