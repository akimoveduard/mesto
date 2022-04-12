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
const elementsPopupCard = {
  elementImage: popupCardElement.querySelector(cardsSelectors.cardPopupImg),
  elementCaption: popupCardElement.querySelector(cardsSelectors.cardPopupCaption)
}
const popupCard = new Popup(popupSelectors, popupCardElement);

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
const validateProfile = new FormValidator(
  validationSelectors,
  formProfile
);

// addnew
const popupAddNewElement = document.querySelector(formAddNewSelectors.popupSelector);
const popupAddNew = new Popup (popupSelectors, popupAddNewElement);
const formAddnew = document.querySelector(formAddNewSelectors.formSelector);
const validateAddNewForm = new FormValidator(
  validationSelectors,
  formAddnew
);
const buttonOpenAddnew = document.querySelector(formAddNewSelectors.buttonOpenSelector);
const inputAddnewCaption = formAddnew.querySelector(formAddNewSelectors.inputCaptionSelector);
const inputAddnewImage = formAddnew.querySelector(formAddNewSelectors.inputImageSelector);

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
  validateProfile.hideAllErrors();
  validateProfile.enableValidation();
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
  validateAddNewForm.enableValidation();
  popupAddNew.openPopup();
}

const handleSubmitAddNew = () => {
  const cardData = {
    name: inputAddnewCaption.value,
    link: inputAddnewImage.value
  };
  popupAddNew.closePopup();
  const newCard = new Card(
    cardsSelectors,
    cardData,
    elementsPopupCard,
    () => popupCard.openPopup()
  ).getCard();
  cardsContainer.prepend(newCard);
  formAddnew.reset();
}

function initiateAddNew() {
  buttonOpenAddnew.addEventListener('click', handleClickButtonOpenAddNew);
  formAddnew.addEventListener('submit', handleSubmitAddNew);
}

/* ЛОГИКА ПРИЛОЖЕНИЯ */
initialCards.forEach((card) => {
  const newCard = new Card(
    cardsSelectors,
    card,
    elementsPopupCard,
    () => popupCard.openPopup()
  ).getCard();
  cardsContainer.append(newCard);
});

initiateProfile();

initiateAddNew();
