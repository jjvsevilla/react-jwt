import * as authApi from '../apis/httpAuth';
import * as authService from '../services/authService';

const Actions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  FETCH_TOKEN: 'FETCH_TOKEN',
  SET_TOKEN: 'SET_TOKEN',
  REMOVE_TOKEN: 'REMOVE_TOKEN'
};

const loginRequest = () => ({
  type: Actions.LOGIN_REQUEST
});

const loginSuccess = user => ({
  type: Actions.LOGIN_SUCCESS,
  payload: user
});

const loginFailure = err => ({
  type: Actions.LOGIN_FAILURE,
  payload: err,
  error: true
});

const logoutRequest = () => ({
  type: Actions.LOGOUT
});

const fetchToken = () => ({
  type: Actions.FETCH_TOKEN
});

const setToken = token => ({
  type: Actions.SET_TOKEN,
  payload: token
});

const removeToken = () => ({
  type: Actions.REMOVE_TOKEN
});

const login = ({ username, password }) => dispatch => {
  dispatch(loginRequest());

  return authApi.login({ username, password })
    .then((res) => {
      dispatch(loginSuccess(res.data.user));
      authService.setToken(res.data.access_token);
      dispatch(setToken(res.data.access_token));
    })
    .catch((err) => {
      dispatch(loginFailure(err.response.data));
    });
};

const logout = () => dispatch => {
  dispatch(logoutRequest());
  authService.setToken();
  dispatch(removeToken());
}

const getToken = () => dispatch => {
  dispatch(fetchToken());
  const token = authService.getToken();

  if (token) {
    authService.setToken(token);
    dispatch(setToken(token));
  }
}

export {
  Actions,
  login,
  logout,
  getToken
}