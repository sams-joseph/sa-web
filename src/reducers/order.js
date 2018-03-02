import { DESIGN_SELECTED, PRODUCT_SELECTED, SIZE_SELECTED } from '../types';

export default function product(state = {}, action = {}) {
  switch (action.type) {
    case PRODUCT_SELECTED:
      return {
        ...state,
        productID: action.productID,
      };
    case SIZE_SELECTED:
      return {
        ...state,
        sizeID: action.sizeID,
      };

    case DESIGN_SELECTED:
      return {
        ...state,
        designID: action.designID,
      };
    default:
      return state;
  }
}
