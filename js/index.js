import { Popup } from './Popup.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, popupSelectors, cardsContainerSelector, cardSelectors } from './constants.js';

initialCards.forEach((card) => {
  const popupCard = new Popup (popupSelectors, document.querySelector(cardSelectors.cardPopupSelector));
  const newCard = new Card (card, cardSelectors, popupCard).renderCard();
  const cardsContainer = document.querySelector(cardsContainerSelector);
  cardsContainer.append(newCard);
});
