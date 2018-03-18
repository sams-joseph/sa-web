import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function CartSummary({ cart }) {
  return <div>Cart Summary {cart.byId.length}</div>;
}

const { shape } = PropTypes;
CartSummary.propTypes = {
  cart: shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(CartSummary);
