import { DESIGNS_RETREIVED } from '../types';

export default function product(state = [], action = {}) {
  switch (action.type) {
    case DESIGNS_RETREIVED:
      return action.designs;
    default:
      return state;
  }
}
