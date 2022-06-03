import * as Api from '/api.js';

const $categoryList = document.querySelector('#categoryList');

getCategories();

async function getCategories() {
  try {
    const categories = await Api.get('/api/admin/categories');

    const node = categories.reduce(
      (acc, category) =>
        (acc += `
      <a href="/admin/categories/${category.shortId}" class="list-link">
        <li class="list-item" id="listItem">
          <img
          class="re-product-image"
          src="${category.imageURL}"
          alt="category image"
          />
          <div class="re-product-info">
            <p class="re-product-title">${category.name}</p>
            <p class="re-product-price">${category.content}</p>
          </div>
        </li>
      </a>`),
      '',
    );

    $categoryList.insertAdjacentHTML('afterbegin', node);
  } catch (err) {
    console.error(err);
  }
}
