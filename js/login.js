//Login page
const loginForm = document.querySelector('.login .form');
const loginSubmit = document.querySelector('#loginSubmit');
const loginEmail = document.querySelector('#loginEmail');
const invalidEmailAlert = document.querySelector('#invalidEmailAlert');
const IncorrectEmailOrPassword = document.querySelector(
  '#IncorrectEmailOrPassword'
);

//Login
loginForm.addEventListener('submit', checkLogin);
loginEmail.addEventListener('input', function (e) {
  checkEmail(this.value);
});
//VARIABLES
//Account info
let accountList = [];
let currAccount = {};

addAccount();
//Login
function checkLogin() {
  event.preventDefault();
  let email = document.querySelector('#loginEmail');
  email = email.value;
  if (!checkEmail(email)) {
    IncorrectEmailOrPassword.classList.add('inactive');
    return;
  }
  let password = document.querySelector('#loginPassword');
  password = password.value;

  for (acc of accountList)
    if (acc.email === email && acc.password === password) {
      currAccount = acc;
      console.log(currAccount);
      IncorrectEmailOrPassword.classList.add('inactive');
      window.open('./index.html');
      currAccount = acc;
      return;
    }

  IncorrectEmailOrPassword.classList.remove('inactive');
}
//Sign up
function addAccount() {
  accountList.push({
    name: 'Gustavo Parra',
    email: 'gus@example.com',
    password: '1234',
  });
}
//Check email
function checkEmail(email) {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  let validEmail = regex.test(email);
  if (!validEmail) invalidEmailAlert.classList.remove('inactive');
  else invalidEmailAlert.classList.add('inactive');
  return validEmail;
}
