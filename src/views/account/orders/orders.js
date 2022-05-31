import * as Api from '/api.js';
import { dateYearMonthDay } from '/useful-functions.js';
// 요소(element), input 혹은 상수
const $accountOrder = document.querySelector('.account-orders');
const $modal = document.querySelector('.modal');
const $submitButton = document.querySelector('#submitButton');

addAllElements();
addAllEvents();
getUserOrders();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  $accountOrder.addEventListener('click', getOrderId);
  $modal.addEventListener('click', closeModal);
  $submitButton.addEventListener('click', handleOrderDataDelete);
}

function getOrderId(e) {
  e.preventDefault();

  const targetElement = e.target.matches('button.js-delete-order-button');
  if (targetElement) {
    $modal.classList.add('is-active');
    const setOrderId = e.target.getAttribute('data-order');
    $submitButton.setAttribute('data-order', setOrderId);
  }
}

function closeModal(e) {
  e.preventDefault();
  const $modalClose = e.target.matches('.modal-close');
  const $modalCloseButton = e.target.matches('.modal-close-button');
  const $modalBackground = e.target.matches('.modal-background');
  if ($modalClose || $modalCloseButton || $modalBackground) {
    $submitButton.removeAttribute('data-order');
  }
}

function printUserOrders(orders) {
  const dataOrder = orders.reduce((acc, order) => {
    return (acc += `<tr>
    <td>${dateYearMonthDay(order.createdAt)}</td>
    <td>${order.shortTitle} 개</td>
    <td>${order.orderStatus}</td>
    <td>
      <button
        class="button js-delete-order-button js-modal-trigger"
        data-target="modal-js-order-cancel"
        data-order="${order.shortId}"
      >
        주문 취소
      </button>
    </td>
  </tr>`);
  }, '');

  const noDataOrder = `<tr>
  <td colspan="4" class="py-5">주문정보가 없습니다.</td>
</tr>`;

  if (orders.length) {
    $accountOrder
      .querySelector('tbody')
      .insertAdjacentHTML('afterbegin', dataOrder);
  } else {
    $accountOrder
      .querySelector('tbody')
      .insertAdjacentHTML('afterbegin', noDataOrder);
  }
}

async function getUserOrders() {
  try {
    const data = await Api.get('/api/orders');
    printUserOrders(data);
    console.log(data);
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}

async function handleOrderDataDelete(e) {
  e.preventDefault();
  let orderId = e.target.getAttribute('data-order');
  try {
    await Api.delete('/api/orders', orderId);
    window.location.href = '/account/orders/';
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}
