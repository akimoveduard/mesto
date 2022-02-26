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

/* СЛУШАТЕЛИ */

// Профиль
buttonProfileOpen.addEventListener('click', function() {
  openPopup('.popup_type_profile');
  inputProfileName.value = document.querySelector('.profile__name').textContent;
  inputProfileAbout.value = document.querySelector('.profile__about').textContent;
});

buttonProfileClose.addEventListener('click', function() {
  closePopup('.popup_type_profile');
});

formProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  if (inputProfileName) { document.querySelector('.profile__name').textContent = inputProfileName.value; }
  if (inputProfileAbout) { document.querySelector('.profile__about').textContent = inputProfileAbout.value; }
  closePopup('.popup_type_profile');
});

// Добавление места
buttonAddnewOpen.addEventListener('click', function() {
  openPopup('.popup_type_addnew');
});

buttonAddnewClose.addEventListener('click', function() {
  closePopup('.popup_type_addnew');
});

formAddnew.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newPlace = {
    name: '2',
    link: '222'
  };
  makePlace(newPlace);
  closePopup('.popup_type_addnew');
});

/* ЛОГИКА */
initialCards.forEach(makePlace);

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

// Создание новой карточки места
function makePlace(element) {
  console.log(element);
  const photoElement = photoTemplate.querySelector('.photo-grid__item').cloneNode(true);
  photoElement.querySelector('.photo-grid__item-image').src = element.link;
  photoElement.querySelector('.photo-grid__item-caption').textContent = element.name;
  photoGrid.append(photoElement);
}
