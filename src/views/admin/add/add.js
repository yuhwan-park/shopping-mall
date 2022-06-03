import * as Api from '/api.js';

const $productForm = document.querySelector('#registerProductForm');
const $title = document.querySelector('#titleInput');
const $categorySelectBox = document.querySelector('#categorySelectBox');
const $brand = document.querySelector('#manufacturerInput');
const $shortDescription = document.querySelector('#shortDescriptionInput');
const $detailDescription = document.querySelector('#detailDescriptionInput');
const $price = document.querySelector('#priceInput');
const $imageInput = document.querySelector('#imageInput');
const $fileNameSpan = document.querySelector('#fileNameSpan');

function applyFileName(event) {
  $fileNameSpan.innerHTML = event.target.files[0].name;
}

async function getCategories() {
  const categories = await Api.get('/api/admin', 'categories');
  const options = categories.reduce(
    (acc, category) =>
      (acc += `
  <option
  value="${category.name}"
  class="re-notification">
  ${category.name}
  </option>`),
    '',
  );
  $categorySelectBox.insertAdjacentHTML('beforeend', options);
}

async function addProduct(e) {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('img', e.target.img.files[0]);
    const result = await Api.postImage(formData);

    const newProductData = getData(result.url);
    await Api.post('/api/admin/products', newProductData);
    alert('상품이 성공적으로 추가되었습니다!');
    location.reload();
  } catch (err) {
    if (err.message === 'Invalid Value') {
      alert('채워지지 않은 항목이 있습니다.');
    } else {
      console.error(err);
    }
  }
}

function getData(imageURL) {
  const newProductData = {
    name: $title.value,
    brand: $brand.value,
    shortDescription: $shortDescription.value,
    detailDescription: $detailDescription.value,
    price: $price.value,
    category: $categorySelectBox.value,
    imageURL,
  };
  // 비워져있는 칸이 있는지 검증
  const isValid = Object.values(newProductData).filter((value) => !value);

  if (isValid.length) {
    throw new Error('Invalid Value');
  } else {
    return newProductData;
  }
}

getCategories();

$productForm.addEventListener('submit', addProduct);
$imageInput.addEventListener('change', applyFileName);
