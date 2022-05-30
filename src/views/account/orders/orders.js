import * as Api from '/api.js';

// 요소(element), input 혹은 상수
const $accountOrder = document.querySelector('.account-orders');

addAllElements();
addAllEvents();
getUserOrders();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  $accountSecurity.addEventListener('click', handleOrderDelete);
}

function printUserOrders(orders) {
  const dataOrder = orders.reduce(
    (acc, order) =>
      `<tr>
    <td>${order.createdAt}</td>
    <td>${order.products[0].shortId} / ${order.products[0].quantity}</td>
    <td>${order.deliveryFree}</td>
    <td>
      <button
        class="button js-delete-order-button js-modal-trigger"
        data-target="modal-js-order-cancel"
      >
        주문 취소
      </button>
    </td>
  </tr>`,
    '',
  );

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

function handleOrderDelete(e) {
  e.preventDefault();
  const targetElement = e.target.matches('button.js-delete-order-button');
  if (targetElement) {
    console.log('button');
  }
}

async function handleOrderDataDelete() {
  try {
    await Api.delete('/api/orders/:shortId');
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}
