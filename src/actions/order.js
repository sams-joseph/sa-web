import { PRODUCT_SELECTED } from '../types';
import api from '../api';

export const productsRetreived = productID => ({
  type: PRODUCT_SELECTED,
  productID,
});

export const setOrderProduct = productID => dispatch => {
  dispatch(productsRetreived(productID));
};
