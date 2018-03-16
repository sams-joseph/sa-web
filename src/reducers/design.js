import { DESIGNS_RETREIVED, DESIGN_RETREIVED, DESIGNS_RESET } from '../types';

export default function product(state = { designs: [], selectedDesign: {} }, action = {}) {
  switch (action.type) {
    case DESIGNS_RETREIVED:
      return { ...state, designs: action.designs };
    case DESIGN_RETREIVED:
      return { ...state, selectedDesign: action.design };
    case DESIGNS_RESET:
      return action.base;
    default:
      return state;
  }
}
