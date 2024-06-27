export { openPopup, closePopup };

// Функция для открытия попапа
function openPopup(popup) {
  // Добавляем класс для открытия попапа
  popup.classList.add('popup_is-opened');
  // Добавляем класс для анимации открытия попапа
  popup.classList.add('popup_is-animated');
  
  // Добавляем обработчик события для нажатия клавиши "Escape"
  document.addEventListener('keydown', closeEscPopup);
}

// Функция для закрытия попапа
function closePopup(popup) {
  // Убираем класс для открытия попапа
  popup.classList.remove('popup_is-opened');
  // Добавляем класс для анимации закрытия попапа
  popup.classList.add('popup_is-animated');

   // Удаляем обработчик события для нажатия клавиши "Escape"
  document.removeEventListener('keydown', closeEscPopup);
}

// Функция для закрытия попапа при нажатии клавиши "Escape"
function closeEscPopup(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}
