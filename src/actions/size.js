import { SIZES_RETREIVED } from '../types';
import api from '../api';

export const sizesRetreived = sizes => ({
  type: SIZES_RETREIVED,
  sizes,
});

export const getSizeByProduct = id => dispatch =>
  api.size.getSizeByProduct(id).then(sizes => {
    dispatch(sizesRetreived(sizes));
  });
