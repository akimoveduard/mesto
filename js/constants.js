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

export const cardsContainerSelector = '.photo-grid__list';

export const popupSelectors = {
  popupOpenClass: 'popup_opened',
  popupButtonCloseSelector: '.popup__close'
}

export const cardSelectors = {
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
