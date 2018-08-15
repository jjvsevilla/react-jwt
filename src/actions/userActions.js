import * as userApi from '../apis/httpUser';

const Actions = {
  GET_CURRENT_USER_REQUEST: 'GET_CURRENT_USER_REQUEST',
  GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',
  GET_CURRENT_USER_FAILURE: 'GET_CURRENT_USER_FAILURE',
  GET_RANDOM_USER_REQUEST: 'GET_RANDOM_USER_REQUEST',
  GET_RANDOM_USER_SUCCESS: 'GET_RANDOM_USER_SUCCESS',
  GET_RANDOM_USER_FAILURE: 'GET_RANDOM_USER_FAILURE'
};

const getCurrentUserRequest = () => ({
  type: Actions.GET_CURRENT_USER_REQUEST
});

const getCurrentUserSuccess = user => ({
  type: Actions.GET_CURRENT_USER_SUCCESS,
  payload: user
});

const getCurrentUserFailure = err => ({
  type: Actions.GET_CURRENT_USER_FAILURE,
  payload: err,
  error: true
});

const getRandomUserRequest = () => ({
  type: Actions.GET_RANDOM_USER_REQUEST
});

const getRandomUserSuccess = randomUser => ({
  type: Actions.GET_RANDOM_USER_SUCCESS,
  payload: randomUser
});

const getRandomUserFailure = err => ({
  type: Actions.GET_RANDOM_USER_FAILURE,
  payload: err,
  error: true
});

const getCurrentUser = token => dispatch => {
  dispatch(getCurrentUserRequest());

  return userApi.getCurrentUser(token)
    .then((res) => {
      dispatch(getCurrentUserSuccess(res.data.user));
    })
    .catch((err) => {
      dispatch(getCurrentUserFailure(err.response.data));
    });
};

const getRandomUser = () => dispatch => {
  dispatch(getRandomUserRequest());

  return userApi.getRandomUser()
    .then((res) => {
      dispatch(getRandomUserSuccess(res.data.randomUser));
    })
    .catch((err) => {
      dispatch(getRandomUserFailure(err.response.data));
    });
};

export {
  Actions,
  getCurrentUser,
  getRandomUser
}