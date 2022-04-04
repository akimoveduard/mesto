export class Popup {

  constructor(popupSelectors, popupElement) {
    this._popupSelectors = popupSelectors,
    this._popup = popupElement,
    this._buttonClose = this._popup.querySelector(this._popupSelectors.popupButtonCloseSelector)
  }

  _setPopupCloseListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened')) {
        this._closePopup();
      }
      if (event.target.classList.contains('popup__close')) {
        this._closePopup();
      }
    });
  }

  _closePopup() {
    this._popup.classList.remove(this._popupSelectors.popupOpenClass);
    document.removeEventListener('keydown', () => this._closePopupByEsc);
  }

  _closePopupByEsc() {
    if (event.key==="Escape") {
      this._closePopup();
    }
  }

  openPopup() {
    this._popup.classList.add(this._popupSelectors.popupOpenClass);
    document.addEventListener('keydown', () => this._closePopupByEsc());
    this._setPopupCloseListeners();
  }

}
