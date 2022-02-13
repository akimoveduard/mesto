/* Модальное окно */
let buttonPopupClose = document.querySelector('[name="popup-button-close"]');

// Слушатели модального окна
buttonPopupClose.addEventListener('click', function() {
  closePopup('.popup_type_profile');
});

/* Профиль */

// Форма и ее поля
let formProfile = document.querySelector('[name="profile-form"]');
let inputProfileName = document.querySelector('[name="profile-input-name"]');
let inputProfileAbout = document.querySelector('[name="profile-input-about"]');

// Кнопки
let buttonProfileOpen = document.querySelector('[name="profile-button-open"]');
let buttonProfileSubmit = document.querySelector('[name="profile-form"]');

// Слушатели для профиля
buttonProfileOpen.addEventListener('click', function() {
  openPopup('.popup_type_profile');
  pushValueIntoForm(inputProfileName, '.profile__name');
  pushValueIntoForm(inputProfileAbout, '.profile__about');
});

buttonProfileSubmit.addEventListener('submit', formSubmitHandler);

/* Функции */

// Обработка формы после нажатия кнопки submit
function formSubmitHandler(evt) {
  evt.preventDefault();
  getValueFromInput(inputProfileName, '.profile__name');
  getValueFromInput(inputProfileAbout, '.profile__about');
  closePopup('.popup_type_profile');
}

// Вставить значение элемента в поле формы
function pushValueIntoForm(inputName, element) {
  inputName.value = document.querySelector(element).textContent;
}

// Получить значение поля формы и вставить в содержимое элемента
function getValueFromInput(inputName, element) {
  if (inputName.value) {
    document.querySelector(element).textContent = inputName.value;
  } else {
    alert('В поле «' + inputName.placeholder + '» нужно написать что-то новое, а пока давайте вспомним, что там уже было.');
  }
}

// Открытие модального окна
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

// Закрытие модального окна
function closePopup(element) {
  objectPopup = document.querySelector(element);
  if (objectPopup.classList.contains('popup_opened')) {
    objectPopup.classList.remove('popup_opened');
  }
}
