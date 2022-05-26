import * as Api from '/api.js';

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const addressInput = document.querySelector('#addressInput');
const phoneInput = document.querySelector('#phoneInput');
const currentPasswordConfirmInput = document.querySelector(
  '#currentPasswordConfirmInput',
);
const swithCheckboxs = document.querySelectorAll('.switch');
const modalPassword = document.querySelector('#modal-js-password');
const submitButton = document.querySelector('#submitButton');
const submitConfirmButton = document.querySelector('#submitConfirmButton');

// validator
const fullName = fullNameInput.value;
const password = passwordInput.value;
const passwordConfirm = passwordConfirmInput.value;
const address = addressInput.value;
const phone = phoneInput.value;

addAllElements();
addAllEvents();
userData();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
  submitConfirmButton.addEventListener('click', handlePasswordSubmit);
  swithCheckboxs.forEach((swithCheckbox) => {
    const checkbox = swithCheckbox.querySelector('input');
    checkbox.addEventListener('change', handleSwitch);
  });
}

async function userData() {
  try {
    const data = await Api.get('/api/users/:shortId');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function handleSwitch(e) {
  const checkedToggle = e.target.checked;
  const targetDataName = e.target.dataset.name;
  const targetCheckElement = document.querySelectorAll(
    `input[data-name=${targetDataName}], button[data-name=${targetDataName}]`,
  );
  targetCheckElement.forEach((input) => {
    const typeName = input.getAttribute('type');
    if (checkedToggle) {
      if (typeName !== 'checkbox') {
        input.removeAttribute('disabled');
      }
    } else {
      if (typeName !== 'checkbox') {
        input.setAttribute('disabled', '');
      }
    }
  });
}

async function handleSubmit(e) {
  e.preventDefault();

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;
  const isPhoneValid = phone.length > 12;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  if (!isPhoneValid) {
    return alert('전화번호 형식이 맞지 않습니다.');
  }

  try {
    modalPassword.classList.add('is-active');
  } catch (err) {
    console.error(err);
  }
}

async function handlePasswordSubmit(e) {
  e.preventDefault();
  const data = { fullName, password, address, phone };
  //const user = await Api.patch('/api/users/:shortId', data);
  console.log(data);
}
