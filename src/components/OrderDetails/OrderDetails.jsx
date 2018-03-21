import React, { Component } from 'react';
import api from '../../api';
import PartItem from '../PartItem';

import {
  Container,
  Heading,
  SubHeading,
  Flex,
  HeadingIcon,
  ShippingList,
  ShippingHeading,
  ShippingListItem,
  SectionIcon,
} from './Styled';
import OrderSvg from './images/order-icon.svg';
import ShippingSvg from './images/shipping-icon.svg';

class OrderDetails extends Component {
  state = {
    order: {},
    orderParts: [],
    details: {
      byId: [],
      byHash: {},
    },
  };

  componentWillMount() {
    api.order.getOrder(this.props.match.params.id - 100000).then(order => {
      this.setState({
        ...this.state,
        order,
        orderParts: order.parts,
      });
    });
  }

  render() {
    const { order, orderParts } = this.state;

    return (
      <Container>
        <Flex>
          <HeadingIcon src={OrderSvg} alt="Order" />
          <div>
            <Heading>{this.props.match.params.id}</Heading>
            <SubHeading>Order Number</SubHeading>
          </div>
        </Flex>
        <ShippingList>
          <ShippingHeading>
            <SectionIcon src={ShippingSvg} alt="Shipping" />Shipping Address
          </ShippingHeading>
          <ShippingListItem>{order.shippingName}</ShippingListItem>
          <ShippingListItem>{order.shippingAddress}</ShippingListItem>
          <ShippingListItem>
            {order.shippingCity}, {order.shippingState}, {order.shippingZip}
          </ShippingListItem>
        </ShippingList>
        {orderParts.map(part => <PartItem key={part.id} item={part} />)}
      </Container>
    );
  }
}

export default OrderDetails;
