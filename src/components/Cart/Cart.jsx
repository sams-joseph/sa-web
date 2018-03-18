import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CartItem from '../CartItem';
import CartSvg from './images/shopping-cart--large.svg';

import { removeFromCart, updateCart } from '../../actions/cart';

import { Container, Heading, EmptyMessage, CartIcon, CartIconSmall } from './Styled';

class Cart extends Component {
  removeItem = index => {
    this.props.removeFromCart(index);
  };

  updateCartItem = (id, payload) => {
    this.props.updateCart(id, payload);
  };

  render() {
    const { cart } = this.props;

    return (
      <Container>
        {cart.byId.length > 0 ? (
          <Heading>
            <CartIconSmall src={CartSvg} alt="Empty Cart" />Cart
          </Heading>
        ) : (
          <div>
            <CartIcon src={CartSvg} alt="Empty Cart" />
            <EmptyMessage>Your cart is empty</EmptyMessage>
          </div>
        )}
        <TransitionGroup>
          {cart.byId.map(item => (
            <CSSTransition key={item} timeout={300} classNames="fade">
              <CartItem item={cart.byHash[item]} remove={this.removeItem} update={this.updateCartItem} index={item} />
            </CSSTransition>
          ))}
        </TransitionGroup>

        {cart.byId.length > 0 && (
          <Button
            style={{ marginTop: '70px' }}
            variant="raised"
            size="large"
            color="secondary"
            component={Link}
            to="/checkout"
          >
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

const { shape, func } = PropTypes;
Cart.propTypes = {
  cart: shape({}).isRequired,
  removeFromCart: func.isRequired,
};

export default connect(mapStateToProps, { removeFromCart, updateCart })(Cart);
