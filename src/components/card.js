import { cardTemplate } from '../index.js';
export { createCard, deleteCard, addLike };

// @todo: Функция создания карточки
function createCard(dataCard, deleteCard, addLike, openModalImg) {
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;

  deleteButton.addEventListener('click', deleteCard);
  likeBtn.addEventListener('click', addLike);
  cardImage.addEventListener('click', () => {
    openModalImg(dataCard.name, dataCard.link);
  });
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const deleteCard = evt.target.closest('.places__item');
  deleteCard.remove();
}

// @todo: Функция лайка
function addLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}