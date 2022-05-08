import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  constructor(popupSelectors, popup, imageElements) {
    super(popupSelectors, popup);
    this._imageElements = imageElements;
  }

  open(image) {
    this._imageElements.image.src = image.link;
    this._imageElements.image.alt = image.name;
    this._imageElements.caption.textContent = image.name;
    super.open();
  }

}
