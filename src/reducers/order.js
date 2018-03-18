import {
  DESIGN_SELECTED,
  PRODUCT_SELECTED,
  SIZE_SELECTED,
  IMAGE_SET,
  PORTRAIT_SET,
  INPUTS_SELECTED,
  CLEAR_ORDER,
  QUANTITY_SET,
} from '../types';

export default function order(state = {}, action = {}) {
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
    case QUANTITY_SET:
      return {
        ...state,
        quantity: action.qty,
      };
    case INPUTS_SELECTED:
      return {
        ...state,
        inputs: action.inputs,
      };
    case CLEAR_ORDER:
      return {};
    default:
      return state;
  }
}
