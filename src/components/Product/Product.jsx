import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/order';

import { ProductContainer, ProductMeta, ProductHeading, ProductDescription, ProductButton } from './Styled';

function Product({ id, name, description, imageUrl, setOrderProduct }) {
  return (
    <ProductContainer img={imageUrl}>
      <ProductMeta>
        <ProductHeading>{name}</ProductHeading>
        <ProductDescription>{description}</ProductDescription>
        <ProductButton onClick={() => setOrderProduct(id)}>Get Started</ProductButton>
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
  setOrderProduct: func.isRequired,
};

export default connect(null, { setOrderProduct: actions.setOrderProduct })(Product);
