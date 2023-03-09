let home = document.getElementById('button').textContent;
let login = document.getElementById('login');
let register = document.getElementById('register');
let leftoption = document.getElementById('button');

if (home == 'SIGN IN') {
  login.style.display = 'none';
} else {
  register.style.display = 'none';
}

function changelogin() {
  let text = leftoption.textContent;
  console.log(text);
  if (text == 'SIGN IN') {
    text = leftoption.textContent = 'SIGN UP';
    register.style.display = 'none';

    login.style.display = 'flex';
  } else {
    text = leftoption.textContent = 'SIGN IN';
    login.style.display = 'none';
    register.style.display = 'flex';
  }
}

function handleRegister() {
  let username = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let data = { username: username, email: email, password: password };
  fetch('http://localhost:5001/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      alert('Registration completed successfully');
      window.location.replace('/home.html');
    })
    .catch((err) => {
      console.log(err);
    });
}
function handleLogin() {
  let username = document.getElementById('name1').value;
  let email = document.getElementById('email1').value;
  let password = document.getElementById('password1').value;
  let data = { username: username, email: email, password: password };

  fetch('http://localhost:5001/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      alert('login completed successfully');
      window.location.replace('/home.html');
    })
    .catch((err) => {
      console.log(err);
    });
}
