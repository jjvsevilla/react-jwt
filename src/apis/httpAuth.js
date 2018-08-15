import axios from 'axios';
import { SERVER_URL } from '../environment';

const LOGIN_API = `${SERVER_URL}/login`;

export function login({ username, password }) {
  return axios.post(LOGIN_API, {
    username, password
  });
}