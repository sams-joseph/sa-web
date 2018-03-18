import React from 'react';
import PropTypes from 'prop-types';
import RecentOrderItem from '../RecentOrderItem';

import { OrderLink, Container, SubHeading } from './Styled';

function createPartItems(parts) {
  console.log(parts);
  const partItems = parts.map(part => <RecentOrderItem item={part} />);

  return partItems;
}

const RecentOrder = ({ orderNumber, parts }) => (
  <Container>
    <SubHeading>Recent Order</SubHeading>
    <OrderLink to={`/order/${orderNumber}`}>Order #{orderNumber}</OrderLink>
    {createPartItems(parts)}
  </Container>
);

const { string, shape, arrayOf } = PropTypes;
RecentOrder.propTypes = {
  orderNumber: string.isRequired,
  parts: arrayOf(shape({}).isRequired).isRequired,
};

export default RecentOrder;
