const AUTH_KEY = 'auth-token';
const store = window.localStorage;

export function getToken() {
  return store.getItem(AUTH_KEY);
}

export function setToken(token) {
  if (token) {
    store.setItem(AUTH_KEY, token);
  } else {
    store.removeItem(AUTH_KEY);
  }
}

export default {
  getToken,
  setToken
}