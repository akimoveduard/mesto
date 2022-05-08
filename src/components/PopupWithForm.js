import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

  constructor(popupSelectors, popup, form, inputSelector, { submitForm }) {
    super(popupSelectors, popup);
    this._form = form;
    this._inputsList = form.querySelectorAll(inputSelector);
    this._submitEventHandler = this._submitEventHandler.bind(this);
    this._submitForm = submitForm;
    this._submitButton = this._form.elements[this._form.name + '-submit']
    this._initButtonCaption = this._submitButton.textContent;
  }

  showSavingMsg(show, caption = 'Сохранение...') {
    if (show) {
      this._submitButton.textContent = caption;
    } else {
      this._submitButton.textContent = this._initButtonCaption;
    }
    
  }

  setValuesToInputs(values, inputs) {
    for (let input in inputs) {
      inputs[input].value = values[input];
    }
  }

  _getInputValues() {
    const inputs = {};
    this._inputsList.forEach(input => {
      inputs[input.name] = input.value;
    });
    return (inputs);
  }

  _submitEventHandler(event) {
    event.preventDefault();
    if (this._inputsList) this._submitForm(this._getInputValues());
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitEventHandler);
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

}
