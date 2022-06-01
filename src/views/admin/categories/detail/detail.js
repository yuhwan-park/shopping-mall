import * as Api from '/api.js';

const $image = document.querySelector('#productImg');
const $title = document.querySelector('#categoryTitle');
const $content = document.querySelector('#content');
const $editButton = document.querySelector('#editButton');
const $deleteAcceptButton = document.querySelector('#deleteAcceptButton');
const $imageInput = document.querySelector('#imageInput');
const $fileForm = document.querySelector('#fileForm');
const $fileNameSpan = document.querySelector('#fileNameSpan');

const elements = [$title, $content];

const path = window.location.pathname.split('/');
const id = path[path.length - 2];

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('img', event.target.img.files[0]);

  const result = await Api.postImage(formData);

  $image.src = result.url;

  await patchData();
};

async function printDetail() {
  try {
    // 상품 상세를 불러와 input 에 주입
    const category = await Api.get('/api/admin/categories', id);
    $title.value = category.name;
    $content.value = category.content;
    $image.src = category.imageURL;
  } catch (error) {
    console.error(error);
  }
}

async function patchData() {
  const newCategoryData = {
    name: $title.value,
    content: $content.value,
    imageURL: $image.src,
  };

  await Api.patch(`/api/admin/categories/${id}`, 'update', newCategoryData);
}

async function editDetail(event) {
  if (event.target.innerText === '수정') {
    event.target.innerText = '수정완료';
    toggle(false);
  } else {
    await patchData();

    event.target.innerText = '수정';
    toggle(true);
  }
}

async function deleteProduct() {
  try {
    await Api.delete(`/api/admin/categories/${id}`, 'delete');
    window.location.href = '/admin/categories';
  } catch (err) {
    console.error(err);
  }
}

function toggle(boolean) {
  elements.forEach((element) => {
    element.disabled = boolean;
  });
}

function applyFileName(event) {
  $fileNameSpan.innerHTML = event.target.files[0].name;
}

printDetail();

$fileForm.addEventListener('submit', handleSubmit);
$imageInput.addEventListener('change', applyFileName);
$editButton.addEventListener('click', editDetail);
$deleteAcceptButton.addEventListener('click', deleteProduct);
