const SERVER_URL = 'http://localhost:3001';
const RANDOM_USER_API = `${SERVER_URL}/random-user`;

export function getRandomUser() {
  return fetch(RANDOM_USER_API).then(res => res.json());
}

export default {
  getRandomUser
}
