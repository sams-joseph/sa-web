import { GET_ORDER_HISTORY } from '../types';

export default function orderHistory(state = [], action = {}) {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.payload;
    default:
      return state;
  }
}
