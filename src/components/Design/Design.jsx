import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';
import CheckBox from 'material-ui-icons/CheckBox';
import Checkbox from 'material-ui/Checkbox';

import { ProductContainer, ProductMeta, ProductHeading, ProductDescription } from './Styled';

function Design({ id, name, description, imageUrl, selectDesign, checkedID }) {
  return (
    <ProductContainer img={imageUrl} onClick={() => selectDesign(id, name)} checked={id === checkedID}>
      <ProductMeta>
        <div>
          <ProductHeading>{name}</ProductHeading>
          <ProductDescription>{description}</ProductDescription>
        </div>
        <Checkbox
          checkedIcon={<CheckBox style={{ color: 'white' }} />}
          icon={<CheckBoxOutlineBlank style={{ color: 'white' }} />}
          color="primary"
          checked={id === checkedID}
          onChange={() => selectDesign(id, name)}
        />
      </ProductMeta>
    </ProductContainer>
  );
}

const { string, func, number } = PropTypes;
Design.propTypes = {
  name: string.isRequired,
  description: string.isRequired,
  imageUrl: string.isRequired,
  id: number.isRequired,
  selectDesign: func.isRequired,
  checkedID: number.isRequired,
};

export default Design;
