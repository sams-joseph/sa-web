import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import { StyledContainer } from './Styled';
import { login } from '../../actions/auth';

class LoginPage extends Component {
  submit = data => this.props.login(data).then(() => this.props.history.push('/'));

  render() {
    return (
      <StyledContainer>
        <LoginForm submit={this.submit} />
      </StyledContainer>
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
