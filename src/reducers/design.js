import { DESIGNS_RETREIVED, DESIGN_RETREIVED } from '../types';

export default function product(state = [], action = {}) {
  switch (action.type) {
    case DESIGNS_RETREIVED:
      return action.designs;
    case DESIGN_RETREIVED:
      return action.design;
    default:
      return state;
  }
}
