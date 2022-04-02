/* ПЕРЕМЕННЫЕ */

// Модальные окна
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddnew = document.querySelector('.popup_type_addnew');
const popupMesto = document.querySelector('.popup_type_mesto');

// Профиль
const buttonProfileOpen = document.querySelector('[name="profile-button-open"]');

const elementProfileName = document.querySelector('.profile__name');
const elementProfileAbout = document.querySelector('.profile__about');

const formProfile = document.querySelector('[name="profile"]');
const inputProfileName = document.querySelector('[name="name"]');
const inputProfileAbout = document.querySelector('[name="about"]');

// Добавить место
const formAddnew = document.querySelector('[name="addmesto"]');
const buttonAddnewOpen = document.querySelector('[name="addmesto-button-open"]');

const inputAddnewCaption = document.querySelector('[name="caption"]');
const inputAddnewImage = document.querySelector('[name="image"]');

// Место
const mestoGrid = document.querySelector('.photo-grid__list');

// Модальное окно места
const mestoImage = document.querySelector('.mesto__image');
const mestoCaption = document.querySelector('.mesto__caption');

/* ФУНКЦИИ */

// Установки разных слушателей на карточку места
function setCardEventListeners(itemElement) {
  itemElement.querySelector('.button_type_delete').addEventListener('click', removeMesto);
  itemElement.querySelector('.button_type_like').addEventListener('click', likeMesto);
  itemElement.querySelector('.photo-grid__item-image').addEventListener('click', () => {
    openPopupMesto(itemElement);
  });
}

// Открытие всплывающего окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// Закрытие всплывающего окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Закрытие всплывающего окна при нажатии на Esc
function closePopupByEsc(event) {
  if (event.key==="Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Закрытие любого всплывающего окна при нажатии на оверлей или крестик
function setPopupCloseListeners() {
  popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (event.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });
}

// Получение значений из HTML-элементов для формы профиля
function getProfileValues() {
  inputProfileName.value = elementProfileName.textContent;
  inputProfileAbout.value = elementProfileAbout.textContent;
}

// Установка новых значений из формы профиля в HTML-элементы
function setProfileValues() {
  if (inputProfileName) { elementProfileName.textContent = inputProfileName.value; }
  if (inputProfileAbout) { elementProfileAbout.textContent = inputProfileAbout.value; }
}

// Создание карточки
function createCard(elementLink, elementName) {
  const cardTemplate = document.querySelector('#photo-grid-item-template').content;
  const newCard = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardImage = newCard.querySelector('.photo-grid__item-image');
  const cardCaption = newCard.querySelector('.photo-grid__item-caption');
  cardImage.src = elementLink;
  cardImage.alt = elementName;
  cardCaption.textContent = elementName;
  setCardEventListeners(newCard);
  return newCard;
}

// Удаление карточки
function removeMesto(event) {
  const itemElement = event.target.closest(".photo-grid__item");
  itemElement.remove();
}

// Лайк карточки
function likeMesto(event) {
  const itemElement = event.target;
  itemElement.classList.toggle('button_type_liked');
}

// Подготовка модального окна с местом
function openPopupMesto(itemElement) {
  itemImage = itemElement.querySelector('.photo-grid__item-image');
  mestoImage.src = itemImage.src;
  mestoImage.alt = itemImage.alt;
  mestoCaption.textContent = itemElement.querySelector('.photo-grid__item-caption').textContent;
  openPopup(popupMesto);
}

/* СЛУШАТЕЛИ */

// Открытие модального окна профиля
buttonProfileOpen.addEventListener('click', () => {
  getProfileValues();
  openPopup(popupProfile);
});

// Обработка ввода данных формы профиля
formProfile.addEventListener('submit', (event) => {
  setProfileValues();
  closePopup(popupProfile);
});

// Открытие модального окна формы нового места
buttonAddnewOpen.addEventListener('click', () => {
  openPopup(popupAddnew);
});

// Обработка ввода данных формы места
formAddnew.addEventListener('submit', (event)=> {
  const newMesto = {
    name: inputAddnewCaption.value,
    link: inputAddnewImage.value
  };
  const newCard = createCard(newMesto.link, newMesto.name);
  mestoGrid.prepend(newCard);
  closePopup(popupAddnew);
  event.currentTarget.reset();
});

/* ЛОГИКА */

initialCards.forEach(function (item) {
  newCard = createCard(item.link, item.name);
  mestoGrid.append(newCard);
});

getProfileValues(); // Вставить в инпуты формы профиля заранее, до начала валидации

setPopupCloseListeners(); // Установка слушателей для закрытия всплывающих окон
