export class Card {

  constructor(cardData, selectors, popup) {
    this._cardName = cardData.name;
    this._cardLink = cardData.link,
    this._selectors = selectors,
    this._popup = popup,
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

  _likeCard(button) {
    button.classList.toggle(this._buttonActiveClass);
  }

  _deleteCard(card) {
    card.remove();
    card = null;
  }

  _generatePopup() {
    this._popupImg = this._popupElement.querySelector(this._selectors.cardPopupImg);
    this._popupCaption = this._popupElement.querySelector(this._selectors.cardPopupCaption);
    this._popupImg.src = this._cardLink;
    this._popupImg.alt = this._cardName;
    this._popupCaption.textContent = this._cardName;
  }

  _setEventListeners(card) {
    this._buttonDelete.addEventListener(('click'), () => {
      this._deleteCard(card);
    });
    this._buttonLike.addEventListener(('click'), () => {
      this._likeCard(this._buttonLike);
    });
    this._cardImage.addEventListener(('click'), () => {
      this._generatePopup();
      this._popup.openPopup();
    })
  }

  renderCard() {
    this._newCard = this._createCard();
    this._setEventListeners(this._newCard);
    return this._newCard;
  }

}
