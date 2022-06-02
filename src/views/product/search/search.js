import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

const $productList = document.querySelector('#productList');
const $searchWord = document.querySelector('#searchWord');
const $perPageSelect = document.querySelector('#perPage-select');
const $totalPage = document.querySelector('#totalPage');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  getProductsPosts();
  getUrlQuries();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.

function addAllEvents() {}

function getUrlQuries() {
  const queryString = window.location.search.replace('?', '');
  const queryArray = queryString.split('&').map((query) => {
    const [key, value] = query.split('=');
    return {
      [key]: value,
    };
  });
  const queryObject = queryArray.reduce((acc, val) => {
    return { ...acc, ...val };
  }, {});
  return queryObject;
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

function printPosts(products) {
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
    $productList.innerHTML = node;
  } else {
    $productList.innerHTML = '<div>검색과 일치하는 상품이 없습니다.</div>';
  }
}

async function getProductsPosts(currentPage = 1) {
  const CountPerPage =
    $perPageSelect.options[$perPageSelect.selectedIndex].value;
  try {
    const result = getDecodeName();
    $searchWord.innerHTML = result;
    const { totalPage, posts } = await Api.get(
      `/api/products/search`,
      `result?q=${result}&currentPage=${currentPage}&CountPerPage=${CountPerPage}`,
    );
    setTotalPage(Number(totalPage));
    printPosts(posts);
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}

function setTotalPage(totalPage) {
  const node = [];
  for (let i = 1; i <= totalPage; i++) {
    const page = `
        <a href=# id="pageNavigation" class=""> ${i} </a>
      `;
    node.push(page);
  }

  $totalPage.innerHTML = node;
}

function getPostsByPage(event) {
  event.preventDefault();
  try {
    const page = event.target.textContent.trim();
    if (!page) {
      throw new Error();
    }
    getProductsPosts(page);
  } catch (error) {
    console.log(error);
  }
}

$totalPage.addEventListener('click', (event) => {
  if (event.target.id === 'pageNavigation') {
    getPostsByPage(event);
  }
});
$perPageSelect.addEventListener('change', () => {
  getProductsPosts();
});
