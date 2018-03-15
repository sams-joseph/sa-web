import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';
import CheckBox from 'material-ui-icons/CheckBox';
import * as actions from '../../actions/order';

import { ProductContainer, ProductMeta, ProductHeading, ProductDescription } from './Styled';

function Product({ id, name, description, imageUrl, selectProduct, checkedID }) {
  return (
    <ProductContainer img={imageUrl} onClick={() => selectProduct(id, name)} checked={id === checkedID}>
      <ProductMeta>
        <div>
          <ProductHeading>{name}</ProductHeading>
          <ProductDescription>{description}</ProductDescription>
        </div>
        <Checkbox
          checkedIcon={<CheckBox style={{ color: 'white' }} />}
          icon={<CheckBoxOutlineBlank style={{ color: 'white' }} />}
          checked={id === checkedID}
          onChange={() => selectProduct(id, name)}
        />
      </ProductMeta>
    </ProductContainer>
  );
}

const { string, func, number } = PropTypes;
Product.propTypes = {
  name: string.isRequired,
  description: string.isRequired,
  imageUrl: string.isRequired,
  id: number.isRequired,
  selectProduct: func.isRequired,
  checkedID: number.isRequired,
};

export default connect(null, { setOrderProduct: actions.setOrderProduct })(Product);
