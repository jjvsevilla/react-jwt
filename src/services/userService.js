import authService from './authService';

const SERVER_URL = 'http://localhost:3001';
const CURRENT_USER_API = `${SERVER_URL}/me`;
const RANDOM_USER_API = `${SERVER_URL}/random-user`;

const getCurrentUser = () => (dispatch, getState) =>  {
  const { session: { token } } = getState();
  const options = getHeaders(token)
  return fetch(CURRENT_USER_API, options).then(handleResponse);
}

export function getRandomUser() {
  const token = authService.getToken();
  const options = {}
  if (token) {
    options.headers = {};
    options.headers.Authorization = 'Bearer ' + token;
  }
  return fetch(RANDOM_USER_API, options);
}

// function handleResponse(response) {
//   if (!response.ok) {
//       return handleErrors(response.status, response.statusText, response.json())
//   }
//   return response.json();
// }

// function handleErrors(statusCode, statusMessage, resError) {
//   return resError.then(error => {
//     throw Error(`${statusMessage} (${statusCode}) - ${error.message}`);
//   });
// }

export default {
  login,
  logout,
  getCurrentUser,
  getRandomUser
}
