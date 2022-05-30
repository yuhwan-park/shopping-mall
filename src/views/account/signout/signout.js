import * as Api from '/api.js';
import { INPUT } from '/useful-validator.js';

// 요소(element), input 혹은 상수
const SECRET_KEY = 'MY-SECRET-KEY';
const $passwordInput = document.querySelector('#passwordInput');
const $submitButton = document.querySelector('#submitButton');
const $deleteButton = document.querySelector('#deleteButton');
const $modalSignout = document.querySelector('#modal-js-signout');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  $submitButton.addEventListener('click', handleSubmit);
  $deleteButton.addEventListener('click', handleUserDelete);
}

async function handleSubmit(e) {
  e.preventDefault();

  const password = $passwordInput.value;
  const isPasswordValid = password.length >= INPUT.MINLENGTH.password;

  if (!isPasswordValid) {
    return alert('비밀번호는 4글자 이상이어야 합니다.');
  }

  if (password === 'kakao') {
    return alert('kakao');
  }

  try {
    const data = { password };
    await Api.post('/api/users', data);
    $modalSignout.classList.add('is-modal');
  } catch (err) {
    alert(`${err.message}`);
  }
}

async function handleUserDelete(e) {
  e.preventDefault;

  try {
    await Api.delete('/api/users');
    localStorage.removeItem('key');
    window.location.href = '/home';
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}
