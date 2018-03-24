import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { resetCart } from '../../actions/cart';
import { Container, Checkmark, CheckmarkCircle, CheckmarkCheck } from './Styled';

import api from '../../api';

class CheckoutMessage extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { shipping, cart } = this.props;
    const parts = cart.byId.map(item => ({
      productId: cart.byHash[item].product.productID,
      sizeId: cart.byHash[item].size.sizeID,
      designId: cart.byHash[item].design.designID,
      quantity: cart.byHash[item].quantity,
      name: cart.byHash[item].inputs.name,
      date: cart.byHash[item].inputs.date,
      image: cart.byHash[item].image,
      portrait: cart.byHash[item].portrait,
    }));

    api.order
      .placeOrder({
        shippingName: shipping.name,
        shippingAddress: shipping.address,
        shippingCity: shipping.city,
        shippingState: shipping.state,
        shippingZip: shipping.zip,
      })
      .then(order => {
        Promise.all(
          parts.map(
            part =>
              new Promise((resolve, reject) => {
                api.order
                  .addPart({
                    orderId: order.id,
                    ...part,
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch(err => {
                    reject(err);
                  });
              })
          )
        ).then(() => {
          api.order.sendConfirmation(order);
          this.setState({ loading: false });
          this.props.resetCart();
          setTimeout(() => {
            this.props.history.push('/dashboard');
          }, 3000);
        });
      });
  }

  render() {
    const { headline, message } = this.props;
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <Container>
            <CircularProgress />
          </Container>
        ) : (
          <Container>
            <Checkmark xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <CheckmarkCircle cx="26" cy="26" r="25" fill="none" />
              <CheckmarkCheck fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </Checkmark>

            <Typography variant="title">{headline}</Typography>
            <Typography variant="subheading">{message}</Typography>
          </Container>
        )}
      </div>
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
