import { Popup } from './Popup.js';
import { Card } from './Card.js';
import { FormProfile } from './FormProfile.js';
import { FormAddnew } from './FormAddnew.js';
import { FormValidator } from './FormValidator.js';
import {
  initialCards,
  popupSelectors,
  cardsSelectors,
  formProfileSelectors,
  formAddnewSelectors,
  validationSelectors
} from "./constants.js";

const cardsContainer = document.querySelector(cardsSelectors.cardsContainerSelector);

const newPopup = (popupSelector) => {
  const popup = new Popup(
    popupSelectors,
    document.querySelector(popupSelector)
  );
  return (popup)
}

/* ПРОФИЛЬ */

const initiateProfile = () => {

  const elementForm = document.querySelector(formProfileSelectors.formSelector);

  const popupProfile = newPopup(formProfileSelectors.popupSelector);

  const validateProfile = new FormValidator(
    validationSelectors,
    elementForm
  );

  const formProfile = new FormProfile(
    formProfileSelectors,
    popupProfile,
    validateProfile
  );

  document
    .querySelector(formProfileSelectors.buttonOpenSelector)
    .addEventListener("click", () => {
      formProfile.openForm();
    });

    elementForm.addEventListener(('submit'), () => {
      formProfile.setProfileValues();
      popupProfile.closePopup();
    });

};

/* ОКНО ДОБАВЛЕНИЯ НОВОГО МЕСТА */

function initiateAddnew() {

  const elementForm = document.querySelector(formAddnewSelectors.formSelector);

  const popupAddnew = newPopup(formAddnewSelectors.popupSelector);

  const validateAddnewForm = new FormValidator(
    validationSelectors,
    elementForm
  );

  const formAddnew = new FormAddnew(
    formAddnewSelectors,
    popupAddnew,
    validateAddnewForm
  );

  document
    .querySelector(formAddnewSelectors.buttonOpenSelector)
    .addEventListener('click', () => {
      formAddnew.openForm();
    });

  elementForm.addEventListener(('submit'), () => {
      const newCardData = formAddnew.getNewCardData();
      popupAddnew.closePopup();
      const popupCard = newPopup(cardsSelectors.cardPopupSelector);
      const newCard = new Card(cardsSelectors, newCardData, popupCard).renderCard();
      cardsContainer.prepend(newCard);
      elementForm.reset();
  });

}

/* ЛОГИКА ПРИЛОЖЕНИЯ */
initialCards.forEach((card) => {
  const popupCard = newPopup(cardsSelectors.cardPopupSelector);
  const newCard = new Card(cardsSelectors, card, popupCard).renderCard();
  cardsContainer.append(newCard);
});

initiateProfile();

initiateAddnew();
