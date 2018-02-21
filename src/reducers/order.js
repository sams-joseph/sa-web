import { PRODUCT_SELECTED } from '../types';

export default function product(state = {}, action = {}) {
  switch (action.type) {
    case PRODUCT_SELECTED:
      return {
        ...state,
        productID: action.productID,
      };
    default:
      return state;
  }
}
