export { enableValidation, clearValidation }


// Показать ошибку
const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(configValidation.inputErrorClass);
  if (inputElement.validity.valueMissing) {
    errorElement.textContent = 'Вы пропустили это поле';
  } else {
    errorElement.textContent = errorMessage;
  }
  errorElement.classList.add(configValidation.errorClass);
};

// Скрыть ошибку
const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = '';
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

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  };
  
  const toggleButtonState = (inputList, buttonElement, configValidation) => {
    if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(configValidation.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
    } else {
  buttonElement.classList.remove(configValidation.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
    }
  };

const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configValidation);
  inputList.forEach ((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, configValidation);
      toggleButtonState(inputList, buttonElement, configValidation);
    });
  });
  };

  const enableValidation = (configValidation) => {
    const inputForm = Array.from(document.querySelectorAll(configValidation.formSelector));
    inputForm.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      });
      setEventListeners(formElement, configValidation);
    });
  };

  // Очистка валидации
  const clearValidation = (formElement, configValidation) => {
    const inputList = Array.from(
      formElement.querySelectorAll(configValidation.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      configValidation.submitButtonSelector
    );

    inputList.textContent = '';

    toggleButtonState(inputList, buttonElement, configValidation.inactiveButtonClass);

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, configValidation.inputErrorClass, configValidation.errorClass);
      inputElement.setCustomValidity('');
      inputElement.classList.remove(configValidation.inputErrorClass);
    });
  };