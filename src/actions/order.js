import { DESIGN_SELECTED, PRODUCT_SELECTED, SIZE_SELECTED } from '../types';

export const productsRetreived = productID => ({
  type: PRODUCT_SELECTED,
  productID,
});

export const sizesRetreived = sizeID => ({
  type: SIZE_SELECTED,
  sizeID,
});

export const designsRetreived = designID => ({
  type: DESIGN_SELECTED,
  designID,
});

export const setOrderProduct = productID => dispatch => {
  dispatch(productsRetreived(productID));
};

export const setOrderSize = sizeID => dispatch => {
  dispatch(sizesRetreived(sizeID));
};

export const setOrderDesign = designID => dispatch => {
  dispatch(designsRetreived(designID));
};
