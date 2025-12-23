import врач1 from './фото_проекта/врач_1.jpg';
import врач2 from './фото_проекта/врач_2.jpg';
import врач3 from './фото_проекта/врач_3.jpg';
import врач4 from './фото_проекта/врач_4.jpg';
import врач5 from './фото_проекта/врач_5.jpg';
import врач6 from './фото_проекта/врач_6.jpg';


import logoImage from './фото_проекта/логотип.png';

export const doctorPhotos = {
  'врач_1.jpg': врач1,
  'врач_2.jpg': врач2,
  'врач_3.jpg': врач3,
  'врач_4.jpg': врач4,
  'врач_5.jpg': врач5,
  'врач_6.jpg': врач6,
  'default': logoImage
};

// Функция для получения фото
export const getDoctorPhoto = (photoName) => {
  return doctorPhotos[photoName] || doctorPhotos.default;
};