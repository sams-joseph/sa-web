import { DESIGN_SIZE_RETREIVED } from '../types';
import api from '../api';

export const designUrlRetreived = designUrl => ({
  type: DESIGN_SIZE_RETREIVED,
  designUrl,
});

export const getDesignBySize = (designID, sizeID) => dispatch =>
  api.designSize
    .getDesignSizesById(designID, sizeID)
    .then(design => {
      if (design !== null) {
        dispatch(designUrlRetreived(design.imageUrl));
      } else {
        dispatch(designUrlRetreived(''));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(designUrlRetreived(''));
    });
