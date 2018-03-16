import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';

const CartBadge = ({ numItems }) => (
  <IconButton component={Link} to="/cart">
    {numItems === 0 ? (
      <ShoppingCartIcon />
    ) : (
      <Badge badgeContent={numItems} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    )}
  </IconButton>
);

function mapStateToProps(state) {
  return {
    numItems: state.cart.byId.length,
  };
}

const { number } = PropTypes;
CartBadge.propTypes = {
  numItems: number.isRequired,
};

export default connect(mapStateToProps)(CartBadge);
