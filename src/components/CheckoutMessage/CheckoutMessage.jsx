import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { resetCart } from '../../actions/cart';
import { Container, Checkmark, CheckmarkCircle, CheckmarkCheck } from './Styled';

class CheckoutMessage extends Component {
  componentDidMount() {
    this.props.resetCart();
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

const { string, func } = PropTypes;
CheckoutMessage.propTypes = {
  headline: string.isRequired,
  message: string.isRequired,
  resetCart: func.isRequired,
};

function mapStateToProps(state) {
  return {
    shipping: state.shipping,
    cart: state.cart,
  };
}

export default connect(mapStateToProps, { resetCart })(CheckoutMessage);
