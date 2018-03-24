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

export const getPartDetails = id =>
  api.order.getOrderPart(id).then(part => {
    Promise.all([api.product.getProductByID(part.productID), api.size.getSizeByID(part.sizeID)]).then(values => values);
  });
