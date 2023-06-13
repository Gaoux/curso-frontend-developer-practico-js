const menuEmail = document.querySelector('.navbar-email');
const burgerMenu = document.querySelector('.menu');
const cartIcon = document.querySelector('.navbar-shopping-cart');
const cardsContainer = document.querySelector('.cards-container');
const orderContent = document.querySelector('.my-order-content');
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

const productList = [];
productList.push({
  name: 'Spiderman vs Spot',
  price: 80.5,
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

function renderProducts(arr) {
  for (product of arr) {
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

    productPrice.innerText = '$' + product.price.toFixed(2);
    productName.innerText = product.name;
    productInfoDiv.append(productPrice, productName);

    const productInfoFigure = document.createElement('figure');
    const productCartIcon = document.createElement('img');
    productCartIcon.setAttribute('src', './icons/bt_add_to_cart.svg');
    productInfoFigure.appendChild(productCartIcon);
    productCartIcon.setAttribute('index', arr.indexOf(product));

    productInfo.append(productInfoDiv, productInfoFigure);
    productCard.append(productImg, productInfo);

    cardsContainer.appendChild(productCard);
    //Differences between append and appendChild on:
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/append
  }
}

renderProducts(productList);

//Click to product cart icon
let cartList = [];

let productInfoCart = document.querySelectorAll('.product-info figure');
productInfoCart = Array.from(productInfoCart);
productInfoCart.forEach((e) => {
  e.addEventListener('click', changeCartList);
});

function changeCartList() {
  let iconImage = this.querySelector('.product-info figure img');
  imageSrc = iconImage.getAttribute('src');

  let index = this.querySelector('.product-info figure img').getAttribute(
    'index'
  );
  let product = productList[index];
  if (imageSrc !== './icons/bt_added_to_cart.svg') {
    iconImage.setAttribute('src', './icons/bt_added_to_cart.svg');
    cartList.push(product);
    addProductOrder(product, cartList.length - 1);
  } else {
    iconImage.setAttribute('src', './icons/bt_add_to_cart.svg');
    removeProductOrder(product.price, cartList.indexOf(product));
    cartList.splice(cartList.indexOf(product), 1);
  }
}
renderOrderContent(cartList);
const orderTotal = orderContent.querySelector('.order p:nth-of-type(2)');
const orderProducts = document.querySelector('.order-products-container');

function renderOrderContent(arr) {
  let sum = 0.0;
  for (product of arr) {
    const shoppingProduct = document.createElement('div');
    shoppingProduct.classList.add('shopping-cart');
    shoppingProduct.setAttribute('index', arr.indexOf(product));

    const shoppingProductFig = document.createElement('figure');
    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.image);

    const productName = document.createElement('p');
    const productPrice = document.createElement('p');

    productName.innerText = product.name;
    productPrice.innerText = '$' + product.price.toFixed(2);
    shoppingProductFig.append(productName, productPrice);

    const closeIcon = document.createElement('img');
    closeIcon.classList.add('close-icon');
    closeIcon.setAttribute('src', './icons/icon_close.png');

    shoppingProduct.append(
      shoppingProductFig,
      productName,
      productPrice,
      closeIcon
    );
    sum += product.price;
    orderProducts.append(shoppingProduct);
  }
  const order = document.createElement('div');
  order.classList.add('order');
  const totalP = document.createElement('p');
  const totalSpan = document.createElement('span');
  totalSpan.innerText = 'Total';
  totalP.append(totalSpan);

  const totalN = document.createElement('p');
  totalN.innerText = sum;

  order.append(totalP, totalN);

  const checkoutBtn = document.createElement('button');
  checkoutBtn.classList.add('primary-button');
  checkoutBtn.innerText = 'Checkout';

  orderContent.append(order, checkoutBtn);
}

function addProductOrder(product, index) {
  const shoppingProduct = document.createElement('div');
  shoppingProduct.classList.add('shopping-cart');
  shoppingProduct.setAttribute('index', index);

  const shoppingProductFig = document.createElement('figure');
  const productImg = document.createElement('img');
  productImg.setAttribute('src', product.image);
  shoppingProductFig.append(productImg);

  const productName = document.createElement('p');
  const productPrice = document.createElement('p');

  productName.innerText = product.name;
  productPrice.innerText = '$' + product.price;
  shoppingProduct.append(productName, productPrice);

  const closeIcon = document.createElement('img');
  closeIcon.classList.add('close-icon');
  closeIcon.setAttribute('src', './icons/icon_close.png');

  shoppingProduct.append(
    shoppingProductFig,
    productName,
    productPrice,
    closeIcon
  );
  orderProducts.append(shoppingProduct);

  let curr = parseFloat(orderTotal.innerText.replace('$', ''));
  orderTotal.innerText = '$' + (curr + product.price).toFixed(2);
}

function removeProductOrder(productPrice, index) {
  let orderProductList = document.querySelectorAll('.shopping-cart');
  orderProductList = Array.from(orderProductList);
  let productToRemove;
  let i = 0;
  for (p of orderProductList) {
    i++;
    if (index == p.getAttribute('index')) {
      productToRemove = p;
      break;
    }
  }
  orderProducts.removeChild(productToRemove);
  let curr = parseFloat(orderTotal.innerText.replace('$', ''));
  console.log(curr + ' - ' + productPrice);
  orderTotal.innerText = '$' + (curr - productPrice).toFixed(2);

  //Updates index for the other product after the removed one
  for (i; i < orderProductList.length; i++) {
    orderProductList[i].setAttribute('index', i - 1);
  }
}

//Media querie to display menu
function menuDisplay(mediaQuery) {
  if (mediaQuery.matches) mobileMenu.classList.add('inactive');
  else desktopMenu.classList.add('inactive');
}
