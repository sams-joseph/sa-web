import { ADD_SHIPPING } from '../types';

export const add = payload => ({
  type: ADD_SHIPPING,
  payload,
});

export const addShipping = payload => dispatch => {
  dispatch(add(payload));
};
