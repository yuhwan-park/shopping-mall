const $buttonContainer = document.querySelector('#buttonContainer');

$buttonContainer.addEventListener('click', (event) => {
  if (event.target.id === 'orderDetailButton') {
    window.location.href = '/account/orders';
  } else if (event.target.id === 'shoppingButton') {
    window.location.href = '/';
  }
});
