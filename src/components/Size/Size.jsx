import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

import { SizeContainer, SizeMeta, SizeHeading } from './Styled';

function Product({ id, name, height, width, selectSize, checkedID }) {
  return (
    <SizeContainer onClick={() => selectSize(id, name, height, width)}>
      <SizeMeta>
        <Checkbox color="primary" checked={id === checkedID} onChange={() => selectSize(id, name, height, width)} />
        <SizeHeading>{name}</SizeHeading>
      </SizeMeta>
    </SizeContainer>
  );
}

const { string, func, number } = PropTypes;
Product.propTypes = {
  name: string.isRequired,
  id: number.isRequired,
  selectSize: func.isRequired,
  checkedID: number.isRequired,
};

export default Product;
