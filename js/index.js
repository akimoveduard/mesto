/* ПЕРЕМЕННЫЕ */

// Карточки мест по умолчанию
const initialCards = [
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

// template
const photoTemplate = document.querySelector('#photo-grid-item-template').content;
const photoGrid = document.querySelector('.photo-grid__list');

// Профиль
const buttonProfileOpen = document.querySelector('[name="profile-button-open"]');
const buttonProfileClose = document.querySelector('[name="button-close-profile"]');

const formProfile = document.querySelector('[name="profile-form"]');
const inputProfileName = document.querySelector('[name="profile-input-name"]');
const inputProfileAbout = document.querySelector('[name="profile-input-about"]');

// Добавить место
const formAddnew = document.querySelector('[name="addnew-form"]');
const buttonAddnewOpen = document.querySelector('[name="addnew-button-open"]');
const buttonAddnewClose = document.querySelector('[name="addnew-button-close"]');

const inputAddnewCaption = document.querySelector('[name="addnew-input-caption"]');
const inputAddnewImage = document.querySelector('[name="addnew-input-image"]');

/* СЛУШАТЕЛИ */

// Профиль
buttonProfileOpen.addEventListener('click', () => {
  openPopup('.popup_type_profile');
  inputProfileName.value = document.querySelector('.profile__name').textContent;
  inputProfileAbout.value = document.querySelector('.profile__about').textContent;
});

buttonProfileClose.addEventListener('click', () => {
  closePopup('.popup_type_profile');
});

formProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  if (inputProfileName) { document.querySelector('.profile__name').textContent = inputProfileName.value; }
  if (inputProfileAbout) { document.querySelector('.profile__about').textContent = inputProfileAbout.value; }
  closePopup('.popup_type_profile');
});

// Добавление места
buttonAddnewOpen.addEventListener('click', () => {
  openPopup('.popup_type_addnew');
});

buttonAddnewClose.addEventListener('click', () => {
  closePopup('.popup_type_addnew');
});

formAddnew.addEventListener('submit', (event)=> {
  event.preventDefault();
  const newPlace = {
    name: inputAddnewCaption.value,
    link: inputAddnewImage.value
  };
  renderPlace(newPlace);
  closePopup('.popup_type_addnew');
});

function setEventListeners(itemElement) {
  itemElement.querySelector('.button_type_delete').addEventListener('click', removePlace);
  itemElement.querySelector('.button_type_like').addEventListener('click', likePlace);
}

/* ФУНКЦИИ */

// Открытие всплывающего окна
function openPopup(element) {
  objectPopup = document.querySelector(element);
  if (!objectPopup.classList.contains('popup_opened')) {
    objectPopup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        objectPopup.classList.remove('popup_opened');
      }
    },
    true);
  }
}

// Закрытие всплывающего окна
function closePopup(element) {
  objectPopup = document.querySelector(element);
  if (objectPopup.classList.contains('popup_opened')) {
    objectPopup.classList.remove('popup_opened');
  }
}

// Создание новой карточки
function renderPlace(element) {
  const itemElement = photoTemplate.querySelector('.photo-grid__item').cloneNode(true);
  itemElement.querySelector('.photo-grid__item-image').src = element.link;
  itemElement.querySelector('.photo-grid__item-caption').textContent = element.name;
  setEventListeners(itemElement);
  photoGrid.append(itemElement);
}

// Удаление карточки
function removePlace(event) {
  const itemElement = event.target.closest(".photo-grid__item");
  itemElement.remove();
}

// Лайк карточки
function likePlace(event) {
  const itemElement = event.target;
  itemElement.classList.toggle('button_type_liked');
}

/* ЛОГИКА */
initialCards.forEach(renderPlace);
