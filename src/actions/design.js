import { DESIGNS_RETREIVED } from '../types';
import api from '../api';

export const designsRetreived = designs => ({
  type: DESIGNS_RETREIVED,
  designs,
});

export const getDesignsByProduct = id => dispatch =>
  api.design.getDesignsByProduct(id).then(designs => {
    dispatch(designsRetreived(designs));
  });
