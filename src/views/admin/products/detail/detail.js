import * as Api from '/api.js';

const $img = document.querySelector('#productImg');
const $title = document.querySelector('#productTitle');
const $price = document.querySelector('#productPrice');
const $categories = document.querySelector('#productCategories');
const $brand = document.querySelector('#productBrand');
const $shortDescription = document.querySelector('#shortDescription');
const $detailDescription = document.querySelector('#detailDescription');
const $editButton = document.querySelector('#editButton');
const $deleteButton = document.querySelector('#deleteButton');

const elements = [
  $title,
  $price,
  $categories,
  $brand,
  $shortDescription,
  $detailDescription,
];

const path = window.location.pathname.split('/');
const id = path[path.length - 2];

printDetail();

$editButton.addEventListener('click', editDetail);
$deleteButton.addEventListener('click', deleteProduct);

async function printDetail() {
  try {
    // 상품 상세를 불러와 input 에 주입
    const product = await Api.get('/api/admin/products', id);
    $title.value = product.name;
    $price.value = product.price;
    $categories.value = product.categoryId;
    $brand.value = product.brand;
    $shortDescription.value = product.shortDescription;
    $detailDescription.value = product.detailDescription;
    $img.src = product.imageURL;
  } catch (error) {
    console.error(error);
  }
}

async function editDetail(event) {
  if (event.target.innerText === '수정') {
    event.target.innerText = '수정완료';
    toggle(false);
  } else {
    const newProductData = {
      name: $title.value,
      brand: $brand.value,
      price: $price.value,
      category: $categories.value,
      shortDescription: $shortDescription.value,
      detailDescription: $detailDescription.value,
      imageURL: $img.src,
    };

    await Api.patch('/api/admin/products', id, newProductData);

    event.target.innerText = '수정';
    toggle(true);
  }
}

async function deleteProduct() {
  try {
    await Api.delete('/api/admin/products', id);
    window.location.href = '/admin/products';
  } catch (err) {
    console.error(err);
  }
}

function toggle(boolean) {
  elements.forEach((element) => {
    element.disabled = boolean;
  });
}
