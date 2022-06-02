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

getProductList();

function printNewProductList(products) {
  const $homeProductList = document.querySelector('.home-product-list-new');
  const dataProduct = orders.reduce((acc, product) => {
    return (acc += `<div class="home-product-list-item">
    <a href="">
      <div class="image">
        <div class="image-thumbnail">
          <img
            src="https://cdn.pixabay.com/photo/2014/08/26/21/48/shirts-428600_960_720.jpg"
          />
        </div>
      </div>
      <div class="description">
        <p class="description-name">상품이름</p>
        <p class="description-price">가격</p>
      </div>
    </a>
  </div>`);
  }, '');

  if (products.length) {
    const PRODUCTMAXLENGTH = 4;
    for (let i = 0; i < PRODUCTMAXLENGTH; i++) {
      $homeProductList
        .querySelector('tbody')
        .insertAdjacentHTML('afterbegin', dataProduct);
    }
  }
}

async function getProductList() {
  const data = await Api.get('/api/products/list/new');
  console.log(data);
}
