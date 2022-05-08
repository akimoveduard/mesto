export class FormValidator {
  constructor(selectors, form) {
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = this._inputListArray();
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", true);
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _getErrorElement(input) {
    return this._form.querySelector(`.${input.name}-input-error`);
  }

  _hideInputError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _showInputError(input, message, error) {
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = message;
  }

  _checkValidity(input) {
    const errorElement = this._getErrorElement(input);
    this._isInputValid = input.validity.valid;
    if (this._isInputValid) {
      this._hideInputError(input, errorElement);
    } else {
      this._showInputError(input, input.validationMessage, errorElement);
    }
  }

  _handleInputEventListener(event) {
    const input = event.target;
    this._checkValidity(input);
    this._toggleButtonState();
  }

  _inputListArray() {
    return Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  reValidateForm() {
    this._toggleButtonState();
  }

  _hideAllErrors() {
    this._inputList.forEach((input) => {
      const errorElement = this._getErrorElement(input);
      this._hideInputError(input, errorElement);
    });
  }

  _setEventListeners() {
    this.reValidateForm();
    this._form.addEventListener("reset", () => {
      this._disableSubmitButton(this._submitButton, this._inactiveButtonClass);
      this._hideAllErrors();
    });

    this._inputList.forEach((input) => {
      this._input = input;
      input.addEventListener("input", (event) => {
        this._handleInputEventListener(event);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

}
