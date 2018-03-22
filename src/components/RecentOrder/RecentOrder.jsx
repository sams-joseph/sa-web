import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecentOrderItem from '../RecentOrderItem';

import { OrderLink, Container, SubHeading, SectionIcon, EmptyIcon, EmptyText } from './Styled';
import RecentOrderSvg from './images/recent-order-icon.svg';
import NoOrderSvg from './images/no-order-icon.svg';

class RecentOrder extends Component {
  state = {
    hasOrders: false,
  };

  componentWillMount() {
    if (this.props.orderHistory.length > 0) {
      this.setState({
        hasOrders: true,
      });
    }
  }

  render() {
    const orderHistory = this.props.orderHistory.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    const recentOrder = orderHistory[orderHistory.length - 1];
    const orderNumber = this.state.hasOrders ? recentOrder.id + 100000 : 100000;

    return (
      <Container>
        <SubHeading>
          <SectionIcon src={RecentOrderSvg} alt="Recent Order" />Recent Order
        </SubHeading>
        {this.state.hasOrders ? (
          <div>
            <OrderLink to={`/order/${orderNumber}`}>Order #{orderNumber}</OrderLink>
            {recentOrder.parts.map(part => (
              <RecentOrderItem key={part.id} item={part} product={part.product} size={part.size} />
            ))}
          </div>
        ) : (
          <div>
            <EmptyIcon src={NoOrderSvg} alt="No Orders" />
            <EmptyText>You have no orders</EmptyText>
          </div>
        )}
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
