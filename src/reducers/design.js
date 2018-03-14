import { DESIGNS_RETREIVED, DESIGN_RETREIVED, DESIGNS_RESET } from '../types';

export default function product(state = [], action = {}) {
  switch (action.type) {
    case DESIGNS_RETREIVED:
      return action.designs;
    case DESIGN_RETREIVED:
      return action.design;
    case DESIGNS_RESET:
      return action.base;
    default:
      return state;
  }
}
