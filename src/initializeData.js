export const initializeTestData = () => {
  // Проверяем, была ли уже выполнена инициализация
  if (localStorage.getItem('dataInitialized') === 'true') {
    return;
  }
  
  // Создаем тестовую историю записей
  if (!localStorage.getItem('appointmentHistory')) {
    const testHistory = [
      {
        id: 1,
        doctorName: "Иванова Анна Сергеевна",
        specialty: "Офтальмолог",
        address: "ул. Медицинская, д. 15, каб. 304",
        date: "15 окт",
        time: "10:00",
        status: "Завершена",
        timestamp: "2024-10-01T10:00:00Z"
      },
      {
        id: 2,
        doctorName: "Петров Сергей Иванович",
        specialty: "Офтальмолог",
        address: "ул. Медицинская, д. 16, каб. 305",
        date: "16 окт",
        time: "14:00",
        status: "Отменена",
        timestamp: "2024-10-02T14:00:00Z"
      }
    ];
    localStorage.setItem('appointmentHistory', JSON.stringify(testHistory));
  }
  
  // Создаем тестовые текущие записи если их нет
  if (!localStorage.getItem('appointments')) {
    const testAppointments = [
      {
        id: Date.now(),
        doctorName: "Якубович Ангелина Максимовна",
        specialty: "Хирург",
        address: "ул. Авиаторов, д. 25",
        date: "9 окт",
        time: "15:00",
        status: "Подтверждена",
        timestamp: new Date().toISOString()
      }
    ];
    localStorage.setItem('appointments', JSON.stringify(testAppointments));
  }
  
  // Создаем тестового пользователя если его нет
  if (!localStorage.getItem('isLoggedIn')) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', 'Иван Иванов');
    localStorage.setItem('userPhone', '+7 (999) 123-45-67');
    localStorage.setItem('userPassword', 'password123');
  }
  
  // Создаем тестовые сообщения поддержки если их нет
  if (!localStorage.getItem('supportRequests')) {
    const testSupportRequests = [
      {
        id: 1,
        message: "Здравствуйте, у меня вопрос по записи к врачу",
        date: "2024-10-10T14:30:00Z",
        user: "Иван Иванов",
        phone: "+7 (999) 123-45-67",
        email: "ivan@example.com",
        status: "answered"
      }
    ];
    localStorage.setItem('supportRequests', JSON.stringify(testSupportRequests));
  }
  
  // Отмечаем, что данные инициализированы
  localStorage.setItem('dataInitialized', 'true');
  
  console.log('Test data initialized successfully');
};

// Функция для сброса данных (для разработки)
export const resetTestData = () => {
  localStorage.removeItem('dataInitialized');
  localStorage.removeItem('appointmentHistory');
  localStorage.removeItem('appointments');
  localStorage.removeItem('supportRequests');
  console.log('Test data reset');
};