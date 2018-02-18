import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

function DashboardPage({ isConfirmed }) {
  return (
    <div>
      {!isConfirmed && <ConfirmEmailMessage />}
      <h1>Dashboard</h1>
    </div>
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
