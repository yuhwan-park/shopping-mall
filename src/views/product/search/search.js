import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

const $productList = document.querySelector('#productList');
const $searchWord = document.querySelector('#searchWord');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  getProducts();
  getUrlQuries();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.

function addAllEvents() {}

function getUrlQuries() {
  // 쿼리 URL을 쓰기 쉽게 변환하는 함수
  // 이 함수는 쿼리 파라미터가 하나만 있다고 가정한다. 복수의 쿼리가 있다면 &를 기준으로 split이 들어가야됨
  // {category: 'CmckSTVPo9BeWHfY1KzZQ'}
  const queryString = window.location.search.replace('?', '');
  const [key, value] = queryString.split('=');
  return {
    [key]: value,
  };
  console.log(key, value);
}

function getDecodeName() {
  const queryParams = getUrlQuries();
  const queryResult = queryParams['result'];
  const decodeName = decodeURI(decodeURIComponent(queryResult));
  return decodeName;
}

function highlightSearchWord(str, searchingValue) {
  const regExp = new RegExp(searchingValue, 'gi');
  let matchedStr = str.match(regExp);

  let highlightedStr = "<b class='search-highlight'>" + matchedStr + '</b>';
  return str.replace(regExp, highlightedStr);
}

function printProducts(products) {
  const result = getDecodeName();
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
        <h2>${highlightSearchWord(product.name, result)}</h2>
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
    $productList.innerHTML = '<div>검색과 일치하는 상품이 없습니다.</div>';
  }
}

async function getProducts() {
  try {
    const result = getDecodeName();
    $searchWord.innerHTML = result;
    const data = await Api.get(
      `/api/products/search`,
      `result?q=${result}&page=number&perPage=number`,
    );
    printProducts(data);
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}
