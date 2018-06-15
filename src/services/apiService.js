import authService from './authService';

const SERVER_URL = 'http://localhost:3001';
const RANDOM_USER_API = `${SERVER_URL}/random-user`;
const LOGIN_API = `${SERVER_URL}/login`;
const USER_API = `${SERVER_URL}/me`;

export function login(username, password) {
  const payload = JSON.stringify({ username, password });
  return fetch(LOGIN_API, {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: payload
  }).then(handleResponse);
}

export function logout() {
  authService.setToken();
}

export function getUser() {
  const token = authService.getToken();
  if (token) {
    const options = {}
    options.headers = {};
    options.headers.Authorization = 'Bearer ' + token;
    return fetch(USER_API, options).then(handleResponse);
  }
  return Promise.resolve();
}

export function getRandomUser() {
  const token = authService.getToken();
  const options = {}
  if (token) {
    options.headers = {};
    options.headers.Authorization = 'Bearer ' + token;
  }
  return fetch(RANDOM_USER_API, options).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
      return handleErrors(response.status, response.statusText, response.json())
  }
  return response.json();
}

function handleErrors(statusCode, statusMessage, resError) {
  return resError.then(error => {
    throw Error(`${statusMessage} (${statusCode}) - ${error.message}`);
  });
}

export default {
  login,
  logout,
  getUser,
  getRandomUser
}
