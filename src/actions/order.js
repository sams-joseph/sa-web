import { PRODUCT_SELECTED, SIZE_SELECTED } from '../types';

export const productsRetreived = productID => ({
  type: PRODUCT_SELECTED,
  productID,
});

export const sizesRetreived = sizeID => ({
  type: SIZE_SELECTED,
  sizeID,
});

export const setOrderProduct = productID => dispatch => {
  dispatch(productsRetreived(productID));
};

export const setOrderSize = sizeID => dispatch => {
  dispatch(sizesRetreived(sizeID));
};
