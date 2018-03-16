import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import CartItem from '../CartItem';

import { Container, Heading } from './Styled';

class Cart extends Component {
  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { cart } = this.props;

    return (
      <Container>
        <Heading>Cart</Heading>
        {cart.map(cartItem => <CartItem item={cartItem} />)}

        {cart.length > 0 && (
          <Button style={{ marginTop: '20px' }} variant="raised" size="large" color="primary">
            Checkout
          </Button>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

const { shape, arrayOf } = PropTypes;
Cart.propTypes = {
  cart: arrayOf(shape({}).isRequired).isRequired,
};

export default connect(mapStateToProps)(Cart);
