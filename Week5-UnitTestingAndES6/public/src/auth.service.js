const BASE_API_URL = 'http://localhost:3000/api';
const AUTH_API = `${BASE_API_URL}/auth`; // http://localhost:3000/api/auth
const USER_API = `${BASE_API_URL}/user`; // http://localhost:3000/api/user

function register(formData) {
  return _post(`${AUTH_API}/register`, formData);
}

function login(formData) {
  return _post(`${AUTH_API}/login`, formData);
}

function _post(url, data) {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve access token from local storage
  console.log("accessToken: ", accessToken);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': accessToken ? `Bearer ${accessToken}` : undefined // Include access token in headers if it exists
  };

  console.log(`auth.service.js - accessToken: ${accessToken}`);

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
