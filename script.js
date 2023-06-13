const menuEmail = document.querySelector('.navbar-email');
const burgerMenu = document.querySelector('.menu');
const cartIcon = document.querySelector('.navbar-shopping-cart');
const cardsContainer = document.querySelector('.cards-container');
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

const productList = [];
productList.push({
  name: 'Spiderman vs Spot',
  price: 80.0,
  image:
    'https://media.wired.com/photos/64790f5a0b67c709cbcaa9b5/master/w_2560%2Cc_limit/Spider-Man-Across-The-Spider-Verse-Monitor-Culture.jpg',
});

productList.push({
  name: 'Spiderman 2099',
  price: 109.99,
  image:
    'https://cdn.vox-cdn.com/thumbor/VDA2iBI8Wjt1eXhoRfR0lBkx1Pc=/0x0:1914x794/1200x800/filters:focal(834x121:1140x427)/cdn.vox-cdn.com/uploads/chorus_image/image/72147618/image_2023_04_04_145646954.0.png',
});

productList.push({
  name: 'Malenia',
  price: 149.99,
  image:
    'https://w0.peakpx.com/wallpaper/192/766/HD-wallpaper-new-elden-ring-malenia.jpg',
});

function renderProduct(list) {
  for (product of list) {
    console.log();
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.image);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const productInfoDiv = document.createElement('div');
    const productPrice = document.createElement('p');
    const productName = document.createElement('p');

    productPrice.innerText = '$' + product.price;
    productName.innerText = product.name;
    productInfoDiv.append(productPrice, productName);

    const productInfoFigure = document.createElement('figure');
    const productCartIcon = document.createElement('img');
    productCartIcon.setAttribute('src', './icons/bt_add_to_cart.svg');
    productInfoFigure.appendChild(productCartIcon);

    productInfo.append(productInfoDiv, productInfoFigure);
    productCard.append(productImg, productInfo);

    cardsContainer.appendChild(productCard);
    //Differences between append and appendChild on:
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/append
  }
}

renderProduct(productList);

//Change add to cart icon / Start page
let productInfoCart = document.querySelectorAll('.product-info figure');
productInfoCart = Array.from(productInfoCart);
productInfoCart.forEach((e) => {
  e.addEventListener('click', changeShoppingStatus);
});
function changeShoppingStatus() {
  let iconImage = this.querySelector('.product-info figure img');
  imageSrc = iconImage.getAttribute('src');
  if (imageSrc !== './icons/bt_added_to_cart.svg')
    iconImage.setAttribute('src', './icons/bt_added_to_cart.svg');
  else iconImage.setAttribute('src', './icons/bt_add_to_cart.svg');
}
