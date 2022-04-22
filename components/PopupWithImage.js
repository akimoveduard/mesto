import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  constructor(popupSelectors, popup, imageElements) {
    super(popupSelectors, popup);
    this._imageElements = imageElements;
  }

  openPopup(image) {
    this._imageElements.image.src = image.link;
    this._imageElements.image.alt = image.caption;
    this._imageElements.caption.textContent = image.caption;
    super.openPopup();
  }

}
