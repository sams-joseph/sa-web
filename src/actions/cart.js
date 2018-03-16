import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM } from '../types';

export const add = (id, payload) => ({
  type: ADD_TO_CART,
  id,
  payload,
});

export const remove = id => ({
  type: REMOVE_FROM_CART,
  id,
});

export const update = (id, payload) => ({
  type: UPDATE_CART_ITEM,
  id,
  payload,
});

export const addToCart = (id, payload) => dispatch => {
  dispatch(add(id, payload));
};

export const removeFromCart = id => dispatch => {
  dispatch(remove(id));
};

export const updateCart = (id, payload) => dispatch => {
  dispatch(update(id, payload));
};
