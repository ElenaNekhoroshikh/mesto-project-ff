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
export const getUserInfoFromServer = () => {           
    return  fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then(handlerResult);
};

// Загрузка карточек с сервера
export const getInitialCards = () => {          
    return  fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(handlerResult);
};

// Редактирование профиля
export const patchProfileForm = (userInfo) => {
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
export const updateAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link.link,
        }),
    }).then(handlerResult);
};

// Добавление новой карточки

export const postAddNewCard = (dataCard) => {
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
export const handleDeleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(handlerResult);
};

// Добавление лайка

export const handleCardLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(handlerResult);
};

// Запрос удаления лайка
export const deleteLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(handlerResult);
};