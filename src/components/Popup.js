export class Popup {
  constructor(popupSelectors, popup) {
    this._popupSelectors = popupSelectors;
    this._popup = popup;
    this._buttonClose = this._popup.querySelector(this._popupSelectors.popupButtonCloseSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add(this._popupSelectors.popupOpenClass);
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove(this._popupSelectors.popupOpenClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key==="Escape") {
      this.close();
    }
  }

}
