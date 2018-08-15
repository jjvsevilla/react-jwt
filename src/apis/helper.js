const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export function getHeaders (token) {
  const headers = { ...DEFAULT_HEADERS };

  if (!token) {
    return headers;
  }

  return Object.assign({}, headers, {
    Authorization: `Bearer ${token}`
  });
}

export default {
  getHeaders
}