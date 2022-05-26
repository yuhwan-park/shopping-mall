import * as Api from '/api.js';

const $img = document.querySelector('#productImg');
const $title = document.querySelector('#productTitle');
const $price = document.querySelector('#productPrice');
const $categories = document.querySelector('#productCategories');
const $brand = document.querySelector('#productBrand');
const $shortDescription = document.querySelector('#shortDescription');
const $detailDescription = document.querySelector('#detailDescription');
const $editButton = document.querySelector('#editButton');

const path = window.location.pathname.split('/');
const id = path[path.length - 2];

printDetail();

async function printDetail() {
  try {
    // 상품 상세를 불러와 input 에 주입
    const product = await Api.get('/api/admin/products', id);
    $title.value = product.name;
    $price.value = product.price;
    $categories.value = product.category;
    $brand.value = product.brand;
    $shortDescription.value = product.shortDescription;
    $detailDescription.value = product.detailDescription;
  } catch (error) {
    console.error(error);
  }
}

async function editDetail(event) {
  if (event.target.innerText === '수정') {
    event.target.innerText = '수정완료';
  } else {
    event.target.innerText = '수정';
  }
}

$editButton.addEventListener('click', (e) => {
  editDetail(e);
});
