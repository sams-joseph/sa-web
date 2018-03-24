import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { addToCart } from '../../actions/cart';
import { resetOrder } from '../../actions/order';
import { Container, Checkmark, CheckmarkCircle, CheckmarkCheck } from './Styled';

class Completion extends Component {
  componentDidMount() {
    const id = this.props.cart.byId;
    const newId = id.length > 0 ? id[id.length - 1] : 0;
    this.props.addToCart(newId + 1, this.props.order).then(() => {
      // localStorage.setItem('cartItems', JSON.stringify(this.props.cart));
    });
    this.props.resetOrder();
  }

  render() {
    const { headline, message } = this.props;
    return (
      <Container>
        <Checkmark xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <CheckmarkCircle cx="26" cy="26" r="25" fill="none" />
          <CheckmarkCheck fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </Checkmark>

        <Typography variant="title">{headline}</Typography>
        <Typography variant="subheading">{message}</Typography>
      </Container>
    );
  }
}

const { string, func, shape } = PropTypes;
Completion.propTypes = {
  headline: string.isRequired,
  message: string.isRequired,
  addToCart: func.isRequired,
  resetOrder: func.isRequired,
  order: shape({}).isRequired,
  cart: shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    order: state.order,
    cart: state.cart,
  };
}

export default connect(mapStateToProps, { addToCart, resetOrder })(Completion);
