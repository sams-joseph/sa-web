import { ALERT_MESSAGE_SHOWN, ALERT_MESSAGE_CLOSED, LOGIN_MESSAGE_SHOWN, LOGIN_MESSAGE_CLOSED } from '../types';

export default function message(state = { alert: true, login: false }, action = {}) {
  switch (action.type) {
    case ALERT_MESSAGE_SHOWN:
      return {
        ...state,
        alert: action.bool,
      };
    case ALERT_MESSAGE_CLOSED:
      return {
        ...state,
        alert: action.bool,
      };
    case LOGIN_MESSAGE_SHOWN:
      return {
        ...state,
        login: action.bool,
      };
    case LOGIN_MESSAGE_CLOSED:
      return {
        ...state,
        login: action.bool,
      };
    default:
      return state;
  }
}
