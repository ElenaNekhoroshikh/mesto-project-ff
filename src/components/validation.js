export { enableValidation, clearValidation }


// Показать ошибку
const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  // находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // находим span c классом -error
  inputElement.classList.add(configValidation.inputErrorClass);  // добавляем красную линию 
  if (inputElement.validity.valueMissing) {
    errorElement.textContent = 'Вы пропустили это поле';
  } else {
    errorElement.textContent = errorMessage;
  }
  errorElement.classList.add(configValidation.errorClass); // выводим подпись с сообщением об ошибке
};

// Скрыть ошибку
const hideInputError = (formElement, inputElement, configValidation) => {
  // находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configValidation.inputErrorClass); // убираем красную линию
  errorElement.classList.remove(configValidation.errorClass); // убираем подпись с сообщением об ошибке
  errorElement.textContent = ''; // убираем сообщение об ошибке
};

// Валидация формы
const checkInputValidity = (formElement, inputElement, configValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};

// проверяем валидность всех полей, чтобы настроить статус кнопки

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  };

 // функция для выключения и включения кнопки сохранить 
  
  const toggleButtonState = (inputList, buttonElement, configValidation) => {
    if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(configValidation.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
    } else {
  buttonElement.classList.remove(configValidation.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
    }
  };

  // Добавляем слушатель событий всем полям ввода внутри формы
  // Функция setEventListeners принимает параметром элемент формы и добавляет полям нужные обработчики
  // добавляет обработчики сразу всем полям формы

const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configValidation); // блокируем кнопку с самого начала
  inputList.forEach ((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, configValidation);
      toggleButtonState(inputList, buttonElement, configValidation);
    });
  });
  };

// добавление обработчиков всем формам

  const enableValidation = (configValidation) => {
    const inputForm = Array.from(document.querySelectorAll(configValidation.formSelector));
    inputForm.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
      setEventListeners(formElement, configValidation);
    });
  };

  // Очистка валидации
  const clearValidation = (formElement, configValidation) => {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
    inputList.textContent = '';

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, configValidation);
    });
    
    buttonElement.classList.add(configValidation.inactiveButtonClass);
  };