import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ForgotPasswordForm from './ForgotPasswordForm';
import Success from '../Success';
import { forgotPassword } from '../../actions/auth';
import { Wrapper } from './Styled';

class ForgotPassword extends Component {
  state = { reset: false, message: '' };
  submit = data =>
    this.props.forgotPassword(data).then(res => {
      this.setState({ reset: true, message: res });
    });

  render() {
    return (
      <Wrapper>
        {this.state.reset ? (
          <Success headline="Password Reset" message={this.state.message} redirect={{ text: 'Login', to: '/login' }} />
        ) : (
          <ForgotPasswordForm submit={this.submit} />
        )}
      </Wrapper>
    );
  }
}

const { func } = PropTypes;
ForgotPassword.propTypes = {
  forgotPassword: func.isRequired,
};

export default connect(null, { forgotPassword })(ForgotPassword);
