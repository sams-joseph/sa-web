import { SIZES_RETREIVED, SIZE_RETREIVED, SIZES_RESET } from '../types';

export default function product(state = [], action = {}) {
  switch (action.type) {
    case SIZES_RETREIVED:
      return action.sizes;
    case SIZE_RETREIVED:
      return action.size;
    case SIZES_RESET:
      return action.base;
    default:
      return state;
  }
}
