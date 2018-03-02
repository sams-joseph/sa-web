import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Wrapper, Container, Heading } from './Styled';
import AlertMessage from '../messages/AlertMessage';
import * as actions from '../../actions/auth';

class HomePage extends Component {
  state = {
    showMessage: true,
  };
  toggleMessage = showMessage => {
    this.setState({
      showMessage,
    });
  };
  render() {
    const { isConfirmed, isAuthenticated } = this.props;
    const { showMessage } = this.state;
    return (
      <Wrapper>
        {!isConfirmed &&
          showMessage &&
          isAuthenticated && (
            <AlertMessage
              closable
              type="info"
              text="Your email has not been verified"
              toggleMessage={this.toggleMessage}
            />
          )}
        <Container>
          <Heading>Home</Heading>
        </Container>
      </Wrapper>
    );
  }
}

const { bool } = PropTypes;
HomePage.propTypes = {
  isAuthenticated: bool.isRequired,
  isConfirmed: bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isConfirmed: !!state.user.confirmed,
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
