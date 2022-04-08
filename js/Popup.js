export class Popup {

  constructor(popupSelectors, popupElement) {
    this._popupSelectors = popupSelectors,
    this._popup = popupElement,
    this._buttonClose = this._popup.querySelector(this._popupSelectors.popupButtonCloseSelector)
  }

  _setPopupCloseListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened')) {
        this.closePopup();
      }
      if (event.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    });
  }

  closePopup() {
    this._popup.classList.remove(this._popupSelectors.popupOpenClass);
    document.removeEventListener('keydown', () => this._closePopupByEsc);
  }

  _closePopupByEsc(event) {
    if (event.key==="Escape") {
      this.closePopup();
    }
  }

  openPopup() {
    this._popup.classList.add(this._popupSelectors.popupOpenClass);
    document.addEventListener('keydown', () => this._closePopupByEsc(event));
    this._setPopupCloseListeners();
  }

}
