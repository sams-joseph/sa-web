import React from 'react';
import { connect } from 'react-redux';

function Order({ order }) {
  return <div>{order.productID}</div>;
}

function mapStateToProps(state) {
  return {
    order: state.order,
  };
}

export default connect(mapStateToProps)(Order);
