import { elementsPopupCard, popupCard } from "../pages/index.js";

export class Card {

  constructor(selectors, cardData) {
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._selectors = selectors;
  }

  _createCard() {
    const card = document
      .querySelector(this._selectors.cardTemplateSelector)
      .content.querySelector(this._selectors.cardSelector)
      .cloneNode(true);
    this._cardImage = card.querySelector(this._selectors.cardImgSelector);
    this._cardCaption = card.querySelector(
      this._selectors.cardCaptionSelector
    );

    this._buttonDelete = card.querySelector(
      this._selectors.cardButtonDeleteSelector
    );
    this._buttonLike = card.querySelector(
      this._selectors.cardButtonLikeSelector
    );

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardCaption.textContent = this._cardName;

    return card;
  }

  _likeCard() {
    this._buttonLike.classList.toggle(this._selectors.cardButtonLikeClass);
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _handleImageClick() {
    elementsPopupCard.elementImage.src = this._cardLink;
    elementsPopupCard.elementImage.alt = this._cardName;
    elementsPopupCard.elementCaption.textContent = this._cardName;
    popupCard.openPopup();
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', this._deleteCard);
    this._buttonLike.addEventListener('click', () => this._likeCard());
    this._cardImage.addEventListener('click', () => this._handleImageClick());
  }

  getCard() {
    this._card = this._createCard();
    this._setEventListeners(this._card);
    return this._card;
  }

}
