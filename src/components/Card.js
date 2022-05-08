export class Card {
  constructor(selectors, cardData, userId, { handleCardClick, handleDeleteClick, setLike, removeLike }) {
    this._selectors = selectors;

    this._cardData = cardData;
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._cardOwner = cardData.owner._id;
    this._likesArray = cardData.likes;
    this._userId = userId;

    this.handleCardClick = handleCardClick;
    
    this._handleDeleteClick = handleDeleteClick;
    
    this._setLike = setLike;
    this._removeLike = removeLike;
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
    this._cardLikes = card.querySelector(this._selectors.cardLikesSelector)

    this._checkCardOwner();

    if (this._checkLikeOwner()) this._toggleLikeState();

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardCaption.textContent = this._cardName;

    this.likesCounter(this._cardData.likes.length);
    
    return (card);
  }

  _toggleLikeState() {
    this._buttonLike.classList.toggle(this._selectors.cardButtonLikeClass);
  }

  _checkLikeOwner() {
    return this._likesArray.some((user) => user._id === this._userId )
  }

  _checkCardOwner() {
    if (this._cardOwner !== this._userId) {
      this._eraseElement(this._buttonDelete);
    }
  }

  _eraseElement(element) {
    element.remove();
    element = null;
  }

  _checkLikeState() {
    return (this._buttonLike.classList.contains('button_type_liked'))
  }

  likesCounter(data) {
    this._cardLikes.textContent = data;
  }

  deleteCard() {
    this._eraseElement(this._card);
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._buttonLike.addEventListener('click', () => {
      if (this._checkLikeState()) {
        this._removeLike();
        this._toggleLikeState();
      } else {
        this._setLike();
        this._toggleLikeState();
      }
    });
    this._cardImage.addEventListener('click', this.handleCardClick.bind(this));
  }

  getCard() {
    this._card = this._createCard();
    this._setEventListeners(this._card);
    return (this._card);
  }

}
