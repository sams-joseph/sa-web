import { PRODUCTS_RETREIVED } from '../types';
import api from '../api';

export const productsRetreived = products => ({
  type: PRODUCTS_RETREIVED,
  products,
});

export const getProducts = () => dispatch =>
  api.product.getProducts().then(products => {
    dispatch(productsRetreived(products));
  });
