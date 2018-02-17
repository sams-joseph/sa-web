import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { StyledContainer } from './Styled';
import { resetPassword } from '../../actions/auth';

class ResetPasswordPage extends Component {
  submit = data => this.props.resetPassword(data).then(() => this.props.history.push('/'));

  render() {
    return <ResetPasswordForm submit={this.submit} />;
  }
}

const { shape, func } = PropTypes;
ResetPasswordPage.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  resetPassword: func.isRequired,
};

export default connect(null, { resetPassword })(ResetPasswordPage);
