import { ALERT_MESSAGE_SHOWN, ALERT_MESSAGE_CLOSED, LOGIN_MESSAGE_SHOWN, LOGIN_MESSAGE_CLOSED } from '../types';

export const alertMessageShown = bool => ({
  type: ALERT_MESSAGE_SHOWN,
  bool,
});

export const alertMessageClosed = bool => ({
  type: ALERT_MESSAGE_CLOSED,
  bool,
});

export const loginMessageShown = bool => ({
  type: LOGIN_MESSAGE_SHOWN,
  bool,
});

export const loginMessageClosed = bool => ({
  type: LOGIN_MESSAGE_CLOSED,
  bool,
});

export const closeAlertMessage = bool => dispatch => dispatch(alertMessageClosed(bool));

export const showAlertMessage = bool => dispatch => dispatch(alertMessageShown(bool));

export const showLoginMessage = bool => dispatch => dispatch(loginMessageShown(bool));

export const closeLoginMessage = bool => dispatch => dispatch(loginMessageClosed(bool));
