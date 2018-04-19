import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResetPasswordForm from './ResetPasswordForm';
import Success from '../Success';
import { resetPassword } from '../../actions/auth';
import { Wrapper } from './Styled';

class ResetPassword extends Component {
  state = { reset: false, message: '' };

  submit = data =>
    this.props.resetPassword({ password: data, token: this.props.match.params.token }).then(res => {
      this.setState({ reset: true, message: res });
    });

  render() {
    return (
      <Wrapper>
        {this.state.reset ? (
          <Success headline="Password Reset" message={this.state.message} redirect={{ text: 'Login', to: '/login' }} />
        ) : (
          <ResetPasswordForm submit={this.submit} />
        )}
      </Wrapper>
    );
  }
}

const { func } = PropTypes;
ResetPassword.propTypes = {
  resetPassword: func.isRequired,
};

export default connect(null, { resetPassword })(ResetPassword);
