/* imports */
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

/* global */
const cardsContainer = document.querySelector(cardsSelectors.cardsContainerSelector);

const userInfo = new UserInfo(userInfoSelectors);

const popupProfileElement = document.querySelector(formProfileSelectors.popupSelector);
const buttonPopupProfle = document.querySelector(formProfileSelectors.buttonOpenSelector);
const formProfile = document.querySelector(formProfileSelectors.formSelector);
const formProfileInputs = {
  name: formProfile.querySelector(formProfileSelectors.inputNameSelector),
  about: formProfile.querySelector(formProfileSelectors.inputAboutSelector)
}

const formAddCard = document.querySelector(formAddCardSelectors.formSelector);
const popupAddCardElement = document.querySelector(formAddCardSelectors.popupSelector);
const buttonAddCardOpen = document.querySelector(formAddCardSelectors.buttonOpenSelector);

const popupWithImageElement = document.querySelector(
  popupWithImageSelectors.popupSelector
);
const popupWithImageElements = {
  image: popupWithImageElement.querySelector(popupWithImageSelectors.popupImage),
  caption: popupWithImageElement.querySelector(popupWithImageSelectors.popupCaption)
};

/* classes */
const cardsList = new Section({
  renderer: (item) => {
    const card = createNewCard(item);
    cardsList.addItem(card, 'append');
  }
}, cardsContainer);

const popupPicture = new PopupWithImage(
  popupSelectors,
  popupWithImageElement,
  popupWithImageElements
);

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
const profileFormValidator = new FormValidator(
  formSelectors,
  formProfile
);

const popupAddCard = new PopupWithForm(
  popupSelectors,
  popupAddCardElement,
  formAddCard,
  formSelectors.inputSelector,
  {
    submitForm: (inputs) => {
      const card = createNewCard(inputs);
      cardsList.addItem(card);
    }
  }
);
const formAddCardValidator = new FormValidator(
  formSelectors,
  formAddCard
);

/* Functions */
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

/* EventListeners */
buttonPopupProfle.addEventListener('click', () => {
  popupProfile.setValuesToInputs(userInfo.getUserInfo(), formProfileInputs);
  profileFormValidator.reValidateForm();
  popupProfile.open();
});
popupProfile.setEventListeners();

buttonAddCardOpen.addEventListener('click', () =>
  {
    popupAddCard.open()
    popupAddCard.reValidateForm();
  }
);
popupAddCard.setEventListeners();

/* Start */
cardsList.renderItems(initialCards);

profileFormValidator.enableValidation();

formAddCardValidator.enableValidation();