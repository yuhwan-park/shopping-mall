import * as Api from '/api.js';
import { INPUT } from '/useful-validator.js';

// 요소(element), input 혹은 상수
const $submitButton = document.querySelector('#submitButton');
const $passwordInput = document.querySelector('#passwordInput');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  $submitButton.addEventListener('click', handleSubmit);
}

function handleSubmit() {
  const password = $passwordInput.value;
  const isPasswordValid = password.length >= INPUT.MINLENGTH.password;

  if (password.length > 0 && !isPasswordValid) {
    return alert('비밀번호는 4글자 이상이어야 합니다.');
  }

  if (password.length > 0 && !isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  if (password === 'kakao') {
    return alert('kakao');
  }
}
