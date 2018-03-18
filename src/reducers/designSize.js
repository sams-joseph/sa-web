import { DESIGN_SIZE_RETREIVED } from '../types';

export default function designSize(state = '', action = {}) {
  switch (action.type) {
    case DESIGN_SIZE_RETREIVED:
      return action.designUrl;
    default:
      return state;
  }
}
