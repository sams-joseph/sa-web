import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../LoginForm';
import { login } from '../../actions/auth';
import { showLoginMessage, showAlertMessage } from '../../actions/message';

import { Wrapper, Container } from './Styled';

class LoginPage extends Component {
  submit = data =>
    this.props.login(data).then(() => {
      this.props.showLoginMessage(true);
      this.props.showAlertMessage(true);
      return this.props.history.push('/dashboard');
    });

  render() {
    return (
      <Wrapper>
        <Container padding="30px 0">
          <LoginForm submit={this.submit} />
        </Container>
      </Wrapper>
    );
  }
}

const { shape, func } = PropTypes;
LoginPage.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  login: func.isRequired,
  showLoginMessage: func.isRequired,
  showAlertMessage: func.isRequired,
};

export default connect(null, { login, showLoginMessage, showAlertMessage })(LoginPage);
