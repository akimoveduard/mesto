const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableSubmitButton = (submitButtonElement, inactiveButtonClass) => {
  submitButtonElement.classList.add(inactiveButtonClass);
  submitButtonElement.setAttribute("disabled", true);
};

const enableSubmitButton = (submitButtonElement, inactiveButtonClass) => {
  submitButtonElement.classList.remove(inactiveButtonClass);
  submitButtonElement.removeAttribute("disabled");
};

const toggleButtonState = (inputList, submitButtonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(submitButtonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(submitButtonElement, inactiveButtonClass);
  }
};

const getErrorElement = (formElement, inputElement) =>
  formElement.querySelector(`.${inputElement.name}-input-error`);

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

const showInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  errorMessage
) => {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const checkValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const isInputValid = inputElement.validity.valid;
  if (isInputValid) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    const errorMessage = inputElement.validationMessage;
    showInputError(
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
      errorMessage
    );
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      checkValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const formsList = Array.from(document.querySelectorAll(formSelector));
  formsList.forEach((formElement) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener("submit", handleFormSubmit);
    formElement.addEventListener("reset", () =>
      disableSubmitButton(formElement.querySelector(submitButtonSelector), inactiveButtonClass));
    setEventListeners(
      formElement,
      inputSelector,
      inputErrorClass,
      errorClass,
      submitButtonSelector,
      inactiveButtonClass
    );
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});
