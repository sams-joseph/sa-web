import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, RESET_CART, LOAD_CART } from '../types';

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

export const reset = () => ({
  type: RESET_CART,
});

export const loadCart = payload => ({
  type: LOAD_CART,
  payload,
});

export const addToCart = (id, payload) => dispatch => {
  dispatch(add(id, payload));
  return new Promise(resolve => {
    resolve();
  });
};

export const removeFromCart = id => dispatch => {
  const cart = JSON.parse(localStorage.getItem('cartItems'));
  const prunedIds = cart.byId.filter(item => item !== id);
  delete cart.byHash[id];

  localStorage.setItem(
    'cartItems',
    JSON.stringify({
      byId: prunedIds,
      byHash: cart.byHash,
    })
  );
  dispatch(remove(id));
};

export const updateCart = (id, payload) => dispatch => {
  const cart = JSON.parse(localStorage.getItem('cartItems'));
  cart.byHash[id] = {
    ...cart.byHash[id],
    ...payload,
  };
  // localStorage.setItem(
  //   'cartItems',
  //   JSON.stringify({
  //     ...cart,
  //   })
  // );
  dispatch(update(id, payload));
};

export const resetCart = () => dispatch => {
  localStorage.removeItem('cartItems');
  dispatch(reset());
};
