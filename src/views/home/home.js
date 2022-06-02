import * as Api from '/api.js';

let curPos = 0;
let postion = 0;
let imageWidth = 1000;
let slideIndex = 0;
let timeOut;

const $prevButton = document.querySelector('.prev');
const $nextButton = document.querySelector('.next');

const $slideShowContainer = document.querySelector('#slideShowContainer');

// 자동 슬라이드 함수
function showSlides() {
  const $slideWrapper = document.querySelector('.home-slideshow');
  const $slides = document.querySelectorAll('.slide');
  const totalSlides = $slides.length;
  let sliderWidth = $slideWrapper.clientWidth;
  $slideShowContainer.style.width = sliderWidth * totalSlides + 'px';
  for (let i = 0; i < $slides.length; i++) {
    $slideShowContainer.style.transform = `translateX(-${
      sliderWidth * slideIndex
    }px)`;
  }
  slideIndex++;
  next();
  if (slideIndex === totalSlides) {
    slideIndex = 0;
    prev();
  }
  timeOut = setTimeout(showSlides, 4000);
}

// 수동 슬라이드 (버튼)
function prev() {
  if (curPos > 0) {
    $nextButton.removeAttribute('disabled');
    postion += imageWidth;
    $slideShowContainer.style.transform = `translateX(${postion}px)`;
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
    $slideShowContainer.style.transform = `translateX(${postion}px)`;
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
  $slideShowContainer.addEventListener('mouseover', () => {
    clearTimeout(timeOut);
  });
  $slideShowContainer.addEventListener('mouseleave', () => {
    timeOut = setTimeout(showSlides, 4000);
  });
}

getCategories();
buttonSlide();

async function getCategories() {
  const categories = await Api.get('/api/admin', 'categories');
  const slides = categories.reduce(
    (acc, category) =>
      (acc += `
    <div class="slide">
      <div class="slide-textbox">
        <span>${category.name}</span>
        <p>${category.content}</p>
      </div>
      <a href="/product/list?category=${category.shortId}">
        <img
          src=${category.imageURL}
          alt=${category.name}
        />
      </a>
    </div>
  `),
    '',
  );
  $slideShowContainer.insertAdjacentHTML('afterbegin', slides);
  showSlides();
}
