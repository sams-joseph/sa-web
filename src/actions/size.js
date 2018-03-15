import { SIZES_RETREIVED, SIZE_RETREIVED, SIZES_RESET } from '../types';
import api from '../api';

export const sizesRetreived = sizes => ({
  type: SIZES_RETREIVED,
  sizes,
});

export const sizeRetreived = size => ({
  type: SIZE_RETREIVED,
  size,
});

export const resetSizes = (base = []) => ({
  type: SIZES_RESET,
  base,
});

export const getSizeByProduct = id => dispatch =>
  api.size.getSizeByProduct(id).then(sizes => {
    dispatch(sizesRetreived(sizes));
  });

export const getSizeByID = id => dispatch =>
  api.size.getSizeByID(id).then(size => {
    dispatch(sizeRetreived(size));
  });
