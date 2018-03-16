import { SIZES_RETREIVED, SIZE_RETREIVED, SIZES_RESET } from '../types';

export default function product(state = { sizes: [], selectedSize: {} }, action = {}) {
  switch (action.type) {
    case SIZES_RETREIVED:
      return { ...state, sizes: action.sizes };
    case SIZE_RETREIVED:
      return { ...state, selectedSize: action.size };
    case SIZES_RESET:
      return action.base;
    default:
      return state;
  }
}
