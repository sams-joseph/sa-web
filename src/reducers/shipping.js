import { ADD_SHIPPING } from '../types';

export default function shipping(state = {}, action = {}) {
  switch (action.type) {
    case ADD_SHIPPING:
      return action.payload;
    default:
      return state;
  }
}
