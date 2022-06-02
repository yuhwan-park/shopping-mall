import * as Api from '/api.js';

let curPos = 0;
let postion = 0;
let imageWidth = 1000;
let slideIndex = 0;

const $prevButton = document.querySelector('.prev');
const $nextButton = document.querySelector('.next');

const $slideWrapper = document.querySelector('.home-slideshow');
const $slider = document.querySelector('.slideshow');
const $slides = document.querySelectorAll('.slide');

const totalSlides = $slides.length;
let sliderWidth = $slideWrapper.clientWidth;
$slider.style.width = sliderWidth * totalSlides + 'px';
test();
// 자동 슬라이드 함수
function showSlides() {
  for (let i = 0; i < $slides.length; i++) {
    // sliderWidth.style.left = -(sliderWidth * slideIndex) + 'px';

    $slider.style.transform = `translateX(-${sliderWidth * slideIndex}px)`;
  }
  slideIndex++;
  if (slideIndex === totalSlides) {
    slideIndex = 0;
  }
  setTimeout(showSlides, 4000);
}

// 수동 슬라이드 (버튼)
function prev() {
  if (curPos > 0) {
    $nextButton.removeAttribute('disabled');
    postion += imageWidth;
    $slider.style.transform = `translateX(${postion}px)`;
    curPos = curPos - 1;
  }
  if (curPos == 0) {
    $prevButton.setAttribute('disabled', 'true');
  }
}

function next() {
  if (curPos < 1) {
    $prevButton.removeAttribute('disabled');
    postion -= imageWidth;
    $slider.style.transform = `translateX(${postion}px)`;
    curPos = curPos + 1;
  }
  if (curPos == 1) {
    $nextButton.setAttribute('disabled', 'true');
  }
}

function buttonSlide() {
  $prevButton.setAttribute('disabled', 'true');
  $prevButton.addEventListener('click', prev);
  $nextButton.addEventListener('click', next);
}

buttonSlide();
showSlides();

function test() {
  console.log(document.cookie);
  const [_, token] = document.cookie.split('=');
  if (token) {
    localStorage.setItem('token', token);
  }
}

const $homeProductListNew = document.querySelector('.home-product-list-new');
const $homeProductListLikes = document.querySelector(
  '.home-product-list-likes',
);

getProductList($homeProductListNew, 'new');
getProductList($homeProductListLikes, 'likes');

function printProductList(ele, products) {
  const dataProduct = products.reduce((acc, product) => {
    return (acc += `<div class="home-product-list-item">
    <a href="/products/detail/${product.shortId}">
      <div class="image">
        <div class="image-thumbnail">
          <img
            src="${product.imageURL}"
          />
        </div>
      </div>
      <div class="description">
        <p class="description-name">${product.name}</p>
        <p class="description-price">${product.price}</p>
      </div>
    </a>
  </div>`);
  }, '');

  if (products.length) {
    ele.insertAdjacentHTML('afterbegin', dataProduct);
  }
}

async function getProductList(ele, getApi) {
  try {
    const data = await Api.get(`/api/products/list/${getApi}`);
    const result = data.splice(0, 4);
    printProductList(ele, result);
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}
