const data = [
  {
    categoryId: '6278acb0927a0d0520ff6260',
    createdAt: '2022-05-09T05:57:00.230Z',
    detailDescription: '따뜻한 느낌을 줍니다. 지금깥은 날씨에 제격입니다!',
    imageURL:
      'http://localhost:5000/static/uploads/2579346_1_5001653723885723.jpg',
    brand: '스플래시',
    price: 19000,
    quantity: 1,
    shortDescription: '따뜻한 느낌의 남성 니트입니다.',
    name: '아이보리 니트',
    updatedAt: '2022-05-09T05:57:00.230Z',
    shortId: '6278ad2c927a0d0520ff6267',
  },
  {
    categoryId: '6278acb0927a0d0520ff6260',
    createdAt: '2022-05-09T05:58:07.858Z',
    detailDescription: '너무 두껍지 않고, 부담스럽지 않은 색상입니다.',
    imageURL: '/static/uploads/2579346_1_5001653640330778.jpg',
    brand: '스플래시',
    price: 189000,
    quantity: 1,
    shortDescription: '세련된 느낌의 정장입니다.',
    name: '남성 정장 ',
    updatedAt: '2022-05-09T05:58:07.858Z',
    shortId: '6278ad6f927a0d0520ff626a',
  },
];
const orderData = {
  ids: ['6278ad6f927a0d0520ff626a', '6278ad2c927a0d0520ff6267'],
  productsCount: 2,
  productsTotal: 208000,
  selectedIds: ['6278ad6f927a0d0520ff626a', '6278ad2c927a0d0520ff6267'],
};
const item = JSON.stringify(data);
localStorage.setItem('cart', item);
localStorage.setItem('order', JSON.stringify(orderData));
const $cartContainer = document.querySelector('#cartContainer');
const $productsCount = document.querySelector('#productsCount');
const $productsPrice = document.querySelector('#productsPrice');
const $productsTotal = document.querySelector('#productsTotal');

class Cart {
  constructor() {
    this.cartData = JSON.parse(localStorage.getItem('cart'));
    this.orderData = JSON.parse(localStorage.getItem('order'));
  }

  // getCartData() {
  //   // 로컬스토리지에서 장바구니 데이터 읽어오기
  //   const data = JSON.parse(localStorage.getItem('cart'));
  //   this.cartData = data;
  // }

  // getOrderData() {
  //   const data = JSON.parse(localStorage.getItem('order'));
  //   this.orderData = data;
  // }

  printCartData() {
    const node = this.cartData.reduce((acc, product) => {
      const isChecked = this.orderData['selectedIds'].includes(product.shortId);
      return (acc += `
        <div class="cart-item">
        <input type="checkbox" ${isChecked ? 'checked' : ''} 
        id="checkbox-${product.shortId}" class="check-box" />
        <img
          src=${product.imageURL}
          alt=${product.name}
        />
        <div class="content">
          <div class="content-title">${product.name}</div>
          <div class="quantity">
            <button class="button is-rounded" id="minus-${product.shortId}" 
            ${isChecked ? '' : 'disabled'}>-</button>
            <input type="number" min="1" max="99" value="1" 
            id="quantityInput-${product.shortId}" 
            ${isChecked ? '' : 'disabled'} />
            <button class="button is-rounded" id="plus-${product.shortId}" 
            ${isChecked ? '' : 'disabled'}>+</button>
          </div>
        </div>
        <div class="calculation">
          <p id="price-${product.shortId}">${product.price}</p>
          <p>X</p>
          <p id="quantity-${product.shortId}">${product.quantity}</p>
          <p>=</p>
          <p id="total-${product.shortId}">${
        product.price * product.quantity
      }</p>
        </div>
        <button class="button" id="delete-${product.shortId}">삭제</button>
      </div>`);
    }, '');
    $cartContainer.insertAdjacentHTML('beforeend', node);
  }

  printOrderSummary() {
    $productsCount.innerHTML = this.orderData.productsCount;
    $productsPrice.innerHTML = this.orderData.productsTotal;
    $productsTotal.innerHTML = this.orderData.productsTotal + 3000;
  }

  handleCheckProduct(e) {
    const id = e.target.id.split('-')[1];
    if (e.target.checked) {
      this.orderData['selectedIds'].push(id);
      this.orderData.productsCount += 1;
      this.toggleQuantityInput(id, false);
    } else {
      this.orderData['selectedIds'] = this.orderData['selectedIds'].filter(
        (productId) => productId !== id,
      );
      this.orderData.productsCount = this.orderData['selectedIds'].length;
      this.toggleQuantityInput(id, true);
    }
    this.modifyTotalPriceById();
    this.printOrderSummary();
  }

  toggleQuantityInput(id, boolean) {
    const minus = document.getElementById(`minus-${id}`);
    const plus = document.getElementById(`plus-${id}`);
    const quantityInput = document.getElementById(`quantityInput-${id}`);
    minus.disabled = boolean;
    plus.disabled = boolean;
    quantityInput.disabled = boolean;
  }

  modifyTotalPriceById() {
    let totalPrice = 0;
    this.orderData['selectedIds'].forEach((id) => {
      for (let product of this.cartData) {
        if (product.shortId === id) {
          totalPrice += product.price * product.quantity;
        }
      }
    });
    this.orderData['productsTotal'] = totalPrice;
    localStorage.setItem('order', JSON.stringify(this.orderData));
  }
}

const cart = new Cart();
cart.printCartData();
cart.printOrderSummary();

const checkbox = document.querySelectorAll('.check-box');
checkbox.forEach((el) => {
  el.addEventListener('change', cart.handleCheckProduct.bind(cart));
});
