import React from 'react';
import { connect } from 'react-redux';
import ReviewItem from '../ReviewItem';

import { Container, Heading, ShippingList, ShippingHeading, ShippingListItem } from './Styled';

function Review({ shipping, cart }) {
  return (
    <Container>
      <Heading>Review</Heading>
      <ShippingList>
        <ShippingHeading>Shipping Address</ShippingHeading>
        <ShippingListItem>{shipping.name}</ShippingListItem>
        <ShippingListItem>{shipping.address}</ShippingListItem>
        <ShippingListItem>
          {shipping.city}, {shipping.state}, {shipping.zip}
        </ShippingListItem>
      </ShippingList>
      {cart.byId.map(item => <ReviewItem key={item} item={cart.byHash[item]} />)}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    shipping: state.shipping,
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Review);
