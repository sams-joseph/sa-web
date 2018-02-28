import { MESSAGE_CLOSED } from '../types';

export default function product(state = true, action = {}) {
  switch (action.type) {
    case MESSAGE_CLOSED:
      return action.bool;
    default:
      return state;
  }
}
