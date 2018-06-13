const SERVER_URL = 'http://localhost:3001';
const RANDOM_USER_API = `${SERVER_URL}/random-user`;
const LOGIN_API = `${SERVER_URL}/login`;

export function getRandomUser() {
  return fetch(RANDOM_USER_API).then(handleErrors);
}

export function login(username, password) {
  const data = { username, password };
  return fetch(LOGIN_API, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(handleResponse);
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
  getRandomUser,
  login
}
