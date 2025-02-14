const doLogin = function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    displayMessage('Username and password are required');
    return;
  }

  login({ username, password })
    .then(function(res) {
      window.location.href = 'home.html';
    })
    .catch(function(err) {
      displayMessage('Invalid username or password');
    });
};

const doRegister = function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    displayMessage('All fields are required');
    return;
  }

  register({ username, email, password })
    .then(function(res) {
      window.location.href = 'home.html';
    })
    .catch(function(err) {
      displayMessage('User already exists');
    });
};

const doLogout = function(e) {
  e.preventDefault();
  // Implement logout functionality
};

const displayMessage = function(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.style.display = 'block';
};
