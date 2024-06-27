import { cardTemplate } from '../index.js';
export { deleteCard, addLike, createCard };

// @todo: Функция создания карточки
function createCard (place, deleteCard, addLike, openPopapImg) {
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
    openPopapImg(place.link, place.name);
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

