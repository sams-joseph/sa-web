import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';

const CartBadge = ({ numItems }) => (
  <IconButton component={Link} to="/cart">
    <Badge badgeContent={numItems} color="primary">
      <ShoppingCartIcon />
    </Badge>
  </IconButton>
);

function mapStateToProps(state) {
  return {
    numItems: state.cart.length,
  };
}

const { number } = PropTypes;
CartBadge.propTypes = {
  numItems: number.isRequired,
};

export default connect(mapStateToProps)(CartBadge);
