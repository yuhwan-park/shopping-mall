import * as Api from '/api.js';

// 역할에 따른 분류
insertNavBar();
async function insertNavBar() {
  const app = document.getElementById('app');
  const token = localStorage.getItem('token') || document.cookie;
  if (token.indexOf('token') !== -1) {
    localStorage.setItem('token', token.split('=')[1]);
  }
  const { result } = await Api.post('/api/admin');
  app.insertAdjacentHTML(
    'afterbegin',
    `
  <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container mt-3">
        <div class="navbar-container">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <img src="/static/images/elice-rabbit.png" width="30" height="30" />
              <span class="has-text-link">쇼핑-22팀</span>
            </a>
          </div>
  
          <div class="navbar-end breadcrumb my-auto" aria-label="breadcrumbs">
            <div class="search-container">
              <form class="form" id="searchForm">
                <div class="field">
                  <label class="label a11y" for="searchInput">검색어</label>
                  <div class="control">
                    <input class="input" id="searchInput" type="search" placeholder="검색어를 입력해주세요">
                  </div>
                </div>
              </form>
            </div>
            <ul id="navbar">
              ${
                !token
                  ? `<li><a href="/login">로그인</a></li>
                    <li><a href="/register">회원가입</a></li>`
                  : result === 'basic-user'
                  ? `<li><a href="/account">계정관리</a></li>
                    <li id="signOut"><a href="#">로그아웃</a></li>`
                  : `<li><a href="/admin">관리자 페이지</a></li>
                    <li><a href="/account">계정관리</a></li>
                    <li id="signOut"><a href="#">로그아웃</a></li>`
              }
              <li>
                <a href="/cart" aria-current="page">
                  <span class="icon">
                    <i class="fas fa-cart-shopping"></i>
                  </span>
                  <span>카트</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
  );

  if (token) {
    const $signOut = document.querySelector('#signOut');
    $signOut.addEventListener('click', () => {
      localStorage.removeItem('token');
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.reload();
    });
  }

  addAllEvents();
}
// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  const $searchForm = document.querySelector('#searchForm');
  $searchForm.addEventListener('submit', handleSearch);
}

function handleSearch(e) {
  e.preventDefault();
  const $searchInput = document.querySelector('#searchInput');
  let result = $searchInput.value;
  window.location.href = `/product/search?result=${result}`;
}
