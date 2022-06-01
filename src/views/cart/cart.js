import { addCommas, convertToNumber } from '/useful-functions.js';

// *************************
// *    엘레멘트 셀렉터     *
// *************************

const $cartItemContainer = document.querySelector('#cartItemContainer');
const $productsCount = document.querySelector('#productsCount');
const $productsPrice = document.querySelector('#productsPrice');
const $productsTotal = document.querySelector('#productsTotal');
const $deliveryFee = document.querySelector('#deliveryFee');
const $cartHeader = document.querySelector('#cartHeader');
const $selectCheckbox = document.querySelector('#selectCheckbox');
const $orderButton = document.querySelector('#orderButton');

// *************************
// *  장바구니 페이지 로직  *
// *************************

class Cart {
  constructor() {
    this.cartData = JSON.parse(localStorage.getItem('cart'));
    this.orderData = JSON.parse(localStorage.getItem('order'));
  }

  // 로컬스토리지의 장바구니 데이터를 가져와 템플릿에 맞게 HTML에 주입하는 메소드
  printCartData() {
    const node = this.cartData.reduce((acc, product) => {
      const isChecked = this.orderData['selectedIds'].includes(product.shortId);
      return (acc += `
        <div class="cart-item" id="cartItem">
          <input type="checkbox" ${isChecked ? 'checked' : ''} 
            id="checkbox+${product.shortId}" class="check-box" 
          />
          <img
            src=${product.imageURL}
            alt=${product.name}
            id="image+${product.shortId}"
          />
          <div class="content">
            <div class="content-title" id="productTitle+${product.shortId}">
            ${product.name}</div>
            <div class="quantity">
              <button class="button is-rounded" id="minus+${product.shortId}" 
              ${isChecked ? '' : 'disabled'}>-</button>
              <input type="number" min="1" max="99" value="${product.quantity}" 
              id="quantityInput+${product.shortId}" 
              ${isChecked ? '' : 'disabled'} />
              <button class="button is-rounded" id="plus+${product.shortId}" 
              ${isChecked ? '' : 'disabled'}>+</button>
            </div>
          </div>
          <div class="calculation">
            <p id="price+${product.shortId}">${addCommas(product.price)}</p>
            <p>X</p>
            <p id="quantity+${product.shortId}">${product.quantity}</p>
            <p>=</p>
            <p id="total+${product.shortId}">
            ${addCommas(product.price * product.quantity)}
            </p>
          </div>
          <button class="button" id="delete+${product.shortId}">삭제</button>
        </div>`);
    }, '');
    if (node) {
      $cartItemContainer.innerHTML = node;
    } else {
      $cartItemContainer.innerHTML = `<div>장바구니에 담긴 상품이 없습니다.</div>`;
    }
  }

  // 주문내역을 요약한 정보를 HTML에 주입하는 메소드
  printOrderSummary() {
    const deliveryFee = this.orderData.productsTotal > 50000 ? 0 : 3000;
    $productsCount.innerHTML = this.orderData.productsCount;
    $productsPrice.innerHTML = addCommas(this.orderData.productsTotal);
    $productsTotal.innerHTML = addCommas(
      this.orderData.productsTotal + deliveryFee,
    );
    $deliveryFee.innerHTML = addCommas(deliveryFee);
  }

  // 모든 상품이 선택되거나 선택되지 않았을 때 전체선택 체크박스를 on/off 하는 메소드
  checkHeaderCheckbox() {
    if (this.orderData['selectedIds'].length === this.orderData['ids'].length) {
      $selectCheckbox.checked = true;
    } else {
      $selectCheckbox.checked = false;
    }
  }

  // 상품의 체크박스를 클릭했을 때 그 상품을 스토리지에서 제거하거나 추가하는 메소드
  handleChangeCheckbox(id, checked) {
    if (checked) {
      this.orderData['selectedIds'].push(id);
      this.orderData.productsCount += 1;
      this.toggle(id, false);
    } else {
      this.orderData['selectedIds'] = this.orderData['selectedIds'].filter(
        (productId) => productId !== id,
      );
      this.orderData.productsCount = this.orderData['selectedIds'].length;
      this.toggle(id, true);
    }
    localStorage.setItem('order', JSON.stringify(this.orderData));
    this.modifyTotalPrice();
    this.printOrderSummary();
    this.checkHeaderCheckbox();
  }

  // id에 해당하는 상품의 체크박스, 버튼, 인풋을 비활성화 하는 메소드
  toggle(id, boolean) {
    const checkbox = document.getElementById(`checkbox+${id}`);
    const minus = document.getElementById(`minus+${id}`);
    const plus = document.getElementById(`plus+${id}`);
    const quantityInput = document.getElementById(`quantityInput+${id}`);
    checkbox.checked = !boolean;
    minus.disabled = boolean;
    plus.disabled = boolean;
    quantityInput.disabled = boolean;
  }

  // 상품의 수량을 조절하거나 상품 선택을 해제했을 때 총 결제금액을 스토리지에 적용하는 메소드
  modifyTotalPrice() {
    let totalPrice = 0;
    this.orderData['selectedIds'].forEach((id) => {
      for (let product of this.cartData) {
        if (product.shortId === id) {
          totalPrice += product.price * product.quantity;
        }
      }
    });
    this.orderData['productsCount'] = this.orderData['selectedIds'].length;
    this.orderData['productsTotal'] = totalPrice;
    localStorage.setItem('order', JSON.stringify(this.orderData));
  }

  // + 버튼, - 버튼을 이용하여 수량을 조절했을 때 스토리지에 수량 데이터를 저장하는 메소드
  modifyQuantityByButton(id, isPlus) {
    const quantityInput = document.getElementById(`quantityInput+${id}`);
    if (
      (isPlus && quantityInput.value >= 99) ||
      (!isPlus && quantityInput.value <= 1)
    ) {
      alert('1 ~ 99 사이의 수량만 주문 가능합니다.');
      return;
    } else {
      this.cartData.forEach((product) => {
        if (product.shortId === id) {
          product.quantity += isPlus ? 1 : -1;
          quantityInput.value = product.quantity;
          this.printProductPrice(id, product.quantity);
        }
      });
      localStorage.setItem('cart', JSON.stringify(this.cartData));
      this.modifyTotalPrice();
      this.printOrderSummary();
    }
  }

  // 장바구니의 데이터를 삭제하는 메소드
  deleteCartData(id) {
    this.cartData = this.cartData.filter(
      (product) => product['shortId'] !== id,
    );
    this.orderData['ids'] = this.orderData['ids'].filter(
      (productId) => productId !== id,
    );
    this.orderData['selectedIds'] = this.orderData['selectedIds'].filter(
      (productId) => productId !== id,
    );
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    localStorage.setItem('order', JSON.stringify(this.orderData));
    this.modifyTotalPrice();
    this.printOrderSummary();
    this.printCartData();
    setEventListener();
  }

  // 수량 인풋을 조절했을 때 데이터를 저장하는 메소드
  handleChangeInput(id, event) {
    this.cartData.forEach((product) => {
      if (product.shortId === id) {
        if (event.target.value > 99) {
          alert('1 ~ 99 사이의 수량만 주문 가능합니다.');
          event.target.value = product.quantity;
        }
        product.quantity = Number(event.target.value);
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    this.printProductPrice(id, event.target.value);
    this.modifyTotalPrice();
    this.printOrderSummary();
  }

  // 수량을 조절했을 때 상품의 가격을 렌더링하는 메소드
  printProductPrice(id, quantity) {
    const $price = document.getElementById(`price+${id}`);
    const $quantity = document.getElementById(`quantity+${id}`);
    const $total = document.getElementById(`total+${id}`);
    $quantity.innerText = quantity;
    $total.innerHTML = `${addCommas(
      convertToNumber($price.innerText) * quantity,
    )}`;
  }

  // 전체선택과 전체삭제를 클릭했을 때 주문 데이터를 수정하는 메소드
  selectAndCancleAll(isSelect) {
    this.orderData['selectedIds'] = isSelect ? this.orderData['ids'] : [];
    this.orderData.productsCount = isSelect
      ? this.orderData['selectedIds'].length
      : 0;
    localStorage.setItem('order', JSON.stringify(this.orderData));
    // 모든 상품리스트의 버튼,인풋을 on/off
    this.orderData['ids'].forEach((id) => {
      this.toggle(id, isSelect ? false : true);
    });

    this.modifyTotalPrice();
    this.printOrderSummary();
    this.checkHeaderCheckbox();
  }

  // 선택된 상품을 장바구니에서 제거하는 메소드
  deleteAll() {
    this.orderData['selectedIds'].forEach((id) => {
      this.cartData = this.cartData.filter(
        (product) => product['shortId'] !== id,
      );
      this.orderData['ids'] = this.orderData['ids'].filter(
        (productId) => productId !== id,
      );
    });
    this.orderData['selectedIds'] = [];
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    localStorage.setItem('order', JSON.stringify(this.orderData));
    this.modifyTotalPrice();
    this.printOrderSummary();
    this.printCartData();
    setEventListener();
  }

  checkOrder() {
    if (this.orderData['selectedIds'].length < 1) {
      alert('선택된 상품이 없습니다.');
    } else {
      window.location.href = '/order';
    }
  }
}

// 이벤트리스너 모음
function setEventListener() {
  const $cartItems = document.querySelectorAll('#cartItem');
  $cartItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      const [name, id] = event.target.id.split('+');
      if (name === 'productTitle' || name === 'image') {
        // 이미지나 상품이름 클릭 시 그 상품의 판매페이지로 이동
        window.location.href = `/products/detail/${id}`;
      } else if (name === 'plus') {
        // 수량 조절 버튼 클릭 시 데이터에 적용
        cart.modifyQuantityByButton(id, true);
      } else if (name === 'minus') {
        cart.modifyQuantityByButton(id, false);
      } else if (name === 'delete') {
        // 로컬스토리지의 데이터 삭제 및 화면 재 렌더링
        cart.deleteCartData(id);
      }
    });
    item.addEventListener('change', (event) => {
      const [name, id] = event.target.id.split('+');
      if (name === 'checkbox') {
        const checked = event.target.checked;
        cart.handleChangeCheckbox(id, checked);
      } else if (name === 'quantityInput') {
        cart.handleChangeInput(id, event);
      }
    });
  });
  $cartHeader.addEventListener('click', (event) => {
    if (event.target.id === 'selectAll') {
      cart.selectAndCancleAll(true);
    } else if (event.target.id === 'cancleAll') {
      cart.deleteAll();
    }
  });
  $cartHeader.addEventListener('change', (event) => {
    cart.selectAndCancleAll(event.target.checked);
  });
}

const cart = new Cart();
cart.printCartData();
cart.printOrderSummary();
cart.checkHeaderCheckbox();
setEventListener();

$orderButton.addEventListener('click', cart.checkOrder.bind(cart));
