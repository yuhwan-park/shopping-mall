import * as Api from '/api.js';
import { addCommas, handlePost } from '/useful-functions.js';
import { INPUT } from '/useful-validator.js';

const $productsTitle = document.querySelector('#productsTitle');
const $productsPrice = document.querySelector('#productsPrice');
const $deliveryFee = document.querySelector('#deliveryFee');
const $totalPrice = document.querySelector('#totalPrice');
const $name = document.querySelector('#name');
const $phoneNumber = document.querySelector('#phoneNumber');
const $postalCode = document.querySelector('#postalCode');
const $address1 = document.querySelector('#address1');
const $address2 = document.querySelector('#address2');
const $requestSelect = document.querySelector('#requestSelect');
const $addressButton = document.querySelector('#addressButton');
const $orderCompleteButton = document.querySelector('#orderCompleteButton');

const orderData = JSON.parse(localStorage.getItem('order'));
const cartData = JSON.parse(localStorage.getItem('cart'));

const requestString = {
  1: '직접 수령하겠습니다.',
  2: '배송 전 연락바랍니다.',
  3: '부재 시 경비실에 맡겨주세요.',
  4: '부재 시 문 앞에 놓아주세요.',
  5: '부재 시 택배함에 넣어주세요.',
};

function printOrderSummary() {
  const deliveryFee = orderData['productsTotal'] > 50000 ? 0 : 3000;
  $productsTitle.innerHTML = getShortTitle();
  $productsPrice.innerHTML = addCommas(orderData['productsTotal']);
  $deliveryFee.innerHTML = addCommas(deliveryFee);
  $totalPrice.innerHTML = addCommas(orderData['productsTotal'] + deliveryFee);
}

function getShortTitle() {
  let title = '';
  orderData['selectedIds'].forEach((id) => {
    for (let product of cartData) {
      if (product.shortId === id) {
        title += `${product.name}/${product.quantity}개<br>`;
      }
    }
  });
  return title;
}

async function postOrder() {
  const data = {
    ordererName: $name.value,
    phoneNumber: $phoneNumber.value,
    shortTitle: getShortTitle(),
    orderStatus: '상품 준비중',
    address: {
      postalCode: $postalCode.value,
      address1: $address1.value,
      address2: $address2.value,
    },
    deliveryRequest: requestString[$requestSelect.value],
    deliveryFee: orderData['productsTotal'] > 50000 ? 0 : 3000,
    totalPrice: orderData['productsTotal'],
  };

  try {
    const isValid = Object.values(data).filter((val) => {
      // 비어있는 칸 확인, 0은 배송비가 0일 수 있기 때문에 제외
      return val === 0 ? false : !val;
    });
    console.log(isValid);
    console.log(data['phoneNumber']);
    if (isValid.length) {
      throw new Error('모든 항목을 기입해주세요.');
    }

    if (data['phoneNumber'].length < INPUT.MINLENGTH.phoneNumber) {
      throw new Error('연락처는 "01012345678" 형식으로 기입해주세요.');
    }

    await Api.post('/api/orders', data);
  } catch (err) {
    alert(err.message);
  }
}

printOrderSummary();

$addressButton.addEventListener('click', () => {
  handlePost($postalCode, $address1, $address2);
});
$orderCompleteButton.addEventListener('click', postOrder);
