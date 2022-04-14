import { Popup } from '../scripts/Popup.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import {
  initialCards,
  popupSelectors,
  cardsSelectors,
  formProfileSelectors,
  formAddNewSelectors,
  validationSelectors
} from "../scripts/settings.js";

/* ВЕБ-ЭЛЕМЕНТЫ */
const cardsContainer = document.querySelector(cardsSelectors.cardsContainerSelector);

// popupCard
const popupCardElement = document.querySelector(cardsSelectors.cardPopupSelector);
export const elementsPopupCard = {
  elementImage: popupCardElement.querySelector(cardsSelectors.cardPopupImg),
  elementCaption: popupCardElement.querySelector(cardsSelectors.cardPopupCaption)
}
export const popupCard = new Popup(popupSelectors, popupCardElement);

// profile
const popupProfileElement = document.querySelector(formProfileSelectors.popupSelector);
const popupProfile = new Popup (popupSelectors, popupProfileElement);
const formProfile = document.querySelector(formProfileSelectors.formSelector);
const buttonOpenProfile = document.querySelector(formProfileSelectors.buttonOpenSelector);
const profileElements = [
  {
    profileElement: document.querySelector(formProfileSelectors.elementNameSelector),
    inputElement:  formProfile.querySelector(formProfileSelectors.inputNameSelector)
  },
  {
    profileElement: document.querySelector(formProfileSelectors.elementAboutSelector),
    inputElement:  formProfile.querySelector(formProfileSelectors.inputAboutSelector)
  }
];
const profileFormValidator = new FormValidator(
  validationSelectors,
  formProfile
);

// addnew
const popupAddNewElement = document.querySelector(formAddNewSelectors.popupSelector);
const popupAddNew = new Popup (popupSelectors, popupAddNewElement);
const formAddNew = document.querySelector(formAddNewSelectors.formSelector);
const formAddNewValidator = new FormValidator(
  validationSelectors,
  formAddNew
);
const buttonOpenAddNew = document.querySelector(formAddNewSelectors.buttonOpenSelector);
const inputAddnewCaption = formAddNew.querySelector(formAddNewSelectors.inputCaptionSelector);
const inputAddnewImage = formAddNew.querySelector(formAddNewSelectors.inputImageSelector);

/* ПРОФИЛЬ */
const getProfileValues = (elements) => {
  elements.forEach((element) => {
    element.inputElement.value = element.profileElement.textContent;
  });
}

const setProfileValue = (elements) => {
  elements.forEach((element) => {
    element.profileElement.textContent = element.inputElement.value;
  });
}

const handleClickButtonOpenProfile = () => {
  profileFormValidator.hideAllErrors();
  profileFormValidator.enableValidation();
  popupProfile.openPopup();
}

const handleSubmitProfile = () => {
  setProfileValue(profileElements);
  popupProfile.closePopup();
}

const initiateProfile = () => {
  getProfileValues(profileElements);
  buttonOpenProfile.addEventListener('click', handleClickButtonOpenProfile);
  formProfile.addEventListener('submit', handleSubmitProfile);
};

/* ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ */
const handleClickButtonOpenAddNew = () => {
  formAddNewValidator.enableValidation();
  popupAddNew.openPopup();
}

const handleSubmitAddNew = () => {
  const cardData = {
    name: inputAddnewCaption.value,
    link: inputAddnewImage.value
  };
  const newCard = new Card(
    cardsSelectors,
    cardData
  ).getCard();
  cardsContainer.prepend(newCard);
  popupAddNew.closePopup();
  formAddNew.reset();
}

function initiateAddNew() {
  buttonOpenAddNew.addEventListener('click', handleClickButtonOpenAddNew);
  formAddNew.addEventListener('submit', handleSubmitAddNew);
}

/* ЛОГИКА ПРИЛОЖЕНИЯ */
initialCards.forEach((card) => {
  const newCard = new Card(
    cardsSelectors,
    card,
    () => popupCard.openPopup()
  ).getCard();
  cardsContainer.append(newCard);
});

initiateProfile();

initiateAddNew();
