import './pages/index.css'; // импорт главного файла стилей
import { createCard, addLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getUserInfoFromServer,
  getInitialCards,
  patchProfileForm,
  postAddNewCard,
  handleDeleteCard,
  updateAvatar,
} from './components/api.js';

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const newPlace = document.forms['new-place']; // форма добавления новой карточки
const placeName = newPlace.querySelector('.popup__input_type_card-name');
const placeLink = newPlace.querySelector('.popup__input_type_url');

// Находим все элементы с классом 'popup' на странице
const popups = document.querySelectorAll('.popup');

// Находим элементы попапов на странице
const popupProfile = document.querySelector('.popup_type_edit');  // редактирование профиля
const popupAddNewCard = document.querySelector('.popup_type_new-card'); // добавление новой карточки
const popupImage = document.querySelector('.popup_type_image'); // модальное окно увеличенное изображение

// Находим кнопки для открытия попапов
const editButton = document.querySelector('.profile__edit-button'); // кнопка открытия окна редактрвоания профиля
const addButton = document.querySelector('.profile__add-button'); // кнопка открытия окна добавления карточки

// Находим элементы внутри попапа изображения
const popupImageImage = document.querySelector('.popup__image');
const popupCaptionImage = document.querySelector('.popup__caption');

// Находим элементы формы редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const profileForm = document.forms['edit-profile']; // форма редактирования профиля
const avatarForm = document.forms['edit-avatar']; //форма редактирования аватара

const modalAvatar = document.querySelector('.popup_type_avatar');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const popupAlert = document.querySelector('.popup_type_alert');
const submitDeleteCard = popupAlert.querySelector('.popup__button-alert');

let userId;

// Функция кнопки сохранения
const renderLoading = (isLoading, buttonElement) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
    buttonElement.classList.add(configValidation.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
};

//Функция добавления новой карточки
newPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  console.log(newPlace);
  clearValidation(newPlace, configValidation);
  console.log(newPlace);
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
  postAddNewCard({
    name: placeName.value,
    link: placeLink.value,
  }).then((dataCard) => {
    const cardElement = createCard({
      cardTemplate, userId, dataCard, deleteCard, addLike, openImagePopup,
    });
    cardsContainer.prepend(cardElement);
    newPlace.reset();
    closePopup(popupAddNewCard);
  }).catch((err) => {
    console.log('Ошибка добавления карточки:', err);
  }).finally(() => {
    renderLoading(false, buttonElement);
  });
});

// Функция удаления карточки
const deleteCard = (cardId) => {
  openPopup(popupAlert);
  popupAlert.dataset.cardId = cardId;
};

const confirmDeleteCard = () => {
  handleDeleteCard(popupAlert.dataset.cardId)
  .then((result) => {
    console.log(result);
    const delCard = document.getElementById(popupAlert.dataset.cardId);
    delCard.remove();
    closePopup(popupAlert);
  }).catch((err) => {
    console.log('Ошибка удаления карточки:', err);
  });
};

// Функция для открытия попапа изображения
const openImagePopup = (link, alt) => {
  popupImageImage.src = link;
  popupImageImage.alt = alt;
  popupCaptionImage.textContent = alt;
  openPopup(popupImage);
};

// Функция редактирования профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  buttonElement.setAttribute('disabled', 'disabled');
  renderLoading(true, buttonElement);
  patchProfileForm({
    name: nameInput.value,
    about: jobInput.value,
  }).then((userInfo) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    closePopup(popupProfile);
  }).catch((err) => {
    console.log('Ошибка изменения данных пользователя:', err);
  }).finally(() => {
    renderLoading(false, buttonElement);
  });
});

// Функция обновления аватара
const updateAvatarForm = (evt) => {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
  updateAvatar({
    link: avatarForm.link.value,
  }).then((userInfo) => {
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    closePopup(modalAvatar);
  }).catch((err) => {
    console.log('Ошибка добавления аватара:', err);
  }).finally(() => {
    renderLoading(false, buttonElement);
  });
};

// Добавляем обработчик события для открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
  clearValidation(profileForm, configValidation);
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
/*editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupProfile);
  clearValidation(profileForm, configValidation);
});*/

// Добавляем обработчик события для открытия попапа редактирования новой карточки
addButton.addEventListener('click', () => {
  newPlace.reset();
  openPopup(popupAddNewCard);
  clearValidation(newPlace, configValidation);
});

profileAvatar.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, configValidation);
  openPopup(modalAvatar);
});

submitDeleteCard.addEventListener('click', confirmDeleteCard);
avatarForm.addEventListener('submit', updateAvatarForm)

// Вывод карточек на страницу с информацией пользователя
Promise.all([getInitialCards(), getUserInfoFromServer()])
  .then(([initialCards, userInfo]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;

    initialCards.forEach((dataCard) => {
      const cardElement = createCard({
        cardTemplate, userId, dataCard, deleteCard, addLike, openImagePopup,
      });
      cardsContainer.append(cardElement);
    });
  }).catch((err) => {
    console.log('Ошибка передачи карточки:', err);
  });

  // Добавляем обработчики событий для каждого попапа на оверлэй и кнопку
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    // Закрываем попап, если кликнули по самому попапу или по элементу с классом 'popup__close'
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains('popup__close')
    ) {
      const modal = document.querySelector('.popup_is-opened');
      closePopup(modal);
    }
  });
});

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

  enableValidation(configValidation);

  // Функция для установки текущего года в элемент с id 'year'
document.getElementById('year').textContent = new Date().getFullYear();