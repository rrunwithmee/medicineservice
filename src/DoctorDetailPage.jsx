import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import './DoctorDetailPage.css';
import logoImage from './фото_проекта/логотип.png';
import clinicImage from './фото_проекта/поликлиника.png';
import footerImage from './фото_проекта/нижняя_панель_фото.jpg';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

// Импортируем фото врачей
import врач1 from './фото_проекта/врач_1.jpg';
import врач2 from './фото_проекта/врач_2.jpg';
import врач3 from './фото_проекта/врач_3.jpg';
import врач4 from './фото_проекта/врач_4.jpg';
import врач5 from './фото_проекта/врач_5.jpg';
import врач6 from './фото_проекта/врач_6.jpg';

function DoctorDetailPage() {
  const { id } = useParams();
  const [searchAddress, setSearchAddress] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Для обычной записи
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Для листа ожидания (последовательные окна)
  const [showWaitlistStep1, setShowWaitlistStep1] = useState(false);
  const [showWaitlistStep2, setShowWaitlistStep2] = useState(false);
  const [showWaitlistStep3, setShowWaitlistStep3] = useState(false);
  
  // Для неавторизованных
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Общие состояния
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [verificationCode, setVerificationCode] = useState('1234'); 
  const [enteredCode, setEnteredCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [showResendTimer, setShowResendTimer] = useState(false);
  const [codeError, setCodeError] = useState('');

  // Состояние для отслеживания выбранной даты в карточке врача
  const [selectedDateForDoctor, setSelectedDateForDoctor] = useState({});

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // Запускаем таймер для повторной отправки кода
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showResendTimer) {
      setShowResendTimer(false);
    }
  }, [countdown, showResendTimer]);

  // Функция для получения фото по имени файла
  const getDoctorPhoto = (photoName) => {
    switch(photoName) {
      case 'врач_1.jpg': return врач1;
      case 'врач_2.jpg': return врач2;
      case 'врач_3.jpg': return врач3;
      case 'врач_4.jpg': return врач4;
      case 'врач_5.jpg': return врач5;
      case 'врач_6.jpg': return врач6;
      default: return logoImage;
    }
  };

  // Данные врачей-хирургов
  const surgeons = [
    {
      id: 1,
      specialty: "Хирург",
      name: "Якубович Ангелина Максимовна",
      address: "ул. Авиаторов, д. 25",
      experience: "Стаж 38 лет",
      qualifications: ["Врач высшей категории"],
      dates: [
        { day: "9 окт", weekday: "вс" },
        { day: "20 окт", weekday: "пн" },
        { day: "21 окт", weekday: "вт" },
        { day: "22 окт", weekday: "ср" },
        { day: "23 окт", weekday: "чт" }
      ],
      times: ["15:00", "15:30"],
      photo: "врач_1.jpg"
    },
    {
      id: 2,
      specialty: "Хирург",
      name: "Аделинко Диана Алексеевна",
      address: "ул. Новопеределкино, д. 12",
      experience: "Стаж 28 лет",
      qualifications: ["Врач высшей категории", "Кандидат медицинских наук"],
      dates: [
        { day: "19 окт", weekday: "вс" },
        { day: "20 окт", weekday: "пн" },
        { day: "21 окт", weekday: "вт" },
        { day: "22 окт", weekday: "ср" },
        { day: "23 окт", weekday: "чт" }
      ],
      times: ["15:00", "15:30", "14:00", "14:30", "20:00"],
      photo: "врач_2.jpg"
    },
    {
      id: 3,
      specialty: "Хирург",
      name: "Кисленко Данил Игоревич",
      address: "ул. Строгино, д. 8",
      experience: "Стаж 40 лет",
      qualifications: ["Врач высшей категории"],
      dates: [
        { day: "19 окт", weekday: "вс" },
        { day: "20 окт", weekday: "пн" },
        { day: "21 окт", weekday: "вт" },
        { day: "22 окт", weekday: "ср" },
        { day: "23 окт", weekday: "чт" }
      ],
      times: ["15:00", "15:30"],
      photo: "врач_3.jpg"
    }
  ];

  // Данные для всех специальностей
  const doctorsBySpecialty = {
    "Офтальмолог": [
      {
        id: 1,
        specialty: "Офтальмолог",
        name: "Иванова Анна Сергеевна",
        address: "ул. Медицинская, д. 15, каб. 304",
        experience: "Стаж 15 лет",
        qualifications: ["Врач высшей категории"],
        dates: [
          { day: "15 окт", weekday: "вс" },
          { day: "16 окт", weekday: "пн" },
          { day: "17 окт", weekday: "вт" }
        ],
        times: ["09:00", "10:00", "11:00"],
        photo: "врач_4.jpg"
      },
      {
        id: 2,
        specialty: "Офтальмолог",
        name: "Петров Сергей Иванович",
        address: "ул. Медицинская, д. 16, каб. 305",
        experience: "Стаж 20 лет",
        qualifications: ["Врач высшей категории", "Кандидат медицинских наук"],
        dates: [
          { day: "18 окт", weekday: "ср" },
          { day: "19 окт", weekday: "чт" },
          { day: "20 окт", weekday: "пт" }
        ],
        times: ["14:00", "15:00", "16:00"],
        photo: "врач_5.jpg"
      },
      {
        id: 3,
        specialty: "Офтальмолог",
        name: "Сидорова Мария Викторовна",
        address: "ул. Медицинская, д. 17, каб. 306",
        experience: "Стаж 12 лет",
        qualifications: ["Врач второй категории"],
        dates: [
          { day: "21 окт", weekday: "сб" },
          { day: "22 окт", weekday: "вс" },
          { day: "23 окт", weekday: "пн" }
        ],
        times: ["10:30", "11:30", "13:00"],
        photo: "врач_6.jpg"
      }
    ],
    "Травматолог": [
      {
        id: 1,
        specialty: "Травматолог",
        name: "Козлов Алексей Петрович",
        address: "ул. Медицинская, д. 18, каб. 307",
        experience: "Стаж 18 лет",
        qualifications: ["Врач высшей категории"],
        dates: [
          { day: "15 окт", weekday: "вс" },
          { day: "16 окт", weekday: "пн" },
          { day: "17 окт", weekday: "вт" }
        ],
        times: ["10:00", "11:00", "15:00"],
        photo: "врач_1.jpg"
      },
      {
        id: 2,
        specialty: "Травматолог",
        name: "Николаева Елена Владимировна",
        address: "ул. Медицинская, д. 19, каб. 308",
        experience: "Стаж 9 лет",
        qualifications: ["Врач первой категории"],
        dates: [
          { day: "18 окт", weekday: "ср" },
          { day: "19 окт", weekday: "чт" },
          { day: "20 окт", weekday: "пт" }
        ],
        times: ["14:00", "15:00", "16:00"],
        photo: "врач_2.jpg"
      }
    ],
    "Хирург": surgeons,
    "Невролог": [
      {
        id: 1,
        specialty: "Невролог",
        name: "Федоров Игорь Сергеевич",
        address: "ул. Медицинская, д. 21, каб. 310",
        experience: "Стаж 14 лет",
        qualifications: ["Врач высшей категории"],
        dates: [
          { day: "15 окт", weekday: "вс" },
          { day: "16 окт", weekday: "пн" },
          { day: "17 окт", weekday: "вт" }
        ],
        times: ["09:00", "11:00", "14:00"],
        photo: "врач_3.jpg"
      }
    ]
  };

  // Получаем ID из URL и определяем специальность
  const specialtyIdMap = {
    1: "Офтальмолог",
    2: "Травматолог",
    3: "Невролог",
    4: "Врачи общей практики",
    5: "Кардиолог",
    6: "Гинеколог",
    7: "Дерматолог",
    8: "Отоларинголог",
    9: "Уролог",
    10: "Гастроэнтеролог",
    11: "Стоматолог",
    12: "Окулист",
    13: "Эндокринолог",
    14: "Проктолог",
    15: "Маммолог",
    16: "Психолог",
    17: "Психиатр",
    18: "Психотерапевт",
    19: "Терапевт",
    20: "Хирург"
  };

  const specialty = specialtyIdMap[id] || "Офтальмолог";
  const doctors = doctorsBySpecialty[specialty] || doctorsBySpecialty["Офтальмолог"];

  const handleSearch = () => {
    if (searchAddress.trim()) {
      alert(`Поиск врачей ${specialty.toLowerCase()} по адресу: ${searchAddress}`);
    }
  };
  
  const handleDateClick = (doctor, date) => {
    // Сохраняем выбранную дату для конкретного врача
    setSelectedDateForDoctor(prev => ({
      ...prev,
      [doctor.id]: date
    }));

  };

  const handleTimeClick = (doctor, time) => {
    // Проверяем, выбрана ли дата для этого врача
    const selectedDate = selectedDateForDoctor[doctor.id];
    
    if (!selectedDate) {
      alert('Пожалуйста, сначала выберите дату!');
      return;
    }
    
    if (!isLoggedIn) {
      setSelectedDoctor(doctor);
      setShowLoginModal(true);
      return;
    }
    
    setSelectedDoctor(doctor);
    setSelectedDate(selectedDate);
    setSelectedTime(time);
    setEnteredCode('');
    setCodeError('');
    setShowCodeModal(true);
  };

  const handleWaitlistClick = (doctor) => {
    if (!isLoggedIn) {
      setSelectedDoctor(doctor);
      setShowLoginModal(true);
      return;
    }
    
    setSelectedDoctor(doctor);
    setEnteredCode('');
    setCodeError('');
    setSelectedDate('');
    setShowWaitlistStep1(true);
  };

  const handleWaitlistDateSelect = (date) => {
    setSelectedDate(date);
    setShowWaitlistStep1(false);
    setShowWaitlistStep2(true);
  };

  const handleCodeSubmit = () => {
    if (enteredCode !== verificationCode) {
      setCodeError('Неверный код. Попробуйте еще раз.');
      return;
    }
    
    // Сохраняем запись в localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
      id: Date.now(),
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      address: selectedDoctor.address,
      date: selectedDate || '',
      time: selectedTime || '',
      isWaitlist: showWaitlistStep2, // Если было из листа ожидания
      status: showWaitlistStep2 ? 'В листе ожидания' : 'Подтверждена',
      timestamp: new Date().toISOString()
    };
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    // Сбрасываем выбранную дату для этого врача
    if (selectedDoctor) {
      setSelectedDateForDoctor(prev => ({
        ...prev,
        [selectedDoctor.id]: null
      }));
    }
    
    if (showWaitlistStep2) {
      setShowWaitlistStep2(false);
      setShowWaitlistStep3(true);
    } else {
      setShowCodeModal(false);
      setShowSuccessModal(true);
    }
  };

  const handleResendCode = () => {
    setCountdown(60);
    setShowResendTimer(true);
    alert('Код отправлен повторно!');
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setShowWaitlistStep3(false);
    window.location.href = '/profile';
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    window.location.href = '/login';
  };

  const handleRegisterRedirect = () => {
    setShowLoginModal(false);
    window.location.href = '/register';
  };

  // Компонент для ОТДЕЛЬНОЙ КАРТОЧКИ ВРАЧА
  const IndividualDoctorCard = ({ doctor }) => {
    const selectedDate = selectedDateForDoctor[doctor.id];
    
    return (
      <div className="individual-doctor-card">
        {/*  КРУГЛОЕ ФОТО ВРАЧА */}
        <div className="doctor-photo-section">
          <img 
            src={getDoctorPhoto(doctor.photo)} 
            alt={doctor.name} 
            className="doctor-photo"
            onError={(e) => {
              e.target.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className = 'doctor-photo-placeholder';
              placeholder.innerHTML = '<div class="photo-text">Фото врача</div>';
              e.target.parentNode.appendChild(placeholder);
            }}
          />
        </div>

        {/* ЦЕНТРАЛЬНАЯ ЧАСТЬ: Информация о враче */}
        <div className="doctor-info-center">
          <div className="doctor-specialty">{doctor.specialty}</div>
          <h3 className="doctor-full-name">{doctor.name}</h3>
          <div className="doctor-address-section">
            <div className="address-label">Адрес</div>
            <div className="doctor-address">{doctor.address}</div>
          </div>
          <div className="doctor-info-row">
            <div className="doctor-experience">{doctor.experience}</div>
          </div>
          <div className="doctor-info-row">
            {doctor.qualifications.map((qual, index) => (
              <div 
                key={index} 
                className={qual.includes("Кандидат") || qual.includes("Доктор") ? "doctor-science" : "doctor-qualification"}
              >
                {qual}
              </div>
            ))}
          </div>
        </div>

        {/* Правая часть: даты и время */}
        <div className="doctor-right-section">
          <div className="dates-section">
            {/* Заголовок с кнопкой листа ожидания справа */}
            <div className="dates-header">
              <div className="dates-label">Доступные даты:</div>
              <button 
                className="waitlist-btn-corner" 
                onClick={() => handleWaitlistClick(doctor)}
              >
                Лист ожидания
              </button>
            </div>
            
            <div className="dates-grid">
              {doctor.dates.map((date, index) => (
                <button 
                  key={index} 
                  className={`date-item clickable ${selectedDate === date.day ? 'date-selected' : ''}`}
                  onClick={() => handleDateClick(doctor, date.day)}
                >
                  <div className="date-day">{date.weekday}</div>
                  <div className="date-number">{date.day}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="times-section">
            <div className="times-label">Время:</div>
            <div className="times-grid">
              {doctor.times.map((time, index) => (
                <button 
                  key={index} 
                  className="time-item clickable"
                  onClick={() => handleTimeClick(doctor, time)}
                  disabled={!selectedDate}
                >
                  {time}
                </button>
              ))}
            </div>
            {selectedDate && (
              <div className="selected-date-info">
                Выбрана дата: <strong>{selectedDate}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    );
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

      {/* Картинка поликлиники */}
      <div className="background-image-container">
        <img 
          src={clinicImage} 
          alt="Поликлиника" 
          className="background-clinic-image"
        />
      </div>

      {/* Основной контент */}
      <main className="main-content">
        <div className="doctor-detail-container">
          {/* Заголовок специальности */}
          <h2 className="specialty-title-header">Врачи {specialty.toLowerCase()}</h2>
          
          {/* ПОИСК ПО АДРЕСУ */}
          <div className="search-section-doctor">
            <div className="search-group-doctor">
              <div className="search-icon-doctor">
                <FaMapMarkerAlt />
              </div>
              <input 
                type="text" 
                placeholder="Адрес" 
                className="search-input-doctor"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-btn-doctor" onClick={handleSearch}>
                <FaSearch className="search-btn-icon-doctor" />
                <span>Найти</span>
              </button>
            </div>
          </div>
          
          {/* Контейнер для отдельных карточек врачей */}
          <div className="doctors-cards-container">
            {doctors.map((doctor) => (
              <IndividualDoctorCard key={doctor.id} doctor={doctor} />
            ))}
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

      {/* 1. Модальное окно для ввода кода (обычная запись) */}
      {showCodeModal && (
        <div className="modal-overlay">
          <div className="modal-code">
            <button className="modal-close" onClick={() => setShowCodeModal(false)}>×</button>
            <h3>Подтвердите запись</h3>
            <p>Вам был выслан код на номер телефона, указанный в профиле.</p>
            <p>Подтвердите свою запись.</p>
            
            <div className="code-input-container">
              <input 
                type="text" 
                className="code-input"
                placeholder="Введите 4-значный код"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
              />
              <div className="code-hint">Тестовый код: 1234</div>
              {codeError && <div className="code-error">{codeError}</div>}
            </div>
            
            <button className="modal-confirm-btn" onClick={handleCodeSubmit}>
              Подтвердить
            </button>
            
            <div className="resend-code">
              {showResendTimer ? (
                <span>Выслать код еще раз через {countdown} сек</span>
              ) : (
                <button className="resend-btn" onClick={handleResendCode}>
                  Выслать код еще раз
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Модальное окно ЛИСТ ОЖИДАНИЯ - Выбор даты */}
      {showWaitlistStep1 && selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-waitlist-step1">
            <button className="modal-close" onClick={() => setShowWaitlistStep1(false)}>×</button>
            <h3>Лист ожидания</h3>
            <p>1. Запишитесь на доступное время</p>
            <p>2. Напишем, если врач сможет принять раньше</p>
            
            <div className="available-dates">
              <h4>Доступные даты:</h4>
              <div className="dates-selection">
                {selectedDoctor.dates.map((date, index) => (
                  <button 
                    key={index}
                    className="date-selection-btn"
                    onClick={() => handleWaitlistDateSelect(date.day)}
                  >
                    <div className="date-weekday">{date.weekday}</div>
                    <div className="date-day">{date.day}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Модальное окно ЛИСТ ОЖИДАНИЯ - Ввод кода */}
      {showWaitlistStep2 && (
        <div className="modal-overlay">
          <div className="modal-code">
            <button className="modal-close" onClick={() => setShowWaitlistStep2(false)}>×</button>
            <h3>Подтвердите запись в лист ожидания</h3>
            <p>Вам был выслан код на номер телефона, указанный в профиле.</p>
            <p>Подтвердите свою запись в лист ожидания.</p>
            
            <div className="code-input-container">
              <input 
                type="text" 
                className="code-input"
                placeholder="Введите 4-значный код"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
              />
              <div className="code-hint">Тестовый код: 1234</div>
              {codeError && <div className="code-error">{codeError}</div>}
            </div>
            
            <button className="modal-confirm-btn" onClick={handleCodeSubmit}>
              Подтвердить
            </button>
            
            <div className="resend-code">
              {showResendTimer ? (
                <span>Выслать код еще раз через {countdown} сек</span>
              ) : (
                <button className="resend-btn" onClick={handleResendCode}>
                  Выслать код еще раз
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Модальное окно ЛИСТ ОЖИДАНИЯ - Успешная запись */}
      {showWaitlistStep3 && selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-success">
            <h3>✓ Запись в лист ожидания подтверждена</h3>
            <p>Мы оповестим вас, если у врача появится свободное окошко</p>
            <div className="appointment-details">
              <p><strong>Врач:</strong> {selectedDoctor.name}</p>
              {selectedDate && <p><strong>Предпочтительная дата:</strong> {selectedDate}</p>}
            </div>
            <button className="modal-success-btn" onClick={handleCloseSuccess}>
              К моим записям
            </button>
          </div>
        </div>
      )}

      {/* 5. Модальное окно успешной записи (обычная запись) */}
      {showSuccessModal && selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-success">
            <h3>✓ Запись подтверждена</h3>
            <p>Ждем вас на прием по адресу:</p>
            <p><strong>{selectedDoctor.address}</strong></p>
            <div className="appointment-details">
              <p><strong>Врач:</strong> {selectedDoctor.name}</p>
              {selectedDate && <p><strong>Дата:</strong> {selectedDate}</p>}
              {selectedTime && <p><strong>Время:</strong> {selectedTime}</p>}
            </div>
            <button className="modal-success-btn" onClick={handleCloseSuccess}>
              К моим записям
            </button>
          </div>
        </div>
      )}

      {/* 6. Модальное окно для неавторизованных */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-login">
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>×</button>
            <h3>Для записи войдите в личный кабинет</h3>
            <p>Для записи войдите в личный кабинет или зарегистрируйтесь</p>
            <div className="modal-auth-buttons">
              <button className="modal-login-btn" onClick={handleLoginRedirect}>
                Войти
              </button>
              <button className="modal-register-btn" onClick={handleRegisterRedirect}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorDetailPage;