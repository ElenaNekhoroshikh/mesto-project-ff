import './pages/index.css'; // импорт главного файла стилей
import { addCard, addCardToCardsArray, newPlace } from './components/card.js';
import { openPopup, closePopup, openPopupByButton } from './components/modal.js';
export { popupAddNewCard, popupImage };
export { openImagePopup };

// Вывести карточки на страницу
addCard();

// Находим элементы попапов на странице
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Находим кнопки для открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Находим элементы внутри попапа изображения
const popupImageImage = document.querySelector('.popup__image');
const popupCaptionImage = document.querySelector('.popup__caption');

// Находим элементы формы редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Функция для установки значений формы редактирования профиля
function setProfileFormValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция для открытия попапа редактирования профиля при нажатии на кнопку
function openProfilePopupByButton() {
  setProfileFormValues();
  openPopup(popupProfile);
}

// Добавляем обработчик события для открытия попапа редактирования профиля
editButton.addEventListener('click', openProfilePopupByButton);

// Функция для изменения профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
  formElement.reset();
}

// Устанавливаем значения формы при загрузке страницы
setProfileFormValues();

// Добавляем обработчики событий для форм и кнопок 
formElement.addEventListener('submit', handleFormSubmit);
newPlace.addEventListener('submit', addCardToCardsArray);

// Вызов функции для открытия попапа добавления новой карточки при нажатии на кнопку
openPopupByButton(addButton, popupAddNewCard);


// Функция для открытия попапа изображения
function openImagePopup(link, alt) {
  popupImageImage.src = link;
  popupImageImage.alt = alt;
  popupCaptionImage.textContent = alt;
  openPopup(popupImage);
}

// Функция для установки текущего года в элемент с id 'year'
document.getElementById('year').textContent = new Date().getFullYear();
