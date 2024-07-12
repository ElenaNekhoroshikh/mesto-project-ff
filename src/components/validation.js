export { enableValidation, clearValidation }

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

const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = '';
};

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
  buttonElement.classList.add(configValidation.inactiveButtonClass)
  buttonElement.setAttribute('disabled', true);
    } else {
  buttonElement.classList.remove(configValidation.inactiveButtonClass)
  buttonElement.removeAttribute('disabled', false);
    }
  }

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

  const clearValidation = (profileForm, newPlaceForm, configValidation) => {
    const profileListErrors = profileForm.querySelectorAll(configValidation.errorVisible);
    const profileButtonInactive = profileForm.querySelector(configValidation.submitButtonSelector);
    const profileInputSelectors = profileForm.querySelectorAll(configValidation.inputErrorVisible)
    const newPlaseListErrors = newPlaceForm.querySelectorAll(configValidation.errorVisible);
    const newPlaceButton = newPlaceForm.querySelector(configValidation.submitButtonSelector);
    const newPlaceInputSelectors = newPlaceForm.querySelectorAll(configValidation.inputErrorVisible);
    const newPlacesItems = newPlaceForm.querySelectorAll(configValidation.inputSelector);
 
    profileListErrors.forEach ((profileListError) => {
      profileListError.textContent = ''
    })
    profileInputSelectors.forEach((profileInputSelector) => {
      profileInputSelector.classList.remove(configValidation.inputErrorClass);
    })

    newPlaseListErrors.forEach((newPlaseListError) => {
      newPlaseListError.textContent = ''
    })
    newPlaceInputSelectors.forEach((newPlaceInputSelector) => {
      newPlaceInputSelector.classList.remove(configValidation.inputErrorClass);
    })

    newPlacesItems.forEach((newPlacesItem) => {
      newPlacesItem.value = ''
    })
  
    profileButtonInactive.classList.remove(configValidation.inactiveButtonClass)
    profileButtonInactive.removeAttribute('disabled', false);
    newPlaceButton.classList.add(configValidation.inactiveButtonClass)
    newPlaceButton.setAttribute('disabled', false)
  }