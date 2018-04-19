import { GET_USERS_CSR } from '../types';

export default function analytics(state = {}, action = {}) {
  switch (action.type) {
    case GET_USERS_CSR:
      return action.payload;
    default:
      return state;
  }
}
