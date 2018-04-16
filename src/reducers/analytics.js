import { GET_PARTS_BY_MONTH, GET_PARTS_BY_DESIGN, GET_PARTS_BY_PRODUCT } from '../types';

export default function analytics(state = { byMonth: [], byDesign: [], byProduct: [] }, action = {}) {
  switch (action.type) {
    case GET_PARTS_BY_MONTH:
      return {
        ...state,
        byMonth: action.payload,
      };
    case GET_PARTS_BY_DESIGN:
      return {
        ...state,
        byDesign: action.payload,
      };
    case GET_PARTS_BY_PRODUCT:
      return {
        ...state,
        byProduct: action.payload,
      };
    default:
      return state;
  }
}
