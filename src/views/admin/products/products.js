import * as Api from '/api.js';

const $productList = document.querySelector('#productList');

window.onload = async () => {
  try {
    let node = '';
    const products = await Api.get('/api/admin/products');
    // 받아온 데이터를 템플릿에 맞게 변수에 저장
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      node += `
      <a href="/admin/products/${product.shortId}" class="list-link">
        <li class="list-item" id="listItem">
          <img
          class="product-image"
          src="${product.imageURL}"
          alt="product image"
          />
          <div class="product-info">
            <p class="product-title">${product.name}</p>
            <p>
              상품 재고 수 : <span class="product-quantity">${product.inventory}</span>개
            </p>
            <p>상품 가격 : <span class="product-prict">${product.price}</span>원</p>
          </div>
        </li>
      </a>`;
    }
    // ul 태그에 추가
    if (node) {
      $productList.innerHTML = node;
    } else {
      $productList.innerHTML = `<p>조회된 상품이 없습니다.</p>`;
    }
  } catch (e) {
    console.error(e);
  }
};
