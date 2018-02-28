import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Wrapper, Container, Heading } from './Styled';

class DashboardPage extends Component {
  state = {};

  render() {
    const { showMessage } = this.props;
    return (
      <Wrapper alertMessage={showMessage}>
        <Container>
          <Heading>Dashboard</Heading>
        </Container>
      </Wrapper>
    );
  }
}

const { bool } = PropTypes;
DashboardPage.propTypes = {
  showMessage: bool.isRequired,
};

function mapStateToProps(state) {
  return {
    showMessage: state.message,
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps)(DashboardPage);
