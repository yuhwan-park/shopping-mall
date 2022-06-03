import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

const $productList = document.querySelector('#productList');
const $perPageSelect = document.querySelector('#perPage-select');
const $totalPage = document.querySelector('#totalPage');

getProductsPosts();

function getUrlQuries() {
  // 쿼리 URL을 쓰기 쉽게 변환하는 함수
  // 이 함수는 쿼리 파라미터가 하나만 있다고 가정한다. 복수의 쿼리가 있다면 &를 기준으로 split이 들어가야됨
  // {category: 'CmckSTVPo9BeWHfY1KzZQ'}
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

function printPosts(products) {
  // 모든 상품을 Template에 맞춰서 String으로 저장
  const node = products.reduce(
    (acc, product) =>
      (acc += `
    <div class="list-box box">
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
    $productList.innerHTML = node;
  } else {
    $productList.innerHTML = '<div>조회된 상품이 없습니다.</div>';
  }
}

async function getProductsPosts(currentPage = 1) {
  const CountPerPage =
    $perPageSelect.options[$perPageSelect.selectedIndex].value;
  try {
    const queryParams = getUrlQuries();
    const { totalPage, posts } = await Api.get(
      `/api`,
      `products?category=${queryParams['category']}&currentPage=${currentPage}&CountPerPage=${CountPerPage}`,
    );
    setTotalPage(Number(totalPage));
    printPosts(posts);
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}

function setTotalPage(totalPage) {
  let node = '';
  for (let i = 1; i <= totalPage; i++) {
    const page = `
        <a href=# id="pageNavigation" class="page-navigation"> ${i} </a>
      `;
    node += page;
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
