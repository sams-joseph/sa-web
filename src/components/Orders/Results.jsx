import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui-icons/ZoomIn';
import api from '../../api';

class Results extends Component {
  state = { orders: [], loading: true };

  componentWillMount() {
    api.search.byNameDate(this.props.query).then(orders => this.setState({ orders, loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.setState({ loading: true });
      api.search.byNameDate(this.props.query).then(orders => this.setState({ orders, loading: false }));
    }
  }

  render() {
    const orderResults = this.state.orders.map(order => (
      <div key={order.id}>
        <IconButton component={Link} to={`/order/${order.id + 100000}`}>
          <ZoomIn />
        </IconButton>
        <Link style={{ marginLeft: '10px' }} to={`/order/${order.id + 100000}`}>
          {order.id + 100000}
        </Link>
      </div>
    ));

    return (
      <div>
        {this.state.loading ? (
          <CircularProgress />
        ) : (
          <div>{this.state.orders.length === 0 ? 'No match' : orderResults}</div>
        )}
      </div>
    );
  }
}

export default Results;
