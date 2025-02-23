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
      if (res.status === 200) {
        console.log(`app.js - accessToken: ${res.accessToken}`);
        console.log(`app.js - refreshToken: ${res.refreshToken}`);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        window.location.href = 'home.html';
      } else {
        displayMessage('Invalid username or password');
      }
      
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
  const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token 

  fetch('http://localhost:3000/api/auth/logout', { // Call logout endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`
    },
    body: JSON.stringify({ token: refreshToken })
  })
  .then(res => res.json())
  .then(() => {

    console.log(`app.js - removing accessToken`);
    console.log(`app.js - removing refreshToken`);

    localStorage.removeItem('accessToken'); // Clear tokens
    localStorage.removeItem('refreshToken'); // Clear tokens
    window.location.href = 'index.html';
  })
  .catch(function(err) {
    displayMessage('Error logging out');
  });
};

const displayMessage = function(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.style.display = 'block';
};
