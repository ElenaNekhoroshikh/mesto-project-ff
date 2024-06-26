export { openPopup, closePopup, openPopupByButton };

// Находим все элементы с классом 'popup' на странице
const popups = document.querySelectorAll('.popup');

// Переменная для хранения функции обратного вызова для обработки нажатия клавиши "Escape"
let escCallback;

// Функция для открытия попапа
function openPopup(popup) {
  // Добавляем класс для открытия попапа
  popup.classList.add('popup_is-opened');
  // Добавляем класс для анимации открытия попапа
  popup.classList.add('popup_is-animated');
  // Определяем функцию обратного вызова для обработки нажатия клавиши "Escape"
  escCallback = function (evt) {
  closePopupEsc(evt, popup);
  };
  // Добавляем обработчик события для нажатия клавиши "Escape"
  document.addEventListener('keydown', escCallback);
}

// Функция для закрытия попапа
function closePopup(popup) {
  // Убираем класс для открытия попапа
  popup.classList.remove('popup_is-opened');
  // Добавляем класс для анимации закрытия попапа
  popup.classList.add('popup_is-animated');
   // Удаляем обработчик события для нажатия клавиши "Escape"
  document.removeEventListener('kedown', escCallback);
}

// Функция для закрытия попапа при нажатии клавиши "Escape"
function closePopupEsc(evt, popup) {
  // Если нажата клавиша "Escape", закрываем попап
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

// Функция для открытия попапа при нажатии на кнопку

function openPopupByButton(button, popup) {
// Добавляем обработчик события для клика по кнопке
  button.addEventListener('click', function () {
    openPopup(popup);
  });
}

// Добавляем обработчики событий для каждого попапа
popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    // Закрываем попап, если кликнули по самому попапу или по элементу с классом 'popup__close'
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains('popup__close')
    ) {
      closePopup(popup);
    }
  });
});