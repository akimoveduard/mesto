export const initialCards = [
  {
    caption: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    caption: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    caption: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    caption: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    caption: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    caption: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  cardButtonDeleteSelector: '.button_type_delete',
  cardButtonLikeSelector: '.button_type_like',
  cardButtonLikeClass: 'button_type_liked'
};

export const userInfoSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
}

export const formProfileSelectors = {
  formSelector: '[name="profile"]',
  buttonOpenSelector: '[name="profile-button-open"]',
  popupSelector: '.popup_type_profile',
  inputNameSelector: '[name="name"]',
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

export const formSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}
