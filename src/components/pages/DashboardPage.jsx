import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { Container } from './Styled';

function DashboardPage({ isConfirmed }) {
  return (
    <Container>
      {!isConfirmed && <ConfirmEmailMessage />}
      <h1>Dashboard</h1>
    </Container>
  );
}

const { bool } = PropTypes;
DashboardPage.propTypes = {
  isConfirmed: bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
  };
}

export default connect(mapStateToProps)(DashboardPage);
