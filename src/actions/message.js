import { MESSAGE_CLOSED } from '../types';

export const messageClosed = bool => ({
  type: MESSAGE_CLOSED,
  bool,
});

export const closeAlertMessage = bool => dispatch => dispatch(messageClosed(bool));
