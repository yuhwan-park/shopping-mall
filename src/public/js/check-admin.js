import * as Api from '/api.js';

(async function checkAdmin() {
  try {
    await Api.get('/api/admin');
  } catch (err) {
    if (err.message === '관리자만 사용할 수 있는 서비스입니다.') {
      window.location.href = '/';
    }
  }
})();
