import { Popup } from './Popup.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {
  initialCards,
  popupSelectors,
  cardsSelectors,
  formProfileSelectors,
  formAddNewSelectors,
  validationSelectors
} from "./constants.js";

const cardsContainer = document.querySelector(cardsSelectors.cardsContainerSelector);

const popupCard = new Popup(popupSelectors, cardsSelectors.cardPopupSelector);

const handleImageClick = () => {
  popupCard.openPopup();
}

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

const initiateProfile = () => {

  const elementForm = document.querySelector(formProfileSelectors.formSelector);

  const popupProfile = new Popup (popupSelectors, formProfileSelectors.popupSelector);

  const validateProfile = new FormValidator(
    validationSelectors,
    elementForm
  );

  const profileElements = [
    {
      profileElement: document.querySelector(formProfileSelectors.elementNameSelector),
      inputElement:  elementForm.querySelector(formProfileSelectors.inputNameSelector)
    },
    {
      profileElement: document.querySelector(formProfileSelectors.elementAboutSelector),
      inputElement:  elementForm.querySelector(formProfileSelectors.inputAboutSelector)
    }
  ];

  getProfileValues(profileElements);

  document
    .querySelector(formProfileSelectors.buttonOpenSelector)
    .addEventListener('click', () => {
      validateProfile.hideAllErrors();
      validateProfile.enableValidation();
      popupProfile.openPopup();
    });

    elementForm.addEventListener('submit', () => {
      setProfileValue(profileElements);
      popupProfile.closePopup();
    });

};

/* ДОБАВЛЕНИЕ НОВОГО МЕСТА */
function initiateAddNew() {

  const elementForm = document.querySelector(formAddNewSelectors.formSelector);
  const popupAddNew = new Popup (popupSelectors, formAddNewSelectors.popupSelector);

  const validateAddNewForm = new FormValidator(
    validationSelectors,
    elementForm
  );

  document
    .querySelector(formAddNewSelectors.buttonOpenSelector)
    .addEventListener('click', () => {
      validateAddNewForm.enableValidation();
      popupAddNew.openPopup();
    });

  elementForm.addEventListener('submit', () => {
      const newCardData = {
        name: elementForm.querySelector(formAddNewSelectors.inputCaptionSelector).value,
        link: elementForm.querySelector(formAddNewSelectors.inputImageSelector).value
      };
      popupAddNew.closePopup();
      const newCard = new Card(cardsSelectors, newCardData, { handleImageClick }).getCard();
      cardsContainer.prepend(newCard);
      elementForm.reset();
  });
}

/* ЛОГИКА ПРИЛОЖЕНИЯ */
initialCards.forEach((card) => {
  const newCard = new Card(cardsSelectors, card, { handleImageClick }).getCard();
  cardsContainer.append(newCard);
});

initiateProfile();

initiateAddNew();
