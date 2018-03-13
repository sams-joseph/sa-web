import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChevronRight from 'material-ui-icons/ChevronRight';
import { Container } from './Styled';

function Breadcrumbs({ order }) {
  return (
    <Container>
      {order.product ? (
        <li>
          {order.product.productName} <ChevronRight style={{ marginLeft: '10px' }} />
        </li>
      ) : (
        ''
      )}
      {order.size ? (
        <li>
          {order.size.sizeName} <ChevronRight style={{ marginLeft: '10px' }} />
        </li>
      ) : (
        ''
      )}
      {order.design ? <li>{order.design.designName}</li> : ''}
    </Container>
  );
}

const { string, shape } = PropTypes;
Breadcrumbs.propTypes = {
  order: shape({ string }).isRequired,
};

function mapStateToProps(state) {
  return {
    order: state.order,
  };
}

export default connect(mapStateToProps)(Breadcrumbs);
