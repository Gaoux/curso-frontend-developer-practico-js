const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const burgerMenu = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mediaQuery = window.matchMedia('(min-width: 640px)');

menuEmail.addEventListener('click', toggleDesktopMenu);
burgerMenu.addEventListener('click', toggleMobileMenu);

menuDisplay(mediaQuery); //Initial check
mediaQuery.addListener(menuDisplay); // Attach listener function on state changes

document.onclick = function (e) {
  let targetClass = e.target.getAttribute('class');

  if (targetClass !== 'mobile-menu' && targetClass !== 'menu')
    mobileMenu.classList.add('inactive');

  if (targetClass !== 'desktop-menu' && targetClass !== 'navbar-email')
    desktopMenu.classList.add('inactive');
};

function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle('inactive');
}
//Media querie to display menu
function menuDisplay(mediaQuery) {
  if (mediaQuery.matches) mobileMenu.classList.add('inactive');
  else desktopMenu.classList.add('inactive');
}
