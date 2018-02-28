import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AlertMessage from '../messages/AlertMessage';
import { Wrapper, Container, Heading } from './Styled';

class DashboardPage extends Component {
  state = {
    showMessage: true,
  };
  toggleMessage = showMessage => {
    this.setState({
      showMessage,
    });
  };

  render() {
    const { isConfirmed } = this.props;
    const { showMessage } = this.state;
    return (
      <Wrapper>
        {!isConfirmed &&
          showMessage && (
            <AlertMessage
              closable
              type="info"
              text="Your email has not been verified"
              toggleMessage={this.toggleMessage}
              topMargin
            />
          )}
        <Container>
          <Heading>Dashboard</Heading>
        </Container>
      </Wrapper>
    );
  }
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
