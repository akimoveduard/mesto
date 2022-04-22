export class Popup {
  constructor(popupSelectors, popup) {
    this._popupSelectors = popupSelectors;
    this._popup = popup;
    this._buttonClose = this._popup.querySelector(this._popupSelectors.popupButtonCloseSelector);
  }

  _setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    });
  }

  openPopup() {
    this._popup.classList.add(this._popupSelectors.popupOpenClass);
    document.addEventListener('keydown', () => this._closePopupByEsc(event));
    this._setEventListeners();
  }

  closePopup() {
    this._popup.classList.remove(this._popupSelectors.popupOpenClass);
    document.removeEventListener('keydown', this._closePopupByEsc);
  }

  _closePopupByEsc(event) {
    if (event.key==="Escape") {
      this.closePopup();
    }
  }

}
