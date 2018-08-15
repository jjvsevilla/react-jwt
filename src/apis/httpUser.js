import axios from 'axios';
import store from '../store';
import { SERVER_URL } from '../environment';

const CURRENT_USER_API = `${SERVER_URL}/me`;
const RANDOM_USER_API = `${SERVER_URL}/random-user`;

axios.interceptors.request.use(config => {
  const token = store.getState().session.token;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export function getCurrentUser() {
  return axios.get(CURRENT_USER_API);
}

export function getRandomUser() {
  return axios.get(RANDOM_USER_API);
}
