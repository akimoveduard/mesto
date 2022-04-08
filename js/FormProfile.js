export class FormProfile {

  constructor(selectors, popup, validation) {
    this._selectors = selectors,
    this._popup = popup,
    this._validation = validation,
    this._form = document.querySelector(selectors.formSelector),
    this._profileElements = [
      {
        'profileElement': document.querySelector(this._selectors.elementNameSelector),
        'inputElement': this._form.querySelector(this._selectors.inputNameSelector)
      },
      {
        'profileElement': document.querySelector(this._selectors.elementAboutSelector),
        'inputElement': this._form.querySelector(this._selectors.inputAboutSelector)
      }
    ]
  }

  setProfileValues() {
    this._profileElements.forEach((item) => {
      if (item.inputElement.value) {
        item.profileElement.textContent = item.inputElement.value;
      }
    });
  }

  _setFormInputs() {
    this._profileElements.forEach((item) => {
      item.inputElement.value = item.profileElement.textContent;
    });
  }

  openForm() {
    this._setFormInputs();
    this._validation.hideAllErrors();
    this._validation.enableValidation();
    this._popup.openPopup();
  }

}
