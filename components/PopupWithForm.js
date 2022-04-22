import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

  constructor(popupSelectors, popup, form, inputSelector, { submitForm }) {
    super(popupSelectors, popup);
    this._form = form;
    this._inputList = form.querySelectorAll(inputSelector);
    this._submitEventHandler = this._submitEventHandler.bind(this);
    this._submitForm = submitForm;
  }

  setValuesToInputs(values, inputs) {
    for (let input in inputs) {
      inputs[input].value = values[input];
    }
  }

  _getInputValues() {
    const inputs = {};
    this._inputList.forEach(input => {
      inputs[input.name] = input.value;
    });
    return (inputs);
  }

  _submitEventHandler(event) {
    event.preventDefault();
    this._submitForm(this._getInputValues());
    this.closePopup();
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitEventHandler);
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

}
