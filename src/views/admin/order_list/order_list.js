import * as Api from '/api.js';
import { dateYearMonthDay } from '/useful-functions.js';

const $accountOrder = document.querySelector('#ordersContainer');
const $modal = document.querySelector('.modal');
const $emailInput = document.querySelector('#emailInput');
const $submitButton = document.querySelector('#submitButton');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  $accountOrder.addEventListener('click', getOrderId);
  $modal.addEventListener('click', closeModal);
  $emailInput.addEventListener('keyup', handleUserSearch);
  $submitButton.addEventListener('click', handleOrderDataDelete);
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

function getOrderId(e) {
  e.preventDefault();
  const targetElement = e.target.matches('button.js-delete-order-button');
  if (targetElement) {
    $modal.classList.add('is-active');
    const setOrderId = e.target.getAttribute('data-order');
    $submitButton.setAttribute('data-order', setOrderId);
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
        class="button js-delete-order-button is-modal js-modal-trigger"
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

function handleUserSearch(e) {
  if (e.keyCode === 13) {
    try {
      getUserOrders();
    } catch (err) {
      console.error(err);
      alert(`${err.message}`);
    }
  }
}

async function getUserOrders() {
  const email = $emailInput.value;
  const data = await Api.get(`/api/admin/orders`, `list?email=${email}`);
  $accountOrder.querySelector('tbody').innerHTML = '';
  printUserOrders(data);
}

async function handleOrderDataDelete(e) {
  e.preventDefault();
  let orderId = e.target.getAttribute('data-order');
  try {
    await Api.delete('/api/admin/orders', orderId);
    $modal.classList.remove('is-active');
    getUserOrders();
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}
