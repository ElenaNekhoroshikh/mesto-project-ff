import { initialCards } from './cards.js';
import { openImagePopup, popupAddNewCard } from '../index.js';
import { closePopup } from './modal.js';
export { addCard, deleteCard, addLike, addCardToCardsArray };

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
export const newPlace = document.forms['new-place'];
const placeName = newPlace.querySelector('.popup__input_type_card-name');
const placeLink = newPlace.querySelector('.popup__input_type_url');

// @todo: Функция создания карточки
function createCard (place, deleteCard, addLike) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = place.name;
  cardImage.src = place.link;
  cardImage.alt = 'Фотография с места - ' + place.name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', addLike);

  cardImage.addEventListener('click', function () {
    openImagePopup(place.link, place.name);
  });

return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const delcard = evt.target.closest('.places__item');
  delcard.remove();
}

// Функция лайка
function addLike(evt) {
  const currentCard = evt.target.closest('.card');
  const cardToLike = currentCard.querySelector('.card__like-button');
  cardToLike.classList.toggle('card__like-button_is-active');
}

function addCard() {
  initialCards.forEach(function (place) {
    const card = createCard(place, deleteCard, addLike);
    cardsContainer.appendChild(card);
  });
}

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