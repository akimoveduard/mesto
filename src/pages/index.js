import css from './index.css';

import {
  popupSelectors,
  popupWithImageSelectors,
  cardsSelectors,
  userInfoSelectors,
  formUserAvatarSelectors,
  formProfileSelectors,
  formAddCardSelectors,
  formConfirmDeleteSelectors,
  formSelectors,
} from "../utils/constants.js";

import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Api} from "../components/Api.js";

/* global */
let userId;
let temporaryCard;

const cardsContainer = document.querySelector(cardsSelectors.cardsContainerSelector);

const userInfo = new UserInfo(userInfoSelectors);

const popupAvatarElement = document.querySelector(formUserAvatarSelectors.popupSelector);
const buttonPopupAvatar = document.querySelector(formUserAvatarSelectors.buttonOpenSelector);
const formAvatar = document.querySelector(formUserAvatarSelectors.formSelector);
const formAvatarInput = {
  url: formAvatar.querySelector(formUserAvatarSelectors.inputUrlSelector)
}

const popupProfileElement = document.querySelector(formProfileSelectors.popupSelector);
const buttonPopupProfle = document.querySelector(formProfileSelectors.buttonOpenSelector);
const formProfile = document.querySelector(formProfileSelectors.formSelector);
const formProfileInputs = {
  username: formProfile.querySelector(formProfileSelectors.inputNameSelector),
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

const popupConfirmDeleteElement = document.querySelector(formConfirmDeleteSelectors.popupSelector);
const formConfirmDelete = document.querySelector(formConfirmDeleteSelectors.formSelector);

/* classes */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: 'e17b06e7-9829-4e77-8b13-dc40802d34e8',
    'Content-Type': 'application/json'
  }
});

const popupPicture = new PopupWithImage(
  popupSelectors,
  popupWithImageElement,
  popupWithImageElements
);

const popupAvatar = new PopupWithForm(
  popupSelectors,
  popupAvatarElement,
  formAvatar,
  formSelectors.inputSelector,
  {
    submitForm: (input) => {
      popupAvatar.showSavingMsg(true);
      api.updateAvatar(input.avatar)
        .then((result) => {          
          userInfo.setUserAvatar(result.avatar);
          popupAvatar.close();
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          popupAvatar.showSavingMsg(false);
        })
    }      
  }
)
const avatarFormValidator = new FormValidator(
  formSelectors,
  formAvatar
);

const popupProfile = new PopupWithForm(
  popupSelectors,
  popupProfileElement,
  formProfile,
  formSelectors.inputSelector,
  {
    submitForm: (inputs) => {
      popupProfile.showSavingMsg(true);
      api.updateProfile(inputs.username, inputs.about)
        .then((result) => {
          userInfo.setUserInfo(result.name, result.about);
          userInfo.setUserAvatar(result.avatar);
          popupProfile.close();
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          popupProfile.showSavingMsg(false);
        });
    }
  }
);
const profileFormValidator = new FormValidator(
  formSelectors,
  formProfile
);

const cardsList = new Section({
  renderer: (item) => {
    const card = createNewCard(item, userId);
    cardsList.addItem(card, 'append');
  }
}, cardsContainer);

const popupAddCard = new PopupWithForm(
  popupSelectors,
  popupAddCardElement,
  formAddCard,
  formSelectors.inputSelector,
  {
    submitForm: (inputs) => {
      popupAddCard.showSavingMsg(true);
      api.addCard(inputs.caption, inputs.link)
        .then((result) => {
          const card = createNewCard(result, userId);
          cardsList.addItem(card);
          popupAddCard.close();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          popupAddCard.showSavingMsg(false);
        })
    }
  }
);
const formAddCardValidator = new FormValidator(
  formSelectors,
  formAddCard
);

const popupConfirmDelete = new PopupWithForm(
  popupSelectors,
  popupConfirmDeleteElement,
  formConfirmDelete,
  formSelectors.inputSelector,
  {
    submitForm: () => {
      popupConfirmDelete.showSavingMsg(true, 'Удаление...');
      api.deleteCard(temporaryCard.id)
        .then((result) => {
          temporaryCard.card.deleteCard();
          temporaryCard = null;
          popupConfirmDelete.close();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          popupConfirmDelete.showSavingMsg(false);
        })
    }
  }
);

/* Functions */
const createNewCard = (item, userId) => {
  const card = new Card (
    cardsSelectors,
    item,
    userId,
    {
      handleCardClick: () => {
        popupPicture.open(item);
      },
      handleDeleteClick: () => {
        popupConfirmDelete.open();
        temporaryCard = {
          card,
          id: item._id
        };
      },
      setLike: () => {
        api.setLike(item)
          .then((result) => {
            card.likesCounter(result.likes.length);
          })
          .catch ((error) => {
            console.log(error);
          })
      },
      removeLike: () => {
        api.removeLike(item)
          .then((result) => {
            card.likesCounter(result.likes.length);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  );
  return (card.getCard());
}

/* EventListeners */
buttonPopupAvatar.addEventListener('click', () => {  
  popupAvatar.open();
});

buttonPopupProfle.addEventListener('click', () => {
  popupProfile.setValuesToInputs(userInfo.getUserInfo(), formProfileInputs);
  profileFormValidator.reValidateForm();
  popupProfile.open();
});
popupProfile.setEventListeners();

buttonAddCardOpen.addEventListener('click', () => popupAddCard.open());
popupAddCard.setEventListeners();

/* Start */

Promise.all([
  api.getCards(),
  api.getUserInfo()
])
  .then ((result) => {
    const [cards, user] = result;
    userId = user._id;
    cardsList.renderItems(cards);
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
  })
  .catch ((error) => {
    console.log(error)
  })

avatarFormValidator.enableValidation();

profileFormValidator.enableValidation();

formAddCardValidator.enableValidation();