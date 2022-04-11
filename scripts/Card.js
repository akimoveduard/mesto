export class Card {

  constructor(selectors, cardData, { handleImageClick }) {
    this._cardName = cardData.name;
    this._cardLink = cardData.link,
    this._selectors = selectors,
    this._handleImageClick = handleImageClick,
    this._popupElement = document.querySelector(this._selectors.cardPopupSelector)
  }

  _createCard() {
    const cardTemplate = document.querySelector(
      this._selectors.cardTemplateSelector
    ).content;
    this._card = cardTemplate
      .querySelector(this._selectors.cardSelector)
      .cloneNode(true);
    this._cardImage = this._card.querySelector(this._selectors.cardImgSelector);
    this._cardCaption = this._card.querySelector(
      this._selectors.cardCaptionSelector
    );
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardCaption.textContent = this._cardName;
    this._buttonDelete = this._card.querySelector(
      this._selectors.cardButtonDeleteSelector
    );
    this._buttonLike = this._card.querySelector(
      this._selectors.cardButtonLikeSelector
    );
    this._buttonActiveClass = this._selectors.cardButtonLikeClass;
    return this._card;
  }

  _likeCard() {
    this._buttonLike.classList.toggle(this._buttonActiveClass);
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _generatePopup() {
    this._popupImg = this._popupElement.querySelector(this._selectors.cardPopupImg);
    this._popupCaption = this._popupElement.querySelector(this._selectors.cardPopupCaption);
    this._popupImg.src = this._cardLink;
    this._popupImg.alt = this._cardName;
    this._popupCaption.textContent = this._cardName;
  }

  _setEventListeners(card) {
    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._buttonLike.addEventListener('click', () => {
      this._likeCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._generatePopup();
      this._handleImageClick();
    })
  }

  getCard() {
    this._newCard = this._createCard();
    this._setEventListeners(this._newCard);
    return this._newCard;
  }

}
