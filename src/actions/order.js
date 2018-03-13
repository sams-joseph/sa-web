import { DESIGN_SELECTED, PRODUCT_SELECTED, SIZE_SELECTED } from '../types';

export const productsRetreived = product => ({
  type: PRODUCT_SELECTED,
  product,
});

export const sizesRetreived = size => ({
  type: SIZE_SELECTED,
  size,
});

export const designsRetreived = design => ({
  type: DESIGN_SELECTED,
  design,
});

export const setOrderProduct = product => dispatch => {
  dispatch(productsRetreived(product));
};

export const setOrderSize = size => dispatch => {
  dispatch(sizesRetreived(size));
};

export const setOrderDesign = design => dispatch => {
  dispatch(designsRetreived(design));
};
