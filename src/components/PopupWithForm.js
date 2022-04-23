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
    this.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitEventHandler);
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
    this._form.removeEventListener('submit', this._submitEventHandler);
  }

}
