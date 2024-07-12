import { initialCards } from './components/cards.js';
import './pages/index.css'; // импорт главного файла стилей
import { deleteCard, addLike, createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

const cardsContainer = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
export const newPlace = document.forms['new-place'];
const placeName = newPlace.querySelector('.popup__input_type_card-name');
const placeLink = newPlace.querySelector('.popup__input_type_url');

// Находим все элементы с классом 'popup' на странице
const popups = document.querySelectorAll('.popup');

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
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorVisible: '.popup__error_visible',
  inputErrorVisible: '.popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Функция добавления массива карточек на страницу
function addCards() {
  initialCards.forEach(function (place) {
    const card = createCard(place, deleteCard, addLike, openImagePopup);
    cardsContainer.appendChild(card);
  });
}

// Вывести карточки на страницу
addCards();

//Добавление новой карточки 
function addCardToCardsArray(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeName.value,
    link: placeLink.value,
  };
  const newPlaceCard = createCard(newCard, deleteCard, addLike);
  cardsContainer.insertBefore(newPlaceCard, cardsContainer.firstChild);
  newPlace.reset();
  closePopup(popupAddNewCard);
}

// Функция для установки значений формы редактирования профиля
function setProfileFormValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция для открытия попапа редактирования профиля при нажатии на кнопку
function openProfilePopupByButton() {
  setProfileFormValues();
  openPopup(popupProfile);
  clearValidation(popupProfile, popupAddNewCard, configValidation);
}

// Добавляем обработчик события для открытия попапа редактирования профиля
editButton.addEventListener('click', openProfilePopupByButton);

// Функция для изменения профиля
function changeProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
  profileForm.reset();
}

// Устанавливаем значения формы при загрузке страницы
setProfileFormValues();

// Добавляем обработчики событий для форм и кнопок 
profileForm.addEventListener('submit', changeProfile);
newPlace.addEventListener('submit', addCardToCardsArray);

// Функция для открытия попапа при нажатии на кнопку
function openPopupByButton(button, popup) {
  // Добавляем обработчик события для клика по кнопке
    button.addEventListener('click', function () {
      openPopup(popup);
    });
    clearValidation(popupProfile, popupAddNewCard, configValidation);
  }

// Вызов функции для открытия попапа добавления новой карточки при нажатии на кнопку
openPopupByButton(addButton, popupAddNewCard);

// Функция для открытия попапа изображения
function openImagePopup(link, alt) {
  popupImageImage.src = link;
  popupImageImage.alt = alt;
  popupCaptionImage.textContent = alt;
  openPopup(popupImage);
}

// Добавляем обработчики событий для каждого попапа на оверлэй
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

// Функция для установки текущего года в элемент с id 'year'
document.getElementById('year').textContent = new Date().getFullYear();

enableValidation(configValidation);
