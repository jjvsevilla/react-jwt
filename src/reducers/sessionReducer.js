import { Actions } from '../actions/sessionActions';
import { Actions as UserActions } from '../actions/userActions';

export const initialSessionState = {
  validating: false,
  token: '',
  user: null,
  error: ''
}

export default function sessionReducer(state = initialSessionState, action) {
  switch (action.type) {
    case Actions.LOGIN_REQUEST:
      return Object.assign({}, state, {
        validating: true
      });
    case Actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        validating: false
      });
    case Actions.LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: action.payload.message,
        validating: false
      });
    case Actions.LOGOUT:
      return Object.assign({}, state, {
        user: null
      });
    case Actions.SET_TOKEN:
      return Object.assign({}, state, {
        token: action.payload,
      });
    case Actions.REMOVE_TOKEN:
      return Object.assign({}, state, {
        token: '',
      });

    case UserActions.GET_CURRENT_USER_REQUEST:
      return Object.assign({}, state, {
        validating: true
      });
    case UserActions.GET_CURRENT_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        validating: false
      });
    case UserActions.GET_CURRENT_USER_FAILURE:
      return Object.assign({}, state, {
        error: action.payload.message,
        validating: false
      });

    default:
      return state;
  }
}