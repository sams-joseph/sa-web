import { SIZES_RETREIVED } from '../types';
import api from '../api';
import { setOrderSize } from './order';

export const sizesRetreived = sizes => ({
  type: SIZES_RETREIVED,
  sizes,
});

export const getSizeByProduct = id => dispatch =>
  api.size.getSizeByProduct(id).then(sizes => {
    dispatch(sizesRetreived(sizes));
    dispatch(setOrderSize(sizes[0].id));
  });
