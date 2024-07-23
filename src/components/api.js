export { getUserInfoFromServer, 
    getInitialCards, 
    patchProfileForm, 
    updateAvatar, 
    postAddNewCard, 
    handleDeleteCard, 
    handleCardLike, 
    deleteLikeCard };

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-18',
    headers: {
        authorization: 'ee6775c4-c17e-432d-bed8-520cdb750d81',
        'Content-Type': 'application/json',
    },
};

const handlerResult = (res) => {
    if (res.ok) {
        return res.json();
    } // Если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
};


// GET-запрос информации о пользователе
const getUserInfoFromServer = () => {           
    return  fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then(handlerResult);
};

// Загрузка карточек с сервера
 const getInitialCards = () => {          
    return  fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(handlerResult);
};

// Редактирование профиля
const patchProfileForm = (userInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userInfo.name,
            about: userInfo.about,
        })
    }).then(handlerResult);
};

// Запрос обновления аватара
const updateAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link.link,
        }),
    }).then(handlerResult);
};

// Добавление новой карточки

const postAddNewCard = (dataCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: dataCard.name,
            link: dataCard.link,
        })
    }).then(handlerResult);
};

// удаление карточки
const handleDeleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(handlerResult);
};

// Добавление лайка

const handleCardLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(handlerResult);
};

// Запрос удаления лайка
const deleteLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(handlerResult);
};