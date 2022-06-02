import * as Api from '/api.js';

const app = document.getElementById('app');
const token = localStorage.getItem('token');

// 역할에 따른 분류
insertNavBar();
async function insertNavBar() {
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
}
