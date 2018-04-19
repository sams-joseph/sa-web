import { GET_PARTS_BY_MONTH, GET_PARTS_BY_DESIGN, GET_PARTS_BY_PRODUCT } from '../types';
import api from '../api';

export const getByMonth = payload => ({
  type: GET_PARTS_BY_MONTH,
  payload,
});

export const getByDesign = payload => ({
  type: GET_PARTS_BY_DESIGN,
  payload,
});

export const getByProduct = payload => ({
  type: GET_PARTS_BY_PRODUCT,
  payload,
});

export const getOrderHistoryByMonth = year => dispatch =>
  api.order.getOrdersByMonth(year).then(monthlyData => {
    dispatch(getByMonth(monthlyData));
  });

export const getOrderHistoryByDesign = () => dispatch =>
  api.order.getOrdersByDesign().then(designData => {
    dispatch(getByDesign(designData));
  });

export const getOrderHistoryByProduct = () => dispatch =>
  api.order.getOrdersByProduct().then(sizeData => {
    dispatch(getByProduct(sizeData));
  });
