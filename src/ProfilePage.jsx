import { useState, useEffect } from 'react';
import './ProfilePage.css';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaHistory, 
  FaHeadset, 
  FaPhoneAlt,
  FaUserMd,
  FaMapMarkerAlt,
  FaClock,
  FaTimes,
  FaRedo,
  FaSignOutAlt
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import logoImage from './фото_проекта/логотип.png';
import clinicImage from './фото_проекта/поликлиника.png';
import footerImage from './фото_проекта/нижняя_панель_фото.jpg';
import userPhoto from './фото_проекта/пользователь.jpg';

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [activeTab, setActiveTab] = useState('current');
  const [appointments, setAppointments] = useState([]);
  const [historyAppointments, setHistoryAppointments] = useState([]);
  
  // Для отмены записи
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [showCancelCodeModal, setShowCancelCodeModal] = useState(false);
  const [showCancelSuccessModal, setShowCancelSuccessModal] = useState(false);
  const [cancelCode, setCancelCode] = useState('');
  const [cancelCodeError, setCancelCodeError] = useState('');

  // Для повторной записи
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [appointmentToRepeat, setAppointmentToRepeat] = useState(null);
  const [showRepeatCodeModal, setShowRepeatCodeModal] = useState(false);
  const [showRepeatSuccessModal, setShowRepeatSuccessModal] = useState(false);
  const [repeatCode, setRepeatCode] = useState('');
  const [repeatDate, setRepeatDate] = useState('');
  const [repeatTime, setRepeatTime] = useState('');

  // Для изменения данных
  const [showChangeDataModal, setShowChangeDataModal] = useState(false);
  const [dataTypeToChange, setDataTypeToChange] = useState('');
  const [newDataValue, setNewDataValue] = useState('');
  const [showDataCodeModal, setShowDataCodeModal] = useState(false);
  const [showDataSuccessModal, setShowDataSuccessModal] = useState(false);
  const [dataCode, setDataCode] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Для поддержки
  const [supportMessage, setSupportMessage] = useState('');
  const [showSupportSuccess, setShowSupportSuccess] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const name = localStorage.getItem('userName') || 'Иван Иванов';
      const phone = localStorage.getItem('userPhone') || '+7 (912) 345-67-89';
      setUserName(name);
      setUserPhone(phone);
      
      // Загружаем записи из localStorage
      const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const savedHistory = JSON.parse(localStorage.getItem('appointmentHistory') || '[]');
      
      setAppointments(savedAppointments);
      setHistoryAppointments(savedHistory);
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  // Функции для отмены записи
  const handleCancelAppointment = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    setCancelCode('');
    setCancelCodeError('');
    setShowCancelCodeModal(true);
  };

  const handleCancelCodeSubmit = () => {
    if (cancelCode !== '1234') {
      setCancelCodeError('Неверный код. Попробуйте еще раз.');
      return;
    }
    
    // Перемещаем запись в историю с пометкой "Отменена"
    const updatedHistory = [...historyAppointments, {
      ...appointmentToCancel,
      status: 'Отменена',
      cancelledAt: new Date().toISOString()
    }];
    localStorage.setItem('appointmentHistory', JSON.stringify(updatedHistory));
    setHistoryAppointments(updatedHistory);
    
    // Удаляем из текущих записей
    const updatedAppointments = appointments.filter(app => app.id !== appointmentToCancel.id);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    
    setShowCancelCodeModal(false);
    setShowCancelSuccessModal(true);
  };

  const closeCancelSuccess = () => {
    setShowCancelSuccessModal(false);
    setAppointmentToCancel(null);
    setCancelCode('');
  };

  // Функции для повторной записи
  const handleRepeatAppointment = (appointment) => {
    setAppointmentToRepeat(appointment);
    setShowRepeatModal(true);
    setRepeatDate('');
    setRepeatTime('');
  };

  const selectRepeatDateTime = () => {
    if (!repeatDate || !repeatTime) {
      alert('Пожалуйста, выберите дату и время');
      return;
    }
    
    setShowRepeatModal(false);
    setRepeatCode('');
    setShowRepeatCodeModal(true);
  };

  const handleRepeatCodeSubmit = () => {
    if (repeatCode !== '1234') {
      alert('Неверный код. Попробуйте еще раз.');
      return;
    }
    
    // Создаем новую запись
    const newAppointment = {
      id: Date.now(),
      doctorName: appointmentToRepeat.doctorName,
      specialty: appointmentToRepeat.specialty,
      address: appointmentToRepeat.address,
      date: repeatDate,
      time: repeatTime,
      status: 'Подтверждена',
      timestamp: new Date().toISOString(),
      isRepeat: true
    };
    
    const updatedAppointments = [...appointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    
    setShowRepeatCodeModal(false);
    setShowRepeatSuccessModal(true);
  };

  const closeRepeatSuccess = () => {
    setShowRepeatSuccessModal(false);
    setAppointmentToRepeat(null);
    setRepeatDate('');
    setRepeatTime('');
    setRepeatCode('');
  };

  // Функции для изменения данных
  const handleChangeData = (type) => {
    setDataTypeToChange(type);
    setNewDataValue('');
    setPasswordError('');
    setShowChangeDataModal(true);
  };

  const validatePassword = () => {
    if (dataTypeToChange === 'password' && newDataValue.length < 10) {
      setPasswordError('Пароль должен содержать не менее 10 символов');
      return false;
    }
    return true;
  };

  const confirmDataChange = () => {
    if (!newDataValue.trim()) {
      alert('Пожалуйста, введите новое значение');
      return;
    }
    
    if (dataTypeToChange === 'password' && !validatePassword()) {
      return;
    }
    
    setShowChangeDataModal(false);
    setDataCode('');
    setShowDataCodeModal(true);
  };

  const handleDataCodeSubmit = () => {
    if (dataCode !== '1234') {
      alert('Неверный код. Попробуйте еще раз.');
      return;
    }
    
    // Обновляем данные в localStorage
    if (dataTypeToChange === 'name') {
      localStorage.setItem('userName', newDataValue);
      setUserName(newDataValue);
    } else if (dataTypeToChange === 'phone') {
      localStorage.setItem('userPhone', newDataValue);
      setUserPhone(newDataValue);
    } else if (dataTypeToChange === 'password') {
      localStorage.setItem('userPassword', newDataValue);
    }
    
    setShowDataCodeModal(false);
    setShowDataSuccessModal(true);
  };

  const closeDataSuccess = () => {
    setShowDataSuccessModal(false);
    setDataTypeToChange('');
    setNewDataValue('');
    setDataCode('');
    setPasswordError('');
  };

  // Функция для отправки сообщения в поддержку
  const handleSupportSubmit = () => {
    if (!supportMessage.trim()) {
      alert('Пожалуйста, введите ваше сообщение');
      return;
    }
    
    const supportRequests = JSON.parse(localStorage.getItem('supportRequests') || '[]');
    supportRequests.push({
      id: Date.now(),
      message: supportMessage,
      date: new Date().toISOString(),
      user: userName,
      phone: userPhone
    });
    localStorage.setItem('supportRequests', JSON.stringify(supportRequests));
    
    setSupportMessage('');
    setShowSupportSuccess(true);
    setTimeout(() => setShowSupportSuccess(false), 3000);
  };

  if (!isLoggedIn) {
    return null;
  }

  // Фильтруем записи по статусу
  const currentAppointments = appointments.filter(app => app.status === 'Подтверждена');
  const pastAppointments = historyAppointments.filter(app => app.status === 'Отменена' || app.status === 'Завершена');

  return (
    <div className="App">
      {/* Шапка */}
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

      {/* Фоновое изображение */}
      <div className="background-image-container">
        <img 
          src={clinicImage} 
          alt="Поликлиника" 
          className="background-clinic-image"
        />
      </div>

      {/* Основной контент */}
      <main className="main-content">
        <div className="profile-layout">
          {/* Левая панель с кнопками */}
          <div className="sidebar">
            <button 
              className={`sidebar-btn ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => setActiveTab('current')}
            >
              <FaCalendarAlt className="sidebar-icon" />
              <span>Текущие записи</span>
            </button>
            
            <button 
              className={`sidebar-btn ${activeTab === 'data' ? 'active' : ''}`}
              onClick={() => setActiveTab('data')}
            >
              <FaUser className="sidebar-icon" />
              <span>Данные пользователя</span>
            </button>
            
            <button 
              className={`sidebar-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <FaHistory className="sidebar-icon" />
              <span>История записей</span>
            </button>
            
            <button 
              className={`sidebar-btn ${activeTab === 'support' ? 'active' : ''}`}
              onClick={() => setActiveTab('support')}
            >
              <FaHeadset className="sidebar-icon" />
              <span>Поддержка</span>
            </button>
          </div>

          {/* Центральный блок */}
          <div className="main-profile-content">
            {/* Блок с информацией о пользователе */}
            <div className="user-info-card">
              <div className="user-main-info">
                <div className="user-photo-container">
                  <img src={userPhoto} alt="Пользователь" className="user-photo" />
                </div>
                <div className="user-details">
                  <h2 className="user-name">{userName}</h2>
                  <p className="user-phone">
                    <FaPhoneAlt className="phone-icon" /> {userPhone}
                  </p>
                </div>
              </div>
              <button className="profile-logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Выход
              </button>
            </div>

            {/* Контент вкладок */}
            <div className="content-card">
              {activeTab === 'current' && (
                <div className="appointments-section">
                  <h3 className="section-title">Текущие записи</h3>
                  
                  {currentAppointments.length === 0 ? (
                    <p className="no-appointments">У вас нет активных записей к врачам.</p>
                  ) : (
                    <div className="appointments-list">
                      {currentAppointments.map(appointment => (
                        <div key={appointment.id} className="appointment-card">
                          <div className="appointment-left">
                            <div className="appointment-specialty">
                              <FaUserMd className="specialty-icon" />
                              {appointment.specialty}
                            </div>
                            <div className="appointment-doctor">
                              {appointment.doctorName}
                            </div>
                          </div>
                          
                          <div className="appointment-center">
                            <div className="appointment-date">
                              <FaCalendarAlt /> {appointment.date}
                            </div>
                            <div className="appointment-address">
                              <FaMapMarkerAlt /> {appointment.address}
                            </div>
                          </div>
                          
                          <div className="appointment-right">
                            <button 
                              className="cancel-appointment-btn"
                              onClick={() => handleCancelAppointment(appointment)}
                            >
                              <FaTimes /> Отменить
                            </button>
                            <div className="appointment-time">
                              <FaClock /> {appointment.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'data' && (
                <div className="data-section">
                  <h3 className="section-title">Данные пользователя</h3>
                  <div className="data-buttons">
                    <button className="data-change-btn" onClick={() => handleChangeData('password')}>
                      Изменить пароль
                    </button>
                    <button className="data-change-btn" onClick={() => handleChangeData('name')}>
                      Изменить имя
                    </button>
                    <button className="data-change-btn" onClick={() => handleChangeData('phone')}>
                      Изменить номер телефона
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="history-section">
                  <h3 className="section-title">История записей</h3>
                  
                  {pastAppointments.length === 0 ? (
                    <p className="no-appointments">У вас нет записей в истории.</p>
                  ) : (
                    <div className="appointments-list">
                      {pastAppointments.map(appointment => (
                        <div key={appointment.id} className="appointment-card history">
                          <div className="appointment-left">
                            <div className="appointment-specialty">
                              <FaUserMd className="specialty-icon" />
                              {appointment.specialty}
                            </div>
                            <div className="appointment-doctor">
                              {appointment.doctorName}
                            </div>
                            <div className={`appointment-status ${appointment.status === 'Отменена' ? 'cancelled' : 'completed'}`}>
                              {appointment.status}
                            </div>
                          </div>
                          
                          <div className="appointment-center">
                            <div className="appointment-date">
                              <FaCalendarAlt /> {appointment.date}
                            </div>
                            <div className="appointment-address">
                              <FaMapMarkerAlt /> {appointment.address}
                            </div>
                          </div>
                          
                          <div className="appointment-right">
                            {appointment.status === 'Завершена' && (
                              <button 
                                className="repeat-appointment-btn"
                                onClick={() => handleRepeatAppointment(appointment)}
                              >
                                <FaRedo /> Повторить
                              </button>
                            )}
                            <div className="appointment-time">
                              <FaClock /> {appointment.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'support' && (
                <div className="support-section">
                  <h3 className="section-title">Поддержка</h3>
                  <div className="support-card">
                    <div className="support-header">
                      <h4>Напишите ваше обращение</h4>
                      <p>Вышлем ответ как можно скорее на электронную почту.</p>
                    </div>
                    
                    <textarea
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      placeholder="Опишите вашу проблему или вопрос..."
                      className="support-textarea"
                      rows="6"
                    />
                    
                    <div className="support-footer">
                      <p className="support-note">
                        <MdEmail /> Обязательно в письме укажите почту для обратной связи!
                      </p>
                      <button className="support-submit-btn" onClick={handleSupportSubmit}>
                        Отправить обращение
                      </button>
                    </div>
                    
                    {showSupportSuccess && (
                      <div className="support-success">
                        ✓ Ваше обращение отправлено. Мы ответим вам в ближайшее время.
                      </div>
                    )}
                  </div>
                </div>
              )}
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

      {/* Модальное окно для отмены записи (подтверждение) */}
      {showCancelModal && appointmentToCancel && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowCancelModal(false)}>×</button>
            <h3>Отмена записи</h3>
            <p>Вы уверены, что хотите отменить запись?</p>
            <div className="appointment-info">
              <p><strong>Врач:</strong> {appointmentToCancel.doctorName}</p>
              <p><strong>Специальность:</strong> {appointmentToCancel.specialty}</p>
              {appointmentToCancel.date && <p><strong>Дата:</strong> {appointmentToCancel.date}</p>}
              {appointmentToCancel.time && <p><strong>Время:</strong> {appointmentToCancel.time}</p>}
              <p><strong>Адрес:</strong> {appointmentToCancel.address}</p>
            </div>
            <div className="modal-buttons">
              <button className="modal-confirm-btn" onClick={confirmCancel}>
                Да, отменить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для ввода SMS-кода при отмене */}
      {showCancelCodeModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowCancelCodeModal(false)}>×</button>
            <h3>Подтверждение отмены</h3>
            <p>На ваш номер телефона отправлен SMS-код подтверждения</p>
            <p>Введите 4-значный код:</p>
            
            <input
              type="text"
              className="sms-code-input"
              placeholder="Код"
              value={cancelCode}
              onChange={(e) => setCancelCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
            />
            
            <div className="code-hint">Тестовый код: <strong>1234</strong></div>
            
            {cancelCodeError && <div className="code-error">{cancelCodeError}</div>}
            
            <div className="modal-buttons">
              <button className="modal-confirm-btn" onClick={handleCancelCodeSubmit}>
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно успешной отмены */}
      {showCancelSuccessModal && appointmentToCancel && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>✓ Запись успешно отменена</h3>
            <p>Ваша запись была отменена:</p>
            <div className="appointment-info">
              <p><strong>Врач:</strong> {appointmentToCancel.doctorName}</p>
              <p><strong>Специальность:</strong> {appointmentToCancel.specialty}</p>
              {appointmentToCancel.date && <p><strong>Дата:</strong> {appointmentToCancel.date}</p>}
            </div>
            <button className="modal-success-btn" onClick={closeCancelSuccess}>
              Вернуться к моим записям
            </button>
          </div>
        </div>
      )}

      {/* Модальное окно для изменения данных */}
      {showChangeDataModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowChangeDataModal(false)}>×</button>
            <h3>
              {dataTypeToChange === 'name' && 'Изменение имени'}
              {dataTypeToChange === 'phone' && 'Изменение телефона'}
              {dataTypeToChange === 'password' && 'Изменение пароля'}
            </h3>
            <p>Введите новые данные:</p>
            
            <input
              type={dataTypeToChange === 'password' ? 'password' : 'text'}
              className="modal-input"
              placeholder={
                dataTypeToChange === 'name' ? 'Новое имя' :
                dataTypeToChange === 'phone' ? 'Новый телефон' :
                'Новый пароль (минимум 10 символов)'
              }
              value={newDataValue}
              onChange={(e) => {
                setNewDataValue(e.target.value);
                if (dataTypeToChange === 'password') {
                  setPasswordError(e.target.value.length < 10 ? 'Пароль должен содержать не менее 10 символов' : '');
                }
              }}
            />
            
            {passwordError && <div className="password-error">{passwordError}</div>}
            
            <div className="modal-buttons">
              <button className="modal-confirm-btn" onClick={confirmDataChange}>
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для подтверждения изменения данных SMS-кодом */}
      {showDataCodeModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowDataCodeModal(false)}>×</button>
            <h3>Подтверждение изменения данных</h3>
            <p>На ваш номер телефона отправлен SMS-код подтверждения</p>
            <p>Введите 4-значный код:</p>
            
            <input
              type="text"
              className="sms-code-input"
              placeholder="1234"
              value={dataCode}
              onChange={(e) => setDataCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
            />
            
            <div className="code-hint">Тестовый код: <strong>1234</strong></div>
            
            <div className="modal-buttons">
              <button className="modal-confirm-btn" onClick={handleDataCodeSubmit}>
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно успешного изменения данных */}
      {showDataSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>✓ Данные успешно изменены</h3>
            <p>
              {dataTypeToChange === 'name' && 'Ваше имя было успешно изменено.'}
              {dataTypeToChange === 'phone' && 'Ваш телефон был успешно изменен.'}
              {dataTypeToChange === 'password' && 'Ваш пароль был успешно изменен.'}
            </p>
            <button className="modal-success-btn" onClick={closeDataSuccess}>
              ОК
            </button>
          </div>
        </div>
      )}

      {/* Модальное окно для повторной записи (выбор даты) */}
      {showRepeatModal && appointmentToRepeat && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowRepeatModal(false)}>×</button>
            <h3>Повторная запись</h3>
            <p>Выберите удобную дату и время для записи:</p>
            
            <div className="appointment-info">
              <p><strong>Врач:</strong> {appointmentToRepeat.doctorName}</p>
              <p><strong>Специальность:</strong> {appointmentToRepeat.specialty}</p>
              <p><strong>Адрес:</strong> {appointmentToRepeat.address}</p>
            </div>
            
            <div className="date-time-selection">
              <h4>Выберите дату:</h4>
              <div className="date-grid">
                <button 
                  className={`date-btn ${repeatDate === '15 декабря' ? 'selected' : ''}`}
                  onClick={() => setRepeatDate('15 декабря')}
                >
                  15 декабря
                </button>
                <button 
                  className={`date-btn ${repeatDate === '16 декабря' ? 'selected' : ''}`}
                  onClick={() => setRepeatDate('16 декабря')}
                >
                  16 декабря
                </button>
                <button 
                  className={`date-btn ${repeatDate === '17 декабря' ? 'selected' : ''}`}
                  onClick={() => setRepeatDate('17 декабря')}
                >
                  17 декабря
                </button>
              </div>
              
              <h4>Выберите время:</h4>
              <div className="time-grid">
                <button 
                  className={`time-btn ${repeatTime === '10:00' ? 'selected' : ''}`}
                  onClick={() => setRepeatTime('10:00')}
                >
                  10:00
                </button>
                <button 
                  className={`time-btn ${repeatTime === '12:30' ? 'selected' : ''}`}
                  onClick={() => setRepeatTime('12:30')}
                >
                  12:30
                </button>
                <button 
                  className={`time-btn ${repeatTime === '15:00' ? 'selected' : ''}`}
                  onClick={() => setRepeatTime('15:00')}
                >
                  15:00
                </button>
              </div>
            </div>
            
            <div className="modal-buttons">
              <button className="modal-confirm-btn" onClick={selectRepeatDateTime}>
                Продолжить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для подтверждения повторной записи SMS-кодом */}
      {showRepeatCodeModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowRepeatCodeModal(false)}>×</button>
            <h3>Подтверждение записи</h3>
            <p>На ваш номер телефона отправлен SMS-код подтверждения</p>
            <p>Введите 4-значный код:</p>
            
            <input
              type="text"
              className="sms-code-input"
              placeholder="1234"
              value={repeatCode}
              onChange={(e) => setRepeatCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
            />
            
            <div className="code-hint">Тестовый код: <strong>1234</strong></div>
            
            <div className="modal-buttons">
              <button className="modal-confirm-btn" onClick={handleRepeatCodeSubmit}>
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно успешной повторной записи */}
      {showRepeatSuccessModal && appointmentToRepeat && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>✓ Запись успешно создана</h3>
            <p>Вы успешно записались к врачу:</p>
            <div className="appointment-info">
              <p><strong>Врач:</strong> {appointmentToRepeat.doctorName}</p>
              <p><strong>Специальность:</strong> {appointmentToRepeat.specialty}</p>
              <p><strong>Адрес:</strong> {appointmentToRepeat.address}</p>
              {repeatDate && <p><strong>Дата:</strong> {repeatDate}</p>}
              {repeatTime && <p><strong>Время:</strong> {repeatTime}</p>}
            </div>
            <button className="modal-success-btn" onClick={closeRepeatSuccess}>
              Вернуться к моим записям
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;