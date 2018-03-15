import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResetPasswordForm from '../ResetPasswordForm';
import { resetPassword } from '../../actions/auth';

class ResetPassword extends Component {
  submit = data => this.props.resetPassword(data).then(() => this.props.history.push('/'));

  render() {
    return <ResetPasswordForm submit={this.submit} />;
  }
}

const { shape, func } = PropTypes;
ResetPassword.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  resetPassword: func.isRequired,
};

export default connect(null, { resetPassword })(ResetPassword);
