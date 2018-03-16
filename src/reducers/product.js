import { PRODUCTS_RETREIVED, PRODUCT_RETREIVED } from '../types';

export default function product(state = { products: [], selectedProduct: {} }, action = {}) {
  switch (action.type) {
    case PRODUCTS_RETREIVED:
      return { ...state, products: action.products };
    case PRODUCT_RETREIVED:
      return { ...state, selectedProduct: action.product };
    default:
      return state;
  }
}
