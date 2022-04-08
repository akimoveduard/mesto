export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popupSelectors = {
  popupOpenClass: 'popup_opened',
  popupButtonCloseSelector: '.popup__close'
}

export const cardsSelectors = {
  cardsContainerSelector: '.photo-grid__list',
  cardTemplateSelector: '#photo-grid-item-template',
  cardSelector: '.photo-grid__item',
  cardImgSelector: '.photo-grid__item-image',
  cardCaptionSelector: '.photo-grid__item-caption',
  cardButtonDeleteSelector: '.button_type_delete',
  cardButtonLikeSelector: '.button_type_like',
  cardButtonLikeClass: 'button_type_liked',
  cardPopupSelector: '.popup_type_mesto',
  cardPopupImg: '.mesto__image',
  cardPopupCaption: '.mesto__caption'
};

export const formProfileSelectors = {
  formSelector: '[name="profile"]',
  buttonOpenSelector: '[name="profile-button-open"]',
  popupSelector: '.popup_type_profile',
  elementNameSelector: '.profile__name',
  elementAboutSelector: '.profile__about',
  inputNameSelector: '[name="name"]',
  inputAboutSelector: '[name="about"]',
  buttonSubmitSelector: '[name="profile-submit"]'
}

export const formAddnewSelectors = {
  formSelector: '[name="addmesto"]',
  buttonOpenSelector: '[name="addmesto-button-open"]',
  popupSelector: '.popup_type_addnew',
  inputCaptionSelector: '[name="caption"]',
  inputImageSelector: '[name="image"]',
  buttonSubmitSelector: '[name="addmesto-submit"]'
}

export const validationSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}
