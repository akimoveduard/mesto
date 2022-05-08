export const popupSelectors = {
  popupOpenClass: 'popup_opened',
  popupButtonCloseSelector: '.popup__close'
}

export const popupWithImageSelectors = {
  popupSelector: '.popup_type_mesto',
  popupImage: '.mesto__image',
  popupCaption: '.mesto__caption'
};

export const cardsSelectors = {
  cardsContainerSelector: '.photo-grid__list',
  cardTemplateSelector: '#card-template',
  cardSelector: '.card',
  cardImgSelector: '.card__image',
  cardCaptionSelector: '.card__caption',
  cardLikesSelector: '.card__likes-counter',
  cardButtonDeleteSelector: '.button_type_delete',
  cardButtonLikeSelector: '.button_type_like',
  cardButtonLikeClass: 'button_type_liked'
};

export const userInfoSelectors = {
  nameSelector: '.profile__username',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
}

export const formUserAvatarSelectors = {
  formSelector: '[name="avatar"]',
  buttonOpenSelector: '[name="avatar-button-open"]',
  popupSelector: '.popup_type_avatar',
  inputUrlSelector: '[name="avatar"]',
  buttonSubmitSelector: '[name="avatar-submit"]'
}

export const formProfileSelectors = {
  formSelector: '[name="profile"]',
  buttonOpenSelector: '[name="profile-button-open"]',
  popupSelector: '.popup_type_profile',
  inputNameSelector: '[name="username"]',
  inputAboutSelector: '[name="about"]',
  buttonSubmitSelector: '[name="profile-submit"]'
}

export const formAddCardSelectors = {
  formSelector: '[name="addcard"]',
  buttonOpenSelector: '[name="addcard-button-open"]',
  popupSelector: '.popup_type_addcard',
  inputCaptionSelector: '[name="caption"]',
  inputImageSelector: '[name="link"]',
  buttonSubmitSelector: '[name="addcard-submit"]'
}

export const formConfirmDeleteSelectors = {
  formSelector: '[name="delete"]',
  popupSelector: '.popup_type_delete',
  buttonSubmitSelector: '[name="delete-submit"]'
}

export const formSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}
