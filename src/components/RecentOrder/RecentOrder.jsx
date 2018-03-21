import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecentOrderItem from '../RecentOrderItem';

import { OrderLink, Container, SubHeading, SectionIcon } from './Styled';
import RecentOrderSvg from './images/recent-order-icon.svg';

class RecentOrder extends Component {
  render() {
    const orderHistory = this.props.orderHistory.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    const recentOrder = orderHistory[orderHistory.length - 1];
    const orderNumber = recentOrder.id + 100000;

    return (
      <Container>
        <SubHeading>
          <SectionIcon src={RecentOrderSvg} alt="Recent Order" />Recent Order
        </SubHeading>
        <OrderLink to={`/order/${orderNumber}`}>Order #{orderNumber}</OrderLink>
        {recentOrder
          ? recentOrder.parts.map(part => <RecentOrderItem item={part} product={part.product} size={part.size} />)
          : ''}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderHistory: state.orderHistory,
  };
}

export default connect(mapStateToProps)(RecentOrder);
