import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './Styled';

function InputGroup({ children, label }) {
  return (
    <Container>
      <label htmlFor="product-size">{label}</label>
      {children}
    </Container>
  );
}

const { shape, node, string } = PropTypes;
InputGroup.propTypes = {
  label: string.isRequired,
  children: shape({ node }).isRequired,
};

export default InputGroup;
