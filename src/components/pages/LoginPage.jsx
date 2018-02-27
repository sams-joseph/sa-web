import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

import { Container } from './Styled';

class LoginPage extends Component {
  submit = data => this.props.login(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <Container>
        <LoginForm submit={this.submit} />
      </Container>
    );
  }
}

const { shape, func } = PropTypes;
LoginPage.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  login: func.isRequired,
};

export default connect(null, { login })(LoginPage);
