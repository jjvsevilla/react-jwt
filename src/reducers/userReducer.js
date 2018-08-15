import { Actions } from '../actions/userActions';

export const initialSessionState = {
  loading: false,
  randomUser: null,
  error: ''
}

export default function userReducer(state = initialSessionState, action) {
  switch (action.type) {
    case Actions.GET_RANDOM_USER_REQUEST:
      return Object.assign({}, state, {
        validating: true
      });
    case Actions.GET_RANDOM_USER_SUCCESS:
      return Object.assign({}, state, {
        randomUser: action.payload,
        validating: false
      });
    case Actions.GET_RANDOM_USER_FAILURE:
      return Object.assign({}, state, {
        error: action.payload.message,
        validating: false
      });

    default:
      return state;
  }
}