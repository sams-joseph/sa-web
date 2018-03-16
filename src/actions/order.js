import { DESIGN_SELECTED, PRODUCT_SELECTED, SIZE_SELECTED, IMAGE_SET, PORTRAIT_SET, CLEAR_ORDER } from '../types';

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

export const setImage = image => ({
  type: IMAGE_SET,
  image,
});

export const setPortrait = image => ({
  type: PORTRAIT_SET,
  image,
});

export const clearOrder = () => ({
  type: CLEAR_ORDER,
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

export const setOrderImage = image => dispatch => {
  dispatch(setImage(image));
};

export const setOrderPortrait = image => dispatch => {
  dispatch(setPortrait(image));
};

export const resetOrder = () => dispatch => {
  dispatch(clearOrder());
};
