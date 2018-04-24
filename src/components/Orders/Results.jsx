import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui-icons/ZoomIn';
import api from '../../api';

class Results extends Component {
  state = { orders: [], loading: true };

  componentWillMount() {
    api.search
      .byNameDate(this.props.query)
      .then(orders => this.setState({ orders, loading: false }))
      .catch(() => {});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.setState({ loading: true });
      api.search
        .byNameDate(this.props.query)
        .then(orders => this.setState({ orders, loading: false }))
        .catch(() => {});
    }
  }

  render() {
    const orderResults =
      this.state.orders.length > 0 ? (
        this.state.orders.map(order => (
          <div key={order.id}>
            <IconButton component={Link} to={`/order/${order.id + 100000}`}>
              <ZoomIn />
            </IconButton>
            <Link style={{ marginLeft: '10px' }} to={`/order/${order.id + 100000}`}>
              {order.id + 100000}
            </Link>
          </div>
        ))
      ) : (
        <div style={{ margin: '15px 0' }}>No match</div>
      );

    return <div>{this.state.loading ? <CircularProgress /> : <div>{orderResults}</div>}</div>;
  }
}

export default Results;
