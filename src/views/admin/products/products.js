import * as Api from '/api.js';

const $productList = document.querySelector('#productList');

getProducts();

async function getProducts() {
  try {
    let node = '';
    const products = await Api.get('/api/admin/products');

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      node += `
      <a href="/admin/products/${product.shortId}" class="list-link">
        <li class="list-item" id="listItem">
          <img
          class="re-product-image"
          src="${product.imageURL}"
          alt="product image"
          />
          <div class="re-product-info">
            <p class="re-product-title">${product.name}</p>
            <p class="re-product-price">상품 가격 : <span class="product-prict">${product.price}</span>원</p>
          </div>
        </li>
      </a>`;
    }

    if (node) {
      $productList.insertAdjacentHTML('afterbegin', node);
    } else {
      $productList.innerHTML = '<div>조회된 상품이 없습니다.</div>';
    }
  } catch (err) {
    console.error(err);
  }
}
