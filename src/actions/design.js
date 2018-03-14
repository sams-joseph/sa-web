import { DESIGNS_RETREIVED, DESIGN_RETREIVED, DESIGNS_RESET } from '../types';
import api from '../api';

export const designsRetreived = designs => ({
  type: DESIGNS_RETREIVED,
  designs,
});

export const designRetreived = design => ({
  type: DESIGN_RETREIVED,
  design,
});

export const resetDesigns = (base = []) => ({
  type: DESIGNS_RESET,
  base,
});

export const getDesignsByProduct = id => dispatch =>
  api.design.getDesignsByProduct(id).then(designs => {
    dispatch(designsRetreived(designs));
  });

export const getDesignByID = id => dispatch =>
  api.design.getDesignByID(id).then(design => {
    dispatch(designRetreived(design));
  });
