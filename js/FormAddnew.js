export class FormAddnew {

  constructor(selectors, popup, validation) {
    this._popup = popup,
    this._validation = validation,
    this._form = document.querySelector(selectors.formSelector),
    this._inputCaption = this._form.querySelector(selectors.inputCaptionSelector)
    this._inputImage = this._form.querySelector(selectors.inputImageSelector)
  }

  openForm() {
    this._validation.enableValidation();
    this._popup.openPopup();
  }

  getNewCardData() {
    return {
      name: this._inputCaption.value,
      link: this._inputImage.value
    }
  }

}
