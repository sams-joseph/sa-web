import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import * as actions from '../../actions/order';

import { ProductContainer, ProductMeta, ProductHeading, ProductDescription } from './Styled';

function Product({ id, name, description, imageUrl, setOrderProduct }) {
  return (
    <ProductContainer img={imageUrl}>
      <ProductMeta>
        <ProductHeading>{name}</ProductHeading>
        <ProductDescription>{description}</ProductDescription>
        <Button
          variant="raised"
          color="primary"
          onClick={() => setOrderProduct(id)}
          component={Link}
          to="/select-design"
        >
          Get Started
        </Button>
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
