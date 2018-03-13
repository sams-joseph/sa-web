import { DESIGN_SELECTED, PRODUCT_SELECTED, SIZE_SELECTED } from '../types';

export default function product(state = {}, action = {}) {
  switch (action.type) {
    case PRODUCT_SELECTED:
      return {
        ...state,
        product: action.product,
      };
    case SIZE_SELECTED:
      return {
        ...state,
        size: action.size,
      };

    case DESIGN_SELECTED:
      return {
        ...state,
        design: action.design,
      };
    default:
      return state;
  }
}
