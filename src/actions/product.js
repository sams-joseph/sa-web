import { PRODUCTS_RETREIVED, PRODUCT_RETREIVED } from '../types';
import api from '../api';

export const productsRetreived = products => ({
  type: PRODUCTS_RETREIVED,
  products,
});

export const productRetreived = product => ({
  type: PRODUCT_RETREIVED,
  product,
});

export const getProducts = () => dispatch =>
  api.product.getProducts().then(products => {
    dispatch(productsRetreived(products));
  });

export const getProductByID = id => dispatch =>
  api.product.getProductByID(id).then(product => {
    dispatch(productRetreived(product));
  });
