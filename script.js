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
const myOrder = document.querySelector('.order-detail');
const productDetailContainer = document.querySelector('.product-detail');
const productDetailContainerClose = document.querySelector(
  '.product-detail-close'
);
//Media Query
const mediaQuery = window.matchMedia('(min-width: 640px)');

//Click event listener to toggle visibility of menus
menuEmail.addEventListener('click', toggleDesktopMenu);
burgerMenu.addEventListener('click', toggleMobileMenu);
cartIcon.addEventListener('click', toggleCartAside);
productDetailContainerClose.addEventListener(
  'click',
  hideProductDetailContainer
);

//Listener to check mediaQuery
menuDisplay(mediaQuery); //Initial check
mediaQuery.addListener(menuDisplay); // Attach listener function on state changes

//Product DB List
const productList = [];

setProductList(productList);
renderProducts(productList);

let productCards = document.querySelectorAll('.product-card');
productCards = Array.from(productCards);

//Click to product cart icon
let cartList = [];

//Order content
renderOrderContent(cartList);
const orderTotal = orderContent.querySelector('.order p:nth-of-type(2)');
const orderProducts = document.querySelector('.order-products-container');

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

  let flag = false;
  for (pCard of productCards) {
    if (pCard.contains(e.target)) {
      flag = true;
      break;
    }
  }
  if (!productDetailContainer.contains(e.target) && !flag)
    productDetailContainer.classList.add('inactive');
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
function hideProductDetailContainer() {
  productDetailContainer.classList.add('inactive');
}
//Set product List
function setProductList(arr) {
  //'Adidas tenis Forum Buckle Low "White" de adidas x Bad Bunny
  arr.push({
    name: 'Adidas tenis Forum Buckle Low "White" de adidas x Bad Bunny',
    price: 160,
    image:
      'https://cdn.shopify.com/s/files/1/2031/6995/articles/629728_2048x.jpg?v=1670425199://media.gq.com.mx/photos/643daf83730abff2c7881920/master/pass/tenis-adidas-campus-x-bad-bunny-wild-moss-verdes-caracteristicas-fecha-de-lanzamiento.png',
    description:
      'Cream white, light grey, calf leather, calf suede, 3-Stripes signature detail, round toe, lace-up front closure, logo patch at tongue, hook and loop front closure, logo insole and sole rubber. These styles are supplied by a tennis marketplace, which offers the most coveted and difficult to find items from around the world.',
  });
  //Air Jordan 1 Mid SE Craft
  arr.push({
    name: 'Air Jordan 1 Mid SE Craft',
    price: 135,
    image:
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/44239991-a986-4c5f-a871-4f20a0c756d4/calzado-air-jordan-1-mid-se-craft-wJLJQs.png',
    description:
      'Fire up the style with this handcrafted version of the Air Jordan 1 Mid. Its "inside-out"-inspired construction, including unique layers and exposed foam details, elevates the style of this timeless garment from Jordan Brand. Details like decorative stitching on the Swoosh add coveted appeal, while unexpected shading, the rich mix of materials and distressed aesthetics in the midsole give this release a handcrafted finish.',
  });
  //Adidas Tenis ADI2000
  arr.push({
    name: 'Adidas Tenis ADI2000',
    price: 89.9,
    image:
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/658ac4f70f144c3ca036ae6f0116ec80_9366/Tenis_adi2000_Blanco_GV9544_04_standard.jpg',
    description:
      'Show your rebellious side in the adi2000 shoes, inspired by the bold era of the early 2000s. With skate DNA and a versatile color palette, these adidas shoes were designed with your unique style in mind. An updated 3-Stripes design adds a playful touch, while the leather upper and rubber outsole ensure comfort.',
  });
  //New Balance 550 - BeigeGreen
  arr.push({
    name: 'New Balance 550 - BeigeGreen',
    price: 100.0,
    image:
      'https://media.revistagq.com/photos/619389b5fc5992de454ecb76/1:1/w_1079,h_1079,c_limit/245641983_888969852012096_2359717687648261478_n.jpg',
    description:
      'Simple and clean, not overloaded. We recreate a classic, timeless sneaker with this tribute to the pros of the 90s and the streetwear that defined a generation of basketball. Made for the player who knows the authenticity and origin of the New Balance 550. EVA cushioning. The 550s streamlined, low-top silhouette offers a clean take on the rugged designs of the late 80s, while the reliable suede and leather upper construction is a classic look for any era.',
  });
  // Adidas tenis Forum Mid - Cloud White
  arr.push({
    name: 'Adidas tenis Forum Mid - Cloud White',
    price: 64.0,
    image:
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/13085062e6fd497fb6faac5e00302b1b_9366/Tenis_Forum_Mid_Blanco_FY4975_01_standard.jpg',
    description:
      'Forum Mid is a new product for Unisex from adidas. We invite you to see the images to appreciate more details from different angles. If you already know Forum Mid S you can leave a review below; We always love to hear your opinion.',
  });
  // Adidas tenis Forum Low - Royal Blue
  arr.push({
    name: 'Adidas tenis Forum Low - Royal Blue',
    price: 68.0,
    image:
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/09c5ea6df1bd4be6baaaac5e003e7047_9366/Tenis_Forum_Low_Blanco_FY7756_01_standard.jpg',
    description:
      'More than a shoe, it is a statement of style. The adidas Forum arrived on the scene in 84 and gained a following on the pitch and in the music world. Bringing back 80s attitude, the explosive energy of basketball, and the iconic X-shaped ankle design, this pair of classic sneakers. Distilled in a low-cut version designed for the streets.',
  });
}
//Render products on page
function renderProducts(arr) {
  for (product of arr) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.setAttribute('index', arr.indexOf(product));

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
    const productCardIcon = document.createElement('img');
    productCardIcon.setAttribute('src', './icons/bt_add_to_cart.svg');
    productInfoFigure.appendChild(productCardIcon);
    productCardIcon.setAttribute('index', arr.indexOf(product));

    productInfo.append(productInfoDiv, productInfoFigure);
    productInfoFigure.addEventListener('click', changeCartList);
    productCard.append(productImg, productInfo);
    productCard.addEventListener('click', (e) => {
      openProductDetail(e);
    });
    cardsContainer.appendChild(productCard);
    //Differences between append and appendChild on:
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/append
  }
}
//Open product Details
function openProductDetail(e) {
  let srcTarget = e.target.getAttribute('src');
  if (
    srcTarget === './icons/bt_add_to_cart.svg' ||
    srcTarget === './icons/bt_added_to_cart.svg'
  ) {
    return;
  }
  let productSelected;
  for (pCard of productCards) {
    if (pCard.contains(e.target)) {
      productSelected = productList[pCard.getAttribute('index')];
      break;
    }
  }

  let imgs = productDetailContainer.getElementsByTagName('img');
  const productImg = imgs[1];
  productImg.setAttribute('src', productSelected.image);

  const productPrice = productDetailContainer.querySelector('p:nth-of-type(1)');
  productPrice.innerText = '$' + productSelected.price.toFixed(2);

  const productName = productDetailContainer.querySelector('p:nth-of-type(2)');
  productName.innerText = productSelected.name;

  const productDesc = productDetailContainer.querySelector('p:nth-of-type(3)');
  productDesc.innerText = productSelected.description;

  productDetailContainer.classList.remove('inactive');
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
    shoppingProduct.addEventListener('click', function (e) {
      let ix = e.target.getAttribute('index');
      removeProductOrder(cartList[ix], ix);
    });
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
  shoppingProduct.addEventListener('click', function (e) {
    let ix = e.target.getAttribute('index');
    removeProductOrder(cartList[ix], ix);
  });
  orderProducts.append(shoppingProduct);

  let curr = parseFloat(orderTotal.innerText.replace('$', ''));
  orderTotal.innerText = '$' + (curr + product.price).toFixed(2);

  shoppingCartNumber.innerText = cartList.length;
}

function removeProductOrder(product, index) {
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
