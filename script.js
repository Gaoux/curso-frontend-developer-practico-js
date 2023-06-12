const menuEmail = document.querySelector('.navbar-email');
const burgerMenu = document.querySelector('.menu');
const cartIcon = document.querySelector('.navbar-shopping-cart');
const desktopMenu = document.querySelector('.desktop-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const myOrder = document.querySelector('.product-detail');
const mediaQuery = window.matchMedia('(min-width: 640px)');

menuEmail.addEventListener('click', toggleDesktopMenu);
burgerMenu.addEventListener('click', toggleMobileMenu);
cartIcon.addEventListener('click', toggleCartAside);

menuDisplay(mediaQuery); //Initial check
mediaQuery.addListener(menuDisplay); // Attach listener function on state changes

document.onclick = function (e) {
  let targetClass = e.target.getAttribute('class');
  if (targetClass !== 'mobile-menu' && targetClass !== 'menu')
    mobileMenu.classList.add('inactive');

  if (targetClass !== 'desktop-menu' && targetClass !== 'navbar-email')
    desktopMenu.classList.add('inactive');

  if (
    targetClass !== 'navbar-shopping-cart__icon' &&
    targetClass !== 'navbar-shopping-cart__number' &&
    targetClass !== '.product-detail'
  )
    myOrder.classList.add('inactive');
};

function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle('inactive');
}

function toggleCartAside() {
  myOrder.classList.toggle('inactive');
}

//Media querie to display menu
function menuDisplay(mediaQuery) {
  if (mediaQuery.matches) mobileMenu.classList.add('inactive');
  else desktopMenu.classList.add('inactive');
}
