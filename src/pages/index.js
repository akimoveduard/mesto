import './index.css';

import {
  initialCards,
  popupSelectors,
  popupWithImageSelectors,
  cardsSelectors,
  userInfoSelectors,
  formProfileSelectors,
  formAddCardSelectors,
  formSelectors
} from "../utils/constants.js";

import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

const cardsContainer = document.querySelector(cardsSelectors.cardsContainerSelector);

// userInfo
const userInfo = new UserInfo(userInfoSelectors);

// popupProfile
const popupProfileElement = document.querySelector(formProfileSelectors.popupSelector);
const buttonPopupProfle = document.querySelector(formProfileSelectors.buttonOpenSelector);

const formProfile = document.querySelector(formProfileSelectors.formSelector);
const formProfileInputs = {
  name: formProfile.querySelector(formProfileSelectors.inputNameSelector),
  about: formProfile.querySelector(formProfileSelectors.inputAboutSelector)
}

const profileFormValidator = new FormValidator(
  formSelectors,
  formProfile
);

// popupAddCart
const formAddCard = document.querySelector(formAddCardSelectors.formSelector);
const popupAddCardElement = document.querySelector(formAddCardSelectors.popupSelector);
const buttonAddCardOpen = document.querySelector(formAddCardSelectors.buttonOpenSelector);

const formAddCardValidator = new FormValidator(
  formSelectors,
  formAddCard
);

// popupWithImage
const popupWithImageElement = document.querySelector(
  popupWithImageSelectors.popupSelector
);
const popupWithImageElements = {
  image: popupWithImageElement.querySelector(popupWithImageSelectors.popupImage),
  caption: popupWithImageElement.querySelector(popupWithImageSelectors.popupCaption)
};

/* Попап c картинкой */
const popupPicture = new PopupWithImage(
  popupSelectors,
  popupWithImageElement,
  popupWithImageElements
);

/* Попап формы профиля */
const popupProfile = new PopupWithForm(
  popupSelectors,
  popupProfileElement,
  formProfile,
  formSelectors.inputSelector,
  {
    submitForm: (inputs) => {
      userInfo.setUserInfo(inputs);
    }
  }
);

buttonPopupProfle.addEventListener('click', () => {
  popupProfile.setValuesToInputs(userInfo.getUserInfo(), formProfileInputs);
  profileFormValidator.hideAllErrors();
  profileFormValidator.enableValidation();
  popupProfile.open();
});

popupProfile.setEventListeners();

/* Отрисовка начальных карточек */
const createNewCard = (item) => {
  const card = new Card (
    cardsSelectors,
    item,
    {
      handleCardClick: () => {
        popupPicture.open(item);
      }
    }
  ).getCard();
  return (card);
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createNewCard(item);
    cardsList.addItem(card, 'append');
  }
}, cardsContainer);

cardsList.renderItems();

/* Добавление новой карточки */
const popupAddCard = new PopupWithForm(
  popupSelectors,
  popupAddCardElement,
  formAddCard,
  formSelectors.inputSelector,
  {
    submitForm: (inputs) => {
      const newCard = new Section({
        items: [inputs],
        renderer: (item) => {
          const card = createNewCard(item);
          cardsList.addItem(card);
        }
      }, cardsContainer);
      newCard.renderItems();
    }
  }
);

buttonAddCardOpen.addEventListener('click', ()=> {
  formAddCardValidator.enableValidation();
  popupAddCard.open();
});

popupAddCard.setEventListeners();
