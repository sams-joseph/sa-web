import { GET_ORDER_HISTORY } from '../types';
import api from '../api';

export const getAll = payload => ({
  type: GET_ORDER_HISTORY,
  payload,
});

export const getOrderHistory = () => dispatch =>
  api.order.getOrders().then(orders => {
    dispatch(getAll(orders));
  });
