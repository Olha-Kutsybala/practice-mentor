// Якщо імейл і пароль користувача збігаються, зберігайте дані з форми при сабмите
// у локальне сховище і змінюй кнопку login на logout і роби поля введення
// Недоступними зміни.

// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.

// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.

import { Notify } from 'notiflix';
import { refs } from './refs';

const USER_DATA = {
  email: 'user@mail.com',
  password: '123',
};

refs.loginForm.addEventListener('submit', onLoginFormSubmit);

populateForm();

function onLoginFormSubmit(evt) {
  evt.preventDefault();
  const { email, password, button } = evt.target;

  if (button.textContent === 'logout') {
    refs.buttonSubmit.textContent = 'Login';
    refs.emailInput.disabled = false;
    refs.passwordInput.disabled = false;
    evt.currentTarget.reset();
    localStorage.removeItem('formData');
    return;
  }

  if (
    email.value !== USER_DATA.email ||
    password.value !== USER_DATA.password
  ) {
    Notify.failure('Невірний пароль або email');
    return;
  }

  const formData = {
    email: email.value,
    password: password.value,
  };
  localStorage.setItem('formData', JSON.stringify(formData));
  button.textContent = 'logout';
  email.disabled = true;
  password.disabled = true;
}

function populateForm() {
  const saveData = JSON.parse(localStorage.getItem('formData'));
  if (!saveData) {
    return;
  }
  refs.emailInput.disabled = true;
  refs.passwordInput.disabled = true;
  refs.emailInput.value = saveData.email;
  refs.passwordInput.value = saveData.password;
  refs.buttonSubmit.textContent = 'logout';
}
