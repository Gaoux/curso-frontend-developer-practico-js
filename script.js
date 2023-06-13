const menuEmail = document.querySelector('.navbar-email');
const burgerMenu = document.querySelector('.menu');
const cartIcon = document.querySelector('.navbar-shopping-cart');
const cardsContainer = document.querySelector('.cards-container');
const orderContent = document.querySelector('.my-order-content');
const shoppingCartNumber = document.querySelector(
  '.navbar-shopping-cart__number'
);
//Deploys
const desktopMenu = document.querySelector('.desktop-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const myOrder = document.querySelector('.product-detail');
//Media Query
const mediaQuery = window.matchMedia('(min-width: 640px)');

//Click event listener to toggle visibility of menus
menuEmail.addEventListener('click', toggleDesktopMenu);
burgerMenu.addEventListener('click', toggleMobileMenu);
cartIcon.addEventListener('click', toggleCartAside);

//Listener to check mediaQuery
menuDisplay(mediaQuery); //Initial check
mediaQuery.addListener(menuDisplay); // Attach listener function on state changes

//Product DB List
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

productList.push({
  name: 'Botella',
  price: 15.99,
  image:
    'https://cdn.shopify.com/s/files/1/1821/3729/products/DG4_1200x1200_crop_center.jpg?v=1680936553ttps://w0.peakpx.com/wallpaper/192/766/HD-wallpaper-new-elden-ring-malenia.jpg',
});

productList.push({
  name: 'New Balance 550 - Green',
  price: 100.0,
  image:
    'https://media.revistagq.com/photos/619389b5fc5992de454ecb76/1:1/w_1079,h_1079,c_limit/245641983_888969852012096_2359717687648261478_n.jpg',
});

renderProducts(productList);

//Click to product cart icon
let cartList = [];

let productInfoCart = document.querySelectorAll('.product-info figure');
productInfoCart = Array.from(productInfoCart);
productInfoCart.forEach((e) => {
  e.addEventListener('click', changeCartList);
});

//Order content
renderOrderContent(cartList);
const orderTotal = orderContent.querySelector('.order p:nth-of-type(2)');
const orderProducts = document.querySelector('.order-products-container');
let closeIconOrders = document.querySelectorAll('.shopping-cart .close-icon');
closeIconOrders = Array.from(closeIconOrders);
closeIconOrders.forEach((e) => {
  e.addEventListener('click', function (e) {
    let ix = e.target.getAttribute('index');
    removeProductOrder(cartList[ix], ix);
  });
});

//Hide menus on outside clicks
document.onclick = function (e) {
  if (!mobileMenu.contains(e.target) && !burgerMenu.contains(e.target))
    mobileMenu.classList.add('inactive');

  if (!desktopMenu.contains(e.target) && !menuEmail.contains(e.target))
    desktopMenu.classList.add('inactive');

  if (
    !myOrder.contains(e.target) &&
    !cartIcon.contains(e.target) &&
    !e.target.classList.contains('close-icon')
  )
    myOrder.classList.add('inactive');
};

//Toggle menus on click
function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle('inactive');
}

function toggleCartAside() {
  myOrder.classList.toggle('inactive');
}
//Render products on page
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
//Change cartlist on product cart icon click
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
    removeProductOrder(product, cartList.indexOf(product));
  }
}
//My order
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
    closeIcon.setAttribute('index', arr.indexOf(product));

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

  shoppingCartNumber.innerText = arr.length;
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
  closeIcon.setAttribute('index', index);

  shoppingProduct.append(
    shoppingProductFig,
    productName,
    productPrice,
    closeIcon
  );
  orderProducts.append(shoppingProduct);

  let curr = parseFloat(orderTotal.innerText.replace('$', ''));
  orderTotal.innerText = '$' + (curr + product.price).toFixed(2);

  closeIconOrders.push(closeIcon);
  closeIconOrders[closeIconOrders.length - 1].addEventListener(
    'click',
    function (e) {
      removeProductOrder(product, e.target.getAttribute('index'));
    }
  );

  shoppingCartNumber.innerText = cartList.length;
}

function removeProductOrder(product, index) {
  let orderProductList = document.querySelectorAll('.shopping-cart');
  orderProductList = Array.from(orderProductList);
  let productToRemove;
  let i = 0;
  for (p of orderProductList) {
    // console.log(p);
    i++;
    if (index == p.getAttribute('index')) {
      productToRemove = p;
      break;
    }
  }
  orderProducts.removeChild(productToRemove);
  let curr = parseFloat(orderTotal.innerText.replace('$', ''));
  // console.log(curr + ' - ' + productPrice);
  orderTotal.innerText = '$' + (curr - product.price).toFixed(2);

  //Updates index for the other product after the removed one
  for (i; i < orderProductList.length; i++) {
    orderProductList[i].setAttribute('index', i - 1);
    orderProductList[i]
      .querySelector('.close-icon')
      .setAttribute('index', i - 1);
  }

  let availableProductsList = document.querySelectorAll(
    '.product-info figure img'
  );
  availableProductsList = Array.from(availableProductsList);
  for (p of availableProductsList) {
    let ix = p.getAttribute('index');
    if (productList[ix] === product) {
      p.setAttribute('src', './icons/bt_add_to_cart.svg');
    }
  }
  cartList.splice(index, 1);
  shoppingCartNumber.innerText = cartList.length;
}

//Media querie to display menu
function menuDisplay(mediaQuery) {
  if (mediaQuery.matches) mobileMenu.classList.add('inactive');
  else desktopMenu.classList.add('inactive');
}
