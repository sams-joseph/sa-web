import { ADD_TO_CART } from '../types';

export const itemAddedToCart = item => ({
  type: ADD_TO_CART,
  item,
});

export const addToCart = item => dispatch => {
  dispatch(itemAddedToCart(item));
};
