import React, { Component } from 'react';
import api from '../../api';

class OrderDetails extends Component {
  componentWillMount() {
    api.order.getOrder(this.props.match.params.id - 100000).then(order => {
      console.log(order);
    });

    api.order.getOrderParts(this.props.match.params.id - 100000).then(parts => {
      console.log(parts);
    });
  }

  render() {
    return <div>OrderDetails page</div>;
  }
}

export default OrderDetails;
