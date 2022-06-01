import * as Api from '/api.js';

const $categoryForm = document.querySelector('#registerCategoryForm');
const $descriptionInput = document.querySelector('#descriptionInput');
const $title = document.querySelector('#titleInput');
const $imageInput = document.querySelector('#imageInput');
const $fileNameSpan = document.querySelector('#fileNameSpan');

function applyFileName(event) {
  $fileNameSpan.innerHTML = event.target.files[0].name;
}

async function addProduct(e) {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('img', e.target.img.files[0]);
    const result = await Api.postImage(formData);

    const newCategoryData = getData(result.url);
    await Api.post('/api/admin/categories/create', newCategoryData);
    alert('카테고리가 성공적으로 추가되었습니다!');
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
  const newCategoryData = {
    name: $title.value,
    content: $descriptionInput.value,
    imageURL,
  };
  // 비워져있는 칸이 있는지 검증
  const isValid = Object.values(newCategoryData).filter((value) => !value);

  if (isValid.length) {
    throw new Error('Invalid Value');
  } else {
    return newCategoryData;
  }
}

$categoryForm.addEventListener('submit', addProduct);
$imageInput.addEventListener('change', applyFileName);
