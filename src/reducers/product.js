import { PRODUCTS_RETREIVED } from '../types';

export default function product(state = [], action = {}) {
  switch (action.type) {
    case PRODUCTS_RETREIVED:
      return action.products;
    default:
      return state;
  }
}
