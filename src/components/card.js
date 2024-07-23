import { handleCardLike, deleteLikeCard } from './api.js';
export { createCard, addLike };

// @todo: Функция создания карточки
const createCard = ({
  cardTemplate,
  userId, 
  dataCard, 
  deleteCard, 
  addLike, 
  openImagePopup}) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const countLikes = cardElement.querySelector('.card__counter-like');

  cardTitle.textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = 'Фотография с места - ' + dataCard.name;
  cardElement.id = dataCard['_id'];
  countLikes.textContent = dataCard.likes.length;

  const isLiked = dataCard.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (dataCard.owner._id === userId) {
    deleteButton.addEventListener('click', (evt) => {
      deleteCard(dataCard._id);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener('click', (evt) => {
    addLike(evt, dataCard._id, countLikes);
  });

  cardImage.addEventListener('click', () => {
    openImagePopup(dataCard.link, dataCard.name);
  });

return cardElement;
};

// Функция лайка
const addLike = (evt, cardId, countLikes) => {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(cardId)
    .then((updateCard) => {
      evt.target.classList.remove('card__like-button_is-active');
      countLikes.textContent = updateCard.likes.length;
    }).catch((err) => {
      console.log('Ошибка удаления лайка:', err);
    });
  } else {
    handleCardLike(cardId)
    .then((updateCard) => {
      evt.target.classList.add('card__like-button_is-active');
      countLikes.textContent = updateCard.likes.length;
    }).catch((err) => {
      console.log('Ошибка добавления лайка:', err);
    });
  }
};