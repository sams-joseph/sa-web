import { DESIGN_SELECTED, PRODUCT_SELECTED, SIZE_SELECTED, IMAGE_SET, PORTRAIT_SET } from '../types';

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

    case IMAGE_SET:
      return {
        ...state,
        image: action.image,
      };
    case PORTRAIT_SET:
      return {
        ...state,
        portrait: action.image,
      };
    default:
      return state;
  }
}
