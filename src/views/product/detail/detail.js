import * as Api from '/api.js';

const $container = document.querySelector('.detail-container');
const path = window.location.pathname.split('/');
const id = path[path.length - 2];

// 1. 저장되어 있는 상품의 정보를 불러와서 화면에 텍스트로 출력(스플래시/아이보리니트/가격/설명)
// 2. db에 저장된 이미지를 불러와서 화면에 출력
// 3. 장바구니 추가하기 버튼 - 클릭시 "장바구니에 추가되었습니다." alert() 창 띄우고, cart로 내역 전송
// 4. 바로 구매하기 버튼

//  - 1 로그인이 안 되어있을 때 = 로그인 화면으로 이동
//  - 2 로그인이 되어있을 때 = 주문결제 페이지로 이동
// (결제 정보에 해당 상품에 대한 정보 출력)

// 5. viewrouter에 쿼리나 파라미터 추가(몇번째/무슨 상품인지 식별)

async function addAllElements() {
  detailText();
}

function addAllEvents(data) {
  const $addCartButton = document.querySelector('#add-cart-button');
  const $purchaseButton = document.querySelector('#purchase-button');
  $addCartButton.addEventListener('click', () => {
    addCart(data);
  });
  $purchaseButton.addEventListener('click', () => {
    purchase(data);
  });
}

const token = localStorage.getItem('token');

async function detailText() {
  const data = await Api.get('/api/products', id);
  const node = `<img
            id="detailProductImage"
            src="${data.imageURL}"
            alt="제품 상세 이미지"
          />

          <div class="detail-right-wrap">
            <div class="detail-text-wrap">
              <p class="p-title">${data.brand}</p>
              <p class="detail-title">${data.name}</p>
              <p class="detail-price">${data.price}</p>
              <p class="p-contents">
                ${data.detailDescription}
              </p>
              <div>
                <div class="btn-wrap">
                  <button
                    id="add-cart-button"
                    class="button is-warning is-large"
                  >
                    장바구니 추가하기
                  </button>
                  <button id="purchase-button" class="button is-info is-large">
                    바로 구매하기
                  </button>
                </div>
              </div>
            </div>
          </div>`;
  $container.insertAdjacentHTML('afterbegin', node);

  addAllEvents(data);
}

// 장바구니에 추가 버튼 함수
async function addCart(data) {
  const oldCartData = JSON.parse(localStorage.getItem('cart'));
  const oldOrderData = JSON.parse(localStorage.getItem('order'));
  const orderData = {
    ids: oldOrderData ? [...oldOrderData['ids'], id] : [id],
    productsCount: oldOrderData ? (oldOrderData['productsCount'] += 1) : 1,
    productsTotal: oldOrderData
      ? (oldOrderData['productsTotal'] += data.price)
      : data.price,
    selectedIds: oldOrderData ? [...oldOrderData['ids'], id] : [id],
  };
  if (
    oldCartData &&
    oldCartData.filter((product) => product.shortId === id).length
  ) {
    alert('이미 장바구니에 담긴 상품입니다.');
    return;
  }
  if (oldCartData) {
    // 축적된 데이터가 있으면
    localStorage.setItem(
      'cart',
      JSON.stringify([...oldCartData, { ...data, quantity: 1 }]),
    );
    // order에서 shortsId 가져와서 더해줌
    // productsCount = ids.length
    // selectedIds === ids
  } else {
    // 없으면 (처음으로 장바구니에 물건을 담는다면)
    localStorage.setItem('cart', JSON.stringify([{ ...data, quantity: 1 }]));
  }
  localStorage.setItem('order', JSON.stringify(orderData));
  alert('장바구니에 물품이 추가되었습니다.');
}

function purchase(data) {
  if (!token || token === 'null') {
    // 로그인이 안되어있다면
    window.location.href = '/login';
  } else {
    // 주문결제 페이지로 데이터 전송
    const purchaseData = {
      ids: [id],
      productsCount: 1,
      productsTotal: data.price,
      selectedIds: [id],
    };

    localStorage.setItem('order', JSON.stringify(purchaseData));

    window.location.href = '/order';
  }
}

addAllElements();
