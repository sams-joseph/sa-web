import { SIZES_RETREIVED } from '../types';

export default function product(state = [], action = {}) {
  switch (action.type) {
    case SIZES_RETREIVED:
      return action.sizes;
    default:
      return state;
  }
}
