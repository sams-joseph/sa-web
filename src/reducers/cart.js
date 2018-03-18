import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, RESET_CART, LOAD_CART } from '../types';

const initialState = {
  byId: [],
  byHash: {},
};

export default function cart(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        byId: [...state.byId, action.id],
        byHash: {
          ...state.byHash,
          [action.id]: action.payload,
        },
      };
    case REMOVE_FROM_CART: {
      const prunedIds = state.byId.filter(item => item !== action.id);
      delete state.byHash[action.id];

      return {
        byId: prunedIds,
        byHash: state.byHash,
      };
    }
    case UPDATE_CART_ITEM: {
      state.byHash[action.id] = {
        ...state.byHash[action.id],
        ...action.payload,
      };
      return {
        ...state,
      };
    }
    case RESET_CART:
      return {
        byId: [],
        byHash: {},
      };
    case LOAD_CART:
      return action.payload;
    default:
      return state;
  }
}
