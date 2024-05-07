// @todo: Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы.
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
//const deleteButton = content.querySelector('.card__delete-button');

// @todo: Функция создания карточки
const addCard = (cardData, onDelete) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
deleteButton.addEventListener('click', () => {
  onDelete(cardElement);
});

return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(delcard) {
  delcard.remove();
}

// @todo: Вывести карточки на страницу
function outputInitialCards(cards) {
  cards.forEach((data) => {
    const card = addCard(data, deleteCard);
    cardsContainer.append(card);
  });
}
outputInitialCards(initialCards);