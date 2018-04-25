import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui-icons/ZoomIn';
import api from '../../api';

import { ResultRow, PartItem, PartNumber, PartDetails } from './Styled';

class Results extends Component {
  state = { orders: [], loading: true };

  componentWillMount() {
    api.search
      .byNameDate(this.props.query, 5, 0)
      .then(orders => this.setState({ orders, loading: false }))
      .catch(() => {});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.setState({ loading: true });
      api.search
        .byNameDate(this.props.query, 5, 0)
        .then(orders => this.setState({ orders, loading: false }))
        .catch(() => {});
    }
  }

  pad = n => (n < 10 ? `0${n}` : n);

  render() {
    const orderResults =
      this.state.orders.length > 0 ? (
        this.state.orders.map(order => (
          <ResultRow key={order.id}>
            <IconButton component={Link} to={`/order/${order.id + 100000}`}>
              <ZoomIn />
            </IconButton>
            <div style={{ padding: '10px 0' }}>
              <Link to={`/order/${order.id + 100000}`}>{order.id + 100000}</Link>
              {order.parts.map((part, index) => (
                <PartItem key={part.id}>
                  <PartNumber>{this.pad(index + 1)}</PartNumber>
                  <PartDetails>{`${part.name} ${part.date}`}</PartDetails>
                </PartItem>
              ))}
            </div>
          </ResultRow>
        ))
      ) : (
        <div style={{ margin: '15px 0' }}>No match</div>
      );

    return <div>{this.state.loading ? <CircularProgress /> : <div>{orderResults}</div>}</div>;
  }
}

export default Results;
