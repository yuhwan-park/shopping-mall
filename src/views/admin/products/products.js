const $listItem = document.querySelectorAll('#listItem');

for (let i = 0; i < $listItem.length; i++) {
  const item = $listItem[i];
  item.addEventListener('click', (e) => {
    window.location.href += 'id';
    // 원래라면 상품의 id를 파라미터로 쓰기위해
    // `admin/products/${item.id}` 로 해야하지만
    // db정보가 없기때문에 임시로 적용
  });
}
