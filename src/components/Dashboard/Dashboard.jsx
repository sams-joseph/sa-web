import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Wrapper, Container, Heading } from './Styled';

class Dashboard extends Component {
  state = {};

  render() {
    const { showAlertMessage } = this.props;
    return (
      <Wrapper alertMessage={showAlertMessage}>
        <Container>
          <Heading>Dashboard</Heading>
        </Container>
      </Wrapper>
    );
  }
}

const { bool } = PropTypes;
Dashboard.propTypes = {
  showAlertMessage: bool.isRequired,
};

function mapStateToProps(state) {
  return {
    showAlertMessage: state.message.alert,
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps)(Dashboard);
