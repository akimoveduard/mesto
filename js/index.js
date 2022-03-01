/* ПЕРЕМЕННЫЕ */

// Модальные окна
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddnew = document.querySelector('.popup_type_addnew');
const popupMesto = document.querySelector('.popup_type_mesto');

// Профиль
const buttonProfileOpen = document.querySelector('[name="profile-button-open"]');
const buttonProfileClose = document.querySelector('[name="button-close-profile"]');

const elementProfileName = document.querySelector('.profile__name');
const elementProfileAbout = document.querySelector('.profile__about');
const formProfile = document.querySelector('[name="profile-form"]');
const inputProfileName = document.querySelector('[name="profile-input-name"]');
const inputProfileAbout = document.querySelector('[name="profile-input-about"]');

// Добавить место
const formAddnew = document.querySelector('[name="addnew-form"]');
const buttonAddnewOpen = document.querySelector('[name="addnew-button-open"]');
const buttonAddnewClose = document.querySelector('[name="addnew-button-close"]');

const inputAddnewCaption = document.querySelector('[name="addnew-input-caption"]');
const inputAddnewImage = document.querySelector('[name="addnew-input-image"]');

// Место
const mestoGrid = document.querySelector('.photo-grid__list');

// Модальное окно места
const mestoImage = document.querySelector('.mesto__image');
const mestoCaption = document.querySelector('.mesto__caption');

const buttonMestoClose = document.querySelector('[name="button-close-mesto"]');

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
}

// Закрытие всплывающего окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Получение значений из HTML-элементов для формы профиля
function getProfileValues() {
  inputProfileName.value = elementProfileName.textContent;
  inputProfileAbout.value = elementProfileAbout.textContent;
}

// Установка новых значений из формы профиля в HTML-элементы
function setProfileValues () {
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


// Закрытие модального окна профиля
buttonProfileClose.addEventListener('click', () => {
  closePopup(popupProfile);
});

// Обработка ввода данных формы профиля
formProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  setProfileValues();
  closePopup(popupProfile);
});

// Открытие модального окна формы нового места
buttonAddnewOpen.addEventListener('click', () => {
  openPopup(popupAddnew);
});

// Закрытие модального окна нового места
buttonAddnewClose.addEventListener('click', () => {
  closePopup(popupAddnew);
});

// Обработка ввода данных формы места
formAddnew.addEventListener('submit', (event)=> {
  event.preventDefault();
  const newMesto = {
    name: inputAddnewCaption.value,
    link: inputAddnewImage.value
  };
  const newCard = createCard(newMesto.link, newMesto.name);
  mestoGrid.prepend(newCard);
  closePopup(popupAddnew);
});

// Закрытие модального окна места
buttonMestoClose.addEventListener('click', () => {
  closePopup(popupMesto);
});

/* ЛОГИКА */

initialCards.forEach(function (item) {
  newCard = createCard(item.link, item.name);
  mestoGrid.append(newCard);
});
