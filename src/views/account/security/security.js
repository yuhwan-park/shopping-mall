import * as Api from '/api.js';
import { handlePost, onlyNumber } from '/useful-functions.js';
import { INPUT } from '/useful-constants.js';

// 요소(element), input 혹은 상수
const $accountSecurity = document.querySelector('.account-security');
const $modal = document.querySelector('.modal');
const $userEmailText = document.querySelector('#userEmailText');
const $fullNameInput = document.querySelector('#fullNameInput');
const $passwordInput = document.querySelector('#passwordInput');
const $passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const $postalCodeInput = document.querySelector('#postalCodeInput');
const $address1Input = document.querySelector('#address1Input');
const $address2Input = document.querySelector('#address2Input');
const $phoneInput = document.querySelector('#phoneInput');
const $currentPasswordConfirmInput = document.querySelector(
  '#currentPasswordConfirmInput',
);
const $modalPassword = document.querySelector('#modal-js-password');
const $postalCodeButton = document.querySelector('#postalCodeButton');
const $submitButton = document.querySelector('#submitButton');
const $submitConfirmButton = document.querySelector('#submitConfirmButton');

addAllElements();
addAllEvents();
getUserData();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  $accountSecurity.addEventListener('click', handleSwitch);
  $submitButton.addEventListener('click', handleSubmit);
  $submitConfirmButton.addEventListener('click', handleUserSubmit);
  $postalCodeButton.addEventListener('click', () => {
    handlePost($postalCodeInput, $address1Input, $address2Input);
  });
  $modal.addEventListener('click', closeModal);
}

function handleSwitch(e) {
  const targetElement = e.target.matches('input[type="checkbox"]');
  if (targetElement) {
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
}

function closeModal(e) {
  e.preventDefault();
  const $modalClose = e.target.matches('.modal-close');
  const $modalCloseButton = e.target.matches('.modal-close-button');
  const $modalBackground = e.target.matches('.modal-background');
  if ($modalClose || $modalCloseButton || $modalBackground) {
    $currentPasswordConfirmInput.value = '';
  }
}

function hasProperty(obj, elemet) {
  return obj.hasOwnProperty(elemet);
}

function checkUserData(obj) {
  const isPhoneNumber = hasProperty(obj, 'phoneNumber');
  const isAdress = hasProperty(obj, 'address');

  if (!isPhoneNumber) {
    $phoneInput.value = '';
  }

  if (!isAdress) {
    $postalCodeInput.value = '';
    $address1Input.value = '';
    $address2Input.value = '';
  }
}

async function getUserData() {
  try {
    const data = await Api.get('/api/users');
    $userEmailText.insertAdjacentHTML('beforeend', ` (${data.email})`);
    $fullNameInput.value = data.fullName;
    $phoneInput.value = data.phoneNumber;
    $postalCodeInput.value = data.address?.postalCode;
    $address1Input.value = data.address?.address1;
    $address2Input.value = data.address?.address2;
    checkUserData(data);
  } catch (err) {
    console.error(err);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  let fullName = $fullNameInput.value;
  let password = $passwordInput.value;
  let passwordConfirm = $passwordConfirmInput.value;
  let phoneNumber = onlyNumber($phoneInput.value);

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= INPUT.MINLENGTH.name;
  const isPasswordValid = password.length >= INPUT.MINLENGTH.password;
  const isPasswordSame = password === passwordConfirm;
  const isPhoneValid = phoneNumber.length >= INPUT.MINLENGTH.phoneNumber;

  if (!isFullNameValid) {
    return alert('이름은 2글자 이상이어야 합니다.');
  }

  if (password.length > 0 && !isPasswordValid) {
    return alert('비밀번호는 4글자 이상이어야 합니다.');
  }

  if (password.length > 0 && !isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  if (phoneNumber.length > 0 && !isPhoneValid) {
    return alert('전화번호 형식이 맞지 않습니다.');
  }

  $modalPassword.classList.add('is-active');
}

async function handleUserSubmit(e) {
  e.preventDefault();

  const fullName = $fullNameInput.value;
  const password = $passwordInput.value;
  const passwordConfirm = $passwordConfirmInput.value;
  const currentPassword = $currentPasswordConfirmInput.value;
  const postalCode = $postalCodeInput.value;
  const address1 = $address1Input.value;
  const address2 = $address2Input.value;
  const phoneNumber = onlyNumber($phoneInput.value);

  const updateData = {
    fullName,
    password,
    passwordConfirm,
    address: {
      postalCode,
      address1,
      address2,
    },
    phoneNumber,
    currentPassword,
  };

  try {
    if (currentPassword === 'kakao') {
      return alert('kakao');
    }
    await Api.patch('/api/users', '', updateData);
    window.location.href = '/account/security';
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}
