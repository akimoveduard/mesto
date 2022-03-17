const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, submitButtonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }
}

const getErrorElement = (inputElement, errorElementClass) => {
  return inputElement.closest(".form__section").querySelector(errorElementClass);
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass, errorElementClass) => {
  const errorElement = getErrorElement(inputElement, errorElementClass);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorElementClass, errorMessage) => {
  const errorElement = getErrorElement(inputElement, errorElementClass);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

const getErrorMessage = (inputElement) => {
  return inputElement.validationMessage;
}

const checkValidity = (formElement, inputElement, inputErrorClass, errorClass, errorElementClass) => {
  const isInputValid = inputElement.validity.valid;
  if (isInputValid) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass, errorElementClass);
  } else {
    const errorMessage = getErrorMessage(inputElement);
    showInputError(formElement, inputElement, inputErrorClass, errorClass, errorElementClass, errorMessage);
  }
}

const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, errorElementClass, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkValidity(formElement, inputElement, inputErrorClass, errorClass, errorElementClass);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    });
  });
}

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, errorElementClass}) => {
  formsList = Array.from(document.querySelectorAll(formSelector));
  formsList.forEach((formElement) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener('submit', handleFormSubmit);
    setEventListeners(formElement, inputSelector, inputErrorClass, errorClass, errorElementClass, submitButtonSelector, inactiveButtonClass);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorElementClass: '.popup__error'
});
