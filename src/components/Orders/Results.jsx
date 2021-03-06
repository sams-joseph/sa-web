import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui-icons/ZoomIn';
import constants from '../constants';

import { ResultRow, PartItem, PartNumber, PartDetails } from './Styled';

class Results extends Component {
  pad = n => (n < 10 ? `0${n}` : n);

  render() {
    const orderResults =
      this.props.orders.length > 0 ? (
        this.props.orders.map(order => (
          <ResultRow key={order.id}>
            <div style={{ padding: '10px 0' }}>
              <Link style={{ fontWeight: constants.fontWeightMedium }} to={`/order/${order.id + 100000}`}>
                {order.id + 100000}
              </Link>
              {order.parts.map((part, index) => (
                <PartItem key={part.id}>
                  <PartNumber>{this.pad(index + 1)}</PartNumber>
                  <PartDetails>{`${part.name} ${part.date}`}</PartDetails>
                </PartItem>
              ))}
            </div>
            <IconButton style={{ margin: '5px 0 0 30px' }} component={Link} to={`/order/${order.id + 100000}`}>
              <ZoomIn />
            </IconButton>
          </ResultRow>
        ))
      ) : (
        <div style={{ margin: '15px 0' }}>End of results</div>
      );

    return <div>{this.props.loading ? <CircularProgress /> : <div>{orderResults}</div>}</div>;
  }
}

export default Results;
