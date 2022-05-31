import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

const $productList = document.querySelector('#productList');

getProducts();

function getUrlQuries() {
  // 쿼리 URL을 쓰기 쉽게 변환하는 함수
  // 이 함수는 쿼리 파라미터가 하나만 있다고 가정한다. 복수의 쿼리가 있다면 &를 기준으로 split이 들어가야됨
  // {category: 'CmckSTVPo9BeWHfY1KzZQ'}
  const queryString = window.location.search.replace('?', '');
  const [key, value] = queryString.split('=');
  return {
    [key]: value,
  };
}

function printProducts(products) {
  // 모든 상품을 Template에 맞춰서 String으로 저장
  const node = products.reduce(
    (acc, product) =>
      (acc += `
    <div class="list-box">
    <a href="/products/detail/${product.shortId}">
      <img
        src=${product.imageURL}
        alt=${product.name}
      />
      <div class="list-text">
        <h2>${product.name}</h2>
        <p>${product.shortDescription}</p>
        <span>${addCommas(product.price)}원</span>
      </div>
    </a>
  </div>`),
    '',
  );

  // 조회된 상품이 있다면 HTML에 주입
  if (products.length) {
    $productList.insertAdjacentHTML('afterbegin', node);
  } else {
    $productList.innerHTML = '<div>조회된 상품이 없습니다.</div>';
  }
}

async function getProducts() {
  try {
    const queryParams = getUrlQuries();
    const products = await Api.get(
      `/api`,
      `products?category=${queryParams['category']}`,
    );
    printProducts(products);
  } catch (err) {
    console.error(err);
  }
}
