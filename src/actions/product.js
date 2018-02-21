import { PRODUCTS_RETREIVED } from '../types';
import api from '../api';

export const productsRetreived = products => ({
  type: PRODUCTS_RETREIVED,
  products,
});

export const retreiveProducts = () => dispatch =>
  api.product.retreiveProducts().then(products => {
    dispatch(productsRetreived(products));
  });
