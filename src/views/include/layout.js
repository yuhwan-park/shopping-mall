document.body.insertAdjacentHTML(
  'afterbegin',
  `
    <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container mt-3">
      <div class="navbar-container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="/assets/images/elice-rabbit.png" width="30" height="30" />
            <span class="has-text-link">쇼핑-22팀</span>
          </a>
        </div>

        <div class="navbar-end breadcrumb my-auto" aria-label="breadcrumbs">
          <ul id="navbar">
            <li><a href="/login">로그인</a></li>
            <li><a href="/register">회원가입</a></li>
            <li>
              <a href="#cart" aria-current="page">
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
  `
)