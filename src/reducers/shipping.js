import { ADD_SHIPPING } from '../types';

export default function product(state = {}, action = {}) {
  switch (action.type) {
    case ADD_SHIPPING:
      return action.payload;
    default:
      return state;
  }
}
