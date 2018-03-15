import { PRODUCTS_RETREIVED, PRODUCT_RETREIVED } from '../types';

export default function product(state = [], action = {}) {
  switch (action.type) {
    case PRODUCTS_RETREIVED:
      return action.products;
    case PRODUCT_RETREIVED:
      return action.product;
    default:
      return state;
  }
}
